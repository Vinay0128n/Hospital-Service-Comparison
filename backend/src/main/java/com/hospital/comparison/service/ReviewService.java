package com.hospital.comparison.service;

import com.hospital.comparison.dto.ReviewDTO;
import com.hospital.comparison.entity.Review;
import com.hospital.comparison.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Get all reviews for a hospital
     */
    public List<ReviewDTO> getReviewsByHospital(Long hospitalId) {
        List<Review> reviews = reviewRepository.findByHospitalId(hospitalId);

        return reviews.stream().map(review -> {
            ReviewDTO dto = new ReviewDTO();
            dto.setId(review.getId());
            dto.setHospitalId(review.getHospital().getId());
            dto.setHospitalName(review.getHospital().getName());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * Get average rating and count for a hospital
     */
    public Map<String, Object> getHospitalRatingStats(Long hospitalId) {
        Double avgRating = reviewRepository.getAverageRatingByHospitalId(hospitalId);
        Long count = reviewRepository.countByHospitalId(hospitalId);

        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", avgRating != null ? avgRating : 0.0);
        stats.put("totalReviews", count != null ? count : 0L);

        return stats;
    }
}
