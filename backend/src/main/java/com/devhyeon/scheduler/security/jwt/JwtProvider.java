package com.devhyeon.scheduler.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@Slf4j
public class JwtProvider {
    // HS256 서명에 필요한 최소 키 길이 (256비트 = 32바이트)
    private static final int MIN_SECRET_BYTES = 32;

    private final SecretKey secretKey;

    // jwt.secret은 application.properties에서 ${JWT_SECRET} 환경변수를 참조하며,
    // 소스 코드에는 실제 비밀값이 하드코딩되지 않는다. (.env / 배포 환경변수로 주입)
    public JwtProvider(@Value("${jwt.secret}") String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException(
                    "JWT secret이 설정되지 않았습니다. 환경변수 JWT_SECRET(.env)을 설정해주세요.");
        }

        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < MIN_SECRET_BYTES) {
            throw new IllegalStateException(
                    "JWT secret이 너무 짧습니다. HS256 알고리즘에는 최소 " + MIN_SECRET_BYTES
                            + "바이트(256비트) 이상의 값이 필요합니다.");
        }

        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {
        return generateAccessToken(email);
    }

    public String generateAccessToken(String email) {
        long now = System.currentTimeMillis();

        return Jwts.builder().subject(email)
                .id(java.util.UUID.randomUUID().toString())
                .issuedAt(new Date(now))
                .expiration(new Date(now + 1000L * 60 * 15)) // 15분
                .signWith(secretKey)
                .compact();
    }

    public String generateRefreshToken(String email) {
        long now = System.currentTimeMillis();

        return Jwts.builder().subject(email)
                .id(java.util.UUID.randomUUID().toString())
                .issuedAt(new Date(now))
                .expiration(new Date(now + 1000L * 60 * 60 * 24 * 7)) // 7일
                .signWith(secretKey)
                .compact();
    }

    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String getId(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getId();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
