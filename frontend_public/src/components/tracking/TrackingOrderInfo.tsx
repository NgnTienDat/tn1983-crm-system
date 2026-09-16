import {
  OrderDetailResponse,
  ORDER_STATUS_MAP,
  ORDER_SOURCE_MAP,
  SHIPPING_METHOD_MAP,
  formatDateTime,
} from "@/types/tracking";

interface TrackingOrderInfoProps {
  order?: OrderDetailResponse;
}

export function TrackingOrderInfo({ order }: Readonly<TrackingOrderInfoProps>) {
  if (!order) return null;

  const statusMeta = ORDER_STATUS_MAP[order.status] || {
    label: order.status,
    icon: "info",
  };
  const orderCode = order.orderCode || "---";
  const statusLabel = statusMeta.label;
  const createdAtFormatted = formatDateTime(order.createdAt);
  const customerName = order.customer?.name || order.receiverName || "---";
  const sourceLabel = order.source ? (ORDER_SOURCE_MAP[order.source] || order.source) : "---";
  const shippingLabel = order.shippingMethod
    ? (SHIPPING_METHOD_MAP[order.shippingMethod] || order.shippingMethod)
    : "---";

  return (
    <div className="bg-espresso-surface rounded-2xl p-space-xl shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-space-lg">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.16em] text-smoke-muted">
            Mã đơn hàng
          </span>
          <div className="flex items-center flex-wrap gap-space-sm mt-0.5">
            <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-cream-offwhite">
              {orderCode}
            </span>
            <span className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-wood-ember/15 text-primary text-label-caps font-label-caps uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wood-ember opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-wood-ember"></span>
              </span>
              {statusLabel}
            </span>
            {order.editable ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary text-label-caps font-label-caps uppercase tracking-wider border border-smoke-border">
                <span className="material-symbols-outlined text-[14px]">edit</span>
                Có thể chỉnh sửa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-smoke-muted text-label-caps font-label-caps uppercase tracking-wider border border-smoke-border">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Đã khóa
              </span>
            )}
          </div>
        </div>

        <div className="hidden lg:block w-px h-12 bg-surface-container-high"></div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-x-space-lg gap-y-1 font-label-subtle text-label-subtle text-smoke-muted">
          <div>
            <span className="block text-label-caps uppercase text-smoke-muted/70">
              Ngày tạo:
            </span>
            <span className="text-cream-offwhite font-medium">
              {createdAtFormatted}
            </span>
          </div>
          <div>
            <span className="block text-label-caps uppercase text-smoke-muted/70">
              Khách hàng:
            </span>
            <span className="text-cream-offwhite font-medium">{customerName}</span>
          </div>
          <div>
            <span className="block text-label-caps uppercase text-smoke-muted/70">
              Nguồn đơn:
            </span>
            <span className="text-tertiary font-medium">{sourceLabel}</span>
          </div>
          <div>
            <span className="block text-label-caps uppercase text-smoke-muted/70">
              Phương thức nhận:
            </span>
            <span className="text-cream-offwhite font-medium">
              {shippingLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-space-sm flex-wrap">
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-bright text-smoke-light font-label-subtle text-label-subtle transition-all shadow-sm"
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `Đơn hàng ${orderCode}`,
                url: window.location.href,
              }).catch(() => {});
            } else if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span>Chia sẻ</span>
        </button>
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-bright text-smoke-light font-label-subtle text-label-subtle transition-all shadow-sm"
          type="button"
          onClick={() => window.print()}
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>In đơn</span>
        </button>
      </div>
    </div>
  );
}

export default TrackingOrderInfo;
