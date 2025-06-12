import {
  Alert,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import { useTotalPrice } from "./hooks/useTotalPrice";
import { useCartItem } from "./hooks/useCartItem";

export function CartPage() {
  const { fetchCart, cartItems } = useCartItem();
  const { totalPrice, totalTax } = useTotalPrice(cartItems);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOrder = () => {
    if (cartItems.length === 0) {
      setIsErrorAlertOpen(true);

      setTimeout(() => {
        setIsErrorAlertOpen(false);
      }, 3000);

      return;
    }

    navigate({
      to: "/order/confirm",
    });
  };

  /**
   * カートから商品を削除する
   *
   * @param itemIndex 削除する商品のインデックス
   */
  const handleDelete = async (itemIndex: number) => {
    try {
      await axiosInstance.delete(`items/cart/${itemIndex}`);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" align="center" mb={3}>
          ショッピングカート
        </Typography>

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
            {cartItems.map((item, itemIndex) => (
              <TableRow key={item.itemId}>
                <TableCell>
                  <Box textAlign="center">
                    <img
                      src={item.imagePath}
                      alt={item.itemName}
                      width="100"
                      height="100"
                      className="inline-block"
                    />
                    <Typography>{item.itemName}</Typography>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  {`${item.size} ${item.itemPrice}円 × ${item.quantity}個`}
                </TableCell>

                <TableCell>
                  <List dense>
                    {item.toppingList?.map((topping) => (
                      <ListItem
                        key={topping.toppingId}
                        disablePadding
                        sx={{ textAlign: "center" }}
                      >
                        <ListItemText
                          primary={`${topping.toppingName} ${topping.toppingPrice}円`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>

                <TableCell align="center">{item.subtotalPrice}円</TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(itemIndex)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
            onClick={handleOrder}
          >
            注文に進む
          </Button>
        </Box>
      </Container>

      {isErrorAlertOpen && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          カートに商品がありません
        </Alert>
      )}
    </>
  );
}
