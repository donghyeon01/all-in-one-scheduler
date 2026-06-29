package com.devhyeon.scheduler.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devhyeon.scheduler.auth.dto.LoginRequest;
import com.devhyeon.scheduler.auth.dto.LoginResponse;
import com.devhyeon.scheduler.auth.dto.SignupRequest;
import com.devhyeon.scheduler.security.jwt.JwtProvider;
import com.devhyeon.scheduler.user.entity.User;
import com.devhyeon.scheduler.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

//    회원가입
    public void signup(SignupRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();

        userRepository.save(user);
    }

//    로그인
public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new IllegalArgumentException("존재하지 않는 이메일입니다."));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
    )) {
        throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
    }

    String accessToken =
            jwtProvider.generateToken(user.getEmail());

    return new LoginResponse(accessToken);
}
}
