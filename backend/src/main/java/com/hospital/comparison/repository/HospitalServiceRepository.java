package com.hospital.comparison.repository;

import com.hospital.comparison.entity.HospitalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalServiceRepository extends JpaRepository<HospitalService, Long> {

        @Query("SELECT hs FROM HospitalService hs WHERE hs.service.id = :serviceId")
        List<HospitalService> findByServiceId(@Param("serviceId") Long serviceId);

        @Query("SELECT hs FROM HospitalService hs WHERE hs.hospital.id = :hospitalId")
        List<HospitalService> findByHospitalId(@Param("hospitalId") Long hospitalId);

        @Query("SELECT hs FROM HospitalService hs WHERE hs.service.id = :serviceId AND hs.hospital.id IN :hospitalIds")
        List<HospitalService> findByServiceIdAndHospitalIds(
                        @Param("serviceId") Long serviceId,
                        @Param("hospitalIds") List<Long> hospitalIds);

        @Query("SELECT hs FROM HospitalService hs WHERE hs.service.id = :serviceId AND hs.availability = true")
        List<HospitalService> findAvailableByServiceId(@Param("serviceId") Long serviceId);

        @Query("SELECT hs FROM HospitalService hs WHERE hs.hospital.id = :hospitalId AND hs.service.id = :serviceId")
        HospitalService findByHospitalIdAndServiceId(
                        @Param("hospitalId") Long hospitalId,
                        @Param("serviceId") Long serviceId);
}
