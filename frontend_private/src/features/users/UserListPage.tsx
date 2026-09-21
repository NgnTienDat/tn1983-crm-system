import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type SubmitHandler, type UseFormRegister } from 'react-hook-form'
import { BaseModal } from '../../components/common/BaseModal.tsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.tsx'
import { userSchema, type UserFormValues } from './userSchema.ts'
import type { User, UserRole } from './user.types.ts'
import { useCreateUser } from './useCreateUser.ts'
import { useDeleteUser } from './useDeleteUser.ts'
import { useUpdateUser } from './useUpdateUser.ts'
import { useUsers } from './useUsers.ts'

const roleLabels: Record<UserRole, string> = {
  ADMIN: 'Quản trị viên',
  CUSTOMER: 'Khách hàng',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function getFormValues(user: User): UserFormValues {
  return { fullName: user.fullName, email: user.email, phone: user.phone, password: '', role: user.role, active: user.active }
}

export function UserListPage() {
  const usersQuery = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const { register, handleSubmit, reset, clearErrors, setError, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  })

  const closeUser = () => {
    setSelectedUser(null)
    setIsCreating(false)
    setIsEditing(false)
    clearErrors()
  }

  const openUser = (user: User) => {
    setSelectedUser(user)
    setIsCreating(false)
    setIsEditing(false)
    reset(getFormValues(user))
    setNotice(null)
  }

  const openCreateModal = () => {
    setSelectedUser(null)
    setIsCreating(true)
    setIsEditing(false)
    reset({ fullName: '', email: '', phone: '', password: '', role: 'CUSTOMER', active: true })
    setNotice(null)
  }

  const onSubmit: SubmitHandler<UserFormValues> = async (values) => {
    if (isCreating) {
      if (values.fullName.length > 100) {
        setError('fullName', { message: 'Họ và tên không được vượt quá 100 ký tự.' })
        return
      }
      if (!values.email) {
        setError('email', { message: 'Vui lòng nhập email.' })
        return
      }
      if (values.email.length > 100) {
        setError('email', { message: 'Email không được vượt quá 100 ký tự.' })
        return
      }
      if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(values.phone)) {
        setError('phone', { message: 'Số điện thoại không đúng định dạng.' })
        return
      }
      if (!values.password || values.password.length < 6 || values.password.length > 50) {
        setError('password', { message: 'Mật khẩu phải có từ 6 đến 50 ký tự.' })
        return
      }
      await createUser.mutateAsync({ fullName: values.fullName, email: values.email, phone: values.phone, password: values.password, role: values.role })
      closeUser()
      setNotice('Đã thêm người dùng thành công.')
      return
    }

    if (!selectedUser) return
    await updateUser.mutateAsync({
      id: selectedUser.id,
      request: { fullName: values.fullName, email: values.email || undefined, phone: values.phone, role: values.role, active: values.active },
    })
    closeUser()
    setNotice('Đã cập nhật người dùng thành công.')
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteUser.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
    setNotice('Đã vô hiệu hóa người dùng thành công.')
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Danh sách người dùng</h2>
          <p className="mt-1 text-sm text-gray-600">Quản lý tài khoản người dùng trong hệ thống.</p>
        </div>
        <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={openCreateModal} type="button">Thêm người dùng</button>
      </div>

      {notice && <div className="border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">{notice}</div>}
      {usersQuery.isPending && <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">Đang tải danh sách người dùng...</div>}
      {usersQuery.isError && <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{usersQuery.error.message}</div>}
      {usersQuery.isFetching && !usersQuery.isPending && <p className="text-sm text-gray-600" role="status">Đang cập nhật danh sách...</p>}
      {usersQuery.isSuccess && usersQuery.data.length === 0 && <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">Chưa có người dùng nào.</div>}

      {usersQuery.isSuccess && usersQuery.data.length > 0 && (
        <div className="overflow-x-auto border border-gray-300 bg-white">
          <table className="w-full min-w-245 text-left text-sm">
            <thead className="border-b border-gray-300 bg-gray-50"><tr>
              <th className="px-4 py-3 font-medium">Họ và tên</th><th className="px-4 py-3 font-medium">Email</th><th className="px-4 py-3 font-medium">Số điện thoại</th><th className="px-4 py-3 font-medium">Vai trò</th><th className="px-4 py-3 font-medium">Trạng thái</th><th className="px-4 py-3 font-medium">Thao tác</th>
            </tr></thead>
            <tbody>{usersQuery.data.map((user) => (
              <tr className="border-b border-gray-200 last:border-0" key={user.id}>
                <td className="px-4 py-3">{user.fullName}</td><td className="px-4 py-3">{user.email}</td><td className="px-4 py-3">{user.phone}</td><td className="px-4 py-3">{roleLabels[user.role]}</td>
                <td className="px-4 py-3">{user.active ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}</td>
                <td className="px-4 py-3"><div className="flex gap-3"><button className="text-gray-700 underline underline-offset-4 hover:text-gray-950" onClick={() => openUser(user)} type="button">Xem</button><button className="text-red-700 underline underline-offset-4 hover:text-red-900" disabled={!user.active} onClick={() => setDeleteTarget(user)} type="button">Vô hiệu hóa</button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {(selectedUser || isCreating) && (
        <BaseModal onClose={closeUser} title={isCreating ? 'Thêm người dùng' : isEditing ? 'Chỉnh sửa người dùng' : 'Thông tin người dùng'}>
          <form className="mt-5 space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            {!isCreating && selectedUser && <ReadonlyField label="ID" value={selectedUser.id} />}
            <div className="grid gap-4 sm:grid-cols-2"><FormField disabled={!isCreating && !isEditing} error={errors.fullName?.message} label="Họ và tên" name="fullName" register={register} type="text" /><FormField disabled={!isCreating && !isEditing} error={errors.email?.message} label="Email" name="email" register={register} type="email" /></div>
            <div className="grid gap-4 sm:grid-cols-2"><FormField disabled={!isCreating && !isEditing} error={errors.phone?.message} label="Số điện thoại" name="phone" register={register} type="tel" />{isCreating && <FormField disabled={false} error={errors.password?.message} label="Mật khẩu" name="password" register={register} type="password" />}</div>
            <div className="grid gap-4 sm:grid-cols-2"><SelectField disabled={!isCreating && !isEditing} label="Vai trò" name="role" register={register} /><SelectField disabled={!isCreating && !isEditing} label="Trạng thái" name="active" register={register} /></div>
            {!isCreating && selectedUser && <ReadonlyField label="Ngày tạo" value={formatDate(selectedUser.createdAt)} />}
            {(createUser.isError || updateUser.isError) && <p className="text-sm text-red-700" role="alert">{createUser.error?.message ?? updateUser.error?.message}</p>}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">{!isCreating && !isEditing ? <button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700" onClick={() => setIsEditing(true)} type="button">Chỉnh sửa</button> : <><button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={createUser.isPending || updateUser.isPending} onClick={isCreating ? closeUser : () => { reset(getFormValues(selectedUser!)); setIsEditing(false); clearErrors() }} type="button">Hủy</button><button className="bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:bg-gray-400" disabled={createUser.isPending || updateUser.isPending} type="submit">{createUser.isPending || updateUser.isPending ? 'Đang lưu...' : isCreating ? 'Thêm' : 'Lưu'}</button></>}</div>
          </form>
        </BaseModal>
      )}
      {deleteTarget && <ConfirmDialog error={deleteUser.error?.message} isPending={deleteUser.isPending} message={`Tài khoản “${deleteTarget.fullName}” sẽ được vô hiệu hóa.`} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Vô hiệu hóa người dùng?" />}
    </section>
  )
}

type FormFieldProps = { disabled: boolean; error?: string; label: string; name: 'fullName' | 'email' | 'phone' | 'password'; register: UseFormRegister<UserFormValues>; type: string }

function FormField({ disabled, error, label, name, register, type }: FormFieldProps) {
  return <div><label className="mb-1 block text-sm font-medium" htmlFor={`user-${name}`}>{label}</label><input {...register(name)} aria-invalid={Boolean(error)} className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} id={`user-${name}`} type={type} />{error && <p className="mt-1 text-sm text-red-700">{error}</p>}</div>
}

function SelectField({ disabled, label, name, register }: { disabled: boolean; label: string; name: 'role' | 'active'; register: UseFormRegister<UserFormValues> }) {
  return <div><label className="mb-1 block text-sm font-medium" htmlFor={`user-${name}`}>{label}</label><select {...register(name, name === 'active' ? { setValueAs: (value: string) => value === 'true' } : undefined)} className="w-full border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100" disabled={disabled} id={`user-${name}`}>{name === 'role' ? Object.entries(roleLabels).map(([value, text]) => <option key={value} value={value}>{text}</option>) : <><option value="true">Đang hoạt động</option><option value="false">Đã vô hiệu hóa</option></>}</select></div>
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return <div><span className="mb-1 block text-sm font-medium">{label}</span><div className="border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600">{value}</div></div>
}
