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
  {
    status: OrderStatus.RECEIVED,
    label: "Đã nhận đơn",
    stepName: "Bước 1",
    icon: "check_circle",
  },
  {
    status: OrderStatus.ROASTING,
    label: "Đang rang",
    stepName: "Bước 2",
    icon: "local_fire_department",
  },
  {
    status: OrderStatus.PACKAGING,
    label: "Đóng gói",
    stepName: "Bước 3",
    icon: "inventory_2",
  },
  {
    status: OrderStatus.WAITING_FOR_SHIPPING,
    label: "Chờ giao hàng",
    stepName: "Bước 4",
    icon: "departure_board",
  },
  {
    status: OrderStatus.SHIPPED,
    label: "Đã gửi hàng",
    stepName: "Bước 5",
    icon: "local_shipping",
  },
  {
    status: OrderStatus.COMPLETED,
    label: "Hoàn thành",
    stepName: "Bước 6",
    icon: "check_circle",
  },
];

export function TrackingTimeline({ order }: Readonly<TrackingTimelineProps>) {
  if (!order) return null;

  const currentStepIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.status === order.status)
  );

  const nextStatusEnum =
    order.allowedNextStatuses && order.allowedNextStatuses.length > 0
      ? order.allowedNextStatuses[0]
      : null;

  const nextStatusMeta = nextStatusEnum ? ORDER_STATUS_MAP[nextStatusEnum] : null;

  const history = order.statusHistory
    ? [...order.statusHistory].sort(
        (a, b) =>
          new Date(b.changedAt || 0).getTime() -
          new Date(a.changedAt || 0).getTime()
      )
    : [];

  return (
    <div className="bg-espresso-surface rounded-2xl p-space-xl lg:p-space-2xl shadow-xl flex flex-col gap-space-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <h2 className="font-headline-md text-headline-md text-cream-offwhite tracking-tight">
            Tiến trình trạng thái đơn hàng
          </h2>
          <p className="font-label-subtle text-label-subtle text-smoke-muted">
            Hệ thống theo dõi thực tế quy trình xử lý
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container-low border border-smoke-border">
          <span className="font-label-caps text-label-caps uppercase text-smoke-muted">
            Trạng thái tiếp theo:
          </span>
          <span className="font-label-caps text-label-caps uppercase text-wood-ember font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              {nextStatusMeta ? nextStatusMeta.icon : "check_circle"}
            </span>
            {nextStatusMeta ? nextStatusMeta.label : "Hoàn thành"}
          </span>
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="w-full overflow-x-auto pb-space-sm">
        <div className="min-w-[760px] grid grid-cols-6 gap-2 relative">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.status} className="flex flex-col gap-space-sm relative">
                <div className="flex items-center">
                  {isCurrent ? (
                    <div className="w-10 h-10 rounded-full bg-wood-ember text-espresso-void flex items-center justify-center z-10 shadow-[0_0_20px_rgba(200,122,75,0.6)] animate-pulse">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {step.icon}
                      </span>
                    </div>
                  ) : isCompleted ? (
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary z-10 shadow-md">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-surface-container-high text-smoke-muted flex items-center justify-center z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        {step.icon}
                      </span>
                    </div>
                  )}

                  {!isLast && (
                    <div
                      className={`h-0.5 flex-1 ${
                        index < currentStepIndex
                          ? "bg-wood-ember"
                          : "bg-surface-container-highest"
                      }`}
                    ></div>
                  )}
                </div>

                <div
                  className={`flex flex-col pr-space-xs ${
                    !isCompleted && !isCurrent ? "opacity-75" : ""
                  }`}
                >
                  <span
                    className={`font-label-caps text-label-caps uppercase ${
                      isCurrent
                        ? "text-wood-ember font-bold"
                        : isCompleted
                        ? "text-tertiary font-medium"
                        : "text-smoke-muted"
                    }`}
                  >
                    {step.stepName} {isCurrent ? "• Hiện tại" : ""}
                  </span>
                  <span
                    className={`font-body-md text-body-md mt-0.5 ${
                      isCurrent
                        ? "font-semibold text-cream-offwhite"
                        : isCompleted
                        ? "font-medium text-cream-offwhite"
                        : "text-smoke-light"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log Box */}
      <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
          <span className="font-label-caps text-label-caps uppercase tracking-wider text-wood-ember flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">
              history
            </span>
            Lịch sử trạng thái đơn hàng
          </span>
          <span className="font-label-subtle text-label-subtle text-smoke-muted">
            Thứ tự mới nhất trước
          </span>
        </div>
        <div className="space-y-2 pt-1">
          {history.length > 0 ? (
            history.map((item, idx) => {
              const meta = ORDER_STATUS_MAP[item.status] || {
                label: item.status,
              };
              const isLatest = idx === 0;

              return (
                <div
                  key={item.id || `${item.status}-${idx}`}
                  className={`flex items-start justify-between p-2 rounded-lg ${
                    isLatest
                      ? "bg-surface-container-high/60"
                      : "bg-surface-container"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLatest ? "bg-wood-ember" : "bg-smoke-muted"
                      }`}
                    ></span>
                    <span
                      className={`font-body-md text-body-md font-medium ${
                        isLatest ? "text-cream-offwhite" : "text-smoke-light"
                      }`}
                    >
                      {meta.label} ({item.status})
                      {item.note ? ` - ${item.note}` : ""}
                    </span>
                  </div>
                  <span
                    className={`font-label-subtle text-label-subtle ${
                      isLatest ? "text-tertiary" : "text-smoke-muted"
                    }`}
                  >
                    {formatDateTime(item.changedAt)}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="flex items-start justify-between p-2 rounded-lg bg-surface-container-high/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-wood-ember"></span>
                <span className="font-body-md text-body-md font-medium text-cream-offwhite">
                  {ORDER_STATUS_MAP[order.status]?.label || order.status} ({order.status})
                </span>
              </div>
              <span className="font-label-subtle text-label-subtle text-tertiary">
                {formatDateTime(order.createdAt)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackingTimeline;