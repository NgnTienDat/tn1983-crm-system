import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  return (
    <section className="snap-section w-full bg-brand-surface py-s-64 border-b border-brand-border relative" id="lien-he">
      <Container>
        <div className="relative rounded-2xl bg-brand-surface-elevated p-s-32 lg:p-s-48 border border-brand-border overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-s-32">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="mb-s-12">
                <Badge variant="primary">KẾT NỐI TRỰC TIẾP VỚI XƯỞNG</Badge>
              </div>
              <h3 className="text-heading-l text-brand-text-primary mb-s-8 font-semibold">
                Bạn đang tìm nguồn cà phê rang củi ổn định cho quán của mình?
              </h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">
                Hãy liên hệ ngay với xưởng gia đình Trọng Nhâm để trao đổi trực tiếp, nhận mẫu thử và bảng báo giá sỉ tốt nhất.
              </p>
            </div>

            {/* Standardized Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-s-16 w-full sm:w-auto shrink-0">
              <Button
                href="tel:0900000000"
                variant="secondary"
                size="lg"
                className="w-full text-center"
                icon={<span className="material-symbols-outlined text-[18px] text-brand-primary mr-s-8 -ml-s-4 order-first">call</span>}
              >
                Gọi hotline: 09xx xxx xxx
              </Button>

              <Button
                href="https://zalo.me"
                variant="primary"
                size="lg"
                external
                className="w-full text-center shadow-lg shadow-brand-primary/20"
                icon={<span className="material-symbols-outlined text-[18px] mr-s-8 -ml-s-4 order-first">send</span>}
              >
                Nhận báo giá
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
