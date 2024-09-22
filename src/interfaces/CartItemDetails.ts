import type { CartItem } from './CartItem';
import type { Product } from './Product';

export type CartItemDetails = CartItem & Pick<Product, 'name' | 'price'>;
