import type { CartItem } from './CartItem';
import type { Product } from './Product';

export interface State {
  products: Product[];
  cart: CartItem[];
  isLoading: boolean;
  hasError: boolean;
  hasLoaded: boolean;
}
