package org.studyeasy.healthcare.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studyeasy.healthcare.dto.AuthRequest;
import org.studyeasy.healthcare.dto.AuthResponse;
import org.studyeasy.healthcare.security.AuthService;
import org.studyeasy.healthcare.security.JwtService;
import org.studyeasy.healthcare.security.UserAccount;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return authService.authenticate(request.getEmail(), request.getPassword())
                .map(this::buildResponse)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(401).build());
    }

    private AuthResponse buildResponse(UserAccount user) {
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getName(), user.getRole());
    }
}
