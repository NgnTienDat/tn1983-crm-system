import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="w-full bg-brand-dark text-[#F8F5F1]">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="block text-2xl font-black tracking-tighter text-white">TRỌNG NHÂM</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.28em] text-brand-text-light-secondary">
              Coffee Roastery · Since 1983
            </span>
            <p className="mt-6 max-w-sm text-sm leading-7 text-brand-text-light-secondary">Xưởng rang xay cà phê tại Buôn Ma Thuột. Hơn 40 năm giữ nghề, cung cấp cà phê với hương vị quen thuộc cho nhiều thế hệ khách hàng.</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C79368]">Điều hướng</span>
            <div className="mt-5 grid gap-3 text-sm text-brand-text-light-secondary">
              <Link href="/#bo-suu-tap" className="transition-colors hover:text-white">Sản phẩm</Link>
              <Link href="/#cau-chuyen-xuong" className="transition-colors hover:text-white">Câu chuyện xưởng</Link>
              <Link href="/#quy-trinh-rang" className="transition-colors hover:text-white">Quy trình rang</Link>
              <Link href="/#ghe-tham-xuong" className="transition-colors hover:text-white">Địa chỉ xưởng</Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C79368]">Liên hệ</span>
            <div className="mt-5 grid gap-3 text-sm text-brand-text-light-secondary">
              <a href="tel:0900000000" className="transition-colors hover:text-white">Hotline / Zalo: 0852 845 969</a>
              <a href="mailto:caphetrongnham@gmail.com" className="transition-colors hover:text-white">caphetrongnham@gmail.com</a>
              <span>Hẻm 137 Nguyễn Thái Bình, phường Tân Lập, tỉnh Đắk Lắk</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-[#9E9188] sm:flex-row sm:items-center sm:justify-center">
          <span>© 2026 Cà Phê Trọng Nhâm · Rang củi Buôn Ma Thuột</span>
          {/* <span>Giữ trọn vị mộc.</span> */}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
