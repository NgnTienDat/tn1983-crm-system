export function TrackingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center border border-brand-border bg-white py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center border border-brand-border bg-brand-bg">
        <span className="material-symbols-outlined text-[32px] text-brand-text-muted">package_2</span>
      </div>
      <p className="text-lg text-brand-text-muted">Nhập mã đơn hàng để bắt đầu tra cứu</p>
    </div>
  );
}

export default TrackingEmptyState;
