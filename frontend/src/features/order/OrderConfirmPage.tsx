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
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { searchAddress } from "../../api/searchAddress";
import { orderFormSchema } from "./schema/orderFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { OrderForm } from "./schema/orderFormSchema";
import { addDays, format } from "date-fns";
import WarningAlert from "../../components/WarningAlert";

type OrderRequest = OrderForm & {
  destinationPrefecture: string;
  destinationMunicipalities: string;
  deliveryDateTime: string;
  totalPrice: number;
};

const hourMap: Record<string, string> = {
  "10時": "10:00:00",
  "11時": "11:00:00",
  "12時": "12:00:00",
  "13時": "13:00:00",
  "14時": "14:00:00",
  "15時": "15:00:00",
  "16時": "16:00:00",
  "17時": "17:00:00",
  "18時": "18:00:00",
};

export function OrderConfirmPage() {
  const { cartItems } = useCartItem();
  const { totalPrice, totalTax } = useTotalPrice(cartItems);

  const [destinationPrefecture, setDestinationPrefecture] = useState("");
  const [destinationMunicipalities, setDestinationMunicipalities] =
    useState("");
  const [isAddressNotFound, setIsAddressNotFound] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      destinationName: "",
      destinationEmail: "",
      destinationZipcode: "",
      destinationAddress: "",
      destinationTelephone: "",
      deliveryDate: format(new Date(), "yyyy-MM-dd"),
      deliveryTime: "10:00:00",
      paymentMethod: 0,
    },
  });

  const onSubmit = async (data: OrderForm) => {
    const orderRequest: OrderRequest = {
      ...data,
      destinationZipcode: data.destinationZipcode.replace("-", "").trim(),
      deliveryDateTime: `${data.deliveryDate} ${data.deliveryTime}`,
      totalPrice,
      destinationPrefecture,
      destinationMunicipalities,
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

  const handleSearchAddress = async () => {
    const isValid = await trigger("destinationZipcode");
    if (!isValid) return;

    const currentZipcode = getValues("destinationZipcode");
    const address = await searchAddress(currentZipcode);

    if (address) {
      setValue("destinationAddress", address[0] + address[1] + address[2]);
      setDestinationPrefecture(address[0]);
      setDestinationMunicipalities(address[1]);
    } else {
      setIsAddressNotFound(true);
      setTimeout(() => {
        setIsAddressNotFound(false);
      }, 3000);
    }
  };

  const parseDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
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

            <div className="space-y-4">
              <div>
                <FormLabel>お名前</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationName")}
                  error={!!errors.destinationName}
                  helperText={errors.destinationName?.message}
                  placeholder="ラクス太郎"
                />
              </div>

              <div>
                <FormLabel>メールアドレス</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationEmail")}
                  error={!!errors.destinationEmail}
                  helperText={errors.destinationEmail?.message}
                  placeholder="sample@rakus.com"
                />
              </div>

              <div className="flex items-center gap-2">
                <FormLabel>郵便番号</FormLabel>
                <TextField
                  {...register("destinationZipcode")}
                  error={!!errors.destinationZipcode}
                  helperText={errors.destinationZipcode?.message}
                  placeholder="123-4567"
                />
                <Button variant="outlined" onClick={handleSearchAddress}>
                  住所検索
                </Button>
              </div>

              <div>
                <FormLabel>住所</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationAddress")}
                  error={!!errors.destinationAddress}
                  helperText={errors.destinationAddress?.message}
                  placeholder="東京都渋谷区千駄ヶ谷5-27-5 リンクスクエア新宿7階"
                />
              </div>

              <div>
                <FormLabel>電話番号</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationTelephone")}
                  error={!!errors.destinationTelephone}
                  helperText={errors.destinationTelephone?.message}
                  placeholder="050-8880-3200"
                />
              </div>

              <div>
                <FormLabel>配達日</FormLabel>
                <Controller
                  name="deliveryDate"
                  control={control}
                  render={({ field }) => (
                    <DateCalendar
                      value={new Date(field.value)}
                      onChange={(date) => {
                        field.onChange(parseDate(date));
                      }}
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 30)}
                    />
                  )}
                />
                <Controller
                  name="deliveryTime"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {Object.entries(hourMap).map(([key, value]) => (
                        <FormControlLabel
                          key={key}
                          value={value}
                          control={<Radio />}
                          label={key}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
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

      {isAddressNotFound && (
        <WarningAlert message="住所が見つかりませんでした" />
      )}
    </Container>
  );
}
