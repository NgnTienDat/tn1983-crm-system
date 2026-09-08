package com.cf.tn1983.user.repository;

import com.cf.tn1983.user.User;
import java.util.UUID;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** Persistence operations for users. */
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<User> findByPhone(String phone);

    Optional<User> findByIdAndActiveTrue(UUID id);
}