export function TrackingHero() {
  return (
    <>
      <div className="inline-flex items-center gap-2 border border-brand-border bg-white px-3 py-1.5 shadow-xs">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">
          Hệ thống theo dõi đơn hàng
        </span>
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-[-0.05em] text-brand-text-primary sm:text-6xl">
          Tra cứu đơn hàng
        </h1>
        <p className="max-w-xl text-base leading-7 text-brand-text-secondary sm:text-lg">
          Theo dõi trạng thái đơn hàng của bạn
        </p>
      </div>
    </>
  );
}

export default TrackingHero;
