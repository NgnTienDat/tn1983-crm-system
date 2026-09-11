import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border h-16 transition-all">
      <Container className="h-full flex items-center justify-between">
        {/* Brand Identity (Left) */}
        <Link href="/" className="flex items-center gap-s-12 group shrink-0">
          <div className="flex flex-col">
            <span className="text-[22px] sm:text-[24px] font-bold text-brand-text-primary tracking-tight leading-none">
              Trọng Nhâm
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-primary font-medium mt-1">
              Rang củi Buôn Ma Thuột
            </span>
          </div>
        </Link>

        {/* Central Navigation */}
        <nav className="hidden md:flex items-center gap-s-32">
          <Link className="text-body-m text-brand-text-secondary hover:text-brand-text-primary transition-colors font-medium" href="/#bo-suu-tap">
            Sản phẩm
          </Link>
          <Link className="text-body-m text-brand-text-secondary hover:text-brand-text-primary transition-colors font-medium" href="/#cau-chuyen-xuo-ng">
            Câu chuyện xưởng
          </Link>
          <Link className="text-body-m text-brand-text-secondary hover:text-brand-text-primary transition-colors font-medium" href="/#quy-trinh-rang">
            Quy trình rang
          </Link>
          <Link className="text-body-m text-brand-text-secondary hover:text-brand-text-primary transition-colors font-medium" href="/#khach-hang-dai-ly">
            Khách hàng &amp; Đại lý
          </Link>
          <Link className="text-body-m text-brand-text-secondary hover:text-brand-text-primary transition-colors font-medium" href="/#lien-he">
            Liên hệ
          </Link>
        </nav>

        {/* Standardized Actions: Phone Hotline & Primary CTA */}
        <div className="flex items-center gap-s-12 shrink-0">
          <a
            className="w-9 h-9 rounded-full bg-brand-surface-elevated border border-brand-border flex items-center justify-center text-brand-text-secondary hover:text-brand-primary hover:border-brand-primary transition-colors"
            href="tel:0900000000"
            title="Gọi trực tiếp xưởng"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
          </a>
          <Button href="/#lien-he" variant="primary" size="sm">
            Nhận báo giá
          </Button>
        </div>
      </Container>
    </header>
  );
}

export default Header;