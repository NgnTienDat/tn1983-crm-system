Đã rà soát `backend`. Dự án đang triển khai JWT với các cơ chế chính sau:

### 1. Có access token và refresh token tách biệt

- Access token trả về trong JSON response.
- Refresh token không trả về JSON mà được lưu trong cookie:
  - `HttpOnly`
  - `SameSite=Strict` ở production, `Lax` ở dev
  - `Secure=true` ở production
  - Path giới hạn ở `/api/v1/auth`
- Access token dùng header:

```http
Authorization: Bearer <access-token>
```

Tham khảo: [AuthController.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/controller/AuthController.java:47), [SecurityConfig.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/SecurityConfig.java:42)

### 2. Dùng secret riêng cho access token và refresh token

`JwtService` sử dụng hai signing key khác nhau:

- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Cả hai đều dùng HMAC thông qua JJWT.

Tham khảo: [JwtService.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/jwt/JwtService.java:19)

### 3. Thời gian sống khác nhau

Mặc định:

- Access token: `3.600.000 ms` — khoảng 1 giờ.
- Refresh token: `2.592.000.000 ms` — khoảng 30 ngày.

Có thể cấu hình qua:

```yaml
JWT_ACCESS_EXPIRATION
JWT_REFRESH_EXPIRATION
```

Tham khảo: [application.yaml](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/resources/application.yaml:68)

### 4. Refresh token rotation

Dự án có rotate refresh token.

Mỗi lần gọi `/api/v1/auth/refresh`:

- Refresh token hiện tại bị đánh dấu `used=true`.
- Một refresh token mới được tạo.
- Refresh token mới lưu `parentTokenId` trỏ về token trước đó.
- Các token liên quan được gom trong cùng `familyId`.

Vì vậy, refresh token là loại one-time-use, không thể sử dụng lặp lại bình thường.

Tham khảo: [AuthServiceImpl.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/service/impl/AuthServiceImpl.java:52), [RefreshToken.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/entity/RefreshToken.java:21)

### 5. Phát hiện reuse refresh token và revoke cả token family

Nếu refresh token đã:

- `used=true`, hoặc
- `revoked=true`

thì hệ thống:

- Revoke toàn bộ refresh token cùng `familyId`.
- Từ chối request.

Đây là cơ chế phát hiện việc refresh token cũ bị sử dụng lại, thường dùng để phát hiện token bị đánh cắp.

Tham khảo: [AuthServiceImpl.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/service/impl/AuthServiceImpl.java:60), [RefreshTokenRepository.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/repository/RefreshTokenRepository.java:21)

### 6. Refresh token được quản lý bằng database

Database lưu metadata của từng refresh token:

- User sở hữu token
- `tokenId`
- `familyId`
- `parentTokenId`
- Thời gian hết hạn
- Đã sử dụng chưa
- Đã bị revoke chưa

JWT refresh token chứa `tokenId`, còn trạng thái hợp lệ thực tế được kiểm tra thêm trong database.

Tham khảo: [V1__create_all_tables.sql](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/resources/db/migration/V1__create_all_tables.sql:46)

### 7. Có blacklist cho access token

Khi logout:

- Access token hiện tại được lấy `jti`.
- `jti` được lưu vào bảng `blacklisted_tokens`.
- Filter JWT kiểm tra blacklist ở mỗi request.
- Access token trong blacklist sẽ bị từ chối dù chữ ký và thời hạn vẫn còn hợp lệ.

Blacklist chỉ lưu đến thời điểm access token hết hạn.

Tham khảo: [AuthServiceImpl.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/service/impl/AuthServiceImpl.java:81), [JwtAuthenticationFilter.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/jwt/JwtAuthenticationFilter.java:60)

### 8. Logout xử lý cả access token và refresh token

Endpoint `/logout`:

- Blacklist access token hiện tại.
- Revoke refresh token hiện tại.
- Xóa refresh-token cookie trên trình duyệt.

Lưu ý: logout chỉ revoke refresh token hiện tại, không revoke toàn bộ `familyId`. Việc revoke cả family chỉ xảy ra khi hệ thống phát hiện refresh token đã bị reuse.

Tham khảo: [AuthController.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/controller/AuthController.java:66)

### 9. Access token chứa thông tin user và role

Access token chứa các claim chính:

- `sub`: UUID user
- `userId`
- `phone`
- `role`
- `jti`
- `iat`
- `exp`

Tuy nhiên, quyền thực tế trong Spring Security được tạo lại từ user trong database, không chỉ tin vào claim `role`.

Tham khảo: [JwtService.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/jwt/JwtService.java:37), [JwtAuthenticationFilter.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/jwt/JwtAuthenticationFilter.java:70)

### 10. Stateless session

Ứng dụng cấu hình:

```java
SessionCreationPolicy.STATELESS
```

Tức là không dùng session server-side; mỗi request phải tự mang access token.

CSRF cũng bị disable vì cơ chế xác thực chính dùng Bearer access token, còn refresh token được bảo vệ bằng HttpOnly/SameSite cookie.

Tham khảo: [SecurityConfig.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/SecurityConfig.java:44)

### 11. Filter kiểm tra token trên mỗi request

`JwtAuthenticationFilter` thực hiện:

- Đọc Bearer token.
- Verify chữ ký và hạn token.
- Phân biệt access token với refresh token.
- Kiểm tra `jti` có trong blacklist không.
- Kiểm tra user còn tồn tại và đang active không.
- Nạp quyền vào `SecurityContext`.

Các endpoint refresh và logout được bypass JWT filter vì chúng có thể hoạt động dựa trên refresh cookie hoặc token hết hạn.

Tham khảo: [SecurityPaths.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/security/SecurityPaths.java:24)

### 12. Có khóa pessimistic khi rotate refresh token

Khi tìm refresh token để xử lý, repository dùng `PESSIMISTIC_WRITE`. Mục đích là tránh hai request đồng thời cùng sử dụng một refresh token trước khi trạng thái `used` được cập nhật.

Tham khảo: [RefreshTokenRepository.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/repository/RefreshTokenRepository.java:17)

Tóm lại, mô hình của dự án là:

```text
Access token ngắn hạn
        +
Refresh token dài hạn trong HttpOnly cookie
        +
Refresh token rotation
        +
One-time-use refresh token
        +
Token family và reuse detection
        +
Blacklist access token khi logout
        +
Database quản lý trạng thái refresh token
        +
Stateless Spring Security
```
Tạm thời chưa triển khai cơ chế scheduled cleanup cho các bản ghi đã hết hạn trong `blacklisted_tokens` và `refresh_tokens`; hiện tại các bản ghi này được lưu lại lâu dài. SẼ TRIỂN KHAI SAU




### 1. One-time-use refresh token

Mỗi refresh token chỉ được phép dùng **một lần** để lấy access token mới.

Khi refresh thành công:

1. Hệ thống tìm bản ghi refresh token theo `tokenId`.
2. Kiểm tra token chưa hết hạn, chưa `used`, chưa `revoked`.
3. Đánh dấu token hiện tại:

```java
current.setUsed(true);
```

4. Tạo một refresh token mới.
5. Token mới lưu `parentTokenId` trỏ về token vừa sử dụng.

Ví dụ:

```text
RefreshToken A
    -> dùng refresh
RefreshToken A: used = true

RefreshToken B
    -> được tạo và cấp cho client
```

Nếu client tiếp tục gửi lại token A, token đó không còn hợp lệ nữa.

Mục đích là giảm rủi ro khi refresh token bị đánh cắp: kẻ tấn công không thể sử dụng cùng một refresh token nhiều lần.

Phần triển khai nằm ở [AuthServiceImpl.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/service/impl/AuthServiceImpl.java:54).

---

### 2. Token family

Một chuỗi các refresh token được tạo ra từ cùng một lần đăng nhập được gom vào một `familyId`.

Ví dụ:

```text
Đăng nhập:
A (family F1)

Refresh lần 1:
A -> B (family F1)

Refresh lần 2:
B -> C (family F1)

Refresh lần 3:
C -> D (family F1)
```

Các token A, B, C, D đều có cùng `familyId`, còn `parentTokenId` tạo thành quan hệ cha-con:

```text
A -> B -> C -> D
```

Thông tin này được lưu trong bảng `refresh_tokens`, gồm:

- `family_id`: nhóm token
- `token_id`: định danh token hiện tại
- `parent_token_id`: token cha
- `used`: token đã sử dụng chưa
- `revoked`: token đã bị vô hiệu hóa chưa

Tham khảo: [RefreshToken.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/common/entity/RefreshToken.java:23).

---

### 3. Reuse detection

Reuse detection là cơ chế phát hiện một refresh token cũ bị sử dụng lại.

Ví dụ:

```text
Client hợp lệ: A -> B

Kẻ tấn công vẫn giữ được A và gửi A lần nữa
```

Khi hệ thống nhận A lần thứ hai:

```java
if (current.getUsed() || current.getRevoked()) {
    refreshTokenRepository.revokeFamily(current.getFamilyId());
    throw UNAUTHORIZED;
}
```

Hệ thống sẽ:

1. Phát hiện A đã `used=true`.
2. Xác định `familyId` của A.
3. Revoke toàn bộ refresh token trong family đó.
4. Từ chối request.

Kết quả:

```text
A: used/revoked
B: revoked
C: revoked
D: revoked
```

Như vậy, nếu phát hiện một token cũ bị dùng lại, dự án giả định rằng cả token family có thể đã bị lộ và vô hiệu hóa toàn bộ chuỗi token liên quan.

Phần revoke family nằm ở [RefreshTokenRepository.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/repository/RefreshTokenRepository.java:21).

---

### 4. Vì sao có khóa pessimistic?

Khi đọc refresh token để xử lý, hệ thống dùng `PESSIMISTIC_WRITE`.

Điều này ngăn trường hợp hai request đồng thời cùng gửi một refresh token:

```text
Request 1: dùng token A
Request 2: cũng dùng token A
```

Database lock giúp chỉ một request có thể đánh dấu A là đã sử dụng thành công. Request còn lại sẽ thấy token đã được dùng và kích hoạt cơ chế reuse detection.

Tham khảo: [RefreshTokenRepository.java](D:/trong_nham_cf/tn1983-crm-system/backend/src/main/java/com/cf/tn1983/auth/repository/RefreshTokenRepository.java:17).

Nói ngắn gọn:

- `One-time-use`: mỗi refresh token chỉ đổi được một lần.
- `Token family`: gom toàn bộ chuỗi token được rotate từ một lần đăng nhập.
- `Reuse detection`: nếu token cũ được dùng lại, revoke toàn bộ family để cắt phiên đăng nhập có khả năng đã bị đánh cắp.