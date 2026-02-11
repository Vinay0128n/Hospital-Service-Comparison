package com.hospital.comparison.repository;

import com.hospital.comparison.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.hospital.id = :hospitalId ORDER BY r.createdAt DESC")
    List<Review> findByHospitalId(@Param("hospitalId") Long hospitalId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.hospital.id = :hospitalId")
    Double getAverageRatingByHospitalId(@Param("hospitalId") Long hospitalId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.hospital.id = :hospitalId")
    Long countByHospitalId(@Param("hospitalId") Long hospitalId);
}
