package com.cf.tn1983.auth.repository;

import java.util.Optional;
import java.util.UUID;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.cf.tn1983.common.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByTokenId(String tokenId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select token from RefreshToken token where token.tokenId = :tokenId")
    Optional<RefreshToken> findByTokenIdForUpdate(String tokenId);

    @Modifying
    @Query("update RefreshToken token set token.revoked = true where token.familyId = :familyId")
    int revokeFamily(UUID familyId);
}