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
import java.util.Date;

@Component
@Slf4j
public class JwtProvider {
    private final SecretKey secretKey;
    public JwtProvider(@Value("${jwt.secret}") String secret){
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }
    public String generateToken(String email){
        return generateAccessToken(email);
    }
    public String generateAccessToken(String email){
        long now = System.currentTimeMillis();

        return Jwts.builder().subject(email)
                .id(java.util.UUID.randomUUID().toString())
                .issuedAt(new Date(now))
                .expiration(new Date(now + 1000L*60*15)) // 15분
                .signWith(secretKey)
                .compact();
    }
    public String generateRefreshToken(String email){
        long now = System.currentTimeMillis();

        return Jwts.builder().subject(email)
                .id(java.util.UUID.randomUUID().toString())
                .issuedAt(new Date(now))
                .expiration(new Date(now + 1000L*60*60*24*7)) // 7일
                .signWith(secretKey)
                .compact();
    }
    public String getEmail(String token){
            return Jwts.parser()
                .verifyWith(secretKey)
            .build()
                .parseClaimsJws(token)
                .getBody()
            .getSubject();
    }

    public String getId(String token){
            return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getId();
    }

    public boolean validateToken(String token){
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
