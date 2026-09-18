import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const products = [
  {
    name: "Cà phê hạt rang",
    tag: "Dành cho quán & pha máy",
    lead: "Đậm đà mộc mạc, bung nở tròn đều.",
    description: "Robusta và Arabica chọn lọc từ Đắk Lắk, rang củi vừa đủ để giữ thân vị và hậu hương lâu.",
    package: "Quy cách · Gói 1kg",
    price: "Từ 230.000đ/kg",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1VI7uL-lMbOVye381DmrfA1kqYGSRSzCdMvDv22_OVMvxQLo5kSVS0JnyMM7LYaB-okw3wP3j-mCsof--EkNnYaqidBtr1p1lZe5k73X_37Vs1XnmIRHeFcpnqhW9X3v0zq1lgAmCqSXxnwEZwoNTF87TJj-6enH0UBVL4s4PW_uGgmBQu9OfE_1snhQ3s9HdrXj7bnvxQDhJIFHA6DqYXH3Fd4VvQZz7MiiWJQIHM6kSRQvhs1_-elyPeu",
    alt: "Cà phê hạt rang củi Trọng Nhâm",
  },
  {
    name: "Cà phê bột truyền thống",
    tag: "Gu đậm đà · Pha phin Việt Nam",
    lead: "Chuẩn vị phin quán xưa, khói thơm dịu.",
    description: "Xay theo độ mịn phù hợp cho phin nhôm truyền thống, thể chất đậm đà và hậu vị êm sâu.",
    package: "Quy cách · 250g · 500g · 1kg",
    price: "Từ 200.000đ/kg",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1U9g1uEpuBfoeufraJ3bIxpyKLEG8gSaSX5SnLce45fIcF4kXYHYnS4uyFhCDKZwbVv61fOHhW4xOmCtsYdFdGS15PYPjHOOwWLalgHL7m5Nr5C_2G4Xog4MwDwWDsFBkwDuuZ_bygOSRAZ_ydSBcLtRYMoP1jFHDkLEI6jAWJU4hBjZ0Q2mYcbRrC9MlOif7rfdKwds4qVt48-u2wy03fjJ9h1U6MYBKxHkq5aIM5VW2xg8upt-160QUuo",
    alt: "Cà phê bột truyền thống Trọng Nhâm",
  },
  {
    name: "Cà phê nguyên chất 100%",
    tag: "Rang theo yêu cầu",
    lead: "Vị mộc nguyên bản. Không phụ gia.",
    description: "Chế biến theo đơn đặt hàng của đối tác và khách quen yêu thích một ly cà phê thuần vị.",
    package: "Quy cách · 250g · 500g · 1kg",
    price: "Từ 230.000đ/kg",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1X5r7u1QJ8-CHXOyzexdjmafpj6-UurcC10n9dfuVDQtVt9LnRFgzDlS9tlwCWrgIx2owe-0i-G0OHAomHiZyQlTYGxR7EaH2FNGvuEUIHvXa6zvX5DOAfAb5EMjKsx2j3DBXkz8zhfzbzsxqrq6yxwJXJTel8OZN7w1irq-Lr-Mns-3D7QntoGv3APCZ-k82XjgwsVZiyf-pU_OPlgis-OaD8ljYCto1PfdASYzfENuPv5alG26KAy-lWj",
    alt: "Cà phê bột nguyên chất 100% Trọng Nhâm",
  },
];

export function ProductsSection() {
  return (
    <section id="san-pham-cung-cap" className="w-full border-b border-brand-border bg-brand-bg py-24 sm:py-28 lg:py-36">
      <Container>
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              <span className="h-px w-10 bg-brand-primary" />
              Sản phẩm từ xưởng
            </div>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tighter text-brand-text-primary sm:text-6xl">
              Hương vị được xây từ sự ổn định.
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-brand-text-secondary lg:col-span-4 lg:col-start-9">
            Mỗi dòng sản phẩm phục vụ một nhu cầu khác nhau, nhưng cùng bắt đầu từ hạt cà phê được chọn kỹ và mẻ rang được kiểm soát bằng kinh nghiệm.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.name} className="group flex flex-col border border-brand-border bg-white p-4 transition-colors duration-300 hover:border-brand-primary sm:p-5">
              <div className="relative aspect-4/3 overflow-hidden bg-[#EDE5DD]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-[#1B1613] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                  0{index + 1} · {product.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-1 pb-1 pt-6">
                <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-brand-text-primary">{product.name}</h3>
                <p className="mt-2 text-sm font-bold text-brand-primary">{product.lead}</p>
                <p className="mt-4 text-sm leading-7 text-brand-text-secondary">{product.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-5">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-text-muted">{product.package}</span>
                    <span className="mt-1 block text-sm font-extrabold text-brand-text-primary">{product.price}</span>
                  </div>
                  <Button href="#lien-he" variant="text" className="shrink-0 text-sm">
                    Trao đổi
                    <span className="material-symbols-outlined ml-1 text-[17px]">arrow_forward</span>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-brand-border pt-7 text-sm text-brand-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Giá tham khảo · Chính sách sỉ được tư vấn theo sản lượng.</p>
          <a href="#lien-he" className="font-bold text-brand-primary hover:text-brand-primary-hover">Nhận bảng giá cho quán →</a>
        </div>
      </Container>
    </section>
  );
}

export default ProductsSection;
