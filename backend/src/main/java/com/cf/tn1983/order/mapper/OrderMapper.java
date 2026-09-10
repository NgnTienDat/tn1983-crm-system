package com.cf.tn1983.order.mapper;

import com.cf.tn1983.customer.mapper.CustomerMapper;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.OrderItem;
import com.cf.tn1983.order.OrderStatusHistory;
import com.cf.tn1983.order.dto.response.OrderItemResponse;
import com.cf.tn1983.order.dto.response.OrderDetailResponse;
import com.cf.tn1983.order.dto.response.OrderSummaryResponse;
import com.cf.tn1983.order.dto.response.OrderStatusHistoryResponse;
import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.order.repository.OrderSummaryProjection;
import com.cf.tn1983.customer.dto.response.CustomerSummaryResponse;
import java.util.List;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

/** Maps order entities to API response DTOs. */
@Mapper(componentModel = "spring", uses = CustomerMapper.class)
public interface OrderMapper {

        OrderDetailResponse toDetailResponse(Order order);

        default OrderSummaryResponse toSummaryResponse(OrderSummaryProjection projection) {
        return OrderSummaryResponse.builder()
            .id(projection.id())
            .orderCode(projection.orderCode())
            .customer(CustomerSummaryResponse.builder()
                .id(projection.customerId())
                .name(projection.customerName())
                .build())
            .receiverName(projection.receiverName())
            .totalAmount(projection.totalAmount())
            .status(projection.status())
                .editable(isEditable(projection.status()))
                .allowedNextStatuses(getAllowedNextStatuses(projection.status()))
            .createdAt(projection.createdAt())
            .build();
        }

            @AfterMapping
            default void enrichWorkflow(Order order, @MappingTarget OrderDetailResponse response) {
                response.setEditable(isEditable(order.getStatus()));
                response.setAllowedNextStatuses(getAllowedNextStatuses(order.getStatus()));
            }

            default boolean isEditable(OrderStatus status) {
                return status != null && status.isEditable();
            }

            default List<OrderStatus> getAllowedNextStatuses(OrderStatus status) {
                return status == null ? List.of() : status.getAllowedNextStatuses().stream().toList();
            }

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    OrderItemResponse toItemResponse(OrderItem item);

    @Mapping(target = "changedBy.id", source = "changedBy.id")
    @Mapping(target = "changedBy.fullName", source = "changedBy.fullName")
    OrderStatusHistoryResponse toHistoryResponse(OrderStatusHistory history);
}