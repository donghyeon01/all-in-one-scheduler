package com.devhyeon.scheduler.auth.repository;

import com.devhyeon.scheduler.auth.entity.RefreshToken;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);

    Optional<RefreshToken> findByUserAndUserAgent(User user, String userAgent);

    List<RefreshToken> findAllByUserOrderByLastAccessedAtAsc(User user);

    // 벌크 삭제: 조회-삭제 2단계 쿼리를 1단계 DELETE로 최적화
    @Modifying
    @Query("DELETE FROM RefreshToken r WHERE r.tokenHash = :tokenHash")
    void deleteByTokenHash(@Param("tokenHash") String tokenHash);

    @Modifying
    @Query("DELETE FROM RefreshToken r WHERE r.user = :user")
    void deleteByUser(@Param("user") User user);
}
