import { shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CartView from '../CartView.vue';
import CartTable from '../../components/CartTable.vue';
import { STORE_NAME } from '../../constants';
import type { CartDetails } from '../../interfaces/CartDetails';

const renderComponent = (): { mockStore: any; wrapper: VueWrapper } => {
  const mockStore = {
    cartDetails: {
      cart: [{ productId: '1', name: 'MOCK PRODUCT 1', price: 50, amount: 2 }],
      totalPrice: 100
    } as CartDetails,
    removeFromCart: vi.fn()
  };

  const wrapper = shallowMount(CartView, {
    global: {
      provide: {
        [STORE_NAME]: mockStore
      }
    }
  });

  return { mockStore, wrapper };
};

describe('CartView.vue', () => {
  let mockStore: any;
  let wrapper: VueWrapper;

  beforeEach(() => {
    ({ mockStore, wrapper } = renderComponent());
  });

  it('should render CartTable component', () => {
    expect(wrapper.findComponent(CartTable).exists()).toBe(true);
  });

  it('should pass cartDetails to CartTable', () => {
    expect(wrapper.findComponent(CartTable).props('cartDetails')).toEqual(mockStore.cartDetails);
  });

  it('should call removeFromCart when remove-from-cart event is emitted', async () => {
    await wrapper.findComponent(CartTable).vm.$emit('remove-from-cart', '1');

    expect(mockStore.removeFromCart).toHaveBeenCalledWith('1');
  });
});
