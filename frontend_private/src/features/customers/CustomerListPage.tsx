import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler, type UseFormRegister } from 'react-hook-form'
import { customerSchema, type CustomerFormValues } from './customerSchema.ts'
import type { Customer } from './customer.types.ts'
import { useCreateCustomer } from './useCreateCustomer.ts'
import { useCustomers } from './useCustomers.ts'
import { useDeleteCustomer } from './useDeleteCustomer.ts'
import { useUpdateCustomer } from './useUpdateCustomer.ts'

const PAGE_SIZE = 10

const customerTypeLabels: Record<Customer['type'], string> = {
  COFFEE_SHOP: 'Quán cà phê',
  AGENT: 'Đại lý',
  INDIVIDUAL: 'Cá nhân',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function getFormValues(customer: Customer): CustomerFormValues {
  return {
    name: customer.name,
    phone: customer.phone,
    address: customer.address ?? '',
    note: customer.note ?? '',
    type: customer.type,
    active: customer.active,
  }
}

export function CustomerListPage() {
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const customersQuery = useCustomers(page, PAGE_SIZE, keyword)
  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer()
  const deleteCustomer = useDeleteCustomer()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPage(0)
      setKeyword(searchInput.trim())
    }, 500)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  const openCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsCreating(false)
    setIsEditing(false)
    reset(getFormValues(customer))
    setNotice(null)
  }

  const closeCustomer = () => {
    setSelectedCustomer(null)
    setIsCreating(false)
    setIsEditing(false)
    clearErrors()
  }

  const openCreateModal = () => {
    setSelectedCustomer(null)
    setIsCreating(true)
    reset({ name: '', phone: '', address: '', note: '', type: 'INDIVIDUAL', active: true })
    setNotice(null)
  }

  const startEditing = () => {
    if (selectedCustomer) {
      reset(getFormValues(selectedCustomer))
      setIsEditing(true)
    }
  }

  const cancelEditing = () => {
    if (selectedCustomer) {
      reset(getFormValues(selectedCustomer))
    }
    clearErrors()
    setIsEditing(false)
  }

  const onSubmit: SubmitHandler<CustomerFormValues> = async (values) => {
    if (!selectedCustomer && !isCreating) {
      return
    }

    if (isCreating) {
      const { active: _active, ...createValues } = values
      await createCustomer.mutateAsync(createValues)
      closeCustomer()
      setNotice('Đã thêm khách hàng thành công.')
      return
    }

    await updateCustomer.mutateAsync({ id: selectedCustomer!.id, request: values })
    closeCustomer()
    setNotice('Đã cập nhật khách hàng thành công.')
  }

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return
    }

    await deleteCustomer.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
    setNotice('Đã xóa khách hàng thành công.')
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Danh sách khách hàng</h2>
            <p className="mt-1 text-sm text-gray-600">Thông tin khách hàng đã giao dịch.</p>
          </div>
          <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={openCreateModal} type="button">
            Thêm khách hàng
          </button>
        </div>
      </div>

      <div>
        <label className="sr-only" htmlFor="customer-search">Tìm kiếm khách hàng</label>
        <input
          className="w-full max-w-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-700"
          id="customer-search"
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Tìm theo tên, số điện thoại hoặc địa chỉ"
          type="search"
          value={searchInput}
        />
      </div>

      {notice && (
        <div className="border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
          {notice}
        </div>
      )}

      {customersQuery.isPending && (
        <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">
          Đang tải danh sách khách hàng...
        </div>
      )}

      {customersQuery.isError && (
        <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {customersQuery.error.message}
        </div>
      )}

      {customersQuery.isFetching && !customersQuery.isPending && (
        <p className="text-sm text-gray-600" role="status">Đang cập nhật danh sách...</p>
      )}

      {customersQuery.isSuccess && customersQuery.data.content.length === 0 && (
        <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">
          Chưa có khách hàng nào.
        </div>
      )}

      {customersQuery.isSuccess && customersQuery.data.content.length > 0 && (
        <div className="overflow-x-auto border border-gray-300 bg-white">
          <table className="w-full min-w-205 text-left text-sm">
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Tên khách hàng</th>
                <th className="px-4 py-3 font-medium">Số điện thoại</th>
                <th className="px-4 py-3 font-medium">Địa chỉ</th>
                <th className="px-4 py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customersQuery.data.content.map((customer) => (
                <tr className="border-b border-gray-200 last:border-0" key={customer.id}>
                  <td className="max-w-55 truncate px-4 py-3 text-gray-600" title={customer.id}>
                    {customer.id}
                  </td>
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.phone}</td>
                  <td className="max-w-60 truncate px-4 py-3 text-gray-600">{customer.address ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button className="text-gray-700 underline underline-offset-4 hover:text-gray-950" onClick={() => openCustomer(customer)} type="button">
                        Xem
                      </button>
                      <button className="text-red-700 underline underline-offset-4 hover:text-red-900" onClick={() => setDeleteTarget(customer)} type="button">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {customersQuery.isSuccess && customersQuery.data.totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-gray-600">
            Trang {customersQuery.data.number + 1} / {customersQuery.data.totalPages} ({customersQuery.data.totalElements} khách hàng)
          </span>
          <div className="flex gap-2">
            <button
              className="border border-gray-300 px-3 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={customersQuery.data.number === 0 || customersQuery.isFetching}
              onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
              type="button"
            >
              Trang trước
            </button>
            <button
              className="border border-gray-300 px-3 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={customersQuery.data.number >= customersQuery.data.totalPages - 1 || customersQuery.isFetching}
              onClick={() => setPage((currentPage) => currentPage + 1)}
              type="button"
            >
              Trang sau
            </button>
          </div>
        </div>
      )}

      {(selectedCustomer || isCreating) && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900/40 px-4 py-6" role="presentation">
          <div aria-labelledby="customer-modal-title" aria-modal="true" className="max-h-full w-full max-w-2xl overflow-y-auto border border-gray-300 bg-white p-6" role="dialog">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-lg font-semibold" id="customer-modal-title">
                  {isCreating ? 'Thêm khách hàng' : isEditing ? 'Chỉnh sửa khách hàng' : 'Thông tin khách hàng'}
                </h3>
                {!isCreating && <p className="mt-1 text-sm text-gray-600">ID không thể chỉnh sửa.</p>}
              </div>
              <button className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-950" onClick={closeCustomer} type="button">
                Đóng
              </button>
            </div>

            <form className="mt-5 space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              {!isCreating && selectedCustomer && <ReadonlyField label="ID" value={selectedCustomer.id} />}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField disabled={!isEditing && !isCreating} error={errors.name?.message} label="Tên khách hàng" name="name" register={register} type="text" />
                <FormField disabled={!isEditing && !isCreating} error={errors.phone?.message} label="Số điện thoại" name="phone" register={register} type="tel" />
              </div>
              <FormField disabled={!isEditing && !isCreating} error={errors.address?.message} label="Địa chỉ" name="address" register={register} type="text" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="customer-type">Loại khách hàng</label>
                  <select className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={!isEditing && !isCreating} id="customer-type" {...register('type')}>
                    {Object.entries(customerTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium" htmlFor="customer-active">Trạng thái hoạt động</label>
                  <select className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={!isEditing && !isCreating} id="customer-active" {...register('active', { setValueAs: (value: string) => value === 'true' })}>
                    <option value="true">Đang hoạt động</option>
                    <option value="false">Ngừng hoạt động</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="customer-note">Ghi chú</label>
                <textarea className="min-h-20 w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={!isEditing && !isCreating} id="customer-note" {...register('note')} />
              </div>
              {!isCreating && selectedCustomer && <ReadonlyField label="Ngày tạo" value={formatDate(selectedCustomer.createdAt)} />}

              {(updateCustomer.isError || createCustomer.isError) && (
                <p className="text-sm text-red-700" role="alert">
                  {updateCustomer.error?.message ?? createCustomer.error?.message}
                </p>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                {!isEditing && !isCreating ? (
                  <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={startEditing} type="button">
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={updateCustomer.isPending || createCustomer.isPending} onClick={isCreating ? closeCustomer : cancelEditing} type="button">
                      Hủy
                    </button>
                    <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:bg-gray-400" disabled={updateCustomer.isPending || createCustomer.isPending} type="submit">
                      {updateCustomer.isPending || createCustomer.isPending ? 'Đang lưu...' : isCreating ? 'Thêm' : 'Lưu'}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900/40 px-4" role="presentation">
          <div aria-labelledby="delete-customer-title" aria-modal="true" className="w-full max-w-md border border-gray-300 bg-white p-6" role="dialog">
            <h3 className="text-lg font-semibold" id="delete-customer-title">Xóa khách hàng?</h3>
            <p className="mt-2 text-sm text-gray-600">Khách hàng “{deleteTarget.name}” sẽ được ngừng hoạt động.</p>
            {deleteCustomer.isError && <p className="mt-3 text-sm text-red-700" role="alert">{deleteCustomer.error.message}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={deleteCustomer.isPending} onClick={() => setDeleteTarget(null)} type="button">
                Hủy
              </button>
              <button className="bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:bg-gray-400" disabled={deleteCustomer.isPending} onClick={confirmDelete} type="button">
                {deleteCustomer.isPending ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

type FormFieldProps = {
  disabled: boolean
  error?: string
  label: string
  name: 'name' | 'phone' | 'address'
  register: UseFormRegister<CustomerFormValues>
  type: string
}

function FormField({ disabled, error, label, name, register, type }: FormFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium" htmlFor={`customer-${name}`}>{label}</label>
      <input {...register(name)} aria-invalid={Boolean(error)} className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} id={`customer-${name}`} type={type} />
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  )
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <div className="border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600">{value}</div>
    </div>
  )
}
