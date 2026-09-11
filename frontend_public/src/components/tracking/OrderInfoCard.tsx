import { Card } from "@/components/ui/Card";
import { formatAmount } from "@/lib/format";
import type { Order } from "@/types/tracking";

export function OrderInfoCard({ order }: Readonly<{ order: Order }>) {
  return <Card title="Order Information"><p>Code: {order.orderCode}</p><p>Status: {order.status}</p><p>Total: {formatAmount(order.totalAmount)}</p></Card>;
}