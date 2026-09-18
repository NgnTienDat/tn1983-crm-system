import {
  OrderDetailResponse,
  OrderStatus,
  ORDER_STATUS_MAP,
  formatDateTime,
} from "@/types/tracking";

interface TrackingTimelineProps {
  order?: OrderDetailResponse;
}

const STEPS: {
  status: OrderStatus;
  label: string;
  stepName: string;
  icon: string;
}[] = [
  { status: OrderStatus.RECEIVED, label: "Đã nhận đơn", stepName: "Bước 1", icon: "check_circle" },
  { status: OrderStatus.ROASTING, label: "Đang rang", stepName: "Bước 2", icon: "local_fire_department" },
  { status: OrderStatus.PACKAGING, label: "Đóng gói", stepName: "Bước 3", icon: "inventory_2" },
  { status: OrderStatus.WAITING_FOR_SHIPPING, label: "Chờ giao hàng", stepName: "Bước 4", icon: "departure_board" },
  { status: OrderStatus.SHIPPED, label: "Đã gửi hàng", stepName: "Bước 5", icon: "local_shipping" },
  { status: OrderStatus.COMPLETED, label: "Hoàn thành", stepName: "Bước 6", icon: "check_circle" },
];

export function TrackingTimeline({ order }: Readonly<TrackingTimelineProps>) {
  if (!order) return null;

  const currentStepIndex = Math.max(0, STEPS.findIndex((s) => s.status === order.status));
  const nextStatusEnum = order.allowedNextStatuses && order.allowedNextStatuses.length > 0
    ? order.allowedNextStatuses[0]
    : null;
  const nextStatusMeta = nextStatusEnum ? ORDER_STATUS_MAP[nextStatusEnum] : null;
  const history = order.statusHistory
    ? [...order.statusHistory].sort(
        (a, b) => new Date(b.changedAt || 0).getTime() - new Date(a.changedAt || 0).getTime()
      )
    : [];

  return (
    <div className="flex flex-col gap-8 border border-brand-border bg-white p-6 shadow-sm lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold tracking-[-0.03em] text-brand-text-primary">
            Tiến trình trạng thái đơn hàng
          </h2>
          <p className="mt-1 text-sm text-brand-text-secondary">
            Hệ thống theo dõi thực tế quy trình xử lý
          </p>
        </div>
        <div className="inline-flex items-center gap-2 border border-brand-border bg-brand-bg px-3 py-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted">
            Trạng thái tiếp theo:
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-primary">
            <span className="material-symbols-outlined text-[16px]">
              {nextStatusMeta ? nextStatusMeta.icon : "check_circle"}
            </span>
            {nextStatusMeta ? nextStatusMeta.label : "Hoàn thành"}
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <div className="grid min-w-[760px] grid-cols-6 gap-2">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.status} className="relative flex flex-col gap-3">
                <div className="flex items-center">
                  {isCurrent ? (
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {step.icon}
                      </span>
                    </div>
                  ) : isCompleted ? (
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  ) : (
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-bg text-brand-text-muted">
                      <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                    </div>
                  )}

                  {!isLast && (
                    <div className={`h-px flex-1 ${index < currentStepIndex ? "bg-brand-primary" : "bg-brand-border"}`} />
                  )}
                </div>

                <div className={`flex flex-col pr-2 ${!isCompleted && !isCurrent ? "opacity-65" : ""}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? "text-brand-primary" : isCompleted ? "text-brand-primary/75" : "text-brand-text-muted"}`}>
                    {step.stepName} {isCurrent ? "• Hiện tại" : ""}
                  </span>
                  <span className={`mt-1 text-sm ${isCurrent || isCompleted ? "font-bold text-brand-text-primary" : "text-brand-text-secondary"}`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-brand-border bg-brand-bg p-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-primary">
            <span className="material-symbols-outlined text-[18px]">history</span>
            Lịch sử trạng thái đơn hàng
          </span>
          <span className="text-xs text-brand-text-muted">Thứ tự mới nhất trước</span>
        </div>
        <div className="space-y-2 pt-3">
          {history.length > 0 ? (
            history.map((item, idx) => {
              const meta = ORDER_STATUS_MAP[item.status] || { label: item.status };
              const isLatest = idx === 0;

              return (
                <div key={item.id || `${item.status}-${idx}`} className={`flex items-start justify-between gap-4 border-b border-brand-border py-2 last:border-b-0 ${isLatest ? "font-semibold" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${isLatest ? "bg-brand-primary" : "bg-brand-text-muted"}`} />
                    <span className={`text-sm ${isLatest ? "text-brand-text-primary" : "text-brand-text-secondary"}`}>
                      {meta.label} ({item.status}){item.note ? ` - ${item.note}` : ""}
                    </span>
                  </div>
                  <span className={`shrink-0 text-xs ${isLatest ? "text-brand-primary" : "text-brand-text-muted"}`}>
                    {formatDateTime(item.changedAt)}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="flex items-start justify-between gap-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-primary" />
                <span className="text-sm font-semibold text-brand-text-primary">
                  {ORDER_STATUS_MAP[order.status]?.label || order.status} ({order.status})
                </span>
              </div>
              <span className="shrink-0 text-xs text-brand-primary">{formatDateTime(order.createdAt)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackingTimeline;
