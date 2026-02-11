package com.hospital.comparison.service;

import com.hospital.comparison.dto.HospitalSearchDTO;
import com.hospital.comparison.entity.Hospital;
import com.hospital.comparison.entity.HospitalService;
import com.hospital.comparison.repository.HospitalRepository;
import com.hospital.comparison.repository.HospitalServiceRepository;
import com.hospital.comparison.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class HospitalSearchService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private HospitalServiceRepository hospitalServiceRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private GeocodingService geocodingService;

    @Autowired
    private AreaCoordinatesService areaCoordinatesService;

    public List<HospitalSearchDTO> searchHospitals(Long serviceId, Double latitude, Double longitude,
            String city, String area, Double radiusKm) {

        System.out.println("Searching hospitals for: City=" + city + ", Area=" + area + 
                          ", Lat=" + latitude + ", Lon=" + longitude + ", Radius=" + radiusKm);

        List<HospitalWithDistance> hospitalsWithDistance = new ArrayList<>();

        try {
            // CASE 1: GPS coordinates provided - use as reference point
            if (latitude != null && longitude != null && radiusKm != null) {
                System.out.println("Using GPS coordinates as reference point");
                hospitalsWithDistance = findHospitalsByCoordinates(latitude, longitude, city, radiusKm);
            }
            // CASE 2: Area provided - get area coordinates as reference point
            else if (area != null && !area.trim().isEmpty() && radiusKm != null) {
                System.out.println("Getting coordinates for area: " + area);
                try {
                    Double[] areaCoords = null;
                    
                    // STRATEGY 1: Try database coordinates first
                    areaCoords = areaCoordinatesService.getAreaCoordinates(city, area.trim());
                    
                    if (areaCoords == null) {
                        // STRATEGY 2: Try geocoding service
                        areaCoords = geocodingService.getCoordinatesForArea(city, area.trim());
                    }
                    
                    if (areaCoords != null && areaCoords[0] != null && areaCoords[1] != null) {
                        System.out.println("✅ Using area coordinates: " + areaCoords[0] + ", " + areaCoords[1]);
                        hospitalsWithDistance = findHospitalsByCoordinates(areaCoords[0], areaCoords[1], city, radiusKm);
                    } else {
                        System.out.println("❌ Area coordinates not found, trying city center coordinates...");
                        
                        // STRATEGY 3: Use city center coordinates
                        double[] cityCoordsArray = geocodingService.getCoordinates(city);
                        if (cityCoordsArray != null && cityCoordsArray.length >= 2) {
                            Double[] cityCoords = new Double[]{cityCoordsArray[0], cityCoordsArray[1]};
                            System.out.println("✅ Using city center coordinates: " + cityCoords[0] + ", " + cityCoords[1]);
                            hospitalsWithDistance = findHospitalsByCoordinates(cityCoords[0], cityCoords[1], city, radiusKm);
                        } else {
                            System.out.println("❌ City geocoding also failed, falling back to city-only search");
                            // Final fallback: search by city only
                            hospitalsWithDistance = findHospitalsByCityOnly(city);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("❌ Area coordinate lookup failed: " + e.getMessage());
                    // Fallback: search by city only
                    hospitalsWithDistance = findHospitalsByCityOnly(city);
                }
            }
            // CASE 3: City only search
            else {
                System.out.println("Performing city-only search");
                hospitalsWithDistance = findHospitalsByCityOnly(city);
            }

            if (hospitalsWithDistance.isEmpty()) {
                System.out.println("No hospitals found");
                return Collections.emptyList();
            }

            // Filter by service and convert to DTO
            List<HospitalSearchDTO> results = convertToSearchDTOs(hospitalsWithDistance, serviceId, latitude, longitude);
            System.out.println("Final results: " + results.size() + " hospitals");
            return results;
            
        } catch (Exception e) {
            System.err.println("Error in searchHospitals: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    private List<HospitalWithDistance> findHospitalsByCoordinates(Double latitude, Double longitude, 
            String city, Double radiusKm) {
        
        List<HospitalWithDistance> result = new ArrayList<>();
        
        try {
            System.out.println("=== COORDINATE SEARCH DEBUG ===");
            System.out.println("Reference point: " + latitude + ", " + longitude);
            System.out.println("Radius: " + radiusKm + " km");
            System.out.println("City filter: " + city);
            
            if (city != null && !city.trim().isEmpty()) {
                List<Object[]> hospitalCoords = hospitalRepository.getHospitalCoordinates(city.trim());
                System.out.println("Hospitals in " + city + " with coordinates:");
                hospitalCoords.forEach(row -> {
                    Long id = (Long) row[0];
                    String name = (String) row[1];
                    Double lat = (Double) row[2];
                    Double lon = (Double) row[3];
                    System.out.println("  ID:" + id + " " + name + " at (" + lat + ", " + lon + ")");
                });
                
                boolean querySuccess = false;
                
                try {
                    System.out.println("Trying simplified Haversine query...");
                    List<Object[]> hospitals = hospitalRepository.findHospitalsWithinRadiusFromCitySimple(
                            city.trim(), latitude, longitude, radiusKm);
                    
                    System.out.println("Simplified radius search found " + hospitals.size() + " hospitals");
                    
                    for (Object[] row : hospitals) {
                        Hospital hospital = (Hospital) row[0];
                        Double distance = (Double) row[1];
                        System.out.println("  - " + hospital.getName() + ": " + distance + "km");
                        result.add(new HospitalWithDistance(hospital, distance));
                    }
                    querySuccess = true;
                } catch (Exception e1) {
                    System.err.println("Simplified query failed, trying complex query: " + e1.getMessage());
                    
                    try {
                        List<Object[]> hospitals = hospitalRepository.findHospitalsWithinRadiusFromCity(
                                city.trim(), latitude, longitude, radiusKm);
                        
                        System.out.println("Complex radius search found " + hospitals.size() + " hospitals");
                        
                        for (Object[] row : hospitals) {
                            Hospital hospital = (Hospital) row[0];
                            Double distance = (Double) row[1];
                            System.out.println("  - " + hospital.getName() + ": " + distance + "km");
                            result.add(new HospitalWithDistance(hospital, distance));
                        }
                        querySuccess = true;
                    } catch (Exception e2) {
                        System.err.println("Complex query also failed: " + e2.getMessage());
                    }
                }
                
                if (!querySuccess) {
                    System.out.println("All SQL queries failed, using manual distance calculation...");
                    List<Hospital> allCityHospitals = hospitalRepository.findByCity(city.trim());
                    
                    for (Hospital hospital : allCityHospitals) {
                        if (hospital.getLatitude() != null && hospital.getLongitude() != null) {
                            double distance = calculateDistance(latitude, longitude, 
                                    hospital.getLatitude(), hospital.getLongitude());
                            
                            System.out.println("  - " + hospital.getName() + ": " + distance + "km (calculated manually)");
                            
                            if (distance <= radiusKm) {
                                result.add(new HospitalWithDistance(hospital, distance));
                            }
                        }
                    }
                    
                    result.sort((a, b) -> Double.compare(a.distance, b.distance));
                    System.out.println("Manual calculation found " + result.size() + " hospitals within radius");
                }
                
            } else {
                try {
                    System.out.println("Trying simplified city-agnostic query...");
                    List<Object[]> hospitals = hospitalRepository.findHospitalsWithinRadiusFromCoordinates(
                            latitude, longitude, radiusKm);
                    
                    System.out.println("Coordinate radius search found " + hospitals.size() + " hospitals");
                    
                    for (Object[] row : hospitals) {
                        Hospital hospital = (Hospital) row[0];
                        Double distance = (Double) row[1];
                        System.out.println("  - " + hospital.getName() + ": " + distance + "km");
                        result.add(new HospitalWithDistance(hospital, distance));
                    }
                } catch (Exception e) {
                    System.err.println("City-agnostic query failed: " + e.getMessage());
                }
            }
            
            System.out.println("=== END COORDINATE SEARCH DEBUG ===");
            
        } catch (Exception e) {
            System.err.println("Error in findHospitalsByCoordinates: " + e.getMessage());
            e.printStackTrace();
            return findHospitalsByCityOnly(city);
        }
        
        return result;
    }

    private List<HospitalWithDistance> findHospitalsByCityOnly(String city) {
        List<Hospital> hospitals = hospitalRepository.findByCity(city);
        
        if (hospitals.isEmpty()) {
            List<Hospital> allHospitals = hospitalRepository.findAll();
            hospitals = allHospitals.stream()
                    .filter(h -> h.getCity() != null && h.getCity().equalsIgnoreCase(city.trim()))
                    .collect(Collectors.toList());
        }

        return hospitals.stream()
                .map(h -> new HospitalWithDistance(h, 0.0))
                .collect(Collectors.toList());
    }

    private List<HospitalSearchDTO> convertToSearchDTOs(List<HospitalWithDistance> hospitalsWithDistance, 
            Long serviceId, Double finalLat, Double finalLon) {
        
        try {
            List<Long> hospitalIds = hospitalsWithDistance.stream()
                    .map(hwd -> hwd.hospital.getId())
                    .collect(Collectors.toList());

            System.out.println("Looking for service " + serviceId + " in hospitals: " + hospitalIds);

            List<HospitalService> hospitalServices = hospitalServiceRepository
                    .findByServiceIdAndHospitalIds(serviceId, hospitalIds);

            System.out.println("Found " + hospitalServices.size() + " hospital services");

            Map<Long, HospitalWithDistance> hospitalMap = hospitalsWithDistance.stream()
                    .collect(Collectors.toMap(hwd -> hwd.hospital.getId(), hwd -> hwd));

            return hospitalServices.stream()
                    .map(hs -> {
                        Hospital hospital = hs.getHospital();
                        HospitalWithDistance hwd = hospitalMap.get(hospital.getId());
                        
                        if (hwd == null) return null;

                        HospitalSearchDTO dto = new HospitalSearchDTO();
                        dto.setId(hospital.getId());
                        dto.setName(hospital.getName());
                        dto.setAddress(hospital.getAddress());
                        dto.setCity(hospital.getCity());
                        dto.setLatitude(hospital.getLatitude());
                        dto.setLongitude(hospital.getLongitude());
                        dto.setPhone(hospital.getPhone());
                        dto.setPrice(hs.getPrice());
                        dto.setAvailability(hs.getAvailability());
                        dto.setWaitingTime(hs.getWaitingTime());

                        dto.setDistance(hwd.distance);

                        Double avgRating = reviewRepository.getAverageRatingByHospitalId(hospital.getId());
                        dto.setAverageRating(avgRating != null && avgRating > 0 ? avgRating
                                : (hospital.getRating() != null ? hospital.getRating() : 0.0));

                        Long reviewCount = reviewRepository.countByHospitalId(hospital.getId());
                        dto.setReviewCount(reviewCount != null ? reviewCount : 0);

                        return dto;
                    })
                    .filter(Objects::nonNull)
                    .sorted((h1, h2) -> {
                        int distanceComp = Double.compare(h1.getDistance(), h2.getDistance());
                        if (distanceComp != 0) return distanceComp;
                        int priceComp = Double.compare(h1.getPrice(), h2.getPrice());
                        if (priceComp != 0) return priceComp;
                        return Double.compare(h2.getAverageRating(), h1.getAverageRating());
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error in convertToSearchDTOs: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<HospitalSearchDTO> compareHospitals(Long serviceId, List<Long> hospitalIds) {
        List<HospitalService> hospitalServices = hospitalServiceRepository.findByServiceIdAndHospitalIds(serviceId,
                hospitalIds);

        return hospitalServices.stream().map(hs -> {
            Hospital hospital = hs.getHospital();
            HospitalSearchDTO dto = new HospitalSearchDTO();
            if (hospital == null)
                return dto;
            dto.setId(hospital.getId());
            dto.setName(hospital.getName());
            dto.setAddress(hospital.getAddress());
            dto.setCity(hospital.getCity());
            dto.setLatitude(hospital.getLatitude());
            dto.setLongitude(hospital.getLongitude());
            dto.setPhone(hospital.getPhone());
            dto.setPrice(hs.getPrice());
            dto.setAvailability(hs.getAvailability());
            dto.setWaitingTime(hs.getWaitingTime());

            Double avgRating = reviewRepository.getAverageRatingByHospitalId(hospital.getId());
            if (avgRating != null && avgRating > 0) {
                dto.setAverageRating(avgRating);
            } else {
                dto.setAverageRating(hospital.getRating() != null ? hospital.getRating() : 0.0);
            }

            Long reviewCount = reviewRepository.countByHospitalId(hospital.getId());
            dto.setReviewCount(reviewCount != null ? reviewCount : 0);

            return dto;
        }).collect(Collectors.toList());
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
        return R * c;
    }

    private static class HospitalWithDistance {
        Hospital hospital;
        Double distance;

        HospitalWithDistance(Hospital hospital, Double distance) {
            this.hospital = hospital;
            this.distance = distance;
        }
    }
}
