import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function TrackingSection() {
  return (
    <section className="snap-section w-full bg-brand-surface py-s-64 border-b border-brand-border">
      <Container>
        <Card variant="elevated" className="flex flex-col md:flex-row items-center justify-between gap-s-24">
          <div className="space-y-s-8 text-center md:text-left">
            <span className="text-label uppercase tracking-wider text-brand-primary block">
              TRA CỨU HÀNH TRÌNH ĐƠN HÀNG
            </span>
            <h3 className="text-heading-l text-brand-text-primary font-semibold">
              Theo dõi tiến độ đơn hàng của bạn
            </h3>
            <p className="text-body-m text-brand-text-secondary max-w-xl">
              Nhập mã đơn hàng hoặc số điện thoại để tra cứu ngay tình trạng chế biến, đóng gói và vận chuyển từ xưởng Trọng Nhâm.
            </p>
          </div>
          <Button
            href="/tracking"
            variant="primary"
            size="lg"
            className="shrink-0 shadow-lg shadow-brand-primary/20"
            icon={<span className="material-symbols-outlined text-[18px] ml-s-8">search</span>}
          >
            Tra cứu đơn hàng
          </Button>
        </Card>
      </Container>
    </section>
  );
}

export default TrackingSection;
