package com.cf.tn1983.order.mapper;

import com.cf.tn1983.customer.mapper.CustomerMapper;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.OrderItem;
import com.cf.tn1983.order.OrderStatusHistory;
import com.cf.tn1983.order.dto.response.OrderItemResponse;
import com.cf.tn1983.order.dto.response.OrderResponse;
import com.cf.tn1983.order.dto.response.OrderStatusHistoryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/** Maps order entities to API response DTOs. */
@Mapper(componentModel = "spring", uses = CustomerMapper.class)
public interface OrderMapper {

    OrderResponse toResponse(Order order);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    OrderItemResponse toItemResponse(OrderItem item);

    @Mapping(target = "changedById", source = "changedBy.id")
    OrderStatusHistoryResponse toHistoryResponse(OrderStatusHistory history);
}