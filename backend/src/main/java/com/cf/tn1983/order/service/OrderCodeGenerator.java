package com.cf.tn1983.order.service;

import jakarta.persistence.EntityManager;
import java.time.Year;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/** Generates business order codes from a PostgreSQL sequence. */
@Component
@RequiredArgsConstructor
public class OrderCodeGenerator {

    private final EntityManager entityManager;

    public String nextCode() {
        entityManager.createNativeQuery(
                        "create sequence if not exists order_code_seq start with 1")
                .executeUpdate();
        Number sequenceValue = (Number) entityManager
                .createNativeQuery("select nextval('order_code_seq')")
                .getSingleResult();
        return "TN" + String.valueOf(Year.now().getValue()).substring(2)
                + String.format("%04d", sequenceValue.longValue());
    }
}