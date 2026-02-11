package com.hospital.comparison.controller;

import com.hospital.comparison.entity.Service;
import com.hospital.comparison.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    /**
     * Get all services
     * GET /api/services
     */
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        try {
            List<Service> services = serviceRepository.findAll();
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get service by ID
     * GET /api/services/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        try {
            return serviceRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Search services by name
     * GET /api/services/search?keyword=cardiology
     */
    @GetMapping("/search")
    public ResponseEntity<List<Service>> searchServices(@RequestParam String keyword) {
        try {
            List<Service> services = serviceRepository.searchByName(keyword);
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
