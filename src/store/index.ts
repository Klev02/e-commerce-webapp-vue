import { computed, reactive } from 'vue';
import type { State } from '../interfaces/State';
import type { Product } from '../interfaces/Product';
import type { CartItem } from '../interfaces/CartItem';
import type { CartDetails } from '../interfaces/CartDetails';
import type { CartItemDetails } from '../interfaces/CartItemDetails';

export const useStore = () => {
  //Private
  const state: State = reactive({
    products: [],
    cart: [],
    isLoading: false,
    hasError: false,
    hasLoaded: false
  });

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

  const getCartDetails = computed<CartDetails>(() => {
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

  return {
    state,
    fetchProducts,
    addToCart,
    getCartDetails,
    removeFromCart
  };
};
