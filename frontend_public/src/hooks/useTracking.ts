"use client";

import { useQuery } from "@tanstack/react-query";
import { getTracking } from "@/services/tracking.service";

export function useTracking(keyword: string) {
  return useQuery({ queryKey: ["tracking", keyword], queryFn: () => getTracking(keyword), enabled: Boolean(keyword.trim()) });
}