import { OrderStatus } from "@/types/tracking";

export function getStatusLabel(status: OrderStatus): string {
  return status.replaceAll("_", " ");
}