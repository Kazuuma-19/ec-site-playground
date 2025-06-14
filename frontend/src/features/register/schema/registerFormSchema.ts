import { z } from "zod";

export const registerFormSchema = z
  .object({
    userName: z.string().min(1, "名前は必須です"),
    email: z.string().email("正しいメールアドレスを入力してください"),
    zipCode: z
      .string()
      .min(1, "郵便番号は必須です")
      .regex(/^\d{7}$/, "郵便番号は7桁の数字で入力してください"),
    address: z.string().min(1, "住所は必須です"),
    telephone: z
      .string()
      .min(1, "電話番号は必須です")
      .regex(/^\d{10,11}$/, "電話番号は10桁または11桁の数字で入力してください"),
    password: z.string().min(1, "パスワードは必須です"),
    confirmPassword: z.string().min(1, "確認用パスワードは必須です"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerFormSchema>;
