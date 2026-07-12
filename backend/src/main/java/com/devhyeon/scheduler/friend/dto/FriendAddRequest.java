package com.devhyeon.scheduler.friend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FriendAddRequest {

    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @NotBlank(message = "친구의 이메일은 필수입니다.")
    private String friendEmail;
}
