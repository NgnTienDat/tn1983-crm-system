package com.cf.tn1983.common.security;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, UUID> {

    boolean existsByTokenId(String tokenId);
}