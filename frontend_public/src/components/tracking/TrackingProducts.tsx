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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
      {/* Column 1: Order Information */}
      <div className="lg:col-span-6 bg-espresso-surface rounded-2xl p-space-xl shadow-xl flex flex-col justify-between gap-space-lg">
        <div className="space-y-space-md">
          <div className="flex items-center justify-between pb-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">
                receipt
              </span>
              <h3 className="font-headline-md text-headline-md text-cream-offwhite">
                Thông tin đơn hàng
              </h3>
            </div>
            {order.editable ? (
              <span className="px-2.5 py-1 rounded-full bg-wood-ember/20 text-tertiary font-label-caps text-label-caps uppercase">
                Có thể chỉnh sửa
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-smoke-muted font-label-caps text-label-caps uppercase">
                Đã khóa
              </span>
            )}
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-xs">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-surface-container-high">
              <div>
                <span className="font-label-caps text-label-caps uppercase text-smoke-muted block">
                  Khách hàng
                </span>
                <span className="font-body-lg text-body-lg font-semibold text-cream-offwhite">
                  {customerName}
                </span>
              </div>
              <div>
                <span className="font-label-caps text-label-caps uppercase text-smoke-muted block">
                  Loại khách
                </span>
                <span className="font-body-md text-body-md text-smoke-light">
                  {customerType}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-surface-container-high">
              <div>
                <span className="font-label-caps text-label-caps uppercase text-smoke-muted block">
                  Người nhận
                </span>
                <span className="font-body-md text-body-md font-medium text-cream-offwhite">
                  {receiverName}
                </span>
              </div>
              <div>
                <span className="font-label-caps text-label-caps uppercase text-smoke-muted block">
                  Số điện thoại
                </span>
                <span className="font-body-md text-body-md text-tertiary">
                  {receiverPhone}
                </span>
              </div>
            </div>

            <div className="pb-2 border-b border-surface-container-high">
              <span className="font-label-caps text-label-caps uppercase text-smoke-muted block">
                Địa chỉ nhận
              </span>
              <span className="font-body-md text-body-md text-smoke-light flex items-center gap-1.5 pt-0.5">
                <span className="material-symbols-outlined text-[16px] text-smoke-muted">
                  location_on
                </span>
                {receiverAddress}
              </span>
            </div>

            <div>
              <span className="font-label-caps text-label-caps uppercase text-smoke-muted block">
                Phương thức nhận
              </span>
              <span className="font-body-md text-body-md text-cream-offwhite font-medium">
                {shippingMethod}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md space-y-1">
            <span className="font-label-caps text-label-caps uppercase text-smoke-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-wood-ember">
                notes
              </span>
              Ghi chú
            </span>
            <p className="font-body-md text-body-md text-cream-offwhite italic">
              {noteText}
            </p>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-high/60 shadow-inner flex items-center justify-between text-smoke-muted font-label-subtle text-label-subtle">
          <span>
            Nguồn đơn: <strong className="text-cream-offwhite">{orderSource}</strong>
          </span>
          <span>
            Mã đơn: <strong className="text-tertiary">{orderCode}</strong>
          </span>
        </div>
      </div>

      {/* Column 2: Products & Invoice */}
      <div className="lg:col-span-6 bg-espresso-surface rounded-2xl p-space-xl shadow-xl flex flex-col justify-between gap-space-lg">
        <div className="space-y-space-md">
          <div className="flex items-center justify-between pb-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">
                shopping_bag
              </span>
              <h3 className="font-headline-md text-headline-md text-cream-offwhite">
                Sản phẩm &amp; Thanh toán
              </h3>
            </div>
            <span className="font-label-caps text-label-caps uppercase text-smoke-muted">
              {itemCountLabel}
            </span>
          </div>

          <div className="space-y-space-sm">
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
                  className="flex items-start justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-body-lg text-body-lg font-semibold text-cream-offwhite">
                      {item.productName || "Cà phê hạt"}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1 font-label-subtle text-label-subtle text-smoke-muted">
                      <span>
                        Khối lượng:{" "}
                        <strong className="text-smoke-light">
                          {item.quantityKg ?? 0} kg
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Đóng gói:{" "}
                        <strong className="text-smoke-light">{countText}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Loại túi:{" "}
                        <strong className="text-smoke-light">
                          {packagingName}
                        </strong>
                      </span>
                    </div>
                    <div className="font-label-subtle text-label-subtle text-tertiary">
                      Đơn giá: {unitPriceFormatted}/kg
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-body-lg text-body-lg font-bold text-cream-offwhite">
                      {itemTotalFormatted}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-sm">
            <div className="flex items-center justify-between text-smoke-muted font-body-md text-body-md">
              <span>Phương thức nhận</span>
              <span className="text-cream-offwhite font-medium">
                {shippingMethod}
              </span>
            </div>
            <div className="h-px bg-surface-container-high"></div>
            <div className="flex items-baseline justify-between pt-1">
              <div className="space-y-0.5">
                <span className="font-label-caps text-label-caps uppercase text-smoke-muted">
                  Tổng giá trị đơn hàng
                </span>
                <p className="font-label-subtle text-label-subtle text-tertiary">
                  Thành tiền
                </p>
              </div>
              <span className="font-headline-lg text-headline-lg font-bold text-wood-ember tracking-tight">
                {totalAmountFormatted}
              </span>
            </div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between text-smoke-muted font-label-subtle text-label-subtle">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">
              verified
            </span>
            <span>
              Trạng thái đơn:{" "}
              <strong className="text-cream-offwhite">
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
