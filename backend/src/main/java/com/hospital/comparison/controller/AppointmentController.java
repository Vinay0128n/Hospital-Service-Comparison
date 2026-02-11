package com.hospital.comparison.controller;

import com.hospital.comparison.dto.AppointmentRequestDTO;
import com.hospital.comparison.dto.AppointmentResponseDTO;
import com.hospital.comparison.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    /**
     * Book an appointment
     * POST /api/appointments
     */
    @PostMapping
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody AppointmentRequestDTO request) {
        try {
            AppointmentResponseDTO appointment = appointmentService.bookAppointment(request);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Appointment booked successfully");
            response.put("appointmentId", appointment.getId());
            response.put("appointment", appointment);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Get appointment by ID
     * GET /api/appointments/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable("id") Long id) {
        try {
            AppointmentResponseDTO appointment = appointmentService.getAppointmentById(id);
            return ResponseEntity.ok(appointment);
        } catch (IllegalArgumentException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    /**
     * Get appointments by hospital
     * GET /api/appointments/hospital/{hospitalId}
     */
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getAppointmentsByHospital(
            @PathVariable("hospitalId") Long hospitalId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByHospital(hospitalId));
    }

    /**
     * Get appointments by patient phone
     * GET /api/appointments/patient/{phone}
     */
    @GetMapping("/patient/{phone}")
    public ResponseEntity<List<AppointmentResponseDTO>> getAppointmentsByPhone(@PathVariable("phone") String phone) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPhone(phone));
    }

    /**
     * Get appointments by user ID
     * GET /api/appointments/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AppointmentResponseDTO>> getAppointmentsByUserId(@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok(appointmentService.getAppointmentsByUserId(userId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
