import { useCallback, useEffect, useState } from "react";
import { fetchCartItems } from "../api/cartApi";
import type { CartItem } from "../types/cartType";

/**
 * カート情報を取得する
 *
 * @returns カート情報
 */
export function useCartItem() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = useCallback(async () => {
    const cartItems = await fetchCartItems();
    setCartItems(cartItems);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { fetchCart, cartItems };
}
