package com.devhyeon.scheduler.auth.controller;

import com.devhyeon.scheduler.auth.dto.LoginRequest;
import com.devhyeon.scheduler.auth.dto.LoginResponse;
import com.devhyeon.scheduler.auth.dto.SignupRequest;
import com.devhyeon.scheduler.auth.dto.TokenDto;
import com.devhyeon.scheduler.auth.service.AuthService;
import com.devhyeon.scheduler.security.jwt.JwtProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @Value("${app.security.cookie.secure}")
    private boolean cookieSecure;

    @Value("${app.security.cookie.same-site}")
    private String cookieSameSite;

    @Value("${app.security.cookie.domain}")
    private String cookieDomain;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request,
            HttpServletRequest servletRequest, HttpServletResponse response) {
        String userAgent = servletRequest.getHeader("User-Agent");
        String ipAddress = getClientIp(servletRequest);

        TokenDto tokenDto = authService.login(request, userAgent, ipAddress);
        addRefreshTokenCookie(response, tokenDto.getRefreshToken());
        return ResponseEntity.ok(new LoginResponse(tokenDto.getAccessToken()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request);
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("쿠키가 존재하지 않습니다.");
        }

        try {
            String ipAddress = getClientIp(request);
            String userAgent = request.getHeader("User-Agent");
            TokenDto tokenDto = authService.refreshToken(refreshToken, userAgent, ipAddress);
            addRefreshTokenCookie(response, tokenDto.getRefreshToken());
            return ResponseEntity.ok(new LoginResponse(tokenDto.getAccessToken()));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request);
        String userAgent = request.getHeader("User-Agent");
        authService.logout(refreshToken, userAgent);

        ResponseCookie.ResponseCookieBuilder cookieBuilder = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite(cookieSameSite)
                .path("/")
                .maxAge(0);

        if (cookieDomain != null && !cookieDomain.trim().isEmpty()) {
            cookieBuilder.domain(cookieDomain);
        }

        response.addHeader(HttpHeaders.SET_COOKIE, cookieBuilder.build().toString());

        return ResponseEntity.ok("로그아웃 성공");
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie.ResponseCookieBuilder cookieBuilder = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite(cookieSameSite)
                .path("/")
                .maxAge(7 * 24 * 60 * 60);

        if (cookieDomain != null && !cookieDomain.trim().isEmpty()) {
            cookieBuilder.domain(cookieDomain);
        }

        response.addHeader(HttpHeaders.SET_COOKIE, cookieBuilder.build().toString());
    }

    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        return Arrays.stream(cookies)
                .filter(c -> "refreshToken".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
}
