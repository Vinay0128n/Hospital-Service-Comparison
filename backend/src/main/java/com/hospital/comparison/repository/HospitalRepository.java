package com.hospital.comparison.repository;

import com.hospital.comparison.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    @Query("SELECT h FROM Hospital h WHERE LOWER(h.city) = LOWER(:city)")
    List<Hospital> findByCity(@Param("city") String city);

    @Query(value = "SELECT * FROM hospital h WHERE " +
                    "h.latitude IS NOT NULL AND h.longitude IS NOT NULL AND " +
                    "(6371 * acos(least(1, greatest(-1, cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))))) <= :radiusKm", nativeQuery = true)
    List<Hospital> findHospitalsWithinRadius(
                    @Param("latitude") Double latitude,
                    @Param("longitude") Double longitude,
                    @Param("radiusKm") Double radiusKm);

    @Query(value = "SELECT h.*, " +
                    "(6371 * acos(least(1, greatest(-1, cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))))) as distance " +
                    "FROM hospital h " +
                    "WHERE h.latitude IS NOT NULL AND h.longitude IS NOT NULL " +
                    "AND LOWER(h.city) = LOWER(:city) " +
                    "AND (6371 * acos(least(1, greatest(-1, cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))))) <= :radiusKm " +
                    "ORDER BY distance ASC", nativeQuery = true)
    List<Object[]> findHospitalsWithinRadiusFromCity(
                    @Param("city") String city,
                    @Param("latitude") Double latitude,
                    @Param("longitude") Double longitude,
                    @Param("radiusKm") Double radiusKm);

    @Query(value = "SELECT h.*, " +
                    "(6371 * acos(least(1, greatest(-1, cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))))) as distance " +
                    "FROM hospital h " +
                    "WHERE h.latitude IS NOT NULL AND h.longitude IS NOT NULL " +
                    "AND (6371 * acos(least(1, greatest(-1, cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))))) <= :radiusKm " +
                    "ORDER BY distance ASC", nativeQuery = true)
    List<Object[]> findHospitalsWithinRadiusFromCoordinates(
                    @Param("latitude") Double latitude,
                    @Param("longitude") Double longitude,
                    @Param("radiusKm") Double radiusKm);

    @Query("SELECT h.id, h.name, h.latitude, h.longitude FROM Hospital h WHERE h.city = :city AND h.latitude IS NOT NULL AND h.longitude IS NOT NULL")
    List<Object[]> getHospitalCoordinates(@Param("city") String city);

    @Query(value = "SELECT h.*, " +
                    "(6371 * acos(cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))) as distance " +
                    "FROM hospital h " +
                    "WHERE h.latitude IS NOT NULL AND h.longitude IS NOT NULL " +
                    "AND LOWER(h.city) = LOWER(:city) " +
                    "AND (6371 * acos(cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                    "cos(radians(h.longitude) - radians(:longitude)) + " +
                    "sin(radians(:latitude)) * sin(radians(h.latitude)))) <= :radiusKm " +
                    "ORDER BY distance ASC", nativeQuery = true)
    List<Object[]> findHospitalsWithinRadiusFromCitySimple(
                    @Param("city") String city,
                    @Param("latitude") Double latitude,
                    @Param("longitude") Double longitude,
                    @Param("radiusKm") Double radiusKm);
}
