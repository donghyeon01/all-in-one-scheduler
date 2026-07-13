package com.devhyeon.scheduler.friend.controller;

import com.devhyeon.scheduler.friend.dto.FriendAddRequest;
import com.devhyeon.scheduler.friend.dto.FriendResponse;
import com.devhyeon.scheduler.friend.service.FriendshipService;
import com.devhyeon.scheduler.security.details.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendshipController {

    private final FriendshipService friendshipService;

    // 현재 친구 목록
    @GetMapping
    public List<FriendResponse> getFriends(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return friendshipService.getAcceptedFriends(userDetails.getUser());
    }

    // 나한테 온 친구 요청 목록
    @GetMapping("/requests/received")
    public List<FriendResponse> getReceivedRequests(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return friendshipService.getReceivedRequests(userDetails.getUser());
    }

    // 내가 보낸 친구 요청 목록
    @GetMapping("/requests/sent")
    public List<FriendResponse> getSentRequests(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return friendshipService.getSentRequests(userDetails.getUser());
    }

    // 친구 요청 보내기
    @PostMapping
    public ResponseEntity<Void> addFriend(
            @Valid @RequestBody FriendAddRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        friendshipService.addFriendRequest(userDetails.getUser(), request.getFriendEmail());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 친구 요청 수락
    @PostMapping("/requests/{friendshipId}/accept")
    public ResponseEntity<Void> acceptFriend(
            @PathVariable Long friendshipId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        friendshipService.acceptFriendRequest(userDetails.getUser(), friendshipId);
        return ResponseEntity.ok().build();
    }

    // 친구 삭제 / 요청 거절 / 요청 취소 통합
    @DeleteMapping("/{friendshipId}")
    public ResponseEntity<Void> deleteFriend(
            @PathVariable Long friendshipId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        friendshipService.deleteFriendship(userDetails.getUser(), friendshipId);
        return ResponseEntity.noContent().build();
    }
}