interface TrackingErrorStateProps {
  message?: string;
}

export function TrackingErrorState({ message }: TrackingErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center border border-brand-border bg-white py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center border border-brand-border bg-brand-bg">
        <span className="material-symbols-outlined text-[32px] text-brand-text-muted">error</span>
      </div>
      <p className="mb-2 text-lg font-semibold text-brand-text-primary">Không tìm thấy đơn hàng</p>
      {message && <p className="max-w-sm text-sm leading-6 text-brand-text-muted">{message}</p>}
    </div>
  );
}

export default TrackingErrorState;
