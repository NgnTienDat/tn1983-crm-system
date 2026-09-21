Tôi nghĩ README của TN1983 nên viết như một **engineering case study** hơn là README mã nguồn truyền thống. Vì đây là sản phẩm đang được sử dụng thực tế, README cần trả lời:

> Bài toán là gì?
> Tôi đã thiết kế hệ thống thế nào?
> Tôi đã đưa ra những quyết định kỹ thuật nào?
> Tôi học được gì từ việc vận hành một hệ thống thật?

Dưới đây là phiên bản README mà tôi sẽ viết nếu đây là portfolio chính của một Fresher/Junior Backend Engineer.

---

# TN1983 Business Suite

Business management platform built for a real family-owned coffee roasting business in Buon Ma Thuot, Vietnam.

The system centralizes customer, product, and order management while providing a public-facing website for product information and order tracking.

Unlike a typical portfolio CRUD project, this system is actively used in daily business operations and processes real customer and order data.

---

# 1. Business Problem

TN1983 is a small coffee roasting business that primarily receives orders through:

* Phone calls
* Messaging applications
* Direct purchases

Before digitization:

* Customer information was stored manually
* Order tracking relied on memory and paper notes
* Production progress was difficult to monitor
* Revenue reporting required manual calculations

The goal of this project was to build a lightweight business management platform that could support daily operations without introducing unnecessary complexity for non-technical users.

---

# 2. Key Features

## Public Website

### Product Showcase

* Coffee product catalog
* Packaging options
* Business introduction

### Business Information

* Family business story
* Roasting process overview
* Contact information

### Order Tracking

Customers can track the status of their orders without contacting the business directly.

---

## Admin Dashboard

### Authentication & Authorization

* Secure login
* Role-based access control
* Protected administration routes

### Customer Management

* Customer profiles
* Search and filtering
* Pagination support

### Product Management

* Product catalog maintenance
* Price management
* Product availability management

### Order Management

* Create and update orders
* Track production progress
* Manage delivery lifecycle

### Revenue Dashboard

* Daily revenue metrics
* Monthly revenue metrics
* Yearly revenue metrics
* Pending shipment overview

---

# 3. Order Workflow

The business workflow was modeled directly from the actual roasting and packaging process.

```text
RECEIVED
    ↓
ROASTING
    ↓
PACKAGING
    ↓
WAITING_FOR_SHIPPING
    ↓
SHIPPED
    ↓
COMPLETED
```

This workflow allows both business owners and customers to understand the current order state at any time.

---

# 4. System Architecture

The platform follows a simple but production-oriented architecture.

```text
Customer Website (Next.js)
            │
            │
            ▼
        Cloudflare
            │
            ▼
       Reverse Proxy
            │
            ▼
 Spring Boot Backend API
            │
            ▼
      PostgreSQL
```

Current deployment architecture:

* Public Website deployed on Vercel
* Admin Dashboard deployed on Vercel
* Backend deployed on Azure VM
* Reverse proxy layer for traffic management
* PostgreSQL database hosted on Neon
* Cloudflare providing DNS, TLS/SSL, and traffic protection

### Architecture Diagram

*(Insert architecture diagram image here)*

Bạn có thể dùng đúng ảnh vừa gửi.

---

# 5. Technical Highlights

## Authentication & Session Management

Implemented:

* JWT authentication
* Refresh token mechanism
* Secure API access
* Protected administration routes

---

## API Design

Designed a standardized REST API structure:

```json
{
  "code": 1000,
  "message": "Success",
  "data": {}
}
```

Features include:

* Consistent response format
* Pagination support
* Validation handling
* Centralized exception handling

---

## Security

Implemented multiple security layers:

* Password hashing
* JWT authentication
* Role-based authorization
* Request validation
* API rate limiting
* Cloudflare protection
* Secure CORS configuration

---

## Production Deployment

Built automated deployment workflows for:

* Backend services
* Public website
* Admin dashboard

Deployment process supports continuous delivery from Git repositories to production environments.

---

# 6. Engineering Decisions

## Why Modular Monolith Instead of Microservices?

The application currently serves a single business domain and is maintained by a single developer.

A modular monolith provides:

* Clear module boundaries
* Lower operational complexity
* Easier deployment
* Simpler debugging

while preserving a migration path toward microservices if future requirements demand it.

---

## Why Next.js For The Public Website?

The public website is customer-facing and benefits from:

* Better SEO
* Faster initial page loads
* Improved search engine discoverability

---

## Why React For The Admin Dashboard?

Administrative screens require:

* Dynamic forms
* Complex data tables
* Interactive management workflows

React provides a productive environment for building highly interactive internal tools.

---

## Why Cloudflare?

Cloudflare provides:

* DNS management
* TLS/SSL termination
* Basic DDoS mitigation
* Edge caching

allowing the application server to remain focused on business logic.

---

# 7. Challenges & Lessons Learned

## Translating Real Business Processes Into Software

One of the biggest challenges was converting informal business operations into structured workflows.

This required:

* Identifying actual operational steps
* Defining valid state transitions
* Simplifying processes for daily use

---

## Balancing Simplicity And Scalability

The system needed to remain:

* Easy enough for non-technical users
* Structured enough for future expansion

This influenced many architectural decisions throughout the project.

---

## End-to-End Ownership

This project provided hands-on experience across:

* Backend development
* Frontend development
* Database design
* Security implementation
* Infrastructure setup
* Deployment automation
* Production operations

---

# 8. Tech Stack

## Backend

* Java
* Spring Boot
* Spring Security
* JWT
* PostgreSQL
* MapStruct
* Lombok

---

## Frontend (Public Website)

* Next.js
* TypeScript
* Tailwind CSS

---

## Frontend (Admin Dashboard)

* React
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand

---

## Infrastructure

* Docker
* Nginx
* Azure Virtual Machine
* Vercel
* Cloudflare
* Neon PostgreSQL
* GitHub Actions

---

# 9. Screenshots

## Public Website

**Screenshot 1 — Home Page Hero Section**

*(Insert image)*

**Screenshot 2 — Product Showcase**

*(Insert image)*

**Screenshot 3 — Coffee Roasting Process Section**

*(Insert image)*

**Screenshot 4 — Mobile Responsive View**

*(Insert image)*

---

## Admin Dashboard

**Screenshot 5 — Dashboard Overview**

*(Insert image)*

**Screenshot 6 — Customer Management**

*(Insert image)*

**Screenshot 7 — Product Management**

*(Insert image)*

**Screenshot 8 — Order Management**

*(Insert image)*

**Screenshot 9 — Order Detail Screen**

*(Insert image)*

**Screenshot 10 — Revenue Dashboard**

*(Insert image)*

---

## Deployment & Operations

**Screenshot 11 — CI/CD Pipeline**

*(Insert image)*

**Screenshot 12 — Production Deployment Overview**

*(Insert image)*

---

# 10. Future Enhancements

Planned improvements include:

* Customer account registration
* Customer login and order history
* Inventory management
* Analytics dashboard
* Notification system
* Customer loyalty features
* Multi-user administration
* Operational reporting

---

# Author

Nguyen Tien Dat

Final-year Computer Science Student

Java Backend Developer

Ho Chi Minh City Open University

---

Riêng phần **System Architecture**, tôi sẽ giữ sơ đồ ở mức như ảnh bạn gửi là hợp lý. Nó cho thấy bạn hiểu deployment, reverse proxy, DNS, CDN, TLS, database hosting... nhưng không tiết lộ IP, network topology, cấu hình Nginx, Docker Compose hay các chi tiết vận hành nhạy cảm. Điều đó cân bằng được giữa mục tiêu portfolio và yêu cầu bảo vệ hệ thống đang chạy thật.
