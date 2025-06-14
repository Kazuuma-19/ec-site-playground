import { z } from "zod";

export const orderFormSchema = z.object({
  destinationName: z.string().min(1, "名前は必須です"),
  destinationEmail: z.string().email("正しいメールアドレスを入力してください"),
  destinationZipcode: z
    .string()
    .min(1, "郵便番号は必須です")
    .regex(/^\d{7}$/, "郵便番号は7桁の数字で入力してください"),
  destinationAddress: z.string().min(1, "住所は必須です"),
  destinationTelephone: z
    .string()
    .min(1, "電話番号は必須です")
    .regex(/^\d{10,11}$/, "電話番号は10桁または11桁の数字で入力してください"),
  deliveryDate: z.string(),
  deliveryTime: z.string(),
  paymentMethod: z.union([z.literal(0), z.literal(1)]),
});

export type OrderForm = z.infer<typeof orderFormSchema>;
