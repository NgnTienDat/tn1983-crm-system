package com.cf.tn1983.order.service.impl;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.customer.repository.CustomerRepository;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.order.mapper.OrderMapper;
import com.cf.tn1983.order.repository.OrderRepository;
import com.cf.tn1983.order.repository.OrderStatusHistoryRepository;
import com.cf.tn1983.order.service.OrderCodeGenerator;
import com.cf.tn1983.product.repository.ProductRepository;
import com.cf.tn1983.user.repository.UserRepository;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class OrderServiceImplTest {

    @Test
    void updateRejectsOrdersAfterPackagingStage() {
        for (OrderStatus status : new OrderStatus[] {
                OrderStatus.WAITING_FOR_SHIPPING,
                OrderStatus.SHIPPED,
                OrderStatus.COMPLETED
        }) {
            assertUpdateRejected(status);
        }
    }

    private void assertUpdateRejected(OrderStatus status) {
        OrderRepository orderRepository = mock(OrderRepository.class);
        CustomerRepository customerRepository = mock(CustomerRepository.class);
        ProductRepository productRepository = mock(ProductRepository.class);
        OrderStatusHistoryRepository historyRepository = mock(OrderStatusHistoryRepository.class);
        UserRepository userRepository = mock(UserRepository.class);
        OrderMapper orderMapper = mock(OrderMapper.class);
        OrderCodeGenerator orderCodeGenerator = mock(OrderCodeGenerator.class);
        OrderServiceImpl service = new OrderServiceImpl(
                orderRepository,
                customerRepository,
                productRepository,
                historyRepository,
                userRepository,
                orderMapper,
                orderCodeGenerator);
        UUID orderId = UUID.randomUUID();
        Order order = Order.builder().status(status).build();
        when(orderRepository.findByIdAndDeletedFalse(orderId)).thenReturn(Optional.of(order));

        assertThrows(AppException.class, () -> service.update(orderId, null));

        verify(customerRepository, never()).findByIdAndActiveTrue(org.mockito.ArgumentMatchers.any());
        verify(orderRepository, never()).save(order);
    }
}
