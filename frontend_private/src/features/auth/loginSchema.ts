import { z } from 'zod'

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại.')
    .regex(/^\d+$/, 'Số điện thoại chỉ được chứa chữ số.')
    .length(10, 'Số điện thoại phải gồm đúng 10 chữ số.'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu.')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
    .max(50, 'Mật khẩu không được vượt quá 50 ký tự.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>