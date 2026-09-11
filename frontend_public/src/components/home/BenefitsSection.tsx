import { Container } from "@/components/ui/Container";

export function BenefitsSection() {
  return (
    <section className="w-full bg-brand-surface py-s-24 border-b border-brand-border">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-s-24 text-center md:text-left">
          <div className="flex items-center gap-s-8 mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-body-m text-brand-text-secondary">
              Cà phê rang củi thủ công <strong className="text-brand-text-primary font-medium">Buôn Ma Thuột</strong>
            </span>
          </div>
          <div className="flex items-center gap-s-8 mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-body-m text-brand-text-secondary">
              Nguồn cung ổn định cho <strong className="text-brand-text-primary font-medium">quán &amp; đại lý</strong>
            </span>
          </div>
          <div className="flex items-center gap-s-8 mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-body-m text-brand-text-secondary">
              Đóng gói theo <strong className="text-brand-text-primary font-medium">yêu cầu máy / phin</strong>
            </span>
          </div>
          <div className="flex items-center gap-s-8 mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-body-m text-brand-text-secondary">
              Giao hàng tận nơi <strong className="text-brand-text-primary font-medium">toàn quốc</strong>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BenefitsSection;
