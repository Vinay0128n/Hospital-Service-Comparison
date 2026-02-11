package com.hospital.comparison.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";
    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

    public Map<String, String> reverseGeocode(double lat, double lon) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(REVERSE_URL)
                    .queryParam("lat", lat)
                    .queryParam("lon", lon)
                    .queryParam("format", "json")
                    .queryParam("addressdetails", 1)
                    .toUriString();

            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("User-Agent", "HospitalComparisonApp/1.0");
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);

            org.springframework.http.ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {
                    });

            Map<String, Object> body = response.getBody();
            if (body != null && body.containsKey("address")) {
                Map<String, Object> address = (Map<String, Object>) body.get("address");

                Object cityObj = address.getOrDefault("city",
                        address.getOrDefault("town",
                                address.getOrDefault("village", "")));
                String city = cityObj != null ? cityObj.toString() : "";

                Object areaObj = address.getOrDefault("suburb",
                        address.getOrDefault("neighbourhood",
                                address.getOrDefault("residential", "")));
                String area = areaObj != null ? areaObj.toString() : "";

                return Map.of("city", city, "area", area);
            }
        } catch (Exception e) {
            System.err.println("Reverse geocoding failed for: " + lat + ", " + lon + ". Error: " + e.getMessage());
        }
        return Map.of("city", "", "area", "");
    }

    public double[] getCoordinates(String locationName) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                    .queryParam("q", locationName)
                    .queryParam("format", "json")
                    .queryParam("limit", 1)
                    .queryParam("addressdetails", 1)
                    .toUriString();

            // Nominatim requires a User-Agent header
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("User-Agent", "HospitalComparisonApp/1.0");
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);

            org.springframework.http.ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    url,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {
                    });

            List<Map<String, Object>> body = response.getBody();
            if (body != null && !body.isEmpty()) {
                Map<String, Object> firstResult = body.get(0);
                if (firstResult != null && firstResult.containsKey("lat") && firstResult.containsKey("lon")) {
                    double lat = Double.parseDouble(firstResult.get("lat").toString());
                    double lon = Double.parseDouble(firstResult.get("lon").toString());
                    return new double[] { lat, lon };
                }
            }
        } catch (Exception e) {
            System.err.println("Geocoding failed for: " + locationName + ". Error: " + e.getMessage());
        }
        return null; // Return null if geocoding fails
    }

    /**
     * NEW: Get coordinates for a specific area within a city
     * This is used to get the center point for radius-based search
     */
    public Double[] getCoordinatesForArea(String city, String area) {
        try {
            // Try multiple search strategies
            String[] searchQueries = {
                area + ", " + city,                    // "New Sangvi, Pimpri-Chinchwad"
                area + ", Maharashtra, India",         // "New Sangvi, Maharashtra, India"
                area,                                   // Just "New Sangvi"
                city + ", " + area                     // "Pimpri-Chinchwad, New Sangvi"
            };
            
            for (String searchQuery : searchQueries) {
                System.out.println("Trying geocoding query: '" + searchQuery + "'");
                
                String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                        .queryParam("q", searchQuery)
                        .queryParam("format", "json")
                        .queryParam("limit", 1)
                        .queryParam("addressdetails", 1)
                        .toUriString();

                org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
                headers.set("User-Agent", "HospitalComparisonApp/1.0");
                org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);

                org.springframework.http.ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                        url,
                        org.springframework.http.HttpMethod.GET,
                        entity,
                        new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {
                        });

                List<Map<String, Object>> body = response.getBody();
                if (body != null && !body.isEmpty()) {
                    Map<String, Object> firstResult = body.get(0);
                    if (firstResult != null && firstResult.containsKey("lat") && firstResult.containsKey("lon")) {
                        double lat = Double.parseDouble(firstResult.get("lat").toString());
                        double lon = Double.parseDouble(firstResult.get("lon").toString());
                        
                        System.out.println("✅ Geocoded area '" + area + ", " + city + "' to: " + lat + ", " + lon + " using query: " + searchQuery);
                        return new Double[] { lat, lon };
                    }
                }
            }
            
            System.err.println("❌ All geocoding queries failed for area: " + area + ", " + city);
            
        } catch (Exception e) {
            System.err.println("❌ Area geocoding failed for: " + area + ", " + city + ". Error: " + e.getMessage());
            e.printStackTrace();
        }
        return null; // Return null if geocoding fails
    }
}
