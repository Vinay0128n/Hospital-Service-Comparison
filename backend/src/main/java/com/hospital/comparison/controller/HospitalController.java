package com.hospital.comparison.controller;

import com.hospital.comparison.dto.HospitalSearchDTO;
import com.hospital.comparison.service.HospitalSearchService;
import com.hospital.comparison.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalSearchService hospitalSearchService;

    @Autowired
    private GeocodingService geocodingService;

    @GetMapping("/reverse-geocode")
    public ResponseEntity<Map<String, String>> reverseGeocode(
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude) {
        try {
            return ResponseEntity.ok(geocodingService.reverseGeocode(latitude, longitude));
        } catch (Exception e) {
            System.err.println("Reverse geocoding error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<HospitalSearchDTO>> searchHospitals(
            @RequestParam("serviceId") Long serviceId,
            @RequestParam(name = "latitude", required = false) Double latitude,
            @RequestParam(name = "longitude", required = false) Double longitude,
            @RequestParam("city") String city,
            @RequestParam(name = "area", required = false) String area,
            @RequestParam(name = "radius", required = false, defaultValue = "10") Double radius) {
        try {
            System.out.println("=== SEARCH REQUEST DEBUG ===");
            System.out.println("serviceId: " + serviceId);
            System.out.println("city: " + city);
            System.out.println("area: " + area);
            System.out.println("latitude: " + latitude);
            System.out.println("longitude: " + longitude);
            System.out.println("radius: " + radius + " (TYPE: " + (radius != null ? radius.getClass().getSimpleName() : "NULL") + ")");
            System.out.println("radiusKm parameter value: " + radius);
            System.out.println("==========================");
            
            List<HospitalSearchDTO> results = hospitalSearchService.searchHospitals(
                    serviceId, latitude, longitude, city, area, radius);
            
            System.out.println("Search completed. Found " + results.size() + " hospitals");
            if (!results.isEmpty()) {
                System.out.println("First 3 results with distances:");
                results.stream().limit(3).forEach(h -> 
                    System.out.println("  - " + h.getName() + ": " + h.getDistance() + "km"));
            }
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            System.err.println("Hospital search error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/compare")
    public ResponseEntity<List<HospitalSearchDTO>> compareHospitals(
            @RequestParam("serviceId") Long serviceId,
            @RequestParam("hospitalIds") List<Long> hospitalIds) {
        try {
            List<HospitalSearchDTO> results = hospitalSearchService.compareHospitals(serviceId, hospitalIds);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            System.err.println("Hospital comparison error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
