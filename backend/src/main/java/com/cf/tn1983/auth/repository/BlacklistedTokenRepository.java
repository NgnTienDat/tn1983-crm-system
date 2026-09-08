package com.cf.tn1983.auth.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cf.tn1983.common.entity.BlacklistedToken;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, UUID> {

    boolean existsByTokenId(String tokenId);
}