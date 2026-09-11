import { formatDate } from "@/lib/format";
import type { StatusHistory } from "@/types/tracking";
import { Card } from "@/components/ui/Card";

export function TrackingTimeline({ entries }: Readonly<{ entries: StatusHistory[] }>) {
  return <Card title="Tracking Timeline"><ul className="space-y-2">{entries.map((entry) => <li key={entry.id}>{entry.status} - {formatDate(entry.changedAt)}</li>)}</ul></Card>;
}