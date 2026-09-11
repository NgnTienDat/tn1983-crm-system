import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="w-full bg-brand-bg py-s-48">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-s-32 mb-s-32">
          {/* Cột 1: Thông tin xưởng */}
          <div className="space-y-s-8">
            <span className="text-heading-m text-brand-text-primary tracking-tight font-semibold block">
              Cà Phê Trọng Nhâm
            </span>
            <p className="text-body-m text-brand-text-secondary">
              Thành phố Buôn Ma Thuột, Đắk Lắk
            </p>
            <p className="text-caption text-brand-text-muted">
              Giờ mở cửa: 07:00 — 18:00 (Hằng ngày)
            </p>
          </div>

          {/* Cột 2: Thông tin liên hệ */}
          <div className="space-y-s-8">
            <span className="text-label uppercase tracking-wider text-brand-primary block mb-s-8">
              Thông Tin Liên Hệ
            </span>
            <p className="text-body-m text-brand-text-primary">
              Hotline / Zalo: <span className="font-medium">09xx xxx xxx</span>
            </p>
            <p className="text-caption text-brand-text-muted">
              Email: caphetrongnham@gmail.com
            </p>
          </div>

          {/* Cột 3: Cam kết chất lượng & Chính sách */}
          <div className="space-y-s-8">
            <span className="text-label uppercase tracking-wider text-brand-primary block mb-s-8">
              Cam Kết Chất Lượng &amp; Chính Sách
            </span>
            <p className="text-caption text-brand-text-secondary leading-relaxed">
              100% hạt mộc rang củi tự nhiên, không phụ gia. Hỗ trợ gửi mẫu thử cho quán &amp; đại lý toàn quốc.
            </p>
          </div>
        </div>

        <div className="pt-s-24 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-s-16 text-caption text-brand-text-muted">
          <div>© 2025 Cà Phê Trọng Nhâm — Rang củi Buôn Ma Thuột. Giữ trọn vị mộc.</div>
          <div className="flex items-center gap-s-24">
            <Link className="hover:text-brand-text-primary transition-colors" href="/#bo-suu-tap">
              Xem sản phẩm
            </Link>
            <Link className="hover:text-brand-text-primary transition-colors" href="/#lien-he">
              Liên hệ tư vấn
            </Link>
            <Link className="hover:text-brand-text-primary transition-colors" href="/#lien-he">
              Nhận báo giá
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;