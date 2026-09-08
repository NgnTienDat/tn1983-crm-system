package com.cf.tn1983.order.service;

import jakarta.persistence.EntityManager;
import java.time.Year;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Generates business order codes from a PostgreSQL sequence.
 *
 * <p>The PostgreSQL sequence is thread-safe, and {@code nextval()} is safe when
 * multiple requests generate order codes concurrently. This avoids using
 * {@code count()} or {@code max()} to generate codes, as either approach can
 * introduce race conditions.</p>
 */
@Component
@RequiredArgsConstructor
public class OrderCodeGenerator {

    private final EntityManager entityManager;

    public String nextCode() {
        Number sequenceValue = (Number) entityManager
                .createNativeQuery("select nextval('order_code_seq')")
                .getSingleResult();
        return "TN" + String.valueOf(Year.now().getValue()).substring(2)
                + String.format("%06d", sequenceValue.longValue());
    }
}