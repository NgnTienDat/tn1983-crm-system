const products = [
  { name: 'Cà phê sữa đá', category: 'Cà phê', price: '35.000 đ' },
  { name: 'Trà đào cam sả', category: 'Trà', price: '45.000 đ' },
  { name: 'Bánh croissant', category: 'Bánh', price: '32.000 đ' },
]

export function ProductListPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Danh sách sản phẩm</h2>
        <p className="mt-1 text-sm text-gray-600">Các sản phẩm đang được kinh doanh.</p>
      </div>
      <div className="overflow-x-auto border border-gray-300 bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-gray-300 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">Tên sản phẩm</th>
              <th className="px-4 py-3 font-medium">Danh mục</th>
              <th className="px-4 py-3 font-medium">Giá bán</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-b border-gray-200 last:border-0" key={product.name}>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 text-gray-600">{product.category}</td>
                <td className="px-4 py-3">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}