import type { FormEvent, ReactNode } from 'react'
import { BaseModal } from './BaseModal.tsx'

type FormModalProps = {
  title: string
  children: ReactNode
  footer: ReactNode
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function FormModal({ title, children, footer, onClose, onSubmit }: FormModalProps) {
  return (
    <BaseModal onClose={onClose} title={title}>
      <form className="space-y-4" noValidate onSubmit={onSubmit}>
        {children}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">{footer}</div>
      </form>
    </BaseModal>
  )
}
