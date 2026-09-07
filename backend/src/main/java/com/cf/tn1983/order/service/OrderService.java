package com.cf.tn1983.order.service;

import com.cf.tn1983.order.OrderStatus;
import com.cf.tn1983.order.dto.request.ChangeOrderStatusRequest;
import com.cf.tn1983.order.dto.request.CreateOrderRequest;
import com.cf.tn1983.order.dto.request.UpdateOrderRequest;
import com.cf.tn1983.order.dto.response.OrderResponse;
import java.util.List;
import java.util.UUID;

/** Application operations for managing orders. */
public interface OrderService {

    OrderResponse create(CreateOrderRequest request);

    OrderResponse update(UUID id, UpdateOrderRequest request);

    OrderResponse getById(UUID id);

    OrderResponse getByCode(String orderCode);

    List<OrderResponse> search(OrderStatus status, UUID customerId, String keyword);

    OrderResponse changeStatus(UUID id, ChangeOrderStatusRequest request);

    void delete(UUID id);
}