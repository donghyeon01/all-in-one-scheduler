package com.devhyeon.scheduler.friend.repository;

import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.entity.FriendshipStatus;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    // 특정 상태의 목록 조회
    List<Friendship> findByUserAndStatus(User user, FriendshipStatus status);
    List<Friendship> findByFriendAndStatus(User friend, FriendshipStatus status);

    // 이미 요청이 존재하거나 친구인지 확인
    boolean existsByUserAndFriend(User user, User friend);

    // 조회를 위한 메서드
    Optional<Friendship> findByUserAndFriend(User user, User friend);
    Optional<Friendship> findByIdAndFriend(Long id, User friend);
}