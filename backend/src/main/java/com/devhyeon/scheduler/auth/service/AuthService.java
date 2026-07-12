package com.devhyeon.scheduler.auth.service;

import com.devhyeon.scheduler.auth.dto.LoginRequest;
import com.devhyeon.scheduler.auth.dto.SignupRequest;
import com.devhyeon.scheduler.auth.dto.TokenDto;
import com.devhyeon.scheduler.auth.entity.RefreshToken;
import com.devhyeon.scheduler.auth.repository.RefreshTokenRepository;
import com.devhyeon.scheduler.security.jwt.JwtProvider;
import com.devhyeon.scheduler.user.entity.User;
import com.devhyeon.scheduler.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Value("${app.security.session.max-active-sessions}")
    private int maxActiveSessions;

    @Transactional
    public void signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();

        userRepository.save(user);
    }

    @Transactional
    public TokenDto login(LoginRequest request, String userAgent, String ipAddress) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        String accessToken = jwtProvider.generateAccessToken(user.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(user.getEmail());

        // compute token id and hash
        String tokenId = jwtProvider.getId(refreshToken);
        String tokenHash = sha256Hex(refreshToken);

        // Same user & same User-Agent: rotate the token and update metadata
        Optional<RefreshToken> existingTokenOpt = refreshTokenRepository.findByUserAndUserAgent(user, userAgent);
        if (existingTokenOpt.isPresent()) {
            RefreshToken existingToken = existingTokenOpt.get();
            existingToken.updateSession(tokenId, tokenHash, LocalDateTime.now().plusDays(7), ipAddress);
            refreshTokenRepository.save(existingToken);
        } else {
            // New device: save a new RefreshToken record (store only hash, not raw token)
            refreshTokenRepository.save(RefreshToken.builder()
                    .tokenId(tokenId)
                    .tokenHash(tokenHash)
                    .expiryDate(LocalDateTime.now().plusDays(7))
                    .userAgent(userAgent)
                    .ipAddress(ipAddress)
                    .lastAccessedAt(LocalDateTime.now())
                    .user(user)
                    .build());
        }

        // Limit maximum active sessions per user
        List<RefreshToken> activeSessions = refreshTokenRepository.findAllByUserOrderByLastAccessedAtAsc(user);
        if (activeSessions.size() > maxActiveSessions) {
            int excessCount = activeSessions.size() - maxActiveSessions;
            for (int i = 0; i < excessCount; i++) {
                refreshTokenRepository.delete(activeSessions.get(i));
            }
        }

        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    public TokenDto refreshToken(String refreshToken, String userAgent, String ipAddress) {
        if (refreshToken == null || !jwtProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("유효하지 않은 리프레시 토큰입니다.");
        }

        String incomingHash = sha256Hex(refreshToken);

        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(incomingHash)
                .orElseThrow(() -> new IllegalArgumentException("저장된 리프레시 토큰을 찾을 수 없습니다."));

        if (storedToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(storedToken);
            throw new IllegalArgumentException("리프레시 토큰 만료. 다시 로그인해주세요.");
        }

        // Bind token to user-agent: reject if mismatch
        if (storedToken.getUserAgent() != null && userAgent != null && !storedToken.getUserAgent().equals(userAgent)) {
            throw new IllegalArgumentException("토큰의 User-Agent가 일치하지 않습니다.");
        }

        String email = jwtProvider.getEmail(refreshToken);
        String newAccessToken = jwtProvider.generateAccessToken(email);
        String newRefreshToken = jwtProvider.generateRefreshToken(email);

        // Rotate token and refresh access time and IP (store only hash)
        String newTokenId = jwtProvider.getId(newRefreshToken);
        String newTokenHash = sha256Hex(newRefreshToken);

        storedToken.updateSession(newTokenId, newTokenHash, LocalDateTime.now().plusDays(7), ipAddress);
        refreshTokenRepository.save(storedToken);

        return TokenDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    @Transactional
    public void logout(String refreshToken, String userAgent) {
        if (refreshToken != null) {
            String hash = sha256Hex(refreshToken);
            refreshTokenRepository.deleteByTokenHash(hash);
        }
    }

    private static String sha256Hex(String input) {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(input.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to hash token", e);
        }
    }
}
