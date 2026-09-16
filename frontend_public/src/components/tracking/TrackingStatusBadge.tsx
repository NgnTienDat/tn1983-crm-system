import { OrderStatus } from "@/types/tracking";

const STATUS_MAP: Record<
  OrderStatus,
  { label: string; description: string; icon: string }
> = {
  [OrderStatus.RECEIVED]: {
    label: "Đã tiếp nhận đơn hàng",
    description: "Đơn hàng đã được xưởng tiếp nhận và xác nhận.",
    icon: "inbox",
  },
  [OrderStatus.ROASTING]: {
    label: "Đang rang cà phê",
    description: "Cà phê đang được rang bằng củi theo yêu cầu của bạn.",
    icon: "local_fire_department",
  },
  [OrderStatus.PACKAGING]: {
    label: "Đang đóng gói",
    description: "Cà phê đã rang xong và đang được đóng gói cẩn thận.",
    icon: "inventory_2",
  },
  [OrderStatus.WAITING_FOR_SHIPPING]: {
    label: "Chờ gửi hàng",
    description: "Đơn hàng đã sẵn sàng, đang chờ bàn giao cho đơn vị vận chuyển.",
    icon: "schedule",
  },
  [OrderStatus.SHIPPED]: {
    label: "Đang vận chuyển",
    description: "Hàng đang trên đường giao đến tay bạn.",
    icon: "local_shipping",
  },
  [OrderStatus.COMPLETED]: {
    label: "Hoàn thành",
    description: "Đơn hàng đã được giao thành công.",
    icon: "check_circle",
  },
};

const STATUS_ORDER: OrderStatus[] = [
  OrderStatus.RECEIVED,
  OrderStatus.ROASTING,
  OrderStatus.PACKAGING,
  OrderStatus.WAITING_FOR_SHIPPING,
  OrderStatus.SHIPPED,
  OrderStatus.COMPLETED,
];

interface TrackingStatusBadgeProps {
  status: OrderStatus;
}

export function TrackingStatusBadge({ status }: TrackingStatusBadgeProps) {
  const meta = STATUS_MAP[status];
  return (
    <span className="inline-flex items-center gap-s-8 px-s-12 py-s-4 rounded-full bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-label uppercase">
      <span className="material-symbols-outlined text-[13px]">{meta.icon}</span>
      {meta.label}
    </span>
  );
}

export { STATUS_MAP, STATUS_ORDER };
export default TrackingStatusBadge;
