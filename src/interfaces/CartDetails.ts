import type { CartItemDetails } from './CartItemDetails';

export interface CartDetails {
  cart: CartItemDetails[];
  totalPrice: number;
}
