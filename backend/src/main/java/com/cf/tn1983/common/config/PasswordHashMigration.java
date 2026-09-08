package com.cf.tn1983.common.config;

import com.cf.tn1983.user.User;
import com.cf.tn1983.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class PasswordHashMigration {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void hashExistingPasswords() {
        for (User user : userRepository.findAll()) {
            String password = user.getPassword();
            if (password != null && !password.startsWith("$2a$")
                    && !password.startsWith("$2b$") && !password.startsWith("$2y$")) {
                user.setPassword(passwordEncoder.encode(password));
                userRepository.save(user);
            }
        }
    }
}