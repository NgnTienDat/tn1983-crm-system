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
              <a href="mailto:caphetrongnham@gmail.com" className="transition-colors hover:text-white">trongnhamcoffee@gmail.com</a>
              <span>Hẻm 137 Nguyễn Thái Bình, phường Tân Lập, tỉnh Đắk Lắk</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-[#9E9188] sm:flex-row sm:items-center sm:justify-center">
          <a
            href="https://github.com/NgnTienDat/TN1983-OMS"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="text-[#9E9188] transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
          <span>© 2026 Cà Phê Trọng Nhâm · Rang củi Buôn Ma Thuột</span>
          {/* <span>Giữ trọn vị mộc.</span> */}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
