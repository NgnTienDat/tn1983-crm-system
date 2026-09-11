export function formatAmount(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) return "-";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "VND" }).format(Number(amount));
}

export function formatDate(value: string | null | undefined): string {
  return value ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "-";
}