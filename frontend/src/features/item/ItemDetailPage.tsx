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
import { useState } from "react";

export function ItemDetailPage() {
  const [size, setSize] = useState("M");
  const [toppings, setToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

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
              image="/1.jpg"
              alt="じゃがバターベーコン"
              className="object-cover"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <CardContent>
            <Typography variant="h5" className="mb-4">
              じゃがバターベーコン
            </Typography>
            <Typography paragraph className="mb-6">
              マイルドな味付けのカレーに大きくカットしたポテトをのせた、
              バターとチーズの風味が食欲をそそるお子様でも楽しめる商品です。
            </Typography>

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
                    label="M: 1,380円(税抜)"
                  />
                  <FormControlLabel
                    value="L"
                    control={<Radio />}
                    label="L: 2,380円(税抜)"
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

            <Button variant="contained" color="warning" fullWidth>
              カートに入れる
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}
