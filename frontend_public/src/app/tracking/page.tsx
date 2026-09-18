"use client";

import { useState } from "react";
import { useTracking } from "@/hooks/useTracking";
import {
  TrackingHero,
  TrackingSearch,
  TrackingOrderInfo,
  TrackingProducts,
  TrackingTimeline,
  TrackingEmptyState,
  TrackingErrorState,
} from "@/components/tracking";

export function TrackingPage() {
  const [searchValue, setSearchValue] = useState("TN26000002");
  const { data, isLoading, isError, error, refetch } = useTracking(searchValue);

  const handleSearch = (keyword: string) => {
    const trimmed = keyword.trim();
    if (trimmed === searchValue) {
      refetch();
    } else {
      setSearchValue(trimmed);
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient Glow Effects */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-wood-ember/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-80 right-10 w-[420px] h-[420px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="mx-auto flex w-full max-w-[84rem] flex-col gap-space-4xl px-space-md pb-space-3xl pt-32 sm:px-space-xl sm:pt-36">
        {/* Section 1: Search & Lookup Interface */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto w-full space-y-space-lg">
          <TrackingHero />
          <TrackingSearch defaultValue={searchValue} onSearch={handleSearch} />
        </section>

        {/* Section 2: Results / Loading / Error Display */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 border border-brand-border bg-white p-12 text-center shadow-sm">
            <div className="h-12 w-12 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
            <p className="text-base font-semibold text-brand-text-primary">
              Đang tra cứu thông tin đơn hàng...
            </p>
          </div>
        )}

        {!isLoading && (isError || (searchValue && !data)) && (
          <TrackingErrorState
            message={
              error instanceof Error
                ? error.message
                : "Không tìm thấy thông tin đơn hàng phù hợp. Vui lòng kiểm tra lại mã đơn hoặc số điện thoại."
            }
          />
        )}

        {!isLoading && !searchValue && <TrackingEmptyState />}

        {!isLoading && data && (
          <section className="flex flex-col gap-space-2xl w-full">
            {/* Header & Meta Bar */}
            <TrackingOrderInfo order={data} />

            {/* Timeline & Status History */}
            <TrackingTimeline order={data} />

            {/* 2-Column Bento Grid (Customer Info & Items/Payment) */}
            <TrackingProducts order={data} />
          </section>
        )}
      </div>
    </div>
  );
}

export default TrackingPage;
