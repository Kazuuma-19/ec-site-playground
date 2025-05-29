import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const cartItems = [
  {
    name: "じゃがバターベーコン",
    size: "L",
    price: 2380,
    quantity: 1,
    toppings: [
      { name: "ピーマン", price: 300 },
      { name: "オニオン", price: 300 },
      { name: "あらびきソーセージ", price: 300 },
    ],
    subtotal: 3280,
    image: "/1.jpg",
  },
  // 他のアイテムもここに追加可能
];

export function CartPage() {
  const totalTax = 8000;
  const totalPrice = 38000;

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ショッピングカート
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">商品名</TableCell>
                <TableCell align="center">サイズ、価格(税抜)、数量</TableCell>
                <TableCell align="center">トッピング、価格(税抜)</TableCell>
                <TableCell align="center">小計</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>
                    <Box textAlign="center">
                      <img
                        src={item.image}
                        alt={item.name}
                        width="100"
                        height="100"
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {item.size}&nbsp;&nbsp;{item.price.toLocaleString()}
                    円&nbsp;&nbsp;{item.quantity}個
                  </TableCell>
                  <TableCell>
                    <List dense>
                      {item.toppings.map((topping) => (
                        <ListItem key={topping.name} disablePadding>
                          <ListItemText
                            primary={`${topping.name} ${topping.price}円`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    {item.subtotal.toLocaleString()}円
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary">
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box textAlign="center" mt={4}>
          <Typography>消費税：{totalTax.toLocaleString()}円</Typography>
          <Typography>
            ご注文金額合計：{totalPrice.toLocaleString()}円 (税込)
          </Typography>
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="warning"
            size="large"
            href="/order_confirm"
          >
            注文に進む
          </Button>
        </Box>
      </Container>
    </>
  );
}
