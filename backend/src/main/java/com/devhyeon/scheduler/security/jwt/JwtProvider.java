package com.devhyeon.scheduler.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {
    private final SecretKey secretKey;
    public JwtProvider(@Value("${jwt.secret}") String secret){
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }
    public String generateToken(String email){
        long now = System.currentTimeMillis();

        return Jwts.builder().subject(email)
                .issuedAt(new Date(now))
                .expiration(new Date(now + 1000L*60*30))
                .signWith(secretKey)
                .compact();
    }
}
