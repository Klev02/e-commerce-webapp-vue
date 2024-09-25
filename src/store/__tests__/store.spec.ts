import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import type { Store } from '../../interfaces/Store';
import { initialState, useStore } from '..';
import type { Product } from '../../interfaces/Product';
import { afterEach } from 'node:test';
import type { CartItemDetails } from '../../interfaces/CartItemDetails';

const mockProducts: Product[] = [
  { id: '1', name: 'MOCK PRODUCT 1', price: 1, availableAmount: 10, img: '', minOrderAmount: 2 },
  { id: '2', name: 'MOCK PRODUCT 2', price: 5, availableAmount: 100, img: '', minOrderAmount: 1 }
];

describe('useStore', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    let store: Store;

    beforeEach(() => {
      store = useStore(initialState);
    });

    it('should return isLoading false', () => {
      expect(store.isLoading.value).toBe(false);
    });

    it('should return hasError false', () => {
      expect(store.hasError.value).toBe(false);
    });

    it('should return hasLoaded false', () => {
      expect(store.hasLoaded.value).toBe(false);
    });

    it('should return empty product array', () => {
      expect(store.products.value).toStrictEqual([]);
    });
  });

  describe('fetchProducts', () => {
    let store: Store;
    let fetchSpy: MockInstance;

    beforeEach(() => {
      fetchSpy = vi.spyOn(global, 'fetch');
      store = useStore(initialState);
    });

    describe('successfully', () => {
      beforeEach(() => {
        fetchSpy.mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockProducts)
        });
      });

      it('should set isLoading to true before the fetch resolves', async () => {
        const fetchPromise = store.fetchProducts();

        expect(store.isLoading.value).toBe(true);

        await fetchPromise;
      });

      it('should fetch and store product', async () => {
        await store.fetchProducts();

        expect(store.products.value).toStrictEqual(mockProducts);
      });

      it('should return hasLoaded true after fetch', async () => {
        await store.fetchProducts();

        expect(store.hasLoaded.value).toBe(true);
      });

      it('should return isLoading false after fetch', async () => {
        await store.fetchProducts();

        expect(store.isLoading.value).toBe(false);
      });

      it('should return hasError false after fetch', async () => {
        await store.fetchProducts();

        expect(store.hasError.value).toBe(false);
      });
    });

    describe('unsuccessfully', () => {
      beforeEach(() => {
        fetchSpy.mockResolvedValueOnce({
          ok: false,
          json: () => Promise.resolve()
        });
      });

      it('should return hasLoaded false after fetch', async () => {
        await store.fetchProducts();

        expect(store.hasLoaded.value).toBe(false);
      });

      it('should return isLoading false after fetch', async () => {
        await store.fetchProducts();

        expect(store.isLoading.value).toBe(false);
      });

      it('should return hasError true after fetch', async () => {
        await store.fetchProducts();

        expect(store.hasError.value).toBe(true);
      });
    });
  });

  describe('addToCart', () => {
    const mockProduct = mockProducts[0];
    const amount = 1;

    let store: Store;

    beforeEach(() => {
      store = useStore({
        isLoading: false,
        hasError: false,
        hasLoaded: false,
        products: [{ ...mockProduct }],
        cart: []
      });
    });

    it('should add a new product to the cart if it exists', () => {
      const expectedCartDetails: CartItemDetails[] = [
        {
          productId: mockProduct.id,
          amount,
          name: mockProduct.name,
          price: mockProduct.price
        }
      ];

      store.addToCart(mockProduct.id, amount);

      expect(store.cartDetails.value.cart).toEqual(expectedCartDetails);
    });

    it('should increase the quantity of an existing product in the cart', () => {
      const expectedCartDetails: CartItemDetails[] = [
        {
          productId: mockProduct.id,
          amount: 2,
          name: mockProduct.name,
          price: mockProduct.price
        }
      ];

      store.addToCart(mockProduct.id, amount);
      store.addToCart(mockProduct.id, amount);

      expect(store.cartDetails.value.cart).toEqual(expectedCartDetails);
    });

    it('should dicrease the available amount of the product after adding to cart', () => {
      const expectedProducts: Product[] = [
        {
          ...mockProducts[0],
          availableAmount: mockProducts[0].availableAmount - amount
        }
      ];
      store.addToCart(mockProduct.id, amount);

      expect(store.products.value).toStrictEqual(expectedProducts);
    });

    it('should not add anything to the cart for an invalid product ID', () => {
      const initialCartSize = store.cartDetails.value.cart.length;

      store.addToCart('10000', 2);

      const updatedCartSize = store.cartDetails.value.cart.length;

      expect(updatedCartSize).toBe(initialCartSize);
    });
  });

  describe('removeFromCart', () => {
    const mockProduct = mockProducts[0];

    let store: Store;

    beforeEach(() => {
      store = useStore({
        isLoading: false,
        hasError: false,
        hasLoaded: false,
        products: [{ ...mockProduct }],
        cart: [
          {
            productId: mockProduct.id,
            amount: 1
          }
        ]
      });
    });

    it('should remove a product from the cart if it exists', () => {
      const initialCartDetails = store.cartDetails.value.cart;

      store.removeFromCart(mockProduct.id);

      expect(store.cartDetails.value.cart).toHaveLength(initialCartDetails.length - 1);
      expect(store.cartDetails.value.cart).not.toContainEqual({
        productId: mockProduct.id,
        amount: 1,
        name: mockProduct.name,
        price: mockProduct.price
      });
    });

    it('should increase the available amount of the product after removing from cart', () => {
      const initialAvailableAmount = mockProduct.availableAmount;

      store.removeFromCart(mockProduct.id);

      expect(store.products.value[0].availableAmount).toBe(initialAvailableAmount + 1);
    });

    it('should not modify the cart if the product does not exist in the cart', () => {
      const initialCartSize = store.cartDetails.value.cart.length;

      store.removeFromCart('non-existent-id');

      expect(store.cartDetails.value.cart.length).toBe(initialCartSize);
    });
  });

  describe('cartDetails', () => {
    let store: Store;

    beforeEach(() => {
      store = useStore({
        isLoading: false,
        hasError: false,
        hasLoaded: false,
        products: mockProducts,
        cart: [
          {
            productId: mockProducts[0].id,
            amount: 2
          },
          {
            productId: mockProducts[1].id,
            amount: 1
          }
        ]
      });
    });

    it('should return correct cart details with product names and prices', () => {
      const expectedCartDetails: CartItemDetails[] = [
        {
          productId: mockProducts[0].id,
          amount: 2,
          name: mockProducts[0].name,
          price: mockProducts[0].price
        },
        {
          productId: mockProducts[1].id,
          amount: 1,
          name: mockProducts[1].name,
          price: mockProducts[1].price
        }
      ];

      expect(store.cartDetails.value.cart).toEqual(expectedCartDetails);
    });

    it('should calculate total price correctly', () => {
      const expectedTotalPrice = mockProducts[0].price * 2 + mockProducts[1].price * 1;

      expect(store.cartDetails.value.totalPrice).toBe(expectedTotalPrice);
    });
  });
});
