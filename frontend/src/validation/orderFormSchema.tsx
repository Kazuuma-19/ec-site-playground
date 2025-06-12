import { z } from "zod";

export const orderFormSchema = z.object({
  destinationName: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z.string().min(1, "名前は必須です"),
  ),
  destinationEmail: z.string().email("正しいメールアドレスを入力してください"),
  destinationZipcode: z
    .string()
    .regex(/^\d{3}-?\d{4}$/, "郵便番号は7桁の数字で入力してください"),
  destinationAddress: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z.string().min(1, "住所は必須です"),
  ),
  destinationTelephone: z
    .string()
    .regex(/^\d{10,11}$/, "電話番号は10桁または11桁の数字で入力してください"),
  deliveryTime: z.string().min(1, "配達日を選択してください"),
  paymentMethod: z.number().refine((v) => v === 0 || v === 1, {
    message: "支払い方法を選択してください",
  }),
});

export type OrderForm = z.infer<typeof orderFormSchema>;
