package com.devhyeon.scheduler.auth.dto;

import lombok.Getter;

@Getter
public class SignupRequest {

    private String email;
    private String password;
    private String name;
}
