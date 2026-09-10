import type { ReactNode } from 'react'

type BaseModalProps = {
  title: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
  labelledBy?: string
  maxWidth?: string
}

export function BaseModal({ title, children, footer, onClose, labelledBy = 'modal-title', maxWidth = 'max-w-2xl' }: BaseModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900/40 px-4 py-6" role="presentation">
      <div aria-labelledby={labelledBy} aria-modal="true" className={`max-h-full w-full ${maxWidth} overflow-y-auto border border-gray-300 bg-white p-6`} role="dialog">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold" id={labelledBy}>{title}</h3>
          <button className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-950" onClick={onClose} type="button">
            Đóng
          </button>
        </div>
        <div className="mt-5">{children}</div>
        {footer && <div className="mt-5 border-t border-gray-200 pt-4">{footer}</div>}
      </div>
    </div>
  )
}
