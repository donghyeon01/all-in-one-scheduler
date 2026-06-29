package com.devhyeon.scheduler.auth.controller;

import com.devhyeon.scheduler.auth.dto.LoginRequest;
import com.devhyeon.scheduler.auth.dto.LoginResponse;
import com.devhyeon.scheduler.auth.dto.SignupRequest;
import com.devhyeon.scheduler.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

//    회원가입
    @PostMapping("/signup")
    public ResponseEntity<String>signup(@RequestBody SignupRequest request){
        authService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

//    로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        LoginResponse response= authService.login(request);
        return ResponseEntity.ok(response);
    }
}
