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
import dayjs from "dayjs";
import { searchAddress } from "../../api/searchAddress";

type OrderForm = {
  destinationName: string;
  destinationEmail: string;
  destinationZipcode: string;
  destinationAddress: string;
  destinationTelephone: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: number;
};

type OrderRequest = OrderForm & {
  destinationPrefecture: string;
  destinationMunicipalities: string;
  deliveryDateTime: string;
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
  const Today = new Date();
  const [date, setDate] = useState(Today);
  const [destinationPrefecture, setDestinationPrefecture] = useState("");
  const [destinationMunicipalities, setDestinationMunicipalities] =
    useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<OrderForm>({
    defaultValues: {
      destinationName: "",
      destinationEmail: "",
      destinationZipcode: "",
      destinationAddress: "",
      destinationTelephone: "",
      deliveryDate: new Date().toISOString().split("T")[0],
      deliveryTime: "10時",
      paymentMethod: 0,
    },
  });

  const onSubmit = async (data: OrderForm) => {
    const deliveryDateTime = `${data.deliveryDate} ${hourMap[data.deliveryTime]}`;
    console.log(deliveryDateTime);
    const orderRequest: OrderRequest = {
      ...data,
      destinationZipcode: `${data.destinationZipcode.replace("-", "").trim()}`,
      deliveryDateTime: `${data.deliveryDate} ${hourMap[data.deliveryTime]}`,
      totalPrice,
      destinationPrefecture: `${destinationPrefecture}`,
      destinationMunicipalities: `${destinationMunicipalities}`,
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
    const currentZipcode = getValues("destinationZipcode");
    console.log(currentZipcode);
    if (!currentZipcode) return;

    const address = await searchAddress(currentZipcode);
    if (address) {
      setValue("destinationAddress", address[0] + address[1] + address[2]);
      setDestinationPrefecture(address[0]);
      setDestinationMunicipalities(address[1]);
    } else {
      alert("住所が見つかりませんでした");
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

            <div className="space-y-4">
              <div>
                <FormLabel>お名前</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationName", {
                    required: "名前は必須です",
                  })}
                  error={!!errors.destinationName}
                  helperText={errors.destinationName?.message}
                  placeholder="ラクス太郎"
                />
              </div>

              <div>
                <FormLabel>メールアドレス</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationEmail", {
                    required: "メールアドレスは必須です",
                  })}
                  error={!!errors.destinationEmail}
                  helperText={errors.destinationEmail?.message}
                  placeholder="sample@rakus.com"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <FormLabel>郵便番号</FormLabel>
                  <TextField
                    {...register("destinationZipcode", {
                      required: "郵便番号は必須です",
                    })}
                    error={!!errors.destinationZipcode}
                    helperText={errors.destinationZipcode?.message}
                    placeholder="123-4567"
                  />
                  <Button variant="outlined" onClick={handleSearchAddress}>
                    住所検索
                  </Button>
                </div>
              </div>

              <div>
                <FormLabel>住所</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationAddress", {
                    required: "住所は必須です",
                  })}
                  error={!!errors.destinationAddress}
                  helperText={errors.destinationAddress?.message}
                  placeholder="東京都渋谷区千駄ヶ谷5-27-5 リンクスクエア新宿7階"
                />
              </div>

              <div>
                <FormLabel>電話番号</FormLabel>
                <TextField
                  fullWidth
                  {...register("destinationTelephone", {
                    required: "電話番号は必須です",
                  })}
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
                    <>
                      <DateCalendar
                        value={dayjs(field.value)}
                        onChange={(date) => {
                          const formatted = date
                            ? date.format("YYYY-MM-DD")
                            : "";
                          field.onChange(formatted);
                          setDate(date?.toDate() || Today);
                        }}
                        minDate={dayjs()}
                        maxDate={dayjs().add(30, "day")}
                      />
                      {errors.deliveryDate && (
                        <Typography color="error" fontSize={12}>
                          {errors.deliveryDate.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
                <Controller
                  name="deliveryTime"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {deliveryTimeOptions.map((time) => (
                        <FormControlLabel
                          key={time}
                          value={time}
                          control={<Radio />}
                          label={time}
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
    </Container>
  );
}
