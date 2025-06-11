import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { Container } from "@mui/material";
import { useTotalPrice } from "../cart/hooks/useTotalPrice";
import { useCartItem } from "../cart/hooks/useCartItem";
import { axiosInstance } from "../../lib/axiosInstance";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type OrderForm = {
  destinationName: string;
  destinationEmail: string;
  destinationZipcode: string;
  destinationAddress: string;
  destinationTelephone: string;
  deliveryTime: string;
  paymentMethod: number;
};

type OrderRequest = OrderForm & {
  destinationPrefecture: string;
  destinationMunicipalities: string;
  totalPrice: number;
};

const deliveryTimeOptions = [
  "10時",
  "11時",
  "12時",
  "13時",
  "14時",
  "15時",
  "16時",
  "17時",
  "18時",
];

export function OrderConfirmPage() {
  const { cartItems } = useCartItem();
  const { totalPrice, totalTax } = useTotalPrice(cartItems);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderForm>({
    defaultValues: {
      destinationName: "",
      destinationEmail: "",
      destinationZipcode: "",
      destinationAddress: "",
      destinationTelephone: "",
      deliveryTime: new Date().toISOString().split("T")[0],
      paymentMethod: 0,
    },
  });

  const onSubmit = async (data: OrderForm) => {
    const orderRequest: OrderRequest = {
      ...data,
      deliveryTime: `${data.deliveryTime} 10:00:00`,
      totalPrice,
      destinationPrefecture: "東京都",
      destinationMunicipalities: "新宿区",
    };

    try {
      await axiosInstance.post("/orders", orderRequest);
      navigate({
        to: "/order/finished",
        replace: true, // 戻るボタンで戻れないようにする
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" align="center" mb={3}>
        注文内容確認
      </Typography>

      <Table className="mb-8">
        <TableHead>
          <TableRow>
            <TableCell align="center">商品名</TableCell>
            <TableCell align="center">サイズ・価格・数量</TableCell>
            <TableCell align="center">トッピング</TableCell>
            <TableCell align="center">小計</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.itemId}>
              <TableCell>
                <div className="flex flex-col items-center">
                  <img src={item.imagePath} width={100} alt="pizza" />
                  {item.itemName}
                </div>
              </TableCell>

              <TableCell align="center">
                {`${item.size} ${item.itemPrice.toLocaleString()}円 ${item.quantity}個`}
              </TableCell>

              <TableCell align="center">
                <ul>
                  {item.toppingList?.map((topping) => (
                    <li key={topping.toppingId}>
                      {`${topping.toppingName} ${topping.toppingPrice.toLocaleString()}円`}
                    </li>
                  ))}
                </ul>
              </TableCell>

              <TableCell align="center">
                {`${item.subtotalPrice.toLocaleString()}円`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 合計金額 */}
      <div className="text-center mb-8">
        <p className="text-lg">消費税：{totalTax.toLocaleString()}円</p>
        <p className="text-xl font-bold">
          ご注文金額合計：{totalPrice.toLocaleString()}円 (税込)
        </p>
      </div>

      {/* お届け先情報 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              お届け先情報
            </Typography>

            <form className="space-y-4">
              <div>
                {/* <FormLabel>名前</FormLabel> */}
                <TextField
                  fullWidth
                  label="お名前"
                  {...register("destinationName", {
                    required: "名前は必須です",
                  })}
                  error={!!errors.destinationName}
                  helperText={errors.destinationName?.message}
                />
              </div>

              <div>
                <FormLabel>メールアドレス</FormLabel>
                <TextField
                  fullWidth
                  label="メールアドレス"
                  {...register("destinationEmail", {
                    required: "メールアドレスは必須です",
                  })}
                  error={!!errors.destinationEmail}
                  helperText={errors.destinationEmail?.message}
                />
              </div>

              <div>
                <FormLabel>郵便番号</FormLabel>
                <div className="flex items-center gap-2">
                  <TextField
                    label="郵便番号"
                    {...register("destinationZipcode", {
                      required: "郵便番号は必須です",
                    })}
                    error={!!errors.destinationZipcode}
                    helperText={errors.destinationZipcode?.message}
                  />
                  <Button variant="outlined">住所検索</Button>
                </div>
              </div>

              <div>
                <FormLabel>住所</FormLabel>
                <TextField
                  fullWidth
                  label="住所"
                  {...register("destinationAddress", {
                    required: "住所は必須です",
                  })}
                  error={!!errors.destinationAddress}
                  helperText={errors.destinationAddress?.message}
                />
              </div>

              <div>
                <FormLabel>電話番号</FormLabel>
                <TextField
                  fullWidth
                  label="電話番号"
                  {...register("destinationTelephone", {
                    required: "電話番号は必須です",
                  })}
                  error={!!errors.destinationTelephone}
                  helperText={errors.destinationTelephone?.message}
                />
              </div>

              <div>
                <FormLabel>配達日</FormLabel>
                <input
                  type="date"
                  className="border rounded p-2 w-full"
                  {...register("deliveryTime", { required: true })}
                />
                <RadioGroup row defaultValue="10時">
                  {deliveryTimeOptions.map((time) => (
                    <FormControlLabel
                      key={time}
                      value={time}
                      control={<Radio />}
                      label={time}
                    />
                  ))}
                </RadioGroup>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* お支払い方法 */}
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              お支払い方法
            </Typography>

            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="代金引換"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="クレジットカード"
                  />
                </RadioGroup>
              )}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="contained" color="warning" type="submit">
            この内容で注文する
          </Button>
        </div>
      </form>
    </Container>
  );
}
