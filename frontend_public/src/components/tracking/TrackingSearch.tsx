"use client";

import { useState } from "react";

interface TrackingSearchProps {
  defaultValue?: string;
  onSearch?: (keyword: string) => void;
}

export function TrackingSearch({
  defaultValue = "TN26000002",
  onSearch,
}: Readonly<TrackingSearchProps>) {
  const [inputVal, setInputVal] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputVal);
    }
  };

  const handleSuggestion = (val: string) => {
    setInputVal(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <div className="w-full pt-1">
      <form
        className="relative flex items-center border border-brand-border bg-white p-1 shadow-sm transition-all duration-300 focus-within:border-brand-primary focus-within:shadow-[0_0_0_2px_rgba(139,94,60,0.12)]"
        id="trackingForm"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center px-4 text-brand-text-muted">
          <span className="material-symbols-outlined text-[22px]">search</span>
        </div>
        <input
          className="w-full bg-transparent py-3 pr-3 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none"
          id="trackingInput"
          placeholder="Ví dụ: TN26000002 hoặc 0332028765"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
          className="inline-flex flex-shrink-0 items-center gap-1.5 bg-brand-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-primary-hover active:scale-[0.98]"
          id="searchBtn"
          type="submit"
        >
          <span>Tra cứu</span>
          <span className="material-symbols-outlined -mr-1 text-[16px]">arrow_forward</span>
        </button>
      </form>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-sm text-brand-text-muted">
        <span className="text-brand-text-muted/80">Gợi ý:</span>
        <button
          className="inline-flex items-center gap-1.5 border border-brand-border bg-white px-3 py-1.5 text-brand-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary"
          onClick={() => handleSuggestion("TN26000002")}
          type="button"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
          <span>TN26000002</span>
        </button>
        <button
          className="border border-brand-border bg-white px-3 py-1.5 text-brand-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary"
          onClick={() => handleSuggestion("0332028765")}
          type="button"
        >
          0332028765
        </button>
      </div>
    </div>
  );
}

export default TrackingSearch;
