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
  const [orderForm, setOrderForm] = useState<OrderForm>({
    destinationName: "",
    destinationEmail: "",
    destinationZipcode: "",
    destinationAddress: "",
    destinationTelephone: "",
    deliveryTime: new Date().toISOString().split("T")[0],
    paymentMethod: 0,
  });

  const navigate = useNavigate();

  const handleOrder = async () => {
    const orderRequest: OrderRequest = {
      ...orderForm,
      deliveryTime: `${orderForm.deliveryTime} 10:00:00`,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
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
      <Card className="mb-8 max-w-2xl mx-auto">
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            お届け先情報
          </Typography>

          <form className="space-y-4">
            <div>
              <FormLabel>名前</FormLabel>
              <TextField
                fullWidth
                label="お名前"
                name="destinationName"
                value={orderForm.destinationName}
                onChange={handleChange}
              />
            </div>

            <div>
              <FormLabel>メールアドレス</FormLabel>
              <TextField
                fullWidth
                label="メールアドレス"
                name="destinationEmail"
                value={orderForm.destinationEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <FormLabel>郵便番号</FormLabel>
              <div className="flex items-center gap-2">
                <TextField
                  label="郵便番号"
                  name="destinationZipcode"
                  value={orderForm.destinationZipcode}
                  onChange={handleChange}
                />
                <Button variant="outlined">住所検索</Button>
              </div>
            </div>

            <div>
              <FormLabel>住所</FormLabel>
              <TextField
                fullWidth
                label="住所"
                name="destinationAddress"
                value={orderForm.destinationAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <FormLabel>電話番号</FormLabel>
              <TextField
                fullWidth
                label="電話番号"
                name="destinationTelephone"
                value={orderForm.destinationTelephone}
                onChange={handleChange}
              />
            </div>

            <div>
              <FormLabel>配達日</FormLabel>
              <input
                type="date"
                className="border rounded p-2 w-full"
                name="deliveryTime"
                value={orderForm.deliveryTime}
                onChange={handleChange}
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

          <RadioGroup
            defaultValue="代金引換"
            name="paymentMethod"
            value={orderForm.paymentMethod}
            onChange={handleChange}
          >
            <FormControlLabel value={0} control={<Radio />} label="代金引換" />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="クレジットカード"
            />
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="contained" color="warning" onClick={handleOrder}>
          この内容で注文する
        </Button>
      </div>
    </Container>
  );
}
