# syntax=docker/dockerfile:1.7
# ============================================================
#  backend/Dockerfile  —  TN1983 CRM  (Spring Boot 4, Maven)
#  Multi-stage: JDK để build, JRE alpine để chạy (~200MB)
# ============================================================

# ------------------------------------------------------------
# Stage 1: BUILD
# ------------------------------------------------------------
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /build

# 1) Chỉ copy file build trước -> layer dependency được cache lại,
#    sửa code không phải tải lại toàn bộ Maven repo.
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -ntp dependency:go-offline

# 2) Copy source và đóng gói (test đã chạy ở job `test` của CI)
COPY src ./src
RUN ./mvnw -B -ntp -DskipTests clean package \
 && cp target/*.jar application.jar

# 3) Tách fat jar thành các layer: libs (ít đổi) và app (đổi mỗi build).
#    -> `docker pull` trên VM chỉ kéo phần thay đổi, tiết kiệm băng thông/disk.
RUN java -Djarmode=tools -jar application.jar extract --layers --destination extracted \
 && mkdir -p /dist/libs /dist/app \
 && for d in extracted/dependencies extracted/snapshot-dependencies extracted/spring-boot-loader; do \
      if [ -d "$d" ]; then cp -a "$d/." /dist/libs/; fi; \
    done \
 && cp -a extracted/application/. /dist/app/

# ------------------------------------------------------------
# Stage 2: RUNTIME
# ------------------------------------------------------------
FROM eclipse-temurin:21-jre-alpine AS runtime

# curl dùng cho HEALTHCHECK (~1MB)
RUN apk add --no-cache curl tzdata \
 && addgroup -S spring && adduser -S spring -G spring

ENV TZ=Asia/Ho_Chi_Minh \
    SERVER_PORT=8080 \
    JAVA_OPTS="-XX:MaxRAMPercentage=70.0 -XX:+ExitOnOutOfMemoryError -XX:+UseSerialGC"

WORKDIR /app

# Layer 1: thư viện — hiếm khi đổi
COPY --from=builder --chown=spring:spring /dist/libs/ ./
# Layer 2: code ứng dụng — đổi mỗi lần build
COPY --from=builder --chown=spring:spring /dist/app/ ./

USER spring
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -fsS http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar application.jar"]