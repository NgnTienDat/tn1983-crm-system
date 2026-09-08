package com.cf.tn1983.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/** Application error codes and their corresponding HTTP statuses. */
@Getter
public enum ErrorCode {
    VALIDATION_ERROR(4000, "Validation failed", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(4001, "Unauthorized", HttpStatus.UNAUTHORIZED),
    FORBIDDEN(4003, "Forbidden", HttpStatus.FORBIDDEN),
    USER_NOT_FOUND(1000, "User not found", HttpStatus.NOT_FOUND),
    CUSTOMER_NOT_FOUND(1001, "Customer not found", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND(1002, "Product not found", HttpStatus.NOT_FOUND),
    ORDER_NOT_FOUND(1003, "Order not found", HttpStatus.NOT_FOUND),
    EMAIL_ALREADY_EXISTS(1004, "Email already exists", HttpStatus.BAD_REQUEST),
    PHONE_ALREADY_EXISTS(1005, "Phone already exists", HttpStatus.BAD_REQUEST),
    CUSTOMER_PHONE_ALREADY_EXISTS(1006, "Customer phone already exists", HttpStatus.BAD_REQUEST),
    PRODUCT_ALREADY_EXISTS(1007, "Product already exists", HttpStatus.BAD_REQUEST),
    ORDER_CODE_NOT_FOUND(1008, "Order code not found", HttpStatus.NOT_FOUND),
    ORDER_ITEM_REQUIRED(1009, "At least one order item is required", HttpStatus.BAD_REQUEST),
    INVALID_ORDER_STATUS(1010, "Invalid order status", HttpStatus.BAD_REQUEST),
    ORDER_NOT_EDITABLE(1011, "Order is not editable in its current status", HttpStatus.BAD_REQUEST),
    INTERNAL_SERVER_ERROR(5000, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);

    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}