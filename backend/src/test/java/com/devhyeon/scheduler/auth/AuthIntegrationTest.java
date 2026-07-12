package com.devhyeon.scheduler.auth;

import com.devhyeon.scheduler.auth.dto.LoginRequest;
import com.devhyeon.scheduler.auth.dto.SignupRequest;
import com.devhyeon.scheduler.auth.dto.TokenDto;
import com.devhyeon.scheduler.auth.entity.RefreshToken;
import com.devhyeon.scheduler.auth.repository.RefreshTokenRepository;
import com.devhyeon.scheduler.auth.service.AuthService;
import com.devhyeon.scheduler.user.entity.User;
import com.devhyeon.scheduler.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class AuthIntegrationTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private final String testEmail = "test@example.com";
    private final String testPassword = "password123";
    private final String testName = "테스터";

    @BeforeEach
    void setUp() {
        refreshTokenRepository.deleteAll();
        userRepository.deleteAll();

        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail(testEmail);
        signupRequest.setPassword(testPassword);
        signupRequest.setName(testName);
        authService.signup(signupRequest);
    }

    @Test
    void multiDeviceLogin_createsMultipleSessions() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(testEmail);
        loginRequest.setPassword(testPassword);

        // device 1
        authService.login(loginRequest, "Mozilla/5.0 (Windows NT 10.0)", "192.168.0.1");
        // device 2
        authService.login(loginRequest, "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)", "192.168.0.2");

        User user = userRepository.findByEmail(testEmail).orElseThrow();
        List<RefreshToken> tokens = refreshTokenRepository.findAllByUserOrderByLastAccessedAtAsc(user);

        assertThat(tokens).hasSize(2);
        assertThat(tokens.get(0).getUserAgent()).isEqualTo("Mozilla/5.0 (Windows NT 10.0)");
        assertThat(tokens.get(1).getUserAgent()).isEqualTo("Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)");
    }

    @Test
    void sameDeviceLogin_rotatesTokenInsteadOfCreatingNewSession() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(testEmail);
        loginRequest.setPassword(testPassword);

        String userAgent = "Mozilla/5.0 (Windows NT 10.0)";

        TokenDto token1 = authService.login(loginRequest, userAgent, "192.168.0.1");
        TokenDto token2 = authService.login(loginRequest, userAgent, "192.168.0.1");

        User user = userRepository.findByEmail(testEmail).orElseThrow();
        List<RefreshToken> tokens = refreshTokenRepository.findAllByUserOrderByLastAccessedAtAsc(user);

        assertThat(tokens).hasSize(1);
        assertThat(tokens.get(0).getTokenHash()).isEqualTo(sha256Hex(token2.getRefreshToken()));
        assertThat(tokens.get(0).getTokenHash()).isNotEqualTo(sha256Hex(token1.getRefreshToken()));
    }

    @Test
    void sessionLimitExceeded_evictsOldestSession() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(testEmail);
        loginRequest.setPassword(testPassword);

        // 6 logins from different devices
        for (int i = 1; i <= 6; i++) {
            authService.login(loginRequest, "Device-" + i, "192.168.0." + i);
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        User user = userRepository.findByEmail(testEmail).orElseThrow();
        List<RefreshToken> tokens = refreshTokenRepository.findAllByUserOrderByLastAccessedAtAsc(user);

        // Max active sessions is 5 (configured in application.properties)
        assertThat(tokens).hasSize(5);

        // The oldest session "Device-1" should be evicted
        List<String> deviceAgents = tokens.stream().map(RefreshToken::getUserAgent).toList();
        assertThat(deviceAgents).doesNotContain("Device-1");
        assertThat(deviceAgents).containsExactly("Device-2", "Device-3", "Device-4", "Device-5", "Device-6");
    }

    private String sha256Hex(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder builder = new StringBuilder();
            for (byte b : bytes) {
                builder.append(String.format("%02x", b));
            }
            return builder.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
