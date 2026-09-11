import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CustomerSegmentsSection() {
  return (
    <section className="snap-section w-full bg-brand-bg py-s-96 border-b border-brand-border" id="khach-hang-dai-ly">
      <Container>
        {/* Standardized Section Header */}
        <SectionHeader
          label="ĐỐI TÁC & KHÁCH HÀNG"
          heading="Phục vụ tận tâm từng nhóm khách hàng"
          description="Mỗi mẻ rang củi của xưởng Trọng Nhâm đều hướng tới việc mang lại giá trị thiết thực và sự hài lòng dài lâu."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-s-24">
          {/* Segment 1: Quán cà phê */}
          <Card className="border-brand-primary/30 flex flex-col justify-between hover:border-brand-primary">
            <div>
              <div className="flex items-center justify-between mb-s-16">
                <Badge variant="primary">70% Khách Hàng</Badge>
                <span className="material-symbols-outlined text-brand-primary text-[22px]">coffee</span>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">Quán cà phê</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed mb-s-24">
                Cung cấp hạt và bột mộc ổn định chất lượng, giá sỉ ưu đãi theo số lượng đều đặn hàng tháng, hỗ trợ gửi mẫu thử miễn phí và tư vấn công thức pha phin ngon hút khách.
              </p>
            </div>
            <div className="pt-s-16 border-t border-brand-border">
              <Button href="#lien-he" variant="text" icon={<span className="material-symbols-outlined text-[16px]">chevron_right</span>}>
                Liên hệ tư vấn
              </Button>
            </div>
          </Card>

          {/* Segment 2: Đại lý & NPP */}
          <Card className="flex flex-col justify-between hover:border-brand-primary/50">
            <div>
              <div className="flex items-center justify-between mb-s-16">
                <Badge variant="secondary">20% Đối Tác</Badge>
                <span className="material-symbols-outlined text-brand-text-muted text-[22px]">store</span>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">Đại lý &amp; Nhà phân phối</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed mb-s-24">
                Chính sách chiết khấu tốt, hỗ trợ đóng gói nhãn thương hiệu riêng nếu cần, nguồn hàng dồi dào, ổn định quanh năm từ thủ phủ Đắk Lắk.
              </p>
            </div>
            <div className="pt-s-16 border-t border-brand-border">
              <Button href="#lien-he" variant="text" icon={<span className="material-symbols-outlined text-[16px]">chevron_right</span>}>
                Liên hệ tư vấn
              </Button>
            </div>
          </Card>

          {/* Segment 3: Khách cá nhân */}
          <Card className="flex flex-col justify-between hover:border-brand-primary/50">
            <div>
              <div className="flex items-center justify-between mb-s-16">
                <Badge variant="secondary">10% Khách Lẻ</Badge>
                <span className="material-symbols-outlined text-brand-text-muted text-[22px]">home</span>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">Khách hàng cá nhân &amp; Gia đình</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed mb-s-24">
                Thưởng thức hương vị cà phê mộc nguyên bản đậm chất Tây Nguyên mỗi ngày ngay tại gian bếp nhà bạn. Đóng gói tiện lợi 250g - 500g.
              </p>
            </div>
            <div className="pt-s-16 border-t border-brand-border">
              <Button href="#lien-he" variant="text" icon={<span className="material-symbols-outlined text-[16px]">chevron_right</span>}>
                Liên hệ tư vấn
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default CustomerSegmentsSection;
