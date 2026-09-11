"use client";

import { useState } from "react";
import { OrderInfoCard } from "@/components/tracking/OrderInfoCard";
import { ProductListCard } from "@/components/tracking/ProductListCard";
import { TrackingHeader } from "@/components/tracking/TrackingHeader";
import { TrackingSearch } from "@/components/tracking/TrackingSearch";
import { TrackingTimeline } from "@/components/tracking/TrackingTimeline";
import { Loading } from "@/components/ui/Loading";
import { useTracking } from "@/hooks/useTracking";

export function TrackingPage() {
  const [keyword, setKeyword] = useState("");
  const query = useTracking(keyword);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <TrackingHeader />
      <div className="mt-8"><TrackingSearch onSearch={setKeyword} /></div>
      {query.isLoading && <Loading />}
      {query.isError && <p className="mt-6 text-sm text-red-600" role="alert">Unable to find this order.</p>}
      {query.data && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <OrderInfoCard order={query.data} />
          <ProductListCard items={query.data.items} />
          <TrackingTimeline entries={query.data.statusHistory} />
        </div>
      )}
      {/* Future customer login can provide order history after authentication is introduced. */}
    </section>
  );
}

export default TrackingPage;