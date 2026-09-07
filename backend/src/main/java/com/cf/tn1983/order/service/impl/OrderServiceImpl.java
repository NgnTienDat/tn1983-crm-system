package com.cf.tn1983.order.service.impl;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.customer.Customer;
import com.cf.tn1983.customer.repository.CustomerRepository;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.OrderItem;
import com.cf.tn1983.order.OrderStatus;
import com.cf.tn1983.order.dto.request.ChangeOrderStatusRequest;
import com.cf.tn1983.order.dto.request.CreateOrderRequest;
import com.cf.tn1983.order.dto.request.OrderItemRequest;
import com.cf.tn1983.order.dto.request.UpdateOrderRequest;
import com.cf.tn1983.order.dto.response.OrderResponse;
import com.cf.tn1983.order.event.OrderStatusChangedEvent;
import com.cf.tn1983.order.mapper.OrderMapper;
import com.cf.tn1983.order.repository.OrderRepository;
import com.cf.tn1983.order.service.OrderCodeGenerator;
import com.cf.tn1983.order.service.OrderService;
import com.cf.tn1983.product.Product;
import com.cf.tn1983.product.repository.ProductRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Default application service for order operations. */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final OrderCodeGenerator orderCodeGenerator;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public OrderResponse create(CreateOrderRequest request) {
        Customer customer = getCustomer(request.getCustomerId());
        Order order = Order.builder()
                .orderCode(orderCodeGenerator.nextCode())
                .customer(customer)
                .receiverName(request.getReceiverName())
                .receiverPhone(request.getReceiverPhone())
                .receiverAddress(request.getReceiverAddress())
                .source(request.getSource())
                .shippingMethod(request.getShippingMethod())
                .note(request.getNote())
                .status(OrderStatus.RECEIVED)
                .deleted(false)
                .build();
        replaceItems(order, request.getItems());

        Order saved = orderRepository.save(order);
        publishStatusEvent(saved, null, request.getNote(), request.getChangedBy());
        return orderMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public OrderResponse update(UUID id, UpdateOrderRequest request) {
        Order order = getOrder(id);
        order.setCustomer(getCustomer(request.getCustomerId()));
        order.setReceiverName(request.getReceiverName());
        order.setReceiverPhone(request.getReceiverPhone());
        order.setReceiverAddress(request.getReceiverAddress());
        order.setSource(request.getSource());
        order.setShippingMethod(request.getShippingMethod());
        order.setNote(request.getNote());
        replaceItems(order, request.getItems());
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    public OrderResponse getById(UUID id) {
        return orderMapper.toResponse(getOrder(id));
    }

    @Override
    public OrderResponse getByCode(String orderCode) {
        return orderMapper.toResponse(orderRepository.findByOrderCodeAndDeletedFalse(orderCode)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_CODE_NOT_FOUND)));
    }

    @Override
    public List<OrderResponse> search(OrderStatus status, UUID customerId, String keyword) {
        String normalizedKeyword = keyword == null || keyword.isBlank() ? null : keyword.trim();
        return orderRepository.searchActive(status, customerId, normalizedKeyword).stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public OrderResponse changeStatus(UUID id, ChangeOrderStatusRequest request) {
        Order order = getOrder(id);
        OrderStatus oldStatus = order.getStatus();
        validateStatusChange(oldStatus, request.getStatus());
        order.setStatus(request.getStatus());
        Order saved = orderRepository.save(order);
        publishStatusEvent(saved, oldStatus, request.getNote(), request.getChangedBy());
        return orderMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Order order = getOrder(id);
        order.setDeleted(true);
        orderRepository.save(order);
    }

    private void replaceItems(Order order, List<OrderItemRequest> requests) {
        order.getItems().clear();
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemRequest request : requests) {
            Product product = productRepository.findByIdAndActiveTrue(request.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
            BigDecimal totalPrice = request.getQuantityKg().multiply(request.getUnitPricePerKg());
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantityKg(request.getQuantityKg())
                    .unitPricePerKg(request.getUnitPricePerKg())
                    .totalPrice(totalPrice)
                    .packagingType(request.getPackagingType())
                    .packageSize(request.getPackageSize())
                    .packageCount(request.getPackageCount())
                    .build();
            order.getItems().add(item);
            totalAmount = totalAmount.add(totalPrice);
        }
        order.setTotalAmount(totalAmount);
    }

    private Order getOrder(UUID id) {
        return orderRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    private Customer getCustomer(UUID id) {
        return customerRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
    }

    private void validateStatusChange(OrderStatus oldStatus, OrderStatus newStatus) {
        if (newStatus == null || Objects.equals(oldStatus, newStatus)
                || oldStatus == OrderStatus.COMPLETED) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }
    }

    private void publishStatusEvent(Order order, OrderStatus oldStatus, String note, UUID changedBy) {
        eventPublisher.publishEvent(new OrderStatusChangedEvent(
                order.getId(), order.getOrderCode(), oldStatus, order.getStatus(), note,
                changedBy, LocalDateTime.now()));
    }
}