package com.devhyeon.scheduler.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.devhyeon.scheduler.security.details.CustomUserDetailsService;
import com.devhyeon.scheduler.security.jwt.JwtFilter;
import com.devhyeon.scheduler.security.jwt.JwtProvider;

@Configuration
public class SecurityConfig {
//비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    보안설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,JwtProvider jwtProvider, CustomUserDetailsService userDetailsService) throws Exception{
        return http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(
                            "/api/auth/**"
                    ).permitAll().anyRequest().authenticated() // 어떤 요청이든 권한 허용
                ).addFilterBefore(
                    new JwtFilter(jwtProvider, userDetailsService),
                    UsernamePasswordAuthenticationFilter.class
            )
            .build();
    }
}
