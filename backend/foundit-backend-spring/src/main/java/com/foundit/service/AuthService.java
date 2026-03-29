package com.foundit.service;

import com.foundit.dto.AuthResponse;
import com.foundit.dto.LoginRequest;
import com.foundit.dto.RegisterRequest;
import com.foundit.model.User;
import com.foundit.repository.UserRepository;
import com.foundit.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public AuthResponse register(RegisterRequest request) {
        // Validate unique username and email
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (request.getStudentId() != null && userRepository.existsByStudentId(request.getStudentId())) {
            throw new RuntimeException("Student ID already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setStudentId(request.getStudentId());
        user.setPhoneNumber(request.getPhoneNumber());
        
        // Set role
        if (request.getRole() != null) {
            try {
                user.setRole(User.UserRole.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                user.setRole(User.UserRole.STUDENT); // Default
            }
        } else {
            user.setRole(User.UserRole.STUDENT);
        }

        user.setEnabled(true);
        userRepository.save(user);

        // Auto login after registration
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), 
                               user.getFullName(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), 
                               user.getFullName(), user.getRole().name());
    }

    public User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
