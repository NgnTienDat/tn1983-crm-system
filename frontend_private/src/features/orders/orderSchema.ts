import { z } from 'zod'

export const orderSchema = z.object({
  customerId: z.string().min(1, 'Vui lòng chọn khách hàng.'),
  receiverName: z.string().trim().min(1, 'Vui lòng nhập tên người nhận.'),
  receiverPhone: z.string().trim().min(1, 'Vui lòng nhập số điện thoại người nhận.'),
  receiverAddress: z.string().trim().min(1, 'Vui lòng nhập địa chỉ nhận hàng.'),
  source: z.enum(['PHONE', 'ZALO', 'DIRECT']).optional(),
  shippingMethod: z.enum(['PICKUP', 'VIETNAM_POST', 'TIEN_OANH', 'OTHER']).optional(),
  note: z.string().optional(),
  items: z.array(z.object({
    productId: z.string().min(1, 'Vui lòng chọn sản phẩm.'),
    quantityKg: z.number().min(0.25, 'Khối lượng tối thiểu là 0.25 kg.'),
    unitPricePerKg: z.number().min(0.01, 'Đơn giá phải lớn hơn 0.'),
    packagingType: z.enum(['SILVER_BAG', 'BRANDED_BAG']),
    packageSize: z.enum(['KG_1', 'GRAM_500', 'GRAM_250']),
    packageCount: z.number().int().positive('Số lượng gói phải lớn hơn 0.'),
  })).min(1, 'Đơn hàng phải có ít nhất một sản phẩm.'),
})

export type OrderFormValues = z.infer<typeof orderSchema>
