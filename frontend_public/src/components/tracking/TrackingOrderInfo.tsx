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
    <div className="flex flex-col gap-6 border border-brand-border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col lg:flex-row lg:items-center gap-space-lg">
        <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-text-muted">
            Mã đơn hàng
          </span>
          <div className="flex items-center flex-wrap gap-space-sm mt-0.5">
            <span className="text-3xl font-extrabold tracking-[-0.04em] text-brand-text-primary">
              {orderCode}
            </span>
            <span className="inline-flex items-center gap-2 border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wood-ember opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary"></span>
              </span>
              {statusLabel}
            </span>
            {order.editable ? (
              <span className="inline-flex items-center gap-1 border border-brand-primary/25 bg-brand-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                <span className="material-symbols-outlined text-[14px]">edit</span>
                Có thể chỉnh sửa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 border border-brand-border bg-brand-bg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Đã khóa
              </span>
            )}
          </div>
        </div>

        <div className="hidden h-12 w-px bg-brand-border lg:block"></div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-brand-text-secondary sm:grid-cols-4 lg:flex lg:flex-row">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
              Ngày tạo:
            </span>
            <span className="font-semibold text-brand-text-primary">
              {createdAtFormatted}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
              Khách hàng:
            </span>
            <span className="font-semibold text-brand-text-primary">{customerName}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
              Nguồn đơn:
            </span>
            <span className="font-semibold text-brand-primary">{sourceLabel}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
              Phương thức nhận:
            </span>
            <span className="font-semibold text-brand-text-primary">
              {shippingLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-space-sm flex-wrap">
        <button
          className="inline-flex items-center gap-2 border border-brand-border bg-brand-bg px-3 py-2 text-sm font-semibold text-brand-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary"
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
          className="inline-flex items-center gap-2 border border-brand-border bg-brand-bg px-3 py-2 text-sm font-semibold text-brand-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary"
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
