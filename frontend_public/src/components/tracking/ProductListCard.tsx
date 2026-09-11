import { Card } from "@/components/ui/Card";
import type { OrderItem } from "@/types/tracking";

export function ProductListCard({ items }: Readonly<{ items: OrderItem[] }>) {
  return <Card title="Products"><ul>{items.map((item) => <li key={item.id}>{item.productName} x {item.quantityKg} kg</li>)}</ul></Card>;
}