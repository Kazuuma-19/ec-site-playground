import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import type { Item } from "./types/itemType";

type Topping = {
  toppingId: number;
  toppingName: string;
  priceM: number;
  priceL: number;
};

export function ItemDetailPage() {
  const [item, setItem] = useState<Item>();
  const [toppingOptions, setToppingOptions] = useState<Topping[]>([]);

  const { itemId } = useParams({ from: "/item/$itemId" });
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [toppingIdList, setToppingIdList] = useState<number[]>([]);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const navigate = useNavigate();

  /**
   * 商品情報を取得する
   */
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axiosInstance.get(`/items/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [itemId]);

  /**
   * トッピングオプションを取得する
   */
  useEffect(() => {
    const fetchToppingOptions = async () => {
      const response = await axiosInstance.get("/toppings");
      setToppingOptions(response.data);
    };
    fetchToppingOptions();
  }, []);

  /**
   * トッピングを追加する
   */
  const handleToppingChange = (toppingId: number) => {
    setToppingIdList((prev) =>
      prev.includes(toppingId)
        ? prev.filter((t) => t !== toppingId)
        : [...prev, toppingId],
    );
  };

  /**
   * サブトータル金額を計算する
   */
  useEffect(() => {
    const handleSubtotalPrice = () => {
      const isSizeM = size === "M";
      const basePrice = isSizeM
        ? (item?.itemPriceM ?? 0)
        : (item?.itemPriceL ?? 0);

      const toppingPrice = toppingIdList.reduce((total, toppingId) => {
        const topping = toppingOptions.find((t) => t.toppingId === toppingId);
        if (!topping) return total;
        return total + (isSizeM ? topping.priceM : topping.priceL);
      }, 0);

      const subtotalPrice = (basePrice + toppingPrice) * quantity;
      setSubtotalPrice(subtotalPrice);
    };

    handleSubtotalPrice();
  }, [item, size, quantity, toppingIdList, toppingOptions]);

  /**
   * カートに追加する
   */
  const addCart = async () => {
    try {
      await axiosInstance.post("items/cart", {
        itemId: itemId,
        size,
        quantity,
        toppingIdList,
        subtotalPrice,
      });
      navigate({ to: "/cart" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" className="my-8">
      <Box className="text-center mb-6">
        <Typography variant="h4">商品詳細</Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid size={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={item?.imagePath}
              alt={item?.itemName}
              className="object-cover"
            />
          </Card>
        </Grid>

        <Grid size={12}>
          <CardContent>
            <Typography variant="h5" className="mb-4">
              {item?.itemName}
            </Typography>

            <Typography className="mb-6">{item?.itemDescription}</Typography>

            <Box className="mb-4">
              <FormControl component="fieldset">
                <FormLabel component="legend">サイズ</FormLabel>
                <RadioGroup
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label={`M: ${item?.itemPriceM}円(税抜)`}
                  />
                  <FormControlLabel
                    value="L"
                    control={<Radio />}
                    label={`L: ${item?.itemPriceL}円(税抜)`}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box className="mb-4">
              <FormLabel component="legend">トッピング</FormLabel>

              <Box className="grid grid-cols-2 gap-2 mt-2">
                {toppingOptions.map((topping) => (
                  <FormControlLabel
                    key={topping.toppingId}
                    control={
                      <Checkbox
                        checked={toppingIdList.includes(topping.toppingId)}
                        onChange={() => handleToppingChange(topping.toppingId)}
                      />
                    }
                    label={`
                      ${topping.toppingName} ${size === "M" ? topping.priceM : topping.priceL}円
                    `}
                  />
                ))}
              </Box>
            </Box>

            <Box className="mb-4">
              <FormControl fullWidth>
                <InputLabel>数量</InputLabel>
                <Select
                  value={quantity}
                  label="数量"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box className="mb-4">
              <Typography variant="subtitle1">
                この商品金額：{subtotalPrice} 円(税抜)
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={addCart}
            >
              カートに入れる
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}
