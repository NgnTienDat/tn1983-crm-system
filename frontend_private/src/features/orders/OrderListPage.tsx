import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, type FormEvent } from 'react'
import { useFieldArray, useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { BaseModal } from '../../components/common/BaseModal.tsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.tsx'
import { FormModal } from '../../components/common/FormModal.tsx'
import { useCustomers } from '../customers/useCustomers.ts'
import { useProducts } from '../products/useProducts.ts'
import type { Customer } from '../customers/customer.types.ts'
import type { Product } from '../products/product.types.ts'
import type { ApiError } from '../../lib/apiError.ts'
import { orderSchema, type OrderFormValues } from './orderSchema.ts'
import type { OrderDetail, OrderStatus, OrderSummary } from './order.types.ts'
import { useChangeOrderStatus } from './useChangeOrderStatus.ts'
import { useCreateOrder } from './useCreateOrder.ts'
import { useDeleteOrder } from './useDeleteOrder.ts'
import { useOrderDetail } from './useOrderDetail.ts'
import { useOrders } from './useOrders.ts'
import { useUpdateOrder } from './useUpdateOrder.ts'

const statusLabels: Record<OrderStatus, string> = {
  RECEIVED: 'Đã tiếp nhận',
  ROASTING: 'Đang rang',
  PACKAGING: 'Đang đóng gói',
  WAITING_FOR_SHIPPING: 'Chờ giao hàng',
  SHIPPED: 'Đã giao',
  COMPLETED: 'Hoàn tất',
}

const sourceLabels = { PHONE: 'Điện thoại', ZALO: 'Zalo', DIRECT: 'Trực tiếp' }
const shippingLabels = { PICKUP: 'Nhận tại cửa hàng', VIETNAM_POST: 'Vietnam Post', TIEN_OANH: 'Tiến Oanh', OTHER: 'Khác' }
const packagingLabels = { SILVER_BAG: 'Túi bạc', BRANDED_BAG: 'Túi thương hiệu' }
const packageSizeLabels = { KG_1: '1 kg', GRAM_500: '500 gram', GRAM_250: '250 gram' }
const packageSizeKg = { KG_1: 1, GRAM_500: 0.5, GRAM_250: 0.25 }
const emptyItem = { productId: '', quantityKg: 0.25, unitPricePerKg: 0, packagingType: 'SILVER_BAG' as const, packageSize: 'KG_1' as const, packageCount: 1 }

function formatMoney(value: number) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} đ`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function getFormValues(order: OrderDetail): OrderFormValues {
  return {
    customerId: order.customer.id,
    receiverName: order.receiverName,
    receiverPhone: order.receiverPhone,
    receiverAddress: order.receiverAddress,
    source: order.source ?? undefined,
    shippingMethod: order.shippingMethod ?? undefined,
    note: order.note ?? '',
    items: order.items.map((item) => ({
      productId: item.productId,
      quantityKg: item.quantityKg,
      unitPricePerKg: item.unitPricePerKg,
      packagingType: item.packagingType,
      packageSize: item.packageSize,
      packageCount: item.packageCount,
    })),
  }
}

export function OrderListPage() {
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState<OrderStatus | ''>('')
  const [customerId, setCustomerId] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<OrderSummary | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<OrderSummary | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [pendingCreate, setPendingCreate] = useState<OrderFormValues | null>(null)
  const ordersQuery = useOrders({ page, size: 10, status: status || undefined, customerId: customerId || undefined, keyword: keyword || undefined })
  const detailQuery = useOrderDetail(selectedOrder?.id ?? null)
  const customersQuery = useCustomers(0, 50, '')
  const productsQuery = useProducts(true)
  const createOrder = useCreateOrder()
  const updateOrder = useUpdateOrder()
  const deleteOrder = useDeleteOrder()
  const changeStatus = useChangeOrderStatus()
  const [customerSearch, setCustomerSearch] = useState('')
  const searchedCustomersQuery = useCustomers(0, 50, customerSearch)
  const detail = detailQuery.data
  const form = useForm<OrderFormValues>({ resolver: zodResolver(orderSchema), defaultValues: { ...emptyOrder(), items: [emptyItem] } })
  const items = useFieldArray({ control: form.control, name: 'items' })

  useEffect(() => {
    const timer = window.setTimeout(() => { setPage(0); setKeyword(keywordInput.trim()) }, 400)
    return () => window.clearTimeout(timer)
  }, [keywordInput])

  useEffect(() => {
    if (detail && selectedOrder && !isCreating) {
      form.reset(getFormValues(detail))
    }
  }, [detail, form, isCreating, selectedOrder])

  const closeModal = () => {
    setSelectedOrder(null)
    setIsCreating(false)
    setIsEditing(false)
    form.clearErrors()
    setCustomerSearch('')
    setSelectedCustomer(null)
    setPendingCreate(null)
    createOrder.reset()
    updateOrder.reset()
    changeStatus.reset()
  }

  const openDetail = (order: OrderSummary) => {
    setSelectedOrder(order)
    setIsCreating(false)
    setIsEditing(false)
    setNotice(null)
  }

  const openCreate = () => {
    setSelectedOrder(null)
    setIsCreating(true)
    setIsEditing(false)
    form.reset({ ...emptyOrder(), items: [emptyItem] })
    setSelectedCustomer(null)
    setCustomerSearch('')
    setNotice(null)
  }

  const startEditing = () => {
    if (detailQuery.data?.editable) {
      form.reset(getFormValues(detailQuery.data))
      setIsEditing(true)
    }
  }

  const cancelEditing = () => {
    if (detailQuery.data) form.reset(getFormValues(detailQuery.data))
    form.clearErrors()
    setIsEditing(false)
  }

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    form.setValue('customerId', customer.id, { shouldValidate: true })
    form.setValue('receiverName', customer.name)
    form.setValue('receiverPhone', customer.phone)
    form.setValue('receiverAddress', customer.address ?? '')
    setCustomerSearch(`${customer.name} · ${customer.phone}`)
  }

  const onSubmit: SubmitHandler<OrderFormValues> = async (values) => {
    if (isCreating) {
      setPendingCreate(values)
      return
    }

    try {
      if (detailQuery.data) {
        await updateOrder.mutateAsync({ id: detailQuery.data.id, request: values })
        closeModal()
        setNotice('Đã cập nhật đơn hàng thành công.')
      }
    } catch {
      return
    }
  }

  const confirmCreate = async () => {
    if (!pendingCreate) return
    try {
      await createOrder.mutateAsync(pendingCreate)
      setPendingCreate(null)
      closeModal()
      setNotice('Đã tạo đơn hàng thành công.')
    } catch {
      return
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteOrder.mutateAsync(deleteTarget.id)
      setDeleteTarget(null)
      setNotice('Đã xóa đơn hàng thành công.')
    } catch {
      return
    }
  }

  const handleStatusChange = async (nextStatus: OrderStatus) => {
    if (!detailQuery.data) return
    try {
      await changeStatus.mutateAsync({ id: detailQuery.data.id, request: { status: nextStatus } })
      setNotice('Đã cập nhật trạng thái đơn hàng thành công.')
    } catch {
      return
    }
  }

  const activeMutationError = isCreating ? createOrder.error : updateOrder.error
  const isSaving = createOrder.isPending || updateOrder.isPending
  const customerOptions = customerSearch ? searchedCustomersQuery.data?.content ?? [] : customersQuery.data?.content ?? []
  const watchedItems = useWatch({ control: form.control, name: 'items' })
  const totalAmount = watchedItems.reduce((total, item) => {
    const currentItem = item ?? emptyItem
    return total + (currentItem.quantityKg || 0) * (currentItem.unitPricePerKg || 0)
  }, 0)

  useEffect(() => {
    watchedItems.forEach((item, index) => {
      const currentItem = item ?? emptyItem
      const count = Math.round((currentItem.quantityKg || 0) / packageSizeKg[currentItem.packageSize])
      if (currentItem.packageCount !== count) {
        form.setValue(`items.${index}.packageCount`, count, { shouldValidate: true })
      }
    })
  }, [form, watchedItems])

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="text-base font-semibold">Đơn hàng</h2><p className="mt-1 text-sm text-gray-600">Quản lý đơn hàng và tiến độ xử lý.</p></div>
        <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={openCreate} type="button">Tạo đơn hàng</button>
      </div>

      <div className="grid gap-3 border border-gray-300 bg-white p-4 md:grid-cols-4">
        <input className="border border-gray-300 px-3 py-2 text-sm" onChange={(event) => setKeywordInput(event.target.value)} placeholder="Mã đơn, người nhận, SĐT" value={keywordInput} />
        <select className="border border-gray-300 px-3 py-2 text-sm" onChange={(event) => { setPage(0); setStatus(event.target.value as OrderStatus | '') }} value={status}><option value="">Tất cả trạng thái</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <select className="border border-gray-300 px-3 py-2 text-sm" onChange={(event) => { setPage(0); setCustomerId(event.target.value) }} value={customerId}><option value="">Tất cả khách hàng</option>{(customersQuery.data?.content ?? []).map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select>
        <button className="border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100" onClick={() => { setKeywordInput(''); setKeyword(''); setStatus(''); setCustomerId(''); setPage(0) }} type="button">Xóa bộ lọc</button>
      </div>

      {notice && <div className="border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">{notice}</div>}
      {ordersQuery.isPending && <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">Đang tải danh sách đơn hàng...</div>}
      {ordersQuery.isError && <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{ordersQuery.error.message}</div>}
      {ordersQuery.isFetching && !ordersQuery.isPending && <p className="text-sm text-gray-600" role="status">Đang cập nhật danh sách...</p>}
      {ordersQuery.isSuccess && ordersQuery.data.content.length === 0 && <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">Chưa có đơn hàng phù hợp.</div>}

      {ordersQuery.isSuccess && ordersQuery.data.content.length > 0 && <div className="overflow-x-auto border border-gray-300 bg-white"><table className="w-full min-w-250 text-left text-sm"><thead className="border-b border-gray-300 bg-gray-50"><tr><th className="px-4 py-3 font-medium">Mã đơn hàng</th><th className="px-4 py-3 font-medium">Khách hàng</th><th className="px-4 py-3 font-medium">Người nhận</th><th className="px-4 py-3 font-medium">Số điện thoại</th><th className="px-4 py-3 font-medium">Tổng tiền</th><th className="px-4 py-3 font-medium">Trạng thái</th><th className="px-4 py-3 font-medium">Ngày tạo</th><th className="px-4 py-3 font-medium">Thao tác</th></tr></thead><tbody>{ordersQuery.data.content.map((order) => <tr className="border-b border-gray-200 last:border-0" key={order.id}><td className="px-4 py-3 font-medium">{order.orderCode}</td><td className="px-4 py-3">{order.customer.name}</td><td className="px-4 py-3">{order.receiverName}</td><td className="px-4 py-3 text-gray-600">—</td><td className="px-4 py-3">{formatMoney(order.totalAmount)}</td><td className="px-4 py-3">{statusLabels[order.status]}</td><td className="px-4 py-3 text-gray-600">{formatDate(order.createdAt)}</td><td className="px-4 py-3"><div className="flex gap-3"><button className="text-gray-700 underline underline-offset-4 hover:text-gray-950" onClick={() => openDetail(order)} type="button">Xem</button><button className="text-red-700 underline underline-offset-4 hover:text-red-900" onClick={() => { deleteOrder.reset(); setDeleteTarget(order) }} type="button">Xóa</button></div></td></tr>)}</tbody></table></div>}

      {ordersQuery.isSuccess && ordersQuery.data.totalPages > 0 && <div className="flex flex-wrap items-center justify-between gap-3 text-sm"><span className="text-gray-600">Trang {ordersQuery.data.number + 1} / {ordersQuery.data.totalPages} ({ordersQuery.data.totalElements} đơn hàng)</span><div className="flex gap-2"><button className="border border-gray-300 px-3 py-2 disabled:opacity-50" disabled={page === 0 || ordersQuery.isFetching} onClick={() => setPage((value) => Math.max(0, value - 1))} type="button">Trang trước</button><button className="border border-gray-300 px-3 py-2 disabled:opacity-50" disabled={page >= ordersQuery.data.totalPages - 1 || ordersQuery.isFetching} onClick={() => setPage((value) => value + 1)} type="button">Trang sau</button></div></div>}

      {isCreating && <OrderModal detail={undefined} errors={form.formState.errors} isCreating isEditing={false} isSaving={isSaving} mutationError={activeMutationError} customerOptions={customerOptions} customerSearch={customerSearch} selectedCustomer={selectedCustomer} form={form} items={items} products={productsQuery.data ?? []} totalAmount={totalAmount} onAddItem={() => items.append(emptyItem)} onCancel={closeModal} onClose={closeModal} onCustomerSearch={(value) => { setSelectedCustomer(null); setCustomerSearch(value) }} onEdit={startEditing} onRemoveItem={(index) => items.remove(index)} onSelectCustomer={selectCustomer} onSubmit={form.handleSubmit(onSubmit)} />}
      {selectedOrder && detailQuery.isPending && <BaseModal onClose={closeModal} title={`Chi tiết ${selectedOrder.orderCode}`}><p className="text-sm text-gray-600">Đang tải chi tiết đơn hàng...</p></BaseModal>}
      {selectedOrder && detailQuery.isError && <BaseModal onClose={closeModal} title={`Chi tiết ${selectedOrder.orderCode}`}><p className="text-sm text-red-700" role="alert">{detailQuery.error.message}</p></BaseModal>}
      {selectedOrder && detail && <OrderModal changeStatusError={changeStatus.error?.message} detail={detail} errors={form.formState.errors} isCreating={false} isEditing={isEditing} isSaving={isSaving} mutationError={activeMutationError} customerOptions={customerOptions} customerSearch={customerSearch || `${detail.customer.name} · ${detail.customer.phone}`} selectedCustomer={detail.customer} form={form} items={items} products={productsQuery.data ?? []} statusPending={changeStatus.isPending} onAddItem={() => items.append(emptyItem)} onCancel={cancelEditing} onClose={closeModal} onCustomerSearch={setCustomerSearch} onEdit={startEditing} onRemoveItem={(index) => items.remove(index)} onSelectCustomer={selectCustomer} onStatusChange={handleStatusChange} onSubmit={form.handleSubmit(onSubmit)} />}
      {deleteTarget && <ConfirmDialog error={deleteOrder.error?.message} isPending={deleteOrder.isPending} message={`Đơn hàng “${deleteTarget.orderCode}” sẽ được xóa khỏi danh sách.`} onCancel={() => { deleteOrder.reset(); setDeleteTarget(null) }} onConfirm={confirmDelete} title="Xóa đơn hàng?" />}
      {pendingCreate && <CreateConfirmation order={pendingCreate} customer={selectedCustomer} isPending={createOrder.isPending} error={createOrder.error?.message} products={productsQuery.data ?? []} totalAmount={totalAmount} onCancel={() => { createOrder.reset(); setPendingCreate(null) }} onConfirm={confirmCreate} />}
    </section>
  )
}

function emptyOrder(): Omit<OrderFormValues, 'items'> {
  return { customerId: '', receiverName: '', receiverPhone: '', receiverAddress: '', source: undefined, shippingMethod: undefined, note: '' }
}

type OrderModalProps = {
  detail: OrderDetail | undefined
  errors: Record<string, unknown>
  isCreating: boolean
  isEditing: boolean
  isSaving: boolean
  mutationError: ApiError | null
  customerOptions: Customer[]
  customerSearch: string
  selectedCustomer: Pick<Customer, 'name' | 'phone'> | null
  totalAmount?: number
  form: ReturnType<typeof useForm<OrderFormValues>>
  items: ReturnType<typeof useFieldArray<OrderFormValues, 'items'>>
  products: Product[]
  onAddItem: () => void
  onCancel: () => void
  onClose: () => void
  onCustomerSearch: (value: string) => void
  onEdit: () => void
  onRemoveItem: (index: number) => void
  onSelectCustomer: (customer: Customer) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  changeStatusError?: string
  statusPending?: boolean
  onStatusChange?: (status: OrderStatus) => void
}

function OrderModal({ detail, errors, isCreating, isEditing, isSaving, mutationError, customerOptions, customerSearch, selectedCustomer, form, items, products, totalAmount = 0, changeStatusError, statusPending = false, onAddItem, onCancel, onClose, onCustomerSearch, onEdit, onRemoveItem, onSelectCustomer, onStatusChange, onSubmit }: OrderModalProps) {
  const watchedItems = useWatch({ control: form.control, name: 'items' })
  if (!isCreating && !detail) return null
  const readOnly = !isCreating && !isEditing
  const title = isCreating ? 'Tạo đơn hàng' : isEditing ? `Chỉnh sửa ${detail?.orderCode}` : `Chi tiết ${detail?.orderCode}`
  const content = <>
    {!isCreating && detail && <div className="grid gap-4 sm:grid-cols-2"><ReadonlyField label="Mã đơn hàng" value={detail.orderCode} /><ReadonlyField label="Trạng thái" value={statusLabels[detail.status]} /></div>}
    <div><label className="mb-1 block text-sm font-medium" htmlFor="order-customer-search">Đơn hàng đặt bởi</label><input className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={readOnly} id="order-customer-search" onChange={(event) => onCustomerSearch(event.target.value)} placeholder="Tìm tên hoặc số điện thoại khách hàng" value={customerSearch} />{!readOnly && customerSearch && !selectedCustomer && <div className="mt-1 max-h-32 overflow-y-auto border border-gray-300 bg-white">{customerOptions.map((customer) => <button className="block w-full border-b border-gray-200 px-3 py-2 text-left text-sm hover:bg-gray-100" key={customer.id} onClick={() => onSelectCustomer(customer)} type="button">{customer.name} · {customer.phone}</button>)}</div>}{form.formState.errors.customerId?.message && <p className="mt-1 text-sm text-red-700">{String(form.formState.errors.customerId.message)}</p>}</div>
    <div className="grid gap-4 sm:grid-cols-2"><OrderInput disabled={readOnly} error={form.formState.errors.receiverName?.message} label="Người nhận" register={form.register} name="receiverName" type="text" /><OrderInput disabled={readOnly} error={form.formState.errors.receiverPhone?.message} label="SĐT người nhận" register={form.register} name="receiverPhone" type="tel" /></div>
    <OrderInput disabled={readOnly} error={form.formState.errors.receiverAddress?.message} label="Địa chỉ nhận hàng" register={form.register} name="receiverAddress" type="text" />
    <div className="grid gap-4 sm:grid-cols-2"><SelectField disabled={readOnly} label="Nguồn đơn" name="source" options={sourceLabels} register={form.register} /><SelectField disabled={readOnly} label="Phương thức giao hàng" name="shippingMethod" options={shippingLabels} register={form.register} /></div>
    <div><label className="mb-1 block text-sm font-medium" htmlFor="order-note">Ghi chú</label><textarea className="min-h-20 w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={readOnly} id="order-note" {...form.register('note')} /></div>
    {(isCreating || isEditing) && <div className="border-t border-gray-200 pt-4"><div className="mb-3 flex items-center justify-between"><h4 className="font-medium">Sản phẩm</h4><button className="border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100" onClick={onAddItem} type="button">Thêm sản phẩm</button></div>{items.fields.map((field, index) => <OrderItemFields disabled={false} errors={(errors.items as Array<{ [key: string]: { message?: string } }> | undefined)?.[index]} index={index} item={watchedItems[index]} key={field.id} products={products} register={form.register} setValue={form.setValue} onRemove={() => onRemoveItem(index)} />)}</div>}
    {!isCreating && detail && <><OrderDetailReadOnly detail={detail} /><StatusModal detail={detail} error={changeStatusError} isPending={statusPending} onChange={onStatusChange ?? (() => undefined)} /></>}
    {mutationError && <p className="text-sm text-red-700" role="alert">{mutationError.message}</p>}
  </>
  if (isCreating || isEditing) return <FormModal footer={<div className="flex w-full items-center justify-between gap-3"><span className="font-medium">Tổng tiền: {formatMoney(totalAmount)}</span><div className="flex gap-3"><button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={isSaving} onClick={onCancel} type="button">Hủy</button><button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400" disabled={isSaving} type="submit">{isSaving ? 'Đang lưu...' : isCreating ? 'Tạo đơn' : 'Lưu'}</button></div></div>} onClose={onClose} onSubmit={onSubmit} title={title}>{content}</FormModal>
  return <BaseModal footer={<button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400" disabled={!detail?.editable} onClick={onEdit} type="button">Chỉnh sửa</button>} onClose={onClose} title={title}><div className="space-y-4">{content}</div></BaseModal>
}

type OrderInputProps = { disabled: boolean; error?: string; label: string; name: 'receiverName' | 'receiverPhone' | 'receiverAddress'; register: ReturnType<typeof useForm<OrderFormValues>>['register']; type: string }
function OrderInput({ disabled, error, label, name, register, type }: OrderInputProps) { return <div><label className="mb-1 block text-sm font-medium" htmlFor={`order-${name}`}>{label}</label><input {...register(name)} aria-invalid={Boolean(error)} className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} id={`order-${name}`} type={type} />{error && <p className="mt-1 text-sm text-red-700">{error}</p>}</div> }

function SelectField({ disabled, label, name, options, register }: { disabled: boolean; label: string; name: string; options: Record<string, string>; register: ReturnType<typeof useForm<OrderFormValues>>['register'] }) { return <div><label className="mb-1 block text-sm font-medium" htmlFor={`order-${name}`}>{label}</label><select className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} id={`order-${name}`} {...register(name as never)}><option value="">Chưa chọn</option>{Object.entries(options).map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></div> }

function OrderItemFields({ disabled, errors, index, item, products, register, setValue, onRemove }: { disabled: boolean; errors?: { [key: string]: { message?: string } }; index: number; item?: OrderFormValues['items'][number]; products: Product[]; register: ReturnType<typeof useForm<OrderFormValues>>['register']; setValue: ReturnType<typeof useForm<OrderFormValues>>['setValue']; onRemove: () => void }) { const error = (name: string) => errors?.[name]?.message; const itemName = `items.${index}` as const; const currentItem = item ?? emptyItem; const packageCount = Math.round((currentItem.quantityKg || 0) / packageSizeKg[currentItem.packageSize]); const totalPrice = (currentItem.quantityKg || 0) * (currentItem.unitPricePerKg || 0); return <div className="space-y-3 border border-gray-200 p-3"><div className="grid gap-3 md:grid-cols-2"><div><label className="mb-1 block text-sm font-medium">Sản phẩm</label><select className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} {...register(`${itemName}.productId`)} onChange={(event) => { const product = products.find((option) => option.id === event.target.value); setValue(`${itemName}.productId`, event.target.value, { shouldValidate: true }); if (product) setValue(`${itemName}.unitPricePerKg`, product.listedPrice, { shouldValidate: true }) }}><option value="">Chọn sản phẩm</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select>{error('productId') && <p className="mt-1 text-sm text-red-700">{error('productId')}</p>}</div><OrderNumber disabled={disabled} error={error('quantityKg')} label="Số kg" min="0.25" name={`${itemName}.quantityKg`} register={register} step="0.25" /></div><div className="grid gap-3 md:grid-cols-2"><OrderNumber disabled={disabled} error={error('unitPricePerKg')} label="Đơn giá/kg" name={`${itemName}.unitPricePerKg`} register={register} step="0.01" /><ReadonlyField label="Số gói / Thành tiền" value={`${packageCount} gói · ${formatMoney(totalPrice)}`} /></div><div className="grid gap-3 md:grid-cols-2"><SelectField disabled={disabled} label="Loại bao bì" name={`${itemName}.packagingType`} options={packagingLabels} register={register} /><SelectField disabled={disabled} label="Kích cỡ đóng gói" name={`${itemName}.packageSize`} options={packageSizeLabels} register={register} /></div>{!disabled && <button className="text-sm text-red-700 underline underline-offset-4" onClick={onRemove} type="button">Xóa dòng</button>}</div> }

function OrderNumber({ disabled, error, label, min, name, register, step }: { disabled: boolean; error?: string; label: string; min?: string; name: string; register: ReturnType<typeof useForm<OrderFormValues>>['register']; step: string }) { return <div><label className="mb-1 block text-sm font-medium">{label}</label><input className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} min={min} step={step} type="number" {...register(name as never, { valueAsNumber: true })} />{error && <p className="mt-1 text-sm text-red-700">{error}</p>}</div> }

function OrderDetailReadOnly({ detail }: { detail: OrderDetail }) { return <div className="space-y-4 border-t border-gray-200 pt-4"><div><h4 className="font-medium">Thông tin khách hàng</h4><p className="mt-1 text-sm">{detail.customer.name} · {detail.customer.phone}</p><p className="text-sm text-gray-600">{detail.customer.address}</p></div><div><h4 className="font-medium">Danh sách sản phẩm</h4>{detail.items.map((item) => <p className="mt-1 text-sm" key={item.id}>{item.productName} · {item.quantityKg} kg · {formatMoney(item.totalPrice)}</p>)}</div><p className="font-medium">Tổng tiền: {formatMoney(detail.totalAmount)}</p><div><h4 className="font-medium">Lịch sử trạng thái</h4>{detail.statusHistory.length === 0 ? <p className="mt-1 text-sm text-gray-600">Chưa có lịch sử.</p> : detail.statusHistory.map((entry) => <p className="mt-1 text-sm" key={entry.id}>{statusLabels[entry.status]} · {formatDate(entry.changedAt)}{entry.note ? ` · ${entry.note}` : ''}</p>)}</div></div> }

function StatusModal({ detail, error, isPending, onChange }: { detail: OrderDetail; error?: string; isPending: boolean; onChange: (status: OrderStatus) => void }) { return <div className="mt-4 border-t border-gray-200 pt-4"><label className="mb-1 block text-sm font-medium" htmlFor="next-order-status">Chuyển trạng thái</label><select className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={isPending || detail.allowedNextStatuses.length === 0} id="next-order-status" onChange={(event) => { if (event.target.value) onChange(event.target.value as OrderStatus) }} value=""><option value="">Chọn trạng thái tiếp theo</option>{detail.allowedNextStatuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select>{error && <p className="mt-1 text-sm text-red-700" role="alert">{error}</p>}</div> }

function CreateConfirmation({ order, customer, error, isPending, products, totalAmount, onCancel, onConfirm }: { order: OrderFormValues; customer: Customer | null; error?: string; isPending: boolean; products: Product[]; totalAmount: number; onCancel: () => void; onConfirm: () => void }) {
  return <BaseModal title="Xác nhận thông tin đơn hàng" onClose={onCancel}>
    <div className="space-y-3 text-sm">
      <div><span className="font-medium">Đơn hàng đặt bởi:</span> {customer ? `${customer.name} · ${customer.phone}` : order.customerId}</div>
      <div><span className="font-medium">Người nhận:</span> {order.receiverName} · {order.receiverPhone}</div>
      <div><span className="font-medium">Địa chỉ:</span> {order.receiverAddress}</div>
      {order.note && <div><span className="font-medium">Ghi chú:</span> {order.note}</div>}
      <div className="border-t border-gray-200 pt-3">
        <p className="font-medium">Sản phẩm</p>
        {order.items.map((item, index) => {
          const product = products.find((option) => option.id === item.productId)
          const count = Math.round(item.quantityKg / packageSizeKg[item.packageSize])
          const subtotal = item.quantityKg * item.unitPricePerKg
          return <p className="mt-1" key={`${item.productId}-${index}`}>{product?.name ?? item.productId} · {item.quantityKg} kg · {count} gói · {formatMoney(subtotal)}</p>
        })}
      </div>
      <p className="border-t border-gray-200 pt-3 text-base font-semibold">Tổng tiền: {formatMoney(totalAmount)}</p>
      {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
    </div>
    <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
      <button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={isPending} onClick={onCancel} type="button">Quay lại</button>
      <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400" disabled={isPending} onClick={onConfirm} type="button">{isPending ? 'Đang tạo...' : 'Xác nhận tạo đơn'}</button>
    </div>
  </BaseModal>
}

function ReadonlyField({ label, value }: { label: string; value: string }) { return <div><span className="mb-1 block text-sm font-medium">{label}</span><div className="border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600">{value}</div></div> }
