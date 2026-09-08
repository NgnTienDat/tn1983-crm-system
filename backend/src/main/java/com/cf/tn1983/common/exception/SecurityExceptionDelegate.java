package com.cf.tn1983.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

/** Delegates filter-chain security errors to the application's REST exception handlers. */
@Component
public class SecurityExceptionDelegate {

    private final HandlerExceptionResolver resolver;

    public SecurityExceptionDelegate(
            @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.resolver = resolver;
    }

    public void resolve(HttpServletRequest request, HttpServletResponse response, Exception exception) {
        resolver.resolveException(request, response, null, exception);
    }
}