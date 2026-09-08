package com.cf.tn1983.order.service.impl;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.customer.Customer;
import com.cf.tn1983.customer.repository.CustomerRepository;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.OrderItem;
import com.cf.tn1983.order.OrderStatusHistory;
import com.cf.tn1983.order.dto.request.ChangeOrderStatusRequest;
import com.cf.tn1983.order.dto.request.CreateOrderRequest;
import com.cf.tn1983.order.dto.request.OrderItemRequest;
import com.cf.tn1983.order.dto.request.UpdateOrderRequest;
import com.cf.tn1983.order.dto.response.OrderDetailResponse;
import com.cf.tn1983.order.dto.response.OrderSummaryResponse;
import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.order.mapper.OrderMapper;
import com.cf.tn1983.order.repository.OrderRepository;
import com.cf.tn1983.order.repository.OrderStatusHistoryRepository;
import com.cf.tn1983.order.service.OrderCodeGenerator;
import com.cf.tn1983.order.service.OrderService;
import com.cf.tn1983.product.Product;
import com.cf.tn1983.product.repository.ProductRepository;
import com.cf.tn1983.user.User;
import com.cf.tn1983.user.repository.UserRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
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
    private final OrderStatusHistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final OrderCodeGenerator orderCodeGenerator;

    @Override
    @Transactional
    public OrderDetailResponse create(CreateOrderRequest request) {
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
        saveStatusHistory(saved, request.getNote(), request.getChangedBy());
        return orderMapper.toDetailResponse(saved);
    }

    @Override
    @Transactional
    public OrderDetailResponse update(UUID id, UpdateOrderRequest request) {
        Order order = getOrder(id);
        if (!order.getStatus().isEditable()) {
            throw new AppException(ErrorCode.ORDER_NOT_EDITABLE);
        }

        order.setCustomer(getCustomer(request.getCustomerId()));
        order.setReceiverName(request.getReceiverName());
        order.setReceiverPhone(request.getReceiverPhone());
        order.setReceiverAddress(request.getReceiverAddress());
        order.setSource(request.getSource());
        order.setShippingMethod(request.getShippingMethod());
        order.setNote(request.getNote());
        replaceItems(order, request.getItems());
        return orderMapper.toDetailResponse(orderRepository.save(order));
    }

    @Override
    public OrderDetailResponse getById(UUID id) {
        return orderMapper.toDetailResponse(getOrder(id));
    }

    @Override
    public OrderDetailResponse getByCode(String orderCode) {
        return orderMapper.toDetailResponse(orderRepository.findByOrderCodeAndDeletedFalse(orderCode)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_CODE_NOT_FOUND)));
    }

    @Override
    public List<OrderSummaryResponse> search(OrderStatus status, UUID customerId, String keyword) {
        String normalizedKeyword = keyword == null || keyword.isBlank() ? "" : keyword.trim();
        return orderRepository.searchActive(status, customerId, normalizedKeyword).stream()
            .map(orderMapper::toSummaryResponse)
                .toList();
    }

    @Override
    @Transactional
    public OrderDetailResponse changeStatus(UUID id, ChangeOrderStatusRequest request) {
        Order order = getOrder(id);
        OrderStatus oldStatus = order.getStatus();
        validateStatusChange(oldStatus, request.getStatus());
        order.setStatus(request.getStatus());
        Order saved = orderRepository.save(order);
        saveStatusHistory(saved, request.getNote(), request.getChangedBy());
        return orderMapper.toDetailResponse(saved);
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
        if (oldStatus == null || !oldStatus.canTransitionTo(newStatus)) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }
    }

    /**
     * Persists mandatory order history in the same transaction as the order.
     *
     * <p>Order status and its history must commit or roll back together. The
     * history is business data, so an AFTER_COMMIT event is intentionally not
     * used: a listener failure after commit could lose the history record.</p>
     */
    private void saveStatusHistory(Order order, String note, UUID changedBy) {
        User user = changedBy == null ? null : userRepository.getReferenceById(changedBy);
        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(order)
                .status(order.getStatus())
                .note(note)
                .changedAt(Instant.now())
                .changedBy(user)
                .build();
        historyRepository.save(history);
    }
}