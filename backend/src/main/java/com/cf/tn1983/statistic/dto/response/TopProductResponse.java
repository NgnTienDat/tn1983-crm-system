package com.cf.tn1983.statistic.dto.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Product sales aggregate for the current business month. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopProductResponse {

    private String productName;
    private BigDecimal quantitySold;
    private BigDecimal revenue;
}
