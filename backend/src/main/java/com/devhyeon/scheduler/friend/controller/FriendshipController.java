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

    @GetMapping
    public List<FriendResponse> getFriends(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return friendshipService.getFriends(userDetails.getUser());
    }

    @PostMapping
    public ResponseEntity<Void> addFriend(
            @Valid @RequestBody FriendAddRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        friendshipService.addFriend(userDetails.getUser(), request.getFriendEmail());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{friendUserId}")
    public ResponseEntity<Void> deleteFriend(
            @PathVariable Long friendUserId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        friendshipService.deleteFriend(userDetails.getUser(), friendUserId);
        return ResponseEntity.noContent().build();
    }
}
