import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Vui lòng nhập tên sản phẩm.').max(255, 'Tên sản phẩm không được vượt quá 255 ký tự.'),
  type: z.enum(['COFFEE_BEAN', 'GROUND_COFFEE_NORMAL', 'GROUND_COFFEE_PURE'], {
    error: 'Vui lòng chọn loại sản phẩm.',
  }),
  listedPrice: z.number({ error: 'Vui lòng nhập giá niêm yết.' }).min(0.01, 'Giá niêm yết phải lớn hơn 0.'),
})

export type ProductFormValues = z.infer<typeof productSchema>
