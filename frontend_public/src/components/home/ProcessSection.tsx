import { Container } from "@/components/ui/Container";

const steps = [
  { number: "01", title: "Chọn lọc hạt", desc: "Thu mua hạt đều, chắc mẩy từ những vùng nguyên liệu lâu năm tại Đắk Lắk." },
  {
    number: "02",
    title: "Rang củi truyền thống",
    desc: "Canh và giữ lửa củi ổn định trong suốt quá trình rang để hạt chín từ từ, phát triển hương vị đặc trưng.",
  },
  { number: "03", title: "Làm nguội", desc: "Làm nguội sau khi rang để giữ hương thơm và hạn chế hạt tiếp tục chín ngoài ý muốn." },
  { number: "04", title: "Xay thành bột", desc: "Xay cà phê theo độ mịn truyền thống phù hợp cho nhu cầu pha phin phổ biến." },
  {
    number: "05",
    title: "Đóng gói ép nhiệt",
    desc: "Đóng gói thủ công bằng túi ép nhiệt để bảo quản sản phẩm trước khi xuất xưởng.",
  },
  { number: "06", title: "Giao hàng tận nơi", desc: "Chuyển hàng nhanh đến quán cà phê và đại lý trên toàn quốc." },
];

export function ProcessSection() {
  return (
    <section id="quy-trinh-rang" className="relative w-full overflow-hidden bg-brand-dark py-24 text-white sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute -right-32 top-28 h-96 w-96 rounded-full bg-brand-primary/10 blur-[120px]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C79368]">
              <span className="h-px w-10 bg-brand-primary" />
              Quy trình tại xưởng
            </div>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tighter sm:text-6xl">
              Sáu bước để một mẻ rang giữ được trọn vị.
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-brand-text-light-secondary lg:col-span-4 lg:col-start-9">
            Không có đường tắt cho một hương vị ổn định. Mỗi công đoạn đều được người trong gia đình trực tiếp kiểm soát.
          </p>
        </div>

        <div className="relative mt-16 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="group min-h-56.25 border-b border-r border-white/15 px-6 py-8 lg:min-h-61.25 lg:px-7 lg:py-10 lg:[&:nth-child(3n)]:border-r-0">
              <div className="flex items-start justify-between gap-5">
                <span className="text-4xl font-extrabold tracking-[-0.06em] text-brand-primary/80 transition-colors group-hover:text-[#C79368]">{step.number}</span>
                <span className="material-symbols-outlined mt-1 text-[21px] text-[#C79368]">arrow_outward</span>
              </div>
              <h3 className="mt-9 text-xl font-extrabold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-[#C8BBB2]">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
