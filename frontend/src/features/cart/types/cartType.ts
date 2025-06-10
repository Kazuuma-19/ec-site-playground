export type CartTopping = {
  toppingId: number;
  toppingName: string;
  toppingPrice: number;
};

export type CartItem = {
  itemId: string;
  itemName: string;
  imagePath: string;
  itemPrice: number;
  size: string;
  quantity: number;
  toppingList?: CartTopping[];
  subtotalPrice: number;
};
