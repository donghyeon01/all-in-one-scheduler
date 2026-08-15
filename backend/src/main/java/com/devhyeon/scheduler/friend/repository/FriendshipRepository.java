package com.devhyeon.scheduler.friend.repository;

import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.entity.FriendshipStatus;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    // N+1 방지: user와 friend 모두 페치 조인
    @Query("SELECT f FROM Friendship f JOIN FETCH f.user JOIN FETCH f.friend WHERE f.user = :user AND f.status = :status")
    List<Friendship> findByUserAndStatus(@Param("user") User user, @Param("status") FriendshipStatus status);

    @Query("SELECT f FROM Friendship f JOIN FETCH f.user JOIN FETCH f.friend WHERE f.friend = :friend AND f.status = :status")
    List<Friendship> findByFriendAndStatus(@Param("friend") User friend, @Param("status") FriendshipStatus status);

    boolean existsByUserAndFriend(User user, User friend);

    Optional<Friendship> findByUserAndFriend(User user, User friend);

    Optional<Friendship> findByIdAndFriend(Long id, User friend);
}
