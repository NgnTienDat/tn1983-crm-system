import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  return (
    <section id="lien-he" className="w-full border-b border-brand-border bg-brand-bg py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              <span className="h-px w-10 bg-brand-primary" />
              Kết nối trực tiếp với xưởng
            </div>
            <h2 className="text-4xl font-extrabold leading-[1.02] tracking-tighter text-brand-text-primary sm:text-6xl">
              Bạn đang tìm nguồn cà phê ổn định?
            </h2>
            <p className="mt-7 max-w-md text-base  text-brand-text-secondary">
              Liên hệ trực tiếp với xưởng để hỏi giá, đặt hàng hoặc trao đổi nhu cầu hợp tác.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border-t border-brand-text-primary">
              <a
                href="tel:0852845969"
                className="group flex items-center justify-between border-b border-brand-border py-6"
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-brand-text-muted">
                    Hotline / Zalo
                  </span>
                  <span className="mt-2 block text-lg  tracking-[-0.03em] text-brand-text-primary">
                    Đạt · 0852 845 969
                  </span>
                  <span className="mt-1 block text-lg tracking-[-0.03em] text-brand-text-primary">
                    Phong · 0999 999 999
                  </span>
                </div>
                <span className="material-symbols-outlined text-brand-primary transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>

              <a
                href="mailto:caphetrongnham@gmail.com"
                className="group flex items-center justify-between border-b border-brand-border py-6"
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-brand-text-muted">
                    Email
                  </span>
                  <span className="mt-2 block text-lg tracking-[-0.03em] text-brand-text-primary">
                    caphetrongnham@gmail.com
                  </span>
                </div>
                <span className="material-symbols-outlined text-brand-primary transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>

              <a
                href="https://www.facebook.com/iosog.964"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-brand-border py-6"
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-brand-text-muted">
                    Facebook
                  </span>
                  <span className="mt-2 block text-sm font-bold text-brand-text-primary">
                    Nguyễn Tiến Đạt
                  </span>
                </div>
                <span className="material-symbols-outlined text-brand-primary transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="https://zalo.me/0852845969"
                variant="primary"
                size="lg"
                external
                className="w-full sm:w-auto"
              >
                Nhận báo giá qua Zalo
              </Button>

              <Button
                href="https://www.facebook.com/iosog.964"
                variant="secondary"
                size="lg"
                external
                className="w-full sm:w-auto"
              >
                Liên hệ Facebook
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
