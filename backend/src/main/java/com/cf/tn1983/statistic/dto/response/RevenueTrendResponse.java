package com.cf.tn1983.statistic.dto.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Revenue total for one business day. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevenueTrendResponse {

    private String label;
    private BigDecimal revenue;
}
