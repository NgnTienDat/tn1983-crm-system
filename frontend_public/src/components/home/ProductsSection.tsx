import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProductsSection() {
  return (
    <section className="snap-section relative w-full bg-[#16110E] text-brand-text-secondary py-s-96 border-b border-brand-border overflow-hidden" id="bo-suu-tap">
      {/* Ambient warm ember glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          label="SẢN PHẨM NGUYÊN BẢN"
          heading="Ba dòng cà phê phục vụ quán & gia đình"
          description="Được rang bằng củi lửa mộc mạc, giữ trọn hương khói dịu và độ đậm đà nguyên bản đặc trưng của thủ phủ Đắk Lắk."
        />

        {/* Bento Grid: Premium Dark Surface Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-s-24">
          {/* Card 1: Cà phê hạt rang */}
          <Card variant="product">
            <div>
              <div className="mb-s-16">
                <Badge variant="subtle">DÀNH CHO QUÁN &amp; PHA MÁY • HẠT MỘC</Badge>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 group-hover:text-brand-primary transition-colors font-semibold">
                Cà phê hạt rang
              </h3>
              <p className="text-body-m text-brand-primary font-medium mb-s-8">
                Đậm đà mộc mạc, bung nở tròn đều.
              </p>
              <p className="text-body-m text-brand-text-secondary/85 mb-s-16 leading-relaxed">
                Hạt Robusta &amp; Arabica chọn lọc từ Đắk Lắk, rang củi nở tròn đều. Thích hợp cho quán tự xay hoặc pha máy espresso đậm vị.
              </p>
              <div className="inline-block px-s-12 py-s-4 rounded bg-brand-surface-elevated/70 border border-brand-border-subtle text-caption font-medium text-brand-text-secondary mb-s-24">
                Quy cách: Gói 1kg (van 1 chiều giữ hương)
              </div>
            </div>

            {/* Product Media */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-surface mb-s-24 border border-brand-border/60">
              <Image
                src="https://lh3.googleusercontent.com/aida/AEtjO1VI7uL-lMbOVye381DmrfA1kqYGSRSzCdMvDv22_OVMvxQLo5kSVS0JnyMM7LYaB-okw3wP3j-mCsof--EkNnYaqidBtr1p1lZe5k73X_37Vs1XnmIRHeFcpnqhW9X3v0zq1lgAmCqSXxnwEZwoNTF87TJj-6enH0UBVL4s4PW_uGgmBQu9OfE_1snhQ3s9HdrXj7bnvxQDhJIFHA6DqYXH3Fd4VvQZz7MiiWJQIHM6kSRQvhs1_-elyPeu"
                alt="Cà phê hạt rang củi Trọng Nhâm"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-s-12 left-s-12 bg-brand-bg/85 backdrop-blur-sm px-s-12 py-s-4 rounded-full text-caption font-medium text-brand-text-secondary border border-brand-border">
                Robusta Buôn Ma Thuột &amp; Arabica chọn lọc
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-s-16 border-t border-brand-border">
              <div>
                <span className="text-caption text-brand-text-muted block">Giá tham khảo</span>
                <span className="text-body-l text-brand-text-primary font-semibold">Giá từ 230.000đ/kg</span>
              </div>
              <Button href="#lien-he" variant="text" icon={<span className="material-symbols-outlined text-[18px]">chevron_right</span>}>
                Xem chi tiết
              </Button>
            </div>
          </Card>

          {/* Card 2: Cà phê bột truyền thống */}
          <Card variant="product">
            <div>
              <div className="mb-s-16">
                <Badge variant="subtle">GU ĐẬM ĐÀ • PHA PHIN VIỆT NAM</Badge>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 group-hover:text-brand-primary transition-colors font-semibold">
                Cà phê bột truyền thống
              </h3>
              <p className="text-body-m text-brand-primary font-medium mb-s-8">
                Chuẩn vị phin quán xưa, khói thơm dịu.
              </p>
              <p className="text-body-m text-brand-text-secondary/85 mb-s-16 leading-relaxed">
                Được xay ở độ mịn chuẩn cho phin nhôm truyền thống. Hương thơm mộc ấm áp của khói củi tự nhiên, thể chất đậm đà, hậu êm sâu.
              </p>
              <div className="inline-block px-s-12 py-s-4 rounded bg-brand-surface-elevated/70 border border-brand-border-subtle text-caption font-medium text-brand-text-secondary mb-s-24">
                Quy cách: 250g • 500g • 1kg
              </div>
            </div>

            {/* Product Media */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-surface mb-s-24 border border-brand-border/60">
              <Image
                src="https://lh3.googleusercontent.com/aida/AEtjO1U9g1uEpuBfoeufraJ3bIxpyKLEG8gSaSX5SnLce45fIcF4kXYHYnS4uyFhCDKZwbVv61fOHhW4xOmCtsYdFdGS15PYPjHOOwWLalgHL7m5Nr5C_2G4Xog4MwDwWDsFBkwDuuZ_bygOSRAZ_ydSBcLtRYMoP1jFHDkLEI6jAWJU4hBjZ0Q2mYcbRrC9MlOif7rfdKwds4qVt48-u2wy03fjJ9h1U6MYBKxHkq5aIM5VW2xg8upt-160QUuo"
                alt="Cà phê bột truyền thống Trọng Nhâm"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-s-12 left-s-12 bg-brand-bg/85 backdrop-blur-sm px-s-12 py-s-4 rounded-full text-caption font-medium text-brand-text-secondary border border-brand-border">
                Xay chuẩn độ mịn phin nhôm truyền thống
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-s-16 border-t border-brand-border">
              <div>
                <span className="text-caption text-brand-text-muted block">Giá tham khảo</span>
                <span className="text-body-l text-brand-text-primary font-semibold">Giá từ 200.000đ/kg</span>
              </div>
              <Button href="#lien-he" variant="text" icon={<span className="material-symbols-outlined text-[18px]">chevron_right</span>}>
                Xem chi tiết
              </Button>
            </div>
          </Card>

          {/* Card 3: Cà phê bột nguyên chất 100% */}
          <Card variant="product">
            <div>
              <div className="mb-s-16">
                <Badge variant="primary">RANG THEO YÊU CẦU • 100% CÀ PHÊ</Badge>
              </div>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 group-hover:text-brand-primary transition-colors font-semibold">
                Cà phê bột nguyên chất 100%
              </h3>
              <p className="text-body-m text-brand-primary font-medium mb-s-8">
                100% Mộc nguyên bản. Không phụ gia.
              </p>
              <p className="text-body-m text-brand-text-secondary/85 mb-s-16 leading-relaxed">
                Chế biến riêng theo đơn đặt hàng của đối tác và khách quen yêu thích vị mộc tuyệt đối. Cam kết 100% hạt cà phê, không pha tạp.
              </p>
              <div className="inline-block px-s-12 py-s-4 rounded bg-brand-surface-elevated/70 border border-brand-border-subtle text-caption font-medium text-brand-text-secondary mb-s-24">
                Quy cách: 250g • 500g • 1kg
              </div>
            </div>

            {/* Product Media */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-surface mb-s-24 border border-brand-border/60">
              <Image
                src="https://lh3.googleusercontent.com/aida/AEtjO1X5r7u1QJ8-CHXOyzexdjmafpj6-UurcC10n9dfuVDQtVt9LnRFgzDlS9tlwCWrgIx2owe-0i-G0OHAomHiZyQlTYGxR7EaH2FNGvuEUIHvXa6zvX5DOAfAb5EMjKsx2j3DBXkz8zhfzbzsxqrq6yxwJXJTel8OZN7w1irq-Lr-Mns-3D7QntoGv3APCZ-k82XjgwsVZiyf-pU_OPlgis-OaD8ljYCto1PfdASYzfENuPv5alG26KAy-lWj"
                alt="Cà phê bột nguyên chất 100% Trọng Nhâm"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-s-12 left-s-12 bg-brand-bg/85 backdrop-blur-sm px-s-12 py-s-4 rounded-full text-caption font-medium text-brand-text-secondary border border-brand-border">
                100% Mộc tự nhiên • Đậm chất Tây Nguyên
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-s-16 border-t border-brand-border">
              <div>
                <span className="text-caption text-brand-text-muted block">Giá tham khảo</span>
                <span className="text-body-l text-brand-text-primary font-semibold">Giá từ 230.000đ/kg</span>
              </div>
              <Button href="#lien-he" variant="text" icon={<span className="material-symbols-outlined text-[18px]">chevron_right</span>}>
                Xem chi tiết
              </Button>
            </div>
          </Card>
        </div>

        {/* Note on Pricing */}
        <div className="mt-s-24 text-center">
          <p className="text-caption text-brand-text-muted italic max-w-3xl mx-auto">
            * Giá niêm yết mang tính tham khảo. Giá thực tế có thể thay đổi theo số lượng đặt hàng, loại đóng gói và chính sách dành cho quán cà phê hoặc đại lý.
          </p>
        </div>

        {/* Comparison / Commitment Ribbon */}
        <div className="mt-s-32 p-s-24 rounded-2xl bg-brand-surface border border-brand-border flex flex-col md:flex-row items-center justify-between gap-s-16 text-center md:text-left">
          <div className="flex items-center gap-s-16">
            <span className="material-symbols-outlined text-brand-primary text-[28px] shrink-0">
              verified
            </span>
            <div>
              <p className="text-body-m text-brand-text-primary font-semibold">
                Cam kết hạt chọn lọc từ thủ phủ cà phê Buôn Ma Thuột
              </p>
              <p className="text-caption text-brand-text-secondary">
                Rang mới liên tục, giao hàng nhanh chóng đến tận nơi cho các quán cà phê và đối tác.
              </p>
            </div>
          </div>
          <Button href="#lien-he" variant="primary" className="shrink-0">
            Nhận báo giá
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default ProductsSection;
