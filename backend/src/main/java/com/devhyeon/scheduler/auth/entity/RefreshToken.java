package com.devhyeon.scheduler.auth.entity;

import com.devhyeon.scheduler.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "refresh_tokens")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tokenId; // JWT jti

    @Column(nullable = false, unique = true)
    private String tokenHash; // sha-256 of refresh token

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Column(length = 512)
    private String userAgent;

    @Column(length = 128)
    private String ipAddress;

    @Column(nullable = false)
    private LocalDateTime lastAccessedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void updateSession(String tokenId, String tokenHash, LocalDateTime expiryDate, String ipAddress) {
        this.tokenId = tokenId;
        this.tokenHash = tokenHash;
        this.expiryDate = expiryDate;
        this.ipAddress = ipAddress;
        this.lastAccessedAt = LocalDateTime.now();
    }
}
