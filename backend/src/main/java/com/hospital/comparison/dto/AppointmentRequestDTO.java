package com.hospital.comparison.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDTO {

    @NotNull(message = "Hospital ID is required")
    private Long hospitalId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotBlank(message = "Patient name is required")
    private String patientName;

    @NotBlank(message = "Patient phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String patientPhone;

    @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    private LocalDateTime appointmentDate;
}
