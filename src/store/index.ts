import { computed, reactive, ref } from 'vue';
import type { State } from '../interfaces/State';
import type { Product } from '../interfaces/Product';
import type { CartItem } from '../interfaces/CartItem';
import type { CartDetails } from '../interfaces/CartDetails';
import type { CartItemDetails } from '../interfaces/CartItemDetails';
import type { Store } from '../interfaces/Store';

/**
 * IMPORTANT NOTES!
 * I decided to go with arrays of storing data, however in a real life example,
 * as products list grows, lookup (searching elements) is slower - O(n) time complexity
 * and removing elements from array has bigger space complexity.
 * HashMap (Map) could be considered,
 * but for sorting, filtering and maintaining strict order, array might still more suitable.
 *
 * I chose lightweight solution for state management, however for bigger project
 * Pinia preferable
 */

export const initialState: State = {
  products: [],
  cart: [],
  isLoading: false,
  hasError: false,
  hasLoaded: false
};

export const useStore = (initialState: State) => {
  //Private
  const state: State = reactive<State>(initialState);

  const getProductById = (productId: string): Product | undefined => {
    return state.products.find((product: Product) => product.id === productId);
  };

  const getProductInCartById = (productId: string): CartItem | undefined => {
    return state.cart.find((cartItem: CartItem) => cartItem.productId === productId);
  };

  //Public
  const fetchProducts = async (): Promise<void> => {
    state.isLoading = true;
    state.hasError = false;

    try {
      const response = await fetch(import.meta.env.VITE_API_URL as string);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      state.products = await response.json();
      state.hasLoaded = true;
    } catch (error) {
      console.log(error);
      state.hasError = true;
      state.hasLoaded = false;
    } finally {
      state.isLoading = false;
    }
  };

  const addToCart = (productId: string, amount: number): void => {
    const product = getProductById(productId);

    if (product) {
      const existingOrder = getProductInCartById(product.id);

      if (existingOrder) {
        existingOrder.amount += amount;
      } else {
        state.cart.push({ productId, amount: amount });
      }

      product.availableAmount -= amount;
    }
  };

  const removeFromCart = (productId: string): void => {
    const existingOrder = getProductInCartById(productId);
    const product = getProductById(productId);

    if (existingOrder && product) {
      const newCart = state.cart.filter(
        (cartItem: CartItem) => cartItem.productId !== existingOrder.productId
      );
      state.cart = newCart;
      product.availableAmount += existingOrder.amount;
    }
  };

  const cartDetails = computed<CartDetails>(() => {
    const cardDetails: CartItemDetails[] = [];
    let totalCartPrice = 0;

    state.cart.forEach((cartItem: CartItem) => {
      const product = getProductById(cartItem.productId);

      if (product) {
        cardDetails.push({
          ...cartItem,
          name: product.name,
          price: product.price
        });

        totalCartPrice += product.price * cartItem.amount;
      }
    });

    return {
      cart: cardDetails,
      totalPrice: totalCartPrice
    };
  });

  const isLoading = computed<boolean>(() => state.isLoading);
  const hasError = computed<boolean>(() => state.hasError);
  const products = computed<Product[]>(() => state.products);
  const hasLoaded = computed<boolean>(() => state.hasLoaded);

  return {
    isLoading,
    hasError,
    products,
    hasLoaded,
    fetchProducts,
    addToCart,
    cartDetails,
    removeFromCart
  };
};
