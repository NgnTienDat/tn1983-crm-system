import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const roasteryImage = "/xuong_rang.jpg";

const promises = [
  "Chọn hạt kỹ từ vùng nguyên liệu Đắk Lắk",
  "Canh lửa và đảo hạt bằng kinh nghiệm người thợ",
  "Giữ chất lượng đồng nhất qua từng mẻ rang",
  "Đồng hành lâu dài cùng quán và người yêu cà phê pha phin",
];

export function AboutSection() {
  return (
    <section id="cau-chuyen-xuong" className="w-full border-b border-brand-border bg-white py-24 sm:py-28 lg:py-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden bg-[#EDE5DD]">
              <Image
                src={roasteryImage}
                alt="Không gian xưởng rang cà phê Trọng Nhâm"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              
              {/* 1. Đổi chiều gradient phủ từ trên xuống dưới (bg-linear-to-b) */}
              <div className="absolute inset-0 bg-linear-to-b from-[#1B1613]/85 via-[#1B1613]/30 to-transparent" />
              
              {/* 2. Chuyển vị trí thông tin lên góc trên (top-7 left-7 right-7) */}
              <div className="absolute top-7 left-7 right-7 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C79368]">
                  Cơ sở rang xay trực tiếp (cơ sở cũ)
                </span>
                <p className="mt-2 text-lg font-bold leading-snug">
                  147 Nguyễn Thái Bình, phường Tân Lập, tỉnh Đắk Lắk
                </p>
              </div>
            </div>

            {/* 3. Ảnh nhỏ (đổ cà) nằm phía dưới mà không sợ bị che mất văn bản */}
            <div className="relative mt-4 aspect-video overflow-hidden border-8 border-white bg-[#EDE5DD] shadow-lg sm:absolute sm:-bottom-12 sm:-right-12 sm:mt-0 sm:aspect-[16/10] sm:w-60 lg:w-64">
              <Image
                src="/do_ca.jpg"
                alt="Đổ cà phê sau mẻ rang thủ công"
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#1B1613]/85 to-transparent px-3 pb-3 pt-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Mẻ rang mới hoàn thành
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              <span className="h-px w-10 bg-brand-primary" />
              Câu chuyện xưởng
            </div>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-tighter text-brand-text-primary sm:text-6xl">
              Giữ một cách làm tử tế qua bốn thập kỷ.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-brand-text-secondary">
              Trọng Nhâm bắt đầu từ một gia đình gắn bó với hạt cà phê Buôn Ma Thuột. Đến hôm nay, chúng tôi vẫn chọn cách làm gần với nguyên bản nhất: hạt tốt, lửa thật và sự chăm chút của người thợ trong từng mẻ rang.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-text-secondary">
              Với đối tác, điều quan trọng không chỉ là một bao cà phê ngon, mà là nguồn cung ổn định, hương vị nhất quán và một xưởng luôn sẵn sàng trao đổi thẳng thắn.
            </p>

            <div className="mt-9 border-t border-brand-border">
              {promises.map((promise, index) => (
                <div key={promise} className="flex items-center gap-4 border-b border-brand-border py-4">
                  <span className="text-xs font-bold text-brand-primary">0{index + 1}</span>
                  <span className="text-sm font-bold text-brand-text-primary">{promise}</span>
                </div>
              ))}
            </div>

            <Button href="#ghe-tham-xuong" variant="text" className="mt-8 px-0 text-sm">
              Tìm hiểu về xưởng
              <span className="material-symbols-outlined ml-2 text-[17px]">arrow_forward</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;