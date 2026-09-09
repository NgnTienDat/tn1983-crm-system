import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().trim().min(1, 'Vui lòng nhập tên khách hàng.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập số điện thoại.')
    .regex(/^\d+$/, 'Số điện thoại chỉ được chứa chữ số.')
    .length(10, 'Số điện thoại phải gồm đúng 10 chữ số.'),
  address: z.string().trim().min(1, 'Vui lòng nhập địa chỉ.'),
  note: z.string(),
  type: z.enum(['COFFEE_SHOP', 'AGENT', 'INDIVIDUAL']),
  active: z.boolean(),
})

export type CustomerFormValues = z.infer<typeof customerSchema>
