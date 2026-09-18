import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const roasteryImage =
  "https://lh3.googleusercontent.com/aida/AEtjO1XgIgDOMLjU5Hmw8mM7Ey52nmq1R3cuhbWEM3rxQI9-qrwy9ua7p0tgig17eiNjPVRQxw11CUkhElgsYqY4wNcqkYzI3DtPyHtNMyaZOgEQ3sZBE4BEZhsrR7MdhFO657v6SvtwSjv6kd6GBMvaEfXREv4dJ8lPr-PDr55goEs4s_PCtvKQIgkiexsXe67D72t1TN0iSGWIxlUmJnz-rV9BCPmMLituAqevI4FzFo0FjEEngsLZjvgw2xdg";

export function VisitSection() {
  return (
    <section id="ghe-tham-xuong" className="w-full bg-white py-24 sm:py-28 lg:py-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <div className="relative aspect-5/4 overflow-hidden bg-[#EDE5DD]">
              <Image
                src={roasteryImage}
                alt="Xưởng rang cà phê Trọng Nhâm ở Buôn Ma Thuột"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1B1613]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C79368]">Địa chỉ xưởng rang</span>
                  <p className="mt-2 text-lg font-bold">Phường Tân Lập · Tỉnh Đăk Lăk</p>
                </div>
                <span className="material-symbols-outlined text-3xl text-[#C79368]">location_on</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              <span className="h-px w-10 bg-brand-primary" />
              Ghé thăm xưởng
            </div>
            <h2 className="text-4xl font-extrabold leading-[1.02] tracking-tighter text-brand-text-primary sm:text-6xl">
              Gặp người rang. Nếm vị thật.
            </h2>
            <p className="mt-7 text-base leading-8 text-brand-text-secondary">
              Xưởng luôn chào đón quán, đại lý và đối tác muốn tìm hiểu trực tiếp nguồn cà phê của mình. Hãy ghé qua, xem cách chúng tôi làm và cùng thử mẻ rang mới.
            </p>

            <div className="mt-9 border-y border-brand-border">
              <div className="flex gap-5 border-b border-brand-border py-5">
                <span className="material-symbols-outlined text-brand-primary">location_on</span>
                <div>
                  <p className="text-sm font-extrabold text-brand-text-primary">Hẻm 137 Nguyễn Thái Bình, phường Tân Lập, tỉnh Đắk Lắk</p>
                  <p className="mt-1 text-sm leading-6 text-brand-text-secondary">- Đối diện Ủy ban phường Tân Lập (mới)</p>
                  <p className="mt-1 text-sm leading-6 text-brand-text-secondary">- Khoảng (2Km) 7 phút di chuyển từ sân bay Buôn Ma Thuột</p>
                </div>
              </div>
              <div className="flex gap-5 py-5">
                <span className="material-symbols-outlined text-brand-primary">schedule</span>
                <div>
                  <p className="text-sm font-extrabold text-brand-text-primary">06:30 – 18:30 mỗi ngày</p>
                  <p className="mt-1 text-sm leading-6 text-brand-text-secondary">Vui lòng gọi trước nếu cần xem xưởng và thử mẫu.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="https://maps.google.com/?q=Buon+Ma+Thuot" variant="secondary" size="lg" external className="w-full sm:w-auto">
                Mở Google Maps
              </Button>
              <Button href="tel:0900000000" variant="primary" size="lg" className="w-full sm:w-auto">
                Gọi hẹn trước
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default VisitSection;
