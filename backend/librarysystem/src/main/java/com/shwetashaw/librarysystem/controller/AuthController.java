package com.shwetashaw.librarysystem.controller;

import com.shwetashaw.librarysystem.model.AppUser;
import com.shwetashaw.librarysystem.service.JwtService;
import com.shwetashaw.librarysystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Collections;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AppUser user) {
        String result = userService.registerUser(user);

        if (result.equals("Email is already registered. Please login.")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                            .body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AppUser user) {
        try {
            // Authenticate user based on email and password
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
        } catch (AuthenticationException e) {
            e.printStackTrace(); // Log the full stack trace
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Generate token with the email
        String token = jwtService.generateToken(user.getEmail());

        // Return the token in the response body
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}
