export enum OrderStatus { RECEIVED = "RECEIVED", ROASTING = "ROASTING", PACKAGING = "PACKAGING", WAITING_FOR_SHIPPING = "WAITING_FOR_SHIPPING", SHIPPED = "SHIPPED", COMPLETED = "COMPLETED" }
export enum CustomerType { COFFEE_SHOP = "COFFEE_SHOP", COMPANY = "COMPANY", INDIVIDUAL = "INDIVIDUAL" }
export enum OrderSource { PHONE = "PHONE", ZALO = "ZALO", DIRECT = "DIRECT" }
export enum ShippingMethod { DELIVERY = "DELIVERY", PICKUP = "PICKUP" }
export enum PackagingType { BRANDED_BAG = "BRANDED_BAG", BULK = "BULK" }
export enum PackageSize { KG_1 = "KG_1", KG_5 = "KG_5", KG_10 = "KG_10" }

export interface Customer { id?: string; name?: string; phone?: string; address?: string; note?: string; type?: CustomerType; active?: boolean; createdAt?: string; }
export interface Receiver { name?: string; phone?: string; address?: string; }
export interface OrderItem { id?: string; productId?: string; productName?: string; quantityKg?: number; unitPricePerKg?: number; totalPrice?: number; packagingType?: PackagingType; packageSize?: PackageSize; packageCount?: number; }
export interface StatusHistory { id?: string; status: OrderStatus; note?: string; changedAt?: string; changedBy?: { id?: string; name?: string }; }
export interface Order { id?: string; orderCode: string; customer?: Customer; receiver?: Receiver; receiverName?: string; receiverPhone?: string; receiverAddress?: string; source?: OrderSource; shippingMethod?: ShippingMethod; totalAmount?: number; status: OrderStatus; editable: boolean; allowedNextStatuses: OrderStatus[]; note?: string; items: OrderItem[]; statusHistory: StatusHistory[]; createdAt?: string; }
export interface TrackingResponse extends Order {}
export interface ApiResponse<T> { code: number; message: string; data: T; }