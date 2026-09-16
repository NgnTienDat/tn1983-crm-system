interface TrackingErrorStateProps {
  message?: string;
}

export function TrackingErrorState({ message }: TrackingErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-s-96 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center mb-s-24">
        <span className="material-symbols-outlined text-[32px] text-brand-text-muted">
          error
        </span>
      </div>
      <p className="text-body-l text-brand-text-primary font-medium mb-s-8">
        Không tìm thấy đơn hàng
      </p>
      {message && (
        <p className="text-body-m text-brand-text-muted font-normal max-w-sm">
          {message}
        </p>
      )}
    </div>
  );
}

export default TrackingErrorState;
