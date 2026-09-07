package com.cf.tn1983.order.event;

import com.cf.tn1983.order.OrderStatusHistory;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.repository.OrderStatusHistoryRepository;
import com.cf.tn1983.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/** Persists order status history after the order transaction commits. */
@Component
@RequiredArgsConstructor
public class OrderStatusHistoryListener {

    private final OrderStatusHistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final EntityManager entityManager;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handle(OrderStatusChangedEvent event) {
        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(entityManager.getReference(Order.class, event.orderId()))
                .status(event.newStatus())
                .note(event.note())
                .changedAt(event.occurredAt())
                .changedBy(event.changedBy() == null
                        ? null
                        : userRepository.getReferenceById(event.changedBy()))
                .build();
        historyRepository.save(history);
    }
}