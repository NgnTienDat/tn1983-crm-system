export function TrackingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-s-96 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center mb-s-24">
        <span className="material-symbols-outlined text-[32px] text-brand-text-muted">
          package_2
        </span>
      </div>
      <p className="text-body-l text-brand-text-muted font-normal">
        Nhập mã đơn hàng để bắt đầu tra cứu
      </p>
    </div>
  );
}

export default TrackingEmptyState;
