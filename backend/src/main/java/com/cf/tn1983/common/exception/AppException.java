package com.cf.tn1983.common.exception;

import lombok.Getter;

/** Exception type for expected business errors. */
@Getter
public class AppException extends RuntimeException {

    private final ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}