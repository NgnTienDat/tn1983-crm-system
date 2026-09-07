package com.cf.tn1983.common.security;

import com.cf.tn1983.user.User;
import com.cf.tn1983.user.UserRole;
import com.cf.tn1983.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/** Creates the initial administrator account when it does not exist. */
@Component
@RequiredArgsConstructor
public class AdminAccountInitializer {

    private static final String ADMIN_EMAIL = "admin@gmail.com";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${security.admin.phone:0900000000}")
    private String adminPhone;

    @Value("${security.admin.password:admin123}")
    private String adminPassword;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeAdminAccount() {
        if (userRepository.existsByEmail(ADMIN_EMAIL)) {
            return;
        }

        userRepository.save(User.builder()
                .fullName("System Administrator")
                .email(ADMIN_EMAIL)
                .phone(adminPhone)
                .password(passwordEncoder.encode(adminPassword))
                .role(UserRole.ADMIN)
                .active(true)
                .build());
    }
}
