import Link from "next/link";
import { Container } from "@/components/ui/Container";

const navigation = [
  { label: "Sản phẩm", href: "/#san-pham-cung-cap" },
  { label: "Câu chuyện", href: "/#cau-chuyen-xuong" },
  { label: "Quy trình", href: "/#quy-trinh-rang" },
  { label: "Ghé thăm xưởng", href: "/#ghe-tham-xuong" },
  { label: "Liên hệ", href: "/#lien-he" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1B1613]/90 text-white backdrop-blur-md">
      <Container className="flex h-19 items-center justify-between gap-8">
        <Link href="/" className="group shrink-0" aria-label="Trọng Nhâm Coffee - Trang chủ">
          <span className="block font-black text-white tracking-tighter text-[22px] leading-none">
            TRỌNG NHÂM
          </span>
          <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.28em] text-[#C79368]">Coffee Roastery · Since 1983</span>
          
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className="text-[13px] font-semibold text-brand-text-light-secondary transition-colors hover:text-white"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="text-[13px] font-semibold text-brand-text-light-secondary transition-colors hover:text-white"
            href="/tracking"
          >
            Tra cứu đơn
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden items-center gap-2 text-[17px] font-semibold text-brand-text-light-secondary transition-colors hover:text-white md:flex"
            href="tel:0900000000"
          >
            <span className="material-symbols-outlined text-[17px] text-brand-primary">call</span>
            0852 845 969
          </a>
        </div>
      </Container>
    </header>
  );
}

export default Header;
