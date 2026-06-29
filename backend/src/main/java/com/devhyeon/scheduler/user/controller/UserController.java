package com.devhyeon.scheduler.user.controller;

import com.devhyeon.scheduler.security.details.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/me")
    public String me(
            @AuthenticationPrincipal
            CustomUserDetails userDetails
    ) {

        return userDetails.getUser().getEmail();
    }
}