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

export function ItemDetailPage() {
  const [size, setSize] = useState("M");
  const [toppings, setToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState<Item>();
  const { itemId } = useParams({ from: "/item/$itemId" });

  const navigate = useNavigate();

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

  const handleToppingChange = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping],
    );
  };

  const totalPrice = () => {
    const basePrice = size === "M" ? 1380 : 2380;
    const toppingPrice = size === "M" ? 200 : 300;
    return (basePrice + toppings.length * toppingPrice) * quantity;
  };

  const addCart = () => {
    navigate({
      to: "/cart",
    });
  };

  return (
    <Container maxWidth="md" className="my-8">
      <Box className="text-center mb-6">
        <Typography variant="h4">商品詳細</Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
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

        <Grid item xs={12} md={5}>
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
                    label={`M: ${item?.itemPriceM.toLocaleString()}円(税抜)`}
                  />
                  <FormControlLabel
                    value="L"
                    control={<Radio />}
                    label={`L: ${item?.itemPriceL.toLocaleString()}円(税抜)`}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box className="mb-4">
              <FormLabel component="legend">
                トッピング（M: 200円 / L: 300円）
              </FormLabel>
              <Box className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "オニオン",
                  "チーズ",
                  "ピーマン",
                  "ロースハム",
                  "ほうれん草",
                  "ぺパロに",
                  "グリルナス",
                  "あらびきソーセージ",
                ].map((topping) => (
                  <FormControlLabel
                    key={topping}
                    control={
                      <Checkbox
                        checked={toppings.includes(topping)}
                        onChange={() => handleToppingChange(topping)}
                      />
                    }
                    label={topping}
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
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box className="mb-4">
              <Typography variant="subtitle1">
                この商品金額：{totalPrice().toLocaleString()} 円(税抜)
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
