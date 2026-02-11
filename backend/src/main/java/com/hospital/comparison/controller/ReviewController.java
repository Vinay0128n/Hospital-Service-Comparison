package com.hospital.comparison.controller;

import com.hospital.comparison.dto.ReviewDTO;
import com.hospital.comparison.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    /**
     * Get all reviews for a hospital
     * GET /api/reviews/hospital/{hospitalId}
     */
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByHospital(@PathVariable("hospitalId") Long hospitalId) {
        try {
            List<ReviewDTO> reviews = reviewService.getReviewsByHospital(hospitalId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error to console
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Get average rating and review count for a hospital
     * GET /api/reviews/hospital/{hospitalId}/stats
     */
    @GetMapping("/hospital/{hospitalId}/stats")
    public ResponseEntity<Map<String, Object>> getHospitalRatingStats(@PathVariable("hospitalId") Long hospitalId) {
        try {
            Map<String, Object> stats = reviewService.getHospitalRatingStats(hospitalId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error to console
            return ResponseEntity.badRequest().build();
        }
    }
}
