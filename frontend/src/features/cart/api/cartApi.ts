import { axiosInstance } from "../../../lib/axiosInstance";
import type { CartItem } from "../types/cartType";

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await axiosInstance.get("items/cart");
  return response.data;
};
