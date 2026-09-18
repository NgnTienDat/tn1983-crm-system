import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const roasteryImage = "/hero_bg_img.jpg";

export function HeroSection() {
  return (
    <section className="relative flex min-h-190 items-end overflow-hidden bg-[#1B1613] pt-28 text-white lg:min-h-215 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={roasteryImage}
          alt="Xưởng rang cà phê Trọng Nhâm tại Buôn Ma Thuột"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#1B1613]/95 via-[#1B1613]/60 to-[#1B1613]/15" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1B1613] via-[#1B1613]/35 to-[#1B1613]/20" />
      </div>

      <Container className="relative z-10 w-full pb-14 sm:pb-20 lg:pb-24">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="mb-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-text-light-secondary">
              <span className="h-px w-10 bg-brand-primary" />
              Buôn Ma Thuột · Từ 1983
            </div>

            <h1 className="max-w-4xl text-[52px] font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
              <span className="block">Cà phê rang củi.</span>
              <span className="mt-3 block text-[#C79368]">Giữ lửa qua</span>
              <span className="block">bốn thập kỷ.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#E3DAD4] sm:text-lg">
              Xưởng rang gia đình tại Buôn Ma Thuột, cung ứng cà phê ổn định cho quán, đại lý và những người trân trọng hương vị mộc nguyên bản.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="#lien-he" variant="primary" size="lg" className="w-full sm:w-auto">
                Trao đổi với xưởng
                {/* <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span> */}
              </Button>
              <Button
                href="#bo-suu-tap"
                variant="secondary"
                size="lg"
                className="w-full border-white/25 bg-white/10 text-white hover:bg-white hover:text-brand-text-primary sm:w-auto"
              >
                Xem dòng sản phẩm
              </Button>
            </div>
          </div>

          <div className="hidden border-l border-white/20 pl-7 lg:col-span-4 lg:block xl:col-span-3 xl:col-start-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C79368]">Xưởng rang gia đình</span>
            <p className="mt-5 text-2xl font-bold leading-tight text-white">Từ hạt cà phê Tây Nguyên đến từng mẻ rang.</p>
            <p className="mt-4 text-sm leading-7 text-brand-text-light-secondary">Chọn hạt kỹ. Canh lửa thật. Giao hàng đúng hẹn.</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 border-t border-white/20 pt-6 sm:grid-cols-4 sm:mt-24">
          <div className="border-r border-white/15 pr-4 sm:px-5 sm:first:pl-0">
            <p className="text-2xl font-extrabold tracking-tight text-white">40+</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#CFC4BC]">Năm giữ nghề</p>
          </div>
          <div className="border-r border-white/15 px-4 sm:px-5">
            <p className="text-2xl font-extrabold tracking-tight text-white">Rang củi</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#CFC4BC]">Phương pháp truyền thống</p>
          </div>
          <div className="border-r border-white/15 px-4 sm:px-5">
            <p className="text-2xl font-extrabold tracking-tight text-white">Đắk Lắk</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#CFC4BC]">Vùng nguyên liệu</p>
          </div>
          <div className="px-4 sm:px-5">
            <p className="text-2xl font-extrabold tracking-tight text-white">Toàn quốc</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#CFC4BC]">Giao đến khách hàng</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
