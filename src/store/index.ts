import { reactive } from 'vue';
import type { State } from '../interfaces/State';
import type { Product } from '../interfaces/Product';
import type { CartItem } from '../interfaces/CartItem';

export const useStore = () => {
  const state: State = reactive({
    products: [],
    cart: [],
    isLoading: false,
    hasError: false,
    hasLoaded: false
  });

  const fetchProducts = async (): Promise<void> => {
    state.isLoading = true;
    state.hasError = false;

    try {
      const response = await fetch(import.meta.env.VITE_API_URL as string);

      if (!response.ok) {
        throw new Error('SOmething went wrong!');
      }

      state.products = await response.json();
      state.hasLoaded = true;
    } catch (error) {
      console.log(error);
      state.hasError = true;
    } finally {
      state.isLoading = false;
    }
  };

  const addToCart = (product: Product, amount: number) => {
    const existingOrder = state.cart.find(
      (cartItem: CartItem) => cartItem.product.id === product.id
    );
    if (existingOrder) {
      existingOrder.quantity += amount;
    } else {
      state.cart.push({ product, quantity: amount });
    }

    product.availableAmount -= amount;
  };

  return {
    state,
    fetchProducts,
    addToCart
  };
};
