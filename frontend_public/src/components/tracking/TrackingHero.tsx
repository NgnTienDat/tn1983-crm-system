export function TrackingHero() {
  return (
    <>
      <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-wood-ember animate-ping"></span>
        <span className="font-label-caps text-label-caps uppercase text-tertiary tracking-[0.2em]">
          Hệ thống theo dõi đơn hàng
        </span>
      </div>
      <div className="space-y-space-xs">
        <h1 className="font-headline-xl text-headline-xl sm:text-display-hero text-cream-offwhite tracking-tight">
          Tra cứu đơn hàng
        </h1>
        <p className="font-body-lg text-body-lg text-smoke-muted max-w-xl mx-auto">
          Theo dõi trạng thái đơn hàng của bạn
        </p>
      </div>
    </>
  );
}

export default TrackingHero;
