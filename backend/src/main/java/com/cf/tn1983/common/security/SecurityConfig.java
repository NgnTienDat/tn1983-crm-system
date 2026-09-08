package com.cf.tn1983.common.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.cf.tn1983.common.exception.RestAccessDeniedHandler;
import com.cf.tn1983.common.exception.RestAuthenticationEntryPoint;
import com.cf.tn1983.common.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http,
                        JwtAuthenticationFilter jwtAuthenticationFilter,
                        RestAuthenticationEntryPoint authenticationEntryPoint,
                        RestAccessDeniedHandler accessDeniedHandler) throws Exception {
                return http
                                .csrf(AbstractHttpConfigurer::disable)
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(SecurityPaths.PUBLIC)
                                                .permitAll()
                                                .requestMatchers("/api/v1/auth/me", "/api/v1/auth/logout")
                                                .authenticated()
                                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                                .requestMatchers("/customer/**").hasRole("CUSTOMER")
                                                .anyRequest().authenticated())
                                .exceptionHandling(exception -> exception
                                                .authenticationEntryPoint(authenticationEntryPoint)
                                                .accessDeniedHandler(accessDeniedHandler))
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource(
                        @Value ("${app.cors.allowed-origins}") List<String> allowedOrigins) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(allowedOrigins);
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                config.setAllowedHeaders(List.of("Authorization", "Content-Type", "uuidKey"));
                config.setExposedHeaders(List.of("Authorization"));
                config.setAllowCredentials(false); // bật lại true + siết origin đúng lúc chuyển sang httpOnly cookie

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", config);
                return source;
        }
}