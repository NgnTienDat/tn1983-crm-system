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
    <div className="w-full pt-space-xs">
      <form
        className="relative flex items-center p-1.5 bg-espresso-surface rounded-full shadow-2xl transition-all duration-300 focus-within:shadow-[0_0_0_2px_rgba(200,122,75,0.4)]"
        id="trackingForm"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center pl-space-lg pr-space-xs text-smoke-muted">
          <span className="material-symbols-outlined text-[22px]">search</span>
        </div>
        <input
          className="w-full bg-transparent text-cream-offwhite font-body-md text-body-md placeholder:text-smoke-muted/60 focus:outline-none py-space-sm pr-space-sm"
          id="trackingInput"
          placeholder="Ví dụ: TN26000002 hoặc 0332028765"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
          className="flex-shrink-0 inline-flex items-center gap-space-2xs px-space-xl py-space-sm rounded-full bg-wood-ember hover:bg-tertiary text-espresso-void font-label-caps text-label-caps uppercase tracking-wider font-semibold shadow-[0_4px_20px_rgba(200,122,75,0.3)] transition-all active:scale-95"
          id="searchBtn"
          type="submit"
        >
          <span>Tra cứu</span>
          <span className="material-symbols-outlined text-[16px] -mr-1">
            arrow_forward
          </span>
        </button>
      </form>
      <div className="flex items-center justify-center flex-wrap gap-space-xs pt-space-md text-smoke-muted font-label-subtle text-label-subtle">
        <span className="text-smoke-muted/70">Gợi ý:</span>
        <button
          className="px-space-sm py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-smoke-light transition-all flex items-center gap-1.5 shadow-sm"
          onClick={() => handleSuggestion("TN26000002")}
          type="button"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-wood-ember"></span>
          <span>TN26000002</span>
        </button>
        <button
          className="px-space-sm py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-smoke-light transition-all shadow-sm"
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