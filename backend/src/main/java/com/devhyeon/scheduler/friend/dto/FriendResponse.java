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
    private Long id; // 친구의 User ID
    private String name;
    private String email;

    public static FriendResponse from(Friendship friendship) {
        User friend = friendship.getFriend();
        return FriendResponse.builder()
                .id(friend.getId())
                .name(friend.getName())
                .email(friend.getEmail())
                .build();
    }
}
