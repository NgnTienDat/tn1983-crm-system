export enum OrderStatus {
  RECEIVED = "RECEIVED",
  ROASTING = "ROASTING",
  PACKAGING = "PACKAGING",
  WAITING_FOR_SHIPPING = "WAITING_FOR_SHIPPING",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
}

export enum CustomerType {
  COFFEE_SHOP = "COFFEE_SHOP",
  AGENT = "AGENT",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum OrderSource {
  PHONE = "PHONE",
  ZALO = "ZALO",
  DIRECT = "DIRECT",
}

export enum ShippingMethod {
  PICKUP = "PICKUP",
  VIETNAM_POST = "VIETNAM_POST",
  TIEN_OANH = "TIEN_OANH",
  OTHER = "OTHER",
}

export enum PackagingType {
  BRANDED_BAG = "BRANDED_BAG",
  SILVER_BAG = "SILVER_BAG",
}

export enum PackageSize {
  KG_1 = "KG_1",
  GRAM_500 = "GRAM_500",
  GRAM_250 = "GRAM_250",
}

export interface CustomerResponse {
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  note?: string;
  type?: CustomerType;
  active?: boolean;
  createdAt?: string;
}

export interface OrderItemResponse {
  id?: string;
  productId?: string;
  productName?: string;
  quantityKg?: number;
  unitPricePerKg?: number;
  totalPrice?: number;
  packagingType?: PackagingType;
  packageSize?: PackageSize;
  packageCount?: number;
}

export interface OrderStatusHistoryResponse {
  id?: string;
  status: OrderStatus;
  note?: string;
  changedAt?: string;
  changedBy?: {
    id?: string;
    name?: string;
    username?: string;
  };
}

export interface OrderDetailResponse {
  id?: string;
  orderCode: string;
  customer?: CustomerResponse;
  receiverName?: string;
  receiverPhone?: string;
  receiverAddress?: string;
  source?: OrderSource;
  shippingMethod?: ShippingMethod;
  totalAmount?: number;
  status: OrderStatus;
  editable: boolean;
  allowedNextStatuses?: OrderStatus[];
  note?: string;
  items?: OrderItemResponse[];
  statusHistory?: OrderStatusHistoryResponse[];
  createdAt?: string;
}

export type TrackingResponse = OrderDetailResponse;
export type Order = OrderDetailResponse;
export type Customer = CustomerResponse;
export type OrderItem = OrderItemResponse;
export type StatusHistory = OrderStatusHistoryResponse;

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const ORDER_STATUS_MAP: Record<
  OrderStatus,
  { label: string; stepName: string; stepIndex: number; icon: string }
> = {
  [OrderStatus.RECEIVED]: {
    label: "Đã nhận đơn",
    stepName: "Bước 1",
    stepIndex: 0,
    icon: "check_circle",
  },
  [OrderStatus.ROASTING]: {
    label: "Đang rang",
    stepName: "Bước 2",
    stepIndex: 1,
    icon: "local_fire_department",
  },
  [OrderStatus.PACKAGING]: {
    label: "Đóng gói",
    stepName: "Bước 3",
    stepIndex: 2,
    icon: "inventory_2",
  },
  [OrderStatus.WAITING_FOR_SHIPPING]: {
    label: "Chờ giao hàng",
    stepName: "Bước 4",
    stepIndex: 3,
    icon: "departure_board",
  },
  [OrderStatus.SHIPPED]: {
    label: "Đã gửi hàng",
    stepName: "Bước 5",
    stepIndex: 4,
    icon: "local_shipping",
  },
  [OrderStatus.COMPLETED]: {
    label: "Hoàn thành",
    stepName: "Bước 6",
    stepIndex: 5,
    icon: "check_circle",
  },
};

export const CUSTOMER_TYPE_MAP: Record<CustomerType, string> = {
  [CustomerType.COFFEE_SHOP]: "Quán cà phê",
  [CustomerType.AGENT]: "Đại lý",
  [CustomerType.INDIVIDUAL]: "Khách hàng cá nhân",
};

export const ORDER_SOURCE_MAP: Record<OrderSource, string> = {
  [OrderSource.PHONE]: "Điện thoại",
  [OrderSource.ZALO]: "Zalo",
  [OrderSource.DIRECT]: "Trực tiếp",
};

export const SHIPPING_METHOD_MAP: Record<ShippingMethod, string> = {
  [ShippingMethod.PICKUP]: "Nhận tại xưởng",
  [ShippingMethod.VIETNAM_POST]: "Bưu điện (VNPost)",
  [ShippingMethod.TIEN_OANH]: "Xe Tiến Oanh",
  [ShippingMethod.OTHER]: "Phương thức khác",
};

export const PACKAGING_TYPE_MAP: Record<PackagingType, string> = {
  [PackagingType.BRANDED_BAG]: "Túi thương hiệu",
  [PackagingType.SILVER_BAG]: "Túi bạc",
};

export const PACKAGE_SIZE_MAP: Record<PackageSize, string> = {
  [PackageSize.KG_1]: "1 kg",
  [PackageSize.GRAM_500]: "500g",
  [PackageSize.GRAM_250]: "250g",
};

export function formatCurrency(amount?: number): string {
  if (amount == null) return "0 đ";
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}

export function formatDateTime(dateTimeStr?: string): string {
  if (!dateTimeStr) return "---";
  try {
    const d = new Date(dateTimeStr);
    if (isNaN(d.getTime())) return dateTimeStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return dateTimeStr;
  }
}