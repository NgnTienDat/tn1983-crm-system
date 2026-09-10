package com.cf.tn1983.order.service;

import com.cf.tn1983.order.dto.request.ChangeOrderStatusRequest;
import com.cf.tn1983.order.dto.request.CreateOrderRequest;
import com.cf.tn1983.order.dto.request.UpdateOrderRequest;
import com.cf.tn1983.order.dto.response.OrderDetailResponse;
import com.cf.tn1983.order.dto.response.OrderSummaryResponse;
import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.common.response.PageResponse;

import java.util.UUID;

/** Application operations for managing orders. */
public interface OrderService {

    OrderDetailResponse create(CreateOrderRequest request);

    OrderDetailResponse update(UUID id, UpdateOrderRequest request);

    OrderDetailResponse getById(UUID id);

    OrderDetailResponse getByCode(String orderCode);

    PageResponse<OrderSummaryResponse> search(int page, int size, OrderStatus status, UUID customerId, String keyword);

    OrderDetailResponse changeStatus(UUID id, ChangeOrderStatusRequest request);

    void delete(UUID id);
}