package com.cf.tn1983.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Map;

/** Standard response envelope for all API endpoints. */
@Schema(description = "Cấu trúc response chung của API")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {

    @Schema(description = "Mã trạng thái xử lý", example = "200")
    private int code;

    @Schema(description = "Thông báo kết quả xử lý", example = "Success")
    private String message;

    @Schema(description = "Dữ liệu trả về của API")
    private T data;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "Success", data);
    }

    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }

    public static ApiResponse<Map<String, String>> validationError(
            Map<String, String> errors) {
        return new ApiResponse<>(4000, "Validation failed", errors);
    }
}