import { api } from "@/lib/api";
import { TRACKING_ENDPOINT } from "@/lib/constants";
import type { ApiResponse, TrackingResponse } from "@/types/tracking";

export async function getTracking(keyword: string): Promise<TrackingResponse> {
  const response = await api.get<ApiResponse<TrackingResponse>>(`${TRACKING_ENDPOINT}/${encodeURIComponent(keyword)}`);
  if (!response.data.data) throw new Error(response.data.message || "Order not found");
  return response.data.data;
}