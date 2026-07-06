package com.devhyeon.scheduler.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.devhyeon.scheduler.security.details.CustomUserDetailsService;
import com.devhyeon.scheduler.security.jwt.JwtFilter;
import com.devhyeon.scheduler.security.jwt.JwtProvider;

@Configuration
public class SecurityConfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(
                                List.of("http://localhost:5173"));

                configuration.setAllowedMethods(
                                List.of("*"));

                configuration.setAllowedHeaders(
                                List.of("*"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration(
                                "/**",
                                configuration);

                return source;
        }

        @Bean
        public SecurityFilterChain filterChain(
                        HttpSecurity http,
                        JwtProvider jwtProvider,
                        CustomUserDetailsService userDetailsService)
                        throws Exception {

                return http
                                .csrf(csrf -> csrf.disable())

                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                                .authorizeHttpRequests(auth -> auth.requestMatchers(
                                                "/api/auth/**").permitAll()
                                                .anyRequest()
                                                .authenticated())

                                .addFilterBefore(
                                                new JwtFilter(
                                                                jwtProvider,
                                                                userDetailsService),
                                                UsernamePasswordAuthenticationFilter.class)

                                .build();
        }
}