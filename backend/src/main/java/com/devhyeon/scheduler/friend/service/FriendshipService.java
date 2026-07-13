package com.devhyeon.scheduler.friend.service;

import com.devhyeon.scheduler.friend.dto.FriendResponse;
import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.friend.entity.FriendshipStatus;
import com.devhyeon.scheduler.friend.repository.FriendshipRepository;
import com.devhyeon.scheduler.user.entity.User;
import com.devhyeon.scheduler.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    // 1. 현재 친구 목록 (내가 보냈든 받았든 ACCEPTED 상태인 친구들)
    @Transactional(readOnly = true)
    public List<FriendResponse> getAcceptedFriends(User user) {
        List<FriendResponse> sent = friendshipRepository.findByUserAndStatus(user, FriendshipStatus.ACCEPTED)
                .stream().map(FriendResponse::fromSent).toList();

        List<FriendResponse> received = friendshipRepository.findByFriendAndStatus(user, FriendshipStatus.ACCEPTED)
                .stream().map(FriendResponse::fromReceived).toList();

        return Stream.concat(sent.stream(), received.stream()).toList();
    }

    // 2. 나한테 온 친구 요청 목록 (PENDING)
    @Transactional(readOnly = true)
    public List<FriendResponse> getReceivedRequests(User user) {
        return friendshipRepository.findByFriendAndStatus(user, FriendshipStatus.PENDING)
                .stream()
                .map(FriendResponse::fromReceived)
                .toList();
    }

    // 3. 내가 보낸 친구 요청 목록 (PENDING)
    @Transactional(readOnly = true)
    public List<FriendResponse> getSentRequests(User user) {
        return friendshipRepository.findByUserAndStatus(user, FriendshipStatus.PENDING)
                .stream()
                .map(FriendResponse::fromSent)
                .toList();
    }

    // 친구 요청 보내기
    public void addFriendRequest(User user, String friendEmail) {
        if (user.getEmail().equals(friendEmail)) {
            throw new IllegalArgumentException("자기 자신은 친구로 추가할 수 없습니다.");
        }

        User friend = userRepository.findByEmail(friendEmail)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 유저입니다."));

        // 역방향 혹은 순방향으로 이미 관계가 존재하는지 체크
        if (friendshipRepository.existsByUserAndFriend(user, friend) ||
                friendshipRepository.existsByUserAndFriend(friend, user)) {
            throw new IllegalArgumentException("이미 친구이거나 요청 대기 중입니다.");
        }

        Friendship friendship = Friendship.builder()
                .user(user)
                .friend(friend)
                .status(FriendshipStatus.PENDING)
                .build();

        friendshipRepository.save(friendship);
    }

    // 친구 요청 수락
    public void acceptFriendRequest(User user, Long friendshipId) {
        Friendship friendship = friendshipRepository.findByIdAndFriend(friendshipId, user)
                .orElseThrow(() -> new NoSuchElementException("유효하지 않은 친구 요청입니다."));

        friendship.accept();
    }

    // 친구 관계 삭제 (요청 거절, 요청 취소, 친구 끊기 공통)
    public void deleteFriendship(User user, Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new NoSuchElementException("친구 정보를 찾을 수 없습니다."));

        // 본인과 관련된 관계만 삭제 가능하도록 검증
        if (!friendship.getUser().getId().equals(user.getId()) &&
                !friendship.getFriend().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 관계를 삭제할 권한이 없습니다.");
        }

        friendshipRepository.delete(friendship);
    }
}