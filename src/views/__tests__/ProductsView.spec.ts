import { shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { STORE_NAME } from '../../constants';
import { nextTick, ref } from 'vue';
import ProductsView from '../ProductsView.vue';
import ProductItem from '../../components/ProductItem.vue';
import LoadingSpinner from '../../components/base/LoadingSpinner.vue';
import type { Product } from '../../interfaces/Product';
import { afterEach } from 'node:test';

const renderComponent = (): { mockStore: any; wrapper: VueWrapper } => {
  const hasLoaded = ref(false);
  const isLoading = ref(false);
  const hasError = ref(false);
  const products = ref<Product[]>([]);

  const mockStore = {
    hasLoaded,
    isLoading,
    hasError,
    products,
    fetchProducts: vi.fn(),
    addToCart: vi.fn()
  };

  const wrapper = shallowMount(ProductsView, {
    global: {
      provide: {
        [STORE_NAME]: mockStore
      }
    }
  });

  return { mockStore, wrapper };
};

describe('ProductsView.vue', () => {
  let mockStore: any;
  let wrapper: VueWrapper;

  beforeEach(() => {
    ({ mockStore, wrapper } = renderComponent());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render loading spinner when loading', async () => {
    mockStore.isLoading.value = true;

    await nextTick();

    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);
  });

  it('should render error message when there is an error', async () => {
    mockStore.hasError.value = true;

    await nextTick();

    expect(wrapper.text()).toContain('Something went wrong');
  });

  it('should render product items when products are loaded', async () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'MOCK PRODUCT 1',
        price: 100,
        availableAmount: 10,
        minOrderAmount: 1,
        img: ''
      },
      {
        id: '2',
        name: 'MOCK PRODUCT 2',
        price: 150,
        availableAmount: 5,
        minOrderAmount: 1,
        img: ''
      }
    ];

    mockStore.products.value = mockProducts;
    mockStore.isLoading.value = false;

    await nextTick();

    const productItems = wrapper.findAllComponents(ProductItem);

    expect(productItems).toHaveLength(2);
    expect(productItems[0].props().product).toEqual(mockStore.products.value[0]);
  });

  it('should call fetchProducts when not loaded', async () => {
    expect(mockStore.fetchProducts).toHaveBeenCalled();
  });

  it('should call addToCart when add-to-cart event is emitted', async () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'MOCK PRODUCT 1',
        price: 100,
        availableAmount: 10,
        minOrderAmount: 1,
        img: ''
      }
    ];

    mockStore.products.value = mockProducts;
    mockStore.isLoading.value = false;

    await nextTick();

    const productItems = wrapper.findAllComponents(ProductItem);

    await productItems[0].vm.$emit('add-to-cart', mockProducts[0].id, 1);

    expect(mockStore.addToCart).toHaveBeenCalledWith(mockProducts[0].id, 1);
  });
});
