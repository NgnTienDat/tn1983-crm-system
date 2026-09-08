package com.cf.tn1983.order.enums;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Set;

/** Current fulfillment status of an order. */
public enum OrderStatus {
    RECEIVED {
        @Override
        public Set<OrderStatus> getAllowedNextStatuses() {
            return Set.of(ROASTING);
        }
    },
    ROASTING {
        @Override
        public Set<OrderStatus> getAllowedNextStatuses() {
            return Set.of(PACKAGING);
        }
    },
    PACKAGING {
        @Override
        public Set<OrderStatus> getAllowedNextStatuses() {
            return Set.of(WAITING_FOR_SHIPPING);
        }
    },
    WAITING_FOR_SHIPPING {
        @Override
        public Set<OrderStatus> getAllowedNextStatuses() {
            return Set.of(SHIPPED);
        }
    },
    SHIPPED {
        @Override
        public Set<OrderStatus> getAllowedNextStatuses() {
            return Set.of(COMPLETED);
        }
    },
    COMPLETED {
        @Override
        public Set<OrderStatus> getAllowedNextStatuses() {
            return Collections.emptySet();
        }
    };

    public abstract Set<OrderStatus> getAllowedNextStatuses();

    public boolean canTransitionTo(OrderStatus target) {
        return target != null && getAllowedNextStatuses().contains(target);
    }

    public boolean isEditable() {
        return EnumSet.of(RECEIVED, ROASTING, PACKAGING).contains(this);
    }
}