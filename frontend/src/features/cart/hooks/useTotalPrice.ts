import { useEffect, useState } from "react";
import type { CartItem } from "../types/cartType";

/**
 * 合計金額と消費税を計算する
 *
 * @param cartItems カート内の商品
 * @returns 合計金額と消費税
 */
export function useTotalPrice(cartItems: CartItem[]) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.subtotalPrice,
      0,
    );
    const totalTax = Math.ceil(totalPrice * 0.1);
    setTotalPrice(totalPrice);
    setTotalTax(totalTax);
  }, [cartItems]);

  return { totalPrice, totalTax };
}
