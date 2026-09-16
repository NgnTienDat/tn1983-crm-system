import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="snap-section relative w-full overflow-hidden bg-brand-bg pt-s-96 pb-s-96 border-b border-brand-border">
      {/* Background Image & Vignette Scrim */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida/AEtjO1XgIgDOMLjU5Hmw8mM7Ey52nmq1R3cuhbWEM3rxQI9-qrwy9ua7p0tgig17eiNjPVRQxw11CUkhElgsYqY4wNcqkYzI3DtPyHtNMyaZOgEQ3sZBE4BEZhsrR7MdhFO657v6SvtwSjv6kd6GBMvaEfXREv4dJ8lPr-PDr55goEs4s_PCtvKQIgkiexsXe67D72t1TN0iSGWIxlUmJnz-rV9BCPmMLituAqevI4FzFo0FjEEngsLZjvgw2xdg"
          alt="Xưởng rang cà phê củi gia đình Trọng Nhâm tại Buôn Ma Thuột"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/95 via-brand-bg/60 to-brand-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-transparent to-brand-bg/80" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow Badge */}
        <Badge variant="eyebrow">Buôn Ma Thuột • Từ 1983</Badge>

        {/* Headline */}
        <h1 className="text-display-xl lg:text-display-xl-desktop text-brand-text-primary max-w-5xl tracking-tight mb-s-24 font-bold">
          <span className="inline-block whitespace-normal md:whitespace-nowrap">
            Cà phê rang củi từ Buôn Ma Thuột.
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text-primary via-brand-text-primary to-brand-primary">
            Hơn 40 năm giữ lửa.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-body-l text-brand-text-secondary max-w-3xl mb-s-32 font-normal">
          Xưởng rang gia đình gìn giữ nghề rang xay truyền thống, cung ứng nguồn cà phê chất lượng ổn định cho quán cà phê và khách hàng trên toàn quốc.
        </p>

        {/* CTA Grouping */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-s-16 w-full max-w-md mb-s-64">
          <Button
            href="#lien-he"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-brand-primary/20 group"
            icon={
              <span className="material-symbols-outlined text-[16px] ml-s-8 transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            }
          >
            Liên hệ
          </Button>
          <Button href="#bo-suu-tap" variant="secondary" size="lg" className="w-full sm:w-auto">
            Xem sản phẩm
          </Button>
        </div>

        {/* 4 Practical Business Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-s-16 w-full max-w-container pt-s-48 border-t border-brand-border text-left">

          <div className="p-s-24 rounded-2xl bg-brand-surface/70 border border-brand-border-subtle hover:border-brand-primary/40 transition-colors">
            <div className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">
              Hơn 40 năm kinh nghiệm
            </div>
            <p className="text-caption text-brand-text-muted">
              Gia đình gắn bó với nghề rang cà phê qua nhiều thế hệ.
            </p>
          </div>

          <div className="p-s-24 rounded-2xl bg-brand-surface/70 border border-brand-border-subtle hover:border-brand-primary/40 transition-colors">
            <div className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">
              Rang củi thủ công
            </div>
            <p className="text-caption text-brand-text-muted">
              Kiểm soát nhiệt độ bằng kinh nghiệm thực tế để tạo hương vị ổn định cho từng mẻ rang.
            </p>
          </div>

          <div className="p-s-24 rounded-2xl bg-brand-surface/70 border border-brand-border-subtle hover:border-brand-primary/40 transition-colors">
            <div className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">
              Hỗ trợ vận chuyển toàn quốc
            </div>
            <p className="text-caption text-brand-text-muted">
              Linh hoạt gửi hàng qua bưu điện và các tuyến vận chuyển phù hợp với từng khu vực.
            </p>
          </div>

          <div className="p-s-24 rounded-2xl bg-brand-surface/70 border border-brand-border-subtle hover:border-brand-primary/40 transition-colors">
            <div className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">
              Quán cà phê & đối tác phân phối
            </div>
            <p className="text-caption text-brand-text-muted">
              Cung cấp nguồn cà phê ổn định cho quán cà phê, cửa hàng và các đối tác kinh doanh nhỏ lẻ.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
