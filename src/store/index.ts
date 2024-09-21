import { reactive } from 'vue';
import type { State } from '../interfaces/State';

export const useStore = () => {
  const state: State = reactive({
    products: [],
    cart: [],
    isLoading: false,
    hasError: false
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
    } catch (error) {
      console.log(error);
      state.hasError = true;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    state,
    fetchProducts
  };
};
