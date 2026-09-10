import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type FormEvent } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { BaseModal } from '../../components/common/BaseModal.tsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.tsx'
import { FormModal } from '../../components/common/FormModal.tsx'
import type { ApiError } from '../../lib/apiError.ts'
import { productSchema, type ProductFormValues } from './productSchema.ts'
import type { Product, ProductType } from './product.types.ts'
import { useCreateProduct } from './useCreateProduct.ts'
import { useDeleteProduct } from './useDeleteProduct.ts'
import { useProducts } from './useProducts.ts'
import { useUpdateProduct } from './useUpdateProduct.ts'

const productTypeLabels: Record<ProductType, string> = {
  COFFEE_BEAN: 'Cà phê hạt',
  GROUND_COFFEE_NORMAL: 'Cà phê xay thường',
  GROUND_COFFEE_PURE: 'Cà phê xay nguyên chất',
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} đ`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function getFormValues(product: Product): ProductFormValues {
  return { name: product.name, type: product.type, listedPrice: product.listedPrice }
}

export function ProductListPage() {
  const productsQuery = useProducts(true)
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm<ProductFormValues>({ resolver: zodResolver(productSchema) })

  const closeModal = () => {
    setSelectedProduct(null)
    setIsCreating(false)
    setIsEditing(false)
    clearErrors()
  }

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsCreating(false)
    setIsEditing(false)
    reset(getFormValues(product))
    setNotice(null)
  }

  const openCreateModal = () => {
    setSelectedProduct(null)
    setIsCreating(true)
    setIsEditing(false)
    reset({ name: '', type: 'COFFEE_BEAN', listedPrice: 0 })
    setNotice(null)
  }

  const startEditing = () => {
    if (selectedProduct) {
      reset(getFormValues(selectedProduct))
      setIsEditing(true)
    }
  }

  const cancelEditing = () => {
    if (selectedProduct) reset(getFormValues(selectedProduct))
    clearErrors()
    setIsEditing(false)
  }

  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    try {
      if (isCreating) {
        await createProduct.mutateAsync(values)
        closeModal()
        setNotice('Đã thêm sản phẩm thành công.')
      } else if (selectedProduct) {
        await updateProduct.mutateAsync({ id: selectedProduct.id, request: values })
        closeModal()
        setNotice('Đã cập nhật sản phẩm thành công.')
      }
    } catch {
      return
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteProduct.mutateAsync(deleteTarget.id)
      setDeleteTarget(null)
      setNotice('Đã xóa sản phẩm thành công.')
    } catch {
      return
    }
  }

  const mutationError = isCreating ? createProduct.error : updateProduct.error
  const isSaving = createProduct.isPending || updateProduct.isPending

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Sản phẩm</h2>
          <p className="mt-1 text-sm text-gray-600">Danh sách sản phẩm đang được kinh doanh.</p>
        </div>
        <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={openCreateModal} type="button">Thêm sản phẩm</button>
      </div>

      {notice && <div className="border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">{notice}</div>}
      {productsQuery.isPending && <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">Đang tải danh sách sản phẩm...</div>}
      {productsQuery.isError && <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{productsQuery.error.message}</div>}
      {productsQuery.isFetching && !productsQuery.isPending && <p className="text-sm text-gray-600" role="status">Đang cập nhật danh sách...</p>}
      {productsQuery.isSuccess && productsQuery.data.length === 0 && <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">Chưa có sản phẩm nào.</div>}

      {productsQuery.isSuccess && productsQuery.data.length > 0 && (
        <div className="overflow-x-auto border border-gray-300 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-gray-300 bg-gray-50"><tr><th className="px-4 py-3 font-medium">Tên sản phẩm</th><th className="px-4 py-3 font-medium">Loại</th><th className="px-4 py-3 font-medium">Giá niêm yết</th><th className="px-4 py-3 font-medium">Trạng thái</th><th className="px-4 py-3 font-medium">Thao tác</th></tr></thead>
            <tbody>{productsQuery.data.map((product) => <tr className="border-b border-gray-200 last:border-0" key={product.id}><td className="px-4 py-3">{product.name}</td><td className="px-4 py-3 text-gray-600">{productTypeLabels[product.type]}</td><td className="px-4 py-3">{formatPrice(product.listedPrice)}</td><td className="px-4 py-3">{product.active ? 'Đang phục vụ' : 'Ngừng phục vụ'}</td><td className="px-4 py-3"><div className="flex gap-3"><button className="text-gray-700 underline underline-offset-4 hover:text-gray-950" onClick={() => openProduct(product)} type="button">Xem</button><button className="text-red-700 underline underline-offset-4 hover:text-red-900" onClick={() => { deleteProduct.reset(); setDeleteTarget(product) }} type="button">Xóa</button></div></td></tr>)}</tbody>
          </table>
        </div>
      )}

      {(selectedProduct || isCreating) && <ProductFormModal errors={errors} isCreating={isCreating} isEditing={isEditing} isSaving={isSaving} mutationError={mutationError} register={register} selectedProduct={selectedProduct} onCancel={isCreating ? closeModal : cancelEditing} onClose={closeModal} onEdit={startEditing} onSubmit={handleSubmit(onSubmit)} />}
      {deleteTarget && <ConfirmDialog error={deleteProduct.error?.message} isPending={deleteProduct.isPending} message={`Sản phẩm “${deleteTarget.name}” sẽ được ngừng phục vụ.`} onCancel={() => { deleteProduct.reset(); setDeleteTarget(null) }} onConfirm={confirmDelete} title="Xóa sản phẩm?" />}
    </section>
  )
}

type ProductFormModalProps = {
  errors: Record<string, { message?: string } | undefined>
  isCreating: boolean
  isEditing: boolean
  isSaving: boolean
  mutationError: ApiError | null
  register: ReturnType<typeof useForm<ProductFormValues>>['register']
  selectedProduct: Product | null
  onCancel: () => void
  onClose: () => void
  onEdit: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function ProductFormModal({ errors, isCreating, isEditing, isSaving, mutationError, register, selectedProduct, onCancel, onClose, onEdit, onSubmit }: ProductFormModalProps) {
  const readOnly = !isCreating && !isEditing
  const title = isCreating ? 'Thêm sản phẩm' : isEditing ? 'Chỉnh sửa sản phẩm' : 'Thông tin sản phẩm'
  const fields = <>
    {!isCreating && selectedProduct && <ReadonlyField label="ID" value={selectedProduct.id} />}
    <ProductInput disabled={readOnly} error={errors.name?.message} label="Tên sản phẩm" name="name" register={register} type="text" />
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-1 block text-sm font-medium" htmlFor="product-type">Loại sản phẩm</label><select className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={readOnly} id="product-type" {...register('type')}>{Object.entries(productTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{errors.type?.message && <p className="mt-1 text-sm text-red-700">{errors.type.message}</p>}</div><ProductInput disabled={readOnly} error={errors.listedPrice?.message} label="Giá niêm yết (đ/kg)" name="listedPrice" register={register} type="number" /></div>
    {!isCreating && selectedProduct && <><ReadonlyField label="Trạng thái" value={selectedProduct.active ? 'Đang phục vụ' : 'Ngừng phục vụ'} /><ReadonlyField label="Ngày tạo" value={formatDate(selectedProduct.createdAt)} /></>}
    {mutationError && <p className="text-sm text-red-700" role="alert">{mutationError.message}</p>}
  </>

  if (isCreating || isEditing) return <FormModal footer={<><button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={isSaving} onClick={onCancel} type="button">Hủy</button><button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:bg-gray-400" disabled={isSaving} type="submit">{isSaving ? 'Đang lưu...' : isCreating ? 'Thêm' : 'Lưu'}</button></>} onClose={onClose} onSubmit={onSubmit} title={title}>{fields}</FormModal>
  return <BaseModal footer={<button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={onEdit} type="button">Chỉnh sửa</button>} onClose={onClose} title={title}><div className="space-y-4">{fields}</div></BaseModal>
}

type ProductInputProps = { disabled: boolean; error?: string; label: string; name: 'name' | 'listedPrice'; register: ReturnType<typeof useForm<ProductFormValues>>['register']; type: string }

function ProductInput({ disabled, error, label, name, register, type }: ProductInputProps) {
  return <div><label className="mb-1 block text-sm font-medium" htmlFor={`product-${name}`}>{label}</label><input {...register(name, { valueAsNumber: name === 'listedPrice' })} aria-invalid={Boolean(error)} className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} id={`product-${name}`} min={name === 'listedPrice' ? 1 : undefined} step={name === 'listedPrice' ? 1 : undefined} type={type} />{error && <p className="mt-1 text-sm text-red-700">{error}</p>}</div>
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return <div><span className="mb-1 block text-sm font-medium">{label}</span><div className="border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600">{value}</div></div>
}
