package com.devhyeon.scheduler.friend.dto;

import com.devhyeon.scheduler.friend.entity.Friendship;
import com.devhyeon.scheduler.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FriendResponse {
    private Long id; // Friendship 엔티티의 ID (수락/거절/삭제 요청 편의성 위함)
    private Long friendUserId; // 상대방 유저의 ID
    private String name;
    private String email;

    // 내가 보낸 요청 혹은 내 친구 목록용 (상대방이 friend)
    public static FriendResponse fromSent(Friendship friendship) {
        User friend = friendship.getFriend();
        return FriendResponse.builder()
                .id(friendship.getId())
                .friendUserId(friend.getId())
                .name(friend.getName())
                .email(friend.getEmail())
                .build();
    }

    // 나한테 온 요청용 (상대방이 user)
    public static FriendResponse fromReceived(Friendship friendship) {
        User requester = friendship.getUser();
        return FriendResponse.builder()
                .id(friendship.getId())
                .friendUserId(requester.getId())
                .name(requester.getName())
                .email(requester.getEmail())
                .build();
    }
}