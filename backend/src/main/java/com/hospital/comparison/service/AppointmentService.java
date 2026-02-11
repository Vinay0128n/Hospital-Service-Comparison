package com.hospital.comparison.service;

import com.hospital.comparison.dto.AppointmentRequestDTO;
import com.hospital.comparison.dto.AppointmentResponseDTO;
import com.hospital.comparison.entity.Appointment;
import com.hospital.comparison.entity.HospitalService;
import com.hospital.comparison.repository.AppointmentRepository;
import com.hospital.comparison.repository.HospitalServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private HospitalServiceRepository hospitalServiceRepository;

    /**
     * Book an appointment with validation
     */
    @Transactional
    public AppointmentResponseDTO bookAppointment(AppointmentRequestDTO request) {
        // Validate that the hospital offers the service
        HospitalService hs = hospitalServiceRepository.findByHospitalIdAndServiceId(
                request.getHospitalId(),
                request.getServiceId());

        if (hs == null) {
            throw new IllegalArgumentException("The selected hospital does not offer this service");
        }

        // Check if service is available
        if (!hs.getAvailability()) {
            throw new IllegalArgumentException("This service is currently not available at the selected hospital");
        }

        // Create appointment
        Appointment appointment = new Appointment();
        appointment.setHospitalId(request.getHospitalId());
        appointment.setUserId(request.getUserId());
        appointment.setServiceId(request.getServiceId());

        // Fetch and set names for better UI display
        appointment.setHospitalName(hs.getHospital().getName());
        appointment.setServiceName(hs.getService().getName());

        appointment.setPatientName(request.getPatientName());
        appointment.setPatientPhone(request.getPatientPhone());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setStatus("BOOKED");

        Appointment saved = appointmentRepository.save(appointment);
        return mapToDTO(saved);
    }

    /**
     * Get appointment by ID
     */
    public AppointmentResponseDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found with id: " + id));
        return mapToDTO(appointment);
    }

    /**
     * Get all appointments for a hospital
     */
    public List<AppointmentResponseDTO> getAppointmentsByHospital(Long hospitalId) {
        return appointmentRepository.findByHospitalId(hospitalId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get appointments by patient phone number
     */
    public List<AppointmentResponseDTO> getAppointmentsByPhone(String phone) {
        return appointmentRepository.findByPatientPhone(phone).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get appointments by user ID
     */
    public List<AppointmentResponseDTO> getAppointmentsByUserId(Long userId) {
        return appointmentRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AppointmentResponseDTO mapToDTO(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setId(appointment.getId());
        dto.setHospitalId(appointment.getHospitalId());
        dto.setUserId(appointment.getUserId());
        dto.setServiceId(appointment.getServiceId());
        dto.setHospitalName(appointment.getHospitalName());
        dto.setServiceName(appointment.getServiceName());
        dto.setPatientName(appointment.getPatientName());
        dto.setPatientPhone(appointment.getPatientPhone());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setStatus(appointment.getStatus());
        return dto;
    }
}
