import { z } from 'zod'

const phoneSchema = z.string().trim().min(1, 'Vui lòng nhập số điện thoại.')

const roleSchema = z.enum(['ADMIN', 'CUSTOMER'])

export const userSchema = z.object({
  fullName: z.string().trim().min(1, 'Vui lòng nhập họ và tên.'),
  email: z.union([z.string().trim().email('Email không đúng định dạng.'), z.literal('')]),
  phone: phoneSchema,
  password: z.string().optional(),
  role: roleSchema,
  active: z.boolean(),
})

export type UserFormValues = z.infer<typeof userSchema>
