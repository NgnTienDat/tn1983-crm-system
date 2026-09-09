export function SettingsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Cài đặt hệ thống</h2>
        <p className="mt-1 text-sm text-gray-600">Các thiết lập chung của cửa hàng.</p>
      </div>
      <div className="border border-gray-300 bg-white p-4 text-sm">
        <p className="font-medium">Thông tin cửa hàng</p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-gray-600">Tên cửa hàng</dt>
            <dd className="mt-1">Coffee House</dd>
          </div>
          <div>
            <dt className="text-gray-600">Múi giờ</dt>
            <dd className="mt-1">GMT+07:00</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}