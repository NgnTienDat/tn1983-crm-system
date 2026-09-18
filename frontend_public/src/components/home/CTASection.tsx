import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-dark py-24 text-white sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-brand-primary/20 to-transparent" />
      <Container className="relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C79368]">
              <span className="h-px w-10 bg-brand-primary" />
              Sẵn sàng đồng hành
            </div>
            <h2 className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
              Một nguồn cà phê đáng tin bắt đầu từ một cuộc trò chuyện.
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p className="text-base leading-8 text-brand-text-light-secondary">Nếu bạn đang tìm nguồn cà phê ổn định cho quán, đại lý hoặc nhu cầu sử dụng gia đình, hãy liên hệ trực tiếp với xưởng.</p>
            <Button href="#lien-he" variant="primary" size="lg" className="mt-8 w-full sm:w-auto">
              Liên hệ xưởng rang
              <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
