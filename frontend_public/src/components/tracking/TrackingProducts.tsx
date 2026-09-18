import {
  OrderDetailResponse,
  CUSTOMER_TYPE_MAP,
  ORDER_SOURCE_MAP,
  SHIPPING_METHOD_MAP,
  PACKAGING_TYPE_MAP,
  PACKAGE_SIZE_MAP,
  ORDER_STATUS_MAP,
  formatCurrency,
} from "@/types/tracking";

interface TrackingProductsProps {
  order?: OrderDetailResponse;
}

export function TrackingProducts({ order }: Readonly<TrackingProductsProps>) {
  if (!order) return null;

  const customerName = order.customer?.name || order.receiverName || "---";
  const customerType = order.customer?.type
    ? CUSTOMER_TYPE_MAP[order.customer.type] || order.customer.type
    : "Khách lẻ";
  const receiverName = order.receiverName || order.customer?.name || "---";
  const receiverPhone = order.receiverPhone || order.customer?.phone || "---";
  const receiverAddress = order.receiverAddress || order.customer?.address || "---";
  const shippingMethod = order.shippingMethod
    ? SHIPPING_METHOD_MAP[order.shippingMethod] || order.shippingMethod
    : "---";
  const orderSource = order.source
    ? ORDER_SOURCE_MAP[order.source] || order.source
    : "---";
  const orderCode = order.orderCode || "---";
  const noteText = order.note || "Không có ghi chú";

  const items = order.items || [];
  const itemCountLabel = `${String(items.length).padStart(2, "0")} Sản phẩm`;
  const totalAmountFormatted = formatCurrency(order.totalAmount);
  const currentStatusLabel =
    ORDER_STATUS_MAP[order.status]?.label || order.status;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Column 1: Order Information */}
      <div className="flex flex-col justify-between gap-6 border border-brand-border bg-white p-6 shadow-sm lg:col-span-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-brand-primary text-[22px]">
                receipt
              </span>
              <h3 className="text-xl font-extrabold tracking-[-0.03em] text-brand-text-primary">
                Thông tin đơn hàng
              </h3>
            </div>
            {order.editable ? (
              <span className="border border-brand-primary/25 bg-brand-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                Có thể chỉnh sửa
              </span>
            ) : (
              <span className="border border-brand-border bg-brand-bg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                Đã khóa
              </span>
            )}
          </div>

          <div className="space-y-3 border border-brand-border bg-brand-bg p-4">
            <div className="grid grid-cols-2 gap-2 border-b border-brand-border pb-2">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                  Khách hàng
                </span>
                <span className="text-base font-bold text-brand-text-primary">
                  {customerName}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                  Loại khách
                </span>
                <span className="text-sm text-brand-text-secondary">
                  {customerType}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b border-brand-border pb-2">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                  Người nhận
                </span>
                <span className="text-sm font-semibold text-brand-text-primary">
                  {receiverName}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                  Số điện thoại
                </span>
                <span className="text-sm font-semibold text-brand-primary">
                  {receiverPhone}
                </span>
              </div>
            </div>

            <div className="border-b border-brand-border pb-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                Địa chỉ nhận
              </span>
              <span className="flex items-center gap-1.5 pt-0.5 text-sm text-brand-text-secondary">
                <span className="material-symbols-outlined text-[16px] text-brand-text-muted">
                  location_on
                </span>
                {receiverAddress}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                Phương thức nhận
              </span>
              <span className="text-sm font-semibold text-brand-text-primary">
                {shippingMethod}
              </span>
            </div>
          </div>

          <div className="space-y-1 border border-brand-border bg-brand-bg p-4">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
              <span className="material-symbols-outlined text-[15px] text-brand-primary">
                notes
              </span>
              Ghi chú
            </span>
            <p className="text-sm italic text-brand-text-primary">
              {noteText}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-brand-border pt-4 text-sm text-brand-text-secondary">
          <span>
            Nguồn đơn: <strong className="text-brand-text-primary">{orderSource}</strong>
          </span>
          <span>
            Mã đơn: <strong className="text-brand-primary">{orderCode}</strong>
          </span>
        </div>
      </div>

      {/* Column 2: Products & Invoice */}
      <div className="flex flex-col justify-between gap-6 border border-brand-border bg-white p-6 shadow-sm lg:col-span-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-primary text-[22px]">
                shopping_bag
              </span>
              <h3 className="text-xl font-extrabold tracking-[-0.03em] text-brand-text-primary">
                Sản phẩm &amp; Thanh toán
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
              {itemCountLabel}
            </span>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => {
              const packagingName = item.packagingType
                ? PACKAGING_TYPE_MAP[item.packagingType] || item.packagingType
                : "Túi thương hiệu";
              const sizeName = item.packageSize
                ? PACKAGE_SIZE_MAP[item.packageSize] || item.packageSize
                : "1kg";
              const countText = `${item.packageCount || 1} gói x ${sizeName}`;
              const unitPriceFormatted = formatCurrency(item.unitPricePerKg);
              const itemTotalFormatted = formatCurrency(item.totalPrice);

              return (
                <div
                  key={item.id || `${item.productId}-${idx}`}
                  className="flex items-start justify-between gap-4 border border-brand-border bg-brand-bg p-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-brand-text-primary">
                      {item.productName || "Cà phê hạt"}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-text-secondary">
                      <span>
                        Khối lượng:{" "}
                        <strong className="text-brand-text-primary">
                          {item.quantityKg ?? 0} kg
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Đóng gói:{" "}
                        <strong className="text-brand-text-primary">{countText}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Loại túi:{" "}
                        <strong className="text-brand-text-primary">
                          {packagingName}
                        </strong>
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-brand-primary">
                      Đơn giá: {unitPriceFormatted}/kg
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-brand-text-primary">
                      {itemTotalFormatted}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 border border-brand-border bg-white p-4">
            <div className="flex items-center justify-between text-sm text-brand-text-secondary">
              <span>Phương thức nhận</span>
              <span className="font-semibold text-brand-text-primary">
                {shippingMethod}
              </span>
            </div>
            <div className="h-px bg-brand-border"></div>
            <div className="flex items-baseline justify-between pt-1">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
                  Tổng giá trị đơn hàng
                </span>
                <p className="text-sm text-brand-primary">
                  Thành tiền
                </p>
              </div>
              <span className="text-2xl font-extrabold tracking-[-0.04em] text-brand-primary">
                {totalAmountFormatted}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-brand-border pt-4 text-sm text-brand-text-secondary">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-primary text-[18px]">
              verified
            </span>
            <span>
              Trạng thái đơn:{" "}
              <strong className="text-brand-text-primary">
                {currentStatusLabel}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingProducts;
