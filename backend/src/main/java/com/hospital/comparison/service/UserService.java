package com.hospital.comparison.service;

import com.hospital.comparison.dto.LoginRequestDTO;
import com.hospital.comparison.dto.RegisterRequestDTO;
import com.hospital.comparison.dto.UserResponseDTO;
import com.hospital.comparison.entity.User;
import com.hospital.comparison.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDTO registerUser(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        // For production, always use password hashing (e.g., BCrypt)
        // Sticking to plain text to match existing user table data provided by the user
        user.setPassword(request.getPassword());

        User savedUser = userRepository.save(user);
        return UserResponseDTO.fromEntity(savedUser);
    }

    public UserResponseDTO loginUser(LoginRequestDTO request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            return UserResponseDTO.fromEntity(userOpt.get());
        }

        throw new IllegalArgumentException("Invalid email or password");
    }
}
