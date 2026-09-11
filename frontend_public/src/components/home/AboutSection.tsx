import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutSection() {
  return (
    <section className="snap-section w-full bg-brand-bg py-s-96 border-b border-brand-border" id="cau-chuyen-xuo-ng">
      <Container>
        {/* Standardized Section Header */}
        <SectionHeader
          align="left"
          label="CHUYỆN NGHỀ GIA ĐÌNH"
          heading="Nghề rang cà phê bằng củi lửa tại thủ phủ Buôn Ma Thuột"
          description="Giữa thời đại công nghiệp hóa với những lò rang điện tự động, gia đình Trọng Nhâm vẫn chọn giữ lại ngọn lửa củi đượm nồng và cái tâm của người làm nghề."
        />

        {/* Bento Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-s-24 mb-s-32">
          {/* Left Column (7 cols) */}
          <Card className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-s-32">
              <div className="flex items-center gap-s-8 text-brand-primary mb-s-16">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
                <span className="text-label uppercase tracking-wider">Gắn bó qua nhiều thế hệ</span>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-12 font-semibold">
                Kinh nghiệm tích lũy qua nhiều thế hệ
              </h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">
                Sinh ra và lớn lên trên mảnh đất bazan Buôn Ma Thuột, chúng tôi hiểu từng đặc tính của hạt cà phê Robusta quê mình. Tiếng nổ lách tách trong lò rang và mùi hương bốc lên theo làn khói chính là chiếc đồng hồ chính xác nhất của thợ rang Trọng Nhâm.
              </p>
            </div>
            <div className="pt-s-24 border-t border-brand-border grid grid-cols-3 gap-s-16">
              <div>
                <p className="text-heading-m text-brand-text-primary font-semibold">Buôn Ma Thuột</p>
                <p className="text-caption text-brand-text-muted mt-1">Vùng nguyên liệu gốc</p>
              </div>
              <div>
                <p className="text-heading-m text-brand-text-primary font-semibold">Lửa Củi Mộc</p>
                <p className="text-caption text-brand-text-muted mt-1">Nhiệt mềm tự nhiên</p>
              </div>
              <div>
                <p className="text-heading-m text-brand-text-primary font-semibold">Tay Nghề Canh</p>
                <p className="text-caption text-brand-text-muted mt-1">Giác quan thợ rang</p>
              </div>
            </div>
          </Card>

          {/* Right Column (5 cols) */}
          <Card className="lg:col-span-5 flex flex-col justify-between">
            <div className="mb-s-24">
              <div className="flex items-center gap-s-8 text-brand-primary mb-s-16">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span className="text-label uppercase tracking-wider">Uy tín làm nên thương hiệu</span>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-12 font-semibold">
                Bạn đồng hành tin cậy của các quán cà phê
              </h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">
                Với hơn 70% khách hàng là chủ quán cà phê, chúng tôi hiểu rằng chất lượng đồng đều và giá thành hợp lý của từng mẻ rang chính là uy tín sống còn để giữ chân thực khách cho quán của bạn.
              </p>
            </div>
            <div className="p-s-16 rounded-xl bg-brand-surface-elevated border border-brand-border">
              <div className="flex items-center gap-s-12">
                <div className="w-10 h-10 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">handshake</span>
                </div>
                <div>
                  <p className="text-body-m text-brand-text-primary font-medium">Hợp tác bền lâu cùng chủ quán</p>
                  <p className="text-caption text-brand-text-muted">Hỗ trợ thử mẫu, tư vấn công thức phin đậm đà</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Philosophy Quote Box */}
        <div className="w-full rounded-2xl bg-brand-surface-elevated p-s-32 border border-brand-border text-center">
          <span className="material-symbols-outlined text-brand-primary/40 text-[36px] mx-auto block mb-s-8">
            format_quote
          </span>
          <blockquote className="text-heading-m text-brand-text-primary max-w-3xl mx-auto leading-relaxed mb-s-12 font-medium">
            “Chúng tôi không quảng cáo hoa mỹ. Sự tin tưởng của các chủ quán cà phê suốt hàng chục năm qua là thước đo lớn nhất cho từng mẻ rang của gia đình.”
          </blockquote>
          <p className="text-label text-brand-primary uppercase tracking-widest">
            — Gia đình Cà phê Trọng Nhâm
          </p>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
