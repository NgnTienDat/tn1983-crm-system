# TN1983 Coffee - UI Design System

## Mục tiêu

Thiết kế website doanh nghiệp gia đình sản xuất cà phê tại Buôn Ma Thuột.

Nguyên tắc:

- Đơn giản
- Chân thật
- Tin cậy
- Dễ đọc
- Tập trung chuyển đổi
- Không phô trương
- Không chạy theo xu hướng thiết kế màu mè

UI phải tạo cảm giác:

> Một xưởng cà phê gia đình nhiều năm kinh nghiệm, sản phẩm thật, giá thật, quy trình thật.

---

# Brand Personality

## Nên thể hiện

- Kinh nghiệm
- Ổn định
- Truyền thống
- Chất lượng
- Uy tín
- Gia đình
- Thực tế

## Không nên thể hiện

- Luxury
- Startup công nghệ
- Futuristic
- Corporate enterprise
- Quá premium
- Quá marketing

---

# Color System

Chỉ sử dụng màu đã định nghĩa trong theme.

## Background

- brand-bg
- brand-surface
- brand-surface-elevated

## Accent

- brand-primary
- brand-primary-hover

## Text

- brand-text-primary
- brand-text-secondary
- brand-text-muted

## Border

- brand-border
- brand-border-subtle

Không hardcode màu HEX trong component.

---

# Typography

Chỉ sử dụng các token sau.

## Display

### Display XL

Dùng cho Hero H1.

### Display L

Dùng cho headline lớn.

---

## Heading

### Heading L

Tiêu đề section.

### Heading M

Tiêu đề card.

---

## Body

### Body L

Mô tả section.

### Body M

Nội dung thông thường.

---

## Caption

Thông tin phụ.

---

## Label

Badge, eyebrow, metadata.

---

# Container

Tất cả section phải dùng:

max-w-container

và

px-s-24

Không tạo container riêng.

---

# Spacing

Chỉ sử dụng spacing token trong theme.

Không sử dụng:

- px-[...]
- py-[...]
- mt-[...]
- mb-[...]

trừ trường hợp đặc biệt được giải thích rõ.

---

# Section Layout

Cấu trúc chuẩn:

Section Header

- Label
- Heading
- Description

Section Content

Footer Action (nếu cần)

---

# Border Radius

Chỉ sử dụng:

- rounded-full
- rounded-xl
- rounded-2xl

Không dùng:

- rounded-md
- rounded-lg
- rounded-3xl
- rounded-[...]

---

# Card Standard

Mặc định:

- bg-brand-surface
- border border-brand-border
- rounded-2xl

Hover:

- hover:border-brand-primary/50

Không dùng:

- glassmorphism
- gradient card
- neon
- glow

---

# Button System

## Primary Button

Dùng cho:

- Nhận báo giá

Style:

- bg-brand-primary
- text-brand-bg
- rounded-full

---

## Secondary Button

Dùng cho:

- Xem sản phẩm

Style:

- border
- brand-surface
- rounded-full

---

## Text Action

Dùng cho:

- Xem chi tiết
- Liên hệ tư vấn

Không dùng button solid.

---

# CTA Rules

Toàn website chỉ sử dụng:

## Primary CTA

- Nhận báo giá

## Secondary CTA

- Xem sản phẩm

## Text CTA

- Xem chi tiết
- Liên hệ tư vấn

Không tự tạo CTA mới.

---

# Icons

Material Symbols Outlined.

Chỉ dùng khi thực sự cần.

Không dùng icon để trang trí.

---

# Animation

Cho phép:

- Smooth scroll
- Fade in nhẹ
- Hover border
- Hover elevate nhẹ
- Auto ticker

Không cho phép:

- Parallax
- 3D
- Particle
- Glass animation
- Gradient animation
- Heavy motion

---

# Content Writing

Tone:

- Chân thật
- Rõ ràng
- Dễ hiểu
- Không khoa trương

Ưu tiên:

- Số liệu thực
- Quy trình thực
- Kinh nghiệm thực

Tránh:

- Đỉnh cao
- Tinh hoa
- Hảo hạng
- Thượng hạng
- Đẳng cấp quốc tế
- Số 1 thị trường

---

# Responsive

Bắt buộc kiểm tra:

- Mobile 375px
- Tablet 768px
- Laptop 1366px
- Desktop 1920px

Không được tối ưu riêng cho desktop rồi bỏ qua mobile.

---

# Consistency Rule

Nếu một thành phần đã có pattern ở nơi khác:

- Button
- Card
- Badge
- Section Header
- CTA

thì phải tái sử dụng pattern đó.

Không tạo biến thể mới khi không thật sự cần thiết.

---

# Final Principle

Ưu tiên:

Consistency > Fancy UI

Ưu tiên:

Trust > Decoration

Ưu tiên:

Business Website > Portfolio Website