package com.cf.tn1983.order.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.Test;

class OrderCodeGeneratorTest {

    @Test
    void nextCode_returnsCodeWithExpectedFormat() {
        EntityManager entityManager = mock(EntityManager.class);
        Query query = mock(Query.class);
        when(entityManager.createNativeQuery("select nextval('order_code_seq')")).thenReturn(query);
        when(query.getSingleResult()).thenReturn(1L);

        String code = new OrderCodeGenerator(entityManager).nextCode();

        assertNotNull(code);
        assertTrue(code.matches("TN\\d{8}"));
        verify(entityManager).createNativeQuery("select nextval('order_code_seq')");
    }

    @Test
    void nextCode_returnsDifferentCodesForDifferentSequenceValues() {
        EntityManager entityManager = mock(EntityManager.class);
        Query query = mock(Query.class);
        when(entityManager.createNativeQuery("select nextval('order_code_seq')")).thenReturn(query);
        when(query.getSingleResult()).thenReturn(1L, 2L);

        OrderCodeGenerator generator = new OrderCodeGenerator(entityManager);
        String firstCode = generator.nextCode();
        String secondCode = generator.nextCode();

        assertNotEquals(firstCode, secondCode);
        verify(entityManager, times(2)).createNativeQuery("select nextval('order_code_seq')");
    }
}
