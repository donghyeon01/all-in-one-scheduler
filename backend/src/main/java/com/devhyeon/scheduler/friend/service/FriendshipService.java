package com.devhyeon.scheduler.friend.service;

import com.devhyeon.scheduler.friend.dto.FriendResponse;
import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.repository.FriendshipRepository;
import com.devhyeon.scheduler.user.entity.User;
import com.devhyeon.scheduler.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FriendResponse> getFriends(User user) {
        return friendshipRepository.findByUser(user)
                .stream()
                .map(FriendResponse::from)
                .toList();
    }

    public void addFriend(User user, String friendEmail) {
        if (user.getEmail().equals(friendEmail)) {
            throw new IllegalArgumentException("자기 자신은 친구로 추가할 수 없습니다.");
        }

        User friend = userRepository.findByEmail(friendEmail)
                .orElseThrow(() -> new NoSuchElementException("가입되지 않은 이메일입니다."));

        if (friendshipRepository.existsByUserAndFriend(user, friend)) {
            throw new IllegalArgumentException("이미 등록된 친구입니다.");
        }

        Friendship friendship = Friendship.builder()
                .user(user)
                .friend(friend)
                .build();

        friendshipRepository.save(friendship);
    }

    public void deleteFriend(User user, Long friendUserId) {
        User friend = userRepository.findById(friendUserId)
                .orElseThrow(() -> new NoSuchElementException("친구 정보를 찾을 수 없습니다."));

        Friendship friendship = friendshipRepository.findByUserAndFriend(user, friend)
                .orElseThrow(() -> new NoSuchElementException("등록되지 않은 친구 관계입니다."));

        friendshipRepository.delete(friendship);
    }
}
