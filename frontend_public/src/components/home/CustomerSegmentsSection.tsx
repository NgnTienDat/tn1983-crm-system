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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-s-24">
          {/* Segment 1: Quán cà phê */}
          <Card className="border-brand-primary/30 flex flex-col justify-between hover:border-brand-primary">
            <div>
              <div className="flex items-center justify-between mb-s-16">
                <span className="material-symbols-outlined text-brand-primary text-[22px]">
                  coffee
                </span>
              </div>

              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">
                Quán cà phê & đối tác kinh doanh
              </h3>

              <p className="text-body-m text-brand-text-secondary leading-relaxed mb-s-24">
                Cung cấp cà phê hạt và cà phê bột với chất lượng ổn định cho quán cà phê,
                cửa hàng và các đối tác kinh doanh nhỏ lẻ. Hỗ trợ tư vấn sản phẩm phù hợp
                với nhu cầu sử dụng thực tế.
              </p>
            </div>

            <div className="pt-s-16 border-t border-brand-border">
              <Button
                href="#lien-he"
                variant="text"
                icon={
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                }
              >
                Liên hệ tư vấn
              </Button>
            </div>
          </Card>

          {/* Segment 3: Khách cá nhân */}
          <Card className="border-brand-primary/30 flex flex-col justify-between hover:border-brand-primary">
            <div>
              <div className="flex items-center justify-between mb-s-16">
                <span className="material-symbols-outlined text-brand-primary text-[22px]">
                  home
                </span>
              </div>

              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">
                Khách hàng cá nhân & gia đình
              </h3>

              <p className="text-body-m text-brand-text-secondary leading-relaxed mb-s-24">
                Dành cho những người yêu thích cà phê rang củi truyền thống và muốn thưởng
                thức cà phê mỗi ngày tại nhà.
              </p>
            </div>

            <div className="pt-s-16 border-t border-brand-border">
              <Button
                href="#lien-he"
                variant="text"
                icon={
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                }
              >
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
