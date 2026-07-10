package com.devhyeon.scheduler.friend.repository;

import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByUser(User user);
    boolean existsByUserAndFriend(User user, User friend);
    Optional<Friendship> findByUserAndFriend(User user, User friend);
}
