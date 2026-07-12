package com.devhyeon.scheduler.auth.repository;

import com.devhyeon.scheduler.auth.entity.RefreshToken;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);

    Optional<RefreshToken> findByUserAndUserAgent(User user, String userAgent);

    List<RefreshToken> findAllByUserOrderByLastAccessedAtAsc(User user);

    void deleteByTokenHash(String tokenHash);

    void deleteByUser(User user);
}
