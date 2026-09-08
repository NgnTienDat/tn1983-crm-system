package com.cf.tn1983.order.enums;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class OrderStatusTest {

    @Test
    void allowsOnlyTheNextWorkflowStatus() {
        assertTrue(OrderStatus.RECEIVED.canTransitionTo(OrderStatus.ROASTING));
        assertTrue(OrderStatus.ROASTING.canTransitionTo(OrderStatus.PACKAGING));
        assertTrue(OrderStatus.PACKAGING.canTransitionTo(OrderStatus.WAITING_FOR_SHIPPING));
        assertTrue(OrderStatus.WAITING_FOR_SHIPPING.canTransitionTo(OrderStatus.SHIPPED));
        assertTrue(OrderStatus.SHIPPED.canTransitionTo(OrderStatus.COMPLETED));
    }

    @Test
    void rejectsInvalidWorkflowTransitions() {
        assertFalse(OrderStatus.RECEIVED.canTransitionTo(OrderStatus.COMPLETED));
        assertFalse(OrderStatus.RECEIVED.canTransitionTo(OrderStatus.SHIPPED));
        assertFalse(OrderStatus.PACKAGING.canTransitionTo(OrderStatus.RECEIVED));
        assertFalse(OrderStatus.SHIPPED.canTransitionTo(OrderStatus.ROASTING));
        assertFalse(OrderStatus.COMPLETED.canTransitionTo(OrderStatus.SHIPPED));
        assertFalse(OrderStatus.RECEIVED.canTransitionTo(null));
    }

    @Test
    void editableStatusesAreLimitedToPreShippingStages() {
        assertTrue(OrderStatus.RECEIVED.isEditable());
        assertTrue(OrderStatus.ROASTING.isEditable());
        assertTrue(OrderStatus.PACKAGING.isEditable());
        assertFalse(OrderStatus.WAITING_FOR_SHIPPING.isEditable());
        assertFalse(OrderStatus.SHIPPED.isEditable());
        assertFalse(OrderStatus.COMPLETED.isEditable());
    }
}
