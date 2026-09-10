import { BaseModal } from './BaseModal.tsx'

type ConfirmDialogProps = {
  title: string
  message: string
  isPending?: boolean
  error?: string
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({ title, message, isPending = false, error, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <BaseModal maxWidth="max-w-md" onClose={onCancel} title={title}>
      <p className="text-sm text-gray-600">{message}</p>
      {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <button className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" disabled={isPending} onClick={onCancel} type="button">
          Hủy
        </button>
        <button className="bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:bg-gray-400" disabled={isPending} onClick={onConfirm} type="button">
          {isPending ? 'Đang xử lý...' : 'Xác nhận'}
        </button>
      </div>
    </BaseModal>
  )
}
