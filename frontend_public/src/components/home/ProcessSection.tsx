import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessSection() {
  return (
    <section className="snap-section w-full bg-brand-surface py-s-96 border-b border-brand-border" id="quy-trinh-rang">
      <Container>
        {/* Standardized Section Header */}
        <SectionHeader
          label="QUY TRÌNH RANG CỦI THỦ CÔNG"
          heading="Sáu bước chuẩn mực cho mỗi mẻ cà phê"
          description="Từng công đoạn đều được trực tiếp người trong gia đình thực hiện tỉ mỉ, đảm bảo vị mộc vẹn nguyên khi đến tay khách hàng."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s-24">
          {/* Step 1 */}
          <div className="p-s-32 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between">
            <div>
              <span className="text-brand-primary text-label uppercase tracking-widest block mb-s-8">BƯỚC 01</span>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">1. Chọn lọc hạt</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">Thu mua hạt cà phê đều hạt, chắc mẩy từ các nhà vườn lâu năm tại Đắk Lắk.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="p-s-32 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between">
            <div>
              <span className="text-brand-primary text-label uppercase tracking-widest block mb-s-8">BƯỚC 02</span>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">2. Rang củi truyền thống</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">Điều tiết ngọn lửa củi tự nhiên, đảo đều tay để hạt chín thấu từ trong ra ngoài.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="p-s-32 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between">
            <div>
              <span className="text-brand-primary text-label uppercase tracking-widest block mb-s-8">BƯỚC 03</span>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">3. Làm nguội nhanh</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">Đổ ra nia tản nhiệt gió tự nhiên để khóa trọn hương thơm và dầu mộc của mẻ rang.</p>
            </div>
          </div>
          {/* Step 4 */}
          <div className="p-s-32 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between">
            <div>
              <span className="text-brand-primary text-label uppercase tracking-widest block mb-s-8">BƯỚC 04</span>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">4. Xay theo yêu cầu</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">Điều chỉnh độ mịn theo đúng cách pha của khách: phin lớn, phin nhỏ, hoặc pha máy.</p>
            </div>
          </div>
          {/* Step 5 */}
          <div className="p-s-32 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between">
            <div>
              <span className="text-brand-primary text-label uppercase tracking-widest block mb-s-8">BƯỚC 05</span>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">5. Đóng gói thủ công</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">Đóng gói kỹ lưỡng trong túi chuyên dụng có van bảo quản, giữ độ tươi ngon lâu dài.</p>
            </div>
          </div>
          {/* Step 6 */}
          <div className="p-s-32 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between">
            <div>
              <span className="text-brand-primary text-label uppercase tracking-widest block mb-s-8">BƯỚC 06</span>
              <h3 className="text-heading-m text-brand-text-primary mb-s-8 font-semibold">6. Giao hàng tận nơi</h3>
              <p className="text-body-m text-brand-text-secondary leading-relaxed">Chuyển phát nhanh chóng đến tận tay các quán cà phê và đại lý toàn quốc.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
