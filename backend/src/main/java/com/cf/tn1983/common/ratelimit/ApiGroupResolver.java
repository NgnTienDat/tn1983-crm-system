package com.cf.tn1983.common.ratelimit;

import java.util.List;
import java.util.Optional;
import org.springframework.http.server.PathContainer;
import org.springframework.stereotype.Component;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;

/** Maps request paths to quota groups using Spring path patterns. */
@Component
public class ApiGroupResolver {

    private final List<Route> routes = List.of(
            route("/api/v1/auth/**", ApiGroup.AUTH),
            route("/api/v1/orders/code/**", ApiGroup.TRACKING),
            route("/api/v1/users/**", ApiGroup.ADMIN),
            route("/api/v1/customers/**", ApiGroup.ADMIN),
            route("/api/v1/products/**", ApiGroup.ADMIN),
            route("/api/v1/orders/**", ApiGroup.ADMIN));

    public Optional<ApiGroup> resolve(String path) {
        PathContainer requestPath = PathContainer.parsePath(path);
        return routes.stream()
                .filter(route -> route.pattern.matches(requestPath))
                .map(Route::group)
                .findFirst();
    }

    private static Route route(String pattern, ApiGroup group) {
        return new Route(PathPatternParser.defaultInstance.parse(pattern), group);
    }

    private record Route(PathPattern pattern, ApiGroup group) {
    }
}