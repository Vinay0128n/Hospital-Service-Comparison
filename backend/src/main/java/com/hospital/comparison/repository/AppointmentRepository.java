package com.hospital.comparison.repository;

import com.hospital.comparison.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

        @Query("SELECT a FROM Appointment a WHERE a.hospitalId = :hospitalId")
        List<Appointment> findByHospitalId(@Param("hospitalId") Long hospitalId);

        @Query("SELECT a FROM Appointment a WHERE a.status = :status")
        List<Appointment> findByStatus(@Param("status") String status);

        @Query("SELECT COUNT(a) FROM Appointment a WHERE a.hospitalId = :hospitalId " +
                        "AND a.serviceId = :serviceId AND a.appointmentDate = :date")
        Long countByHospitalServiceAndDate(
                        @Param("hospitalId") Long hospitalId,
                        @Param("serviceId") Long serviceId,
                        @Param("date") LocalDateTime date);

        List<Appointment> findByPatientPhone(String patientPhone);

        List<Appointment> findByUserId(Long userId);
}
