package com.cf.tn1983.statistic.controller;

import com.cf.tn1983.common.response.ApiResponse;
import com.cf.tn1983.statistic.dto.response.DashboardStatisticsResponse;
import com.cf.tn1983.statistic.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** REST endpoints for aggregated admin statistics. */
@RestController
@RequestMapping("/api/v1/statistics")
@RequiredArgsConstructor
@Tag(name = "Statistics", description = "API thống kê vận hành")
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping("/dashboard")
    @Operation(summary = "Lấy dữ liệu tổng quan dashboard")
    public ApiResponse<DashboardStatisticsResponse> getDashboard() {
        return ApiResponse.success(statisticService.getDashboard());
    }
}
