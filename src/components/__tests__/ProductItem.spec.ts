import { shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ProductItem from '../ProductItem.vue';
import NumberPicker from '../base/NumberPicker.vue';
import ActionButton from '../base/ActionButton.vue';
import { ERROR_MESSAGES } from '../../constants';
import type { Product } from '../../interfaces/Product';

const mocks = vi.hoisted(() => {
  return {
    capitalizeFirstLetter: vi.fn((text) => text)
  };
});

vi.mock('../../utils', () => {
  return {
    capitalizeFirstLetter: mocks.capitalizeFirstLetter
  };
});

const mockProduct: Product = {
  id: '1',
  name: 'MOCK PRODUCT 1',
  price: 100,
  availableAmount: 10,
  minOrderAmount: 2,
  img: ''
};

const renderComponent = (
  product: Product
): { wrapper: VueWrapper; actionButton: any; numberPicker: any } => {
  const wrapper = shallowMount(ProductItem, {
    props: { product }
  });

  const actionButton = wrapper.findComponent(ActionButton);
  const numberPicker = wrapper.findComponent(NumberPicker);

  return { wrapper, actionButton, numberPicker };
};

describe('ProductItem.vue', () => {
  let wrapper: VueWrapper;
  let actionButton: any;
  let numberPicker: any;

  beforeEach(() => {
    const comp = renderComponent(mockProduct);
    wrapper = comp.wrapper;
    actionButton = comp.actionButton;
    numberPicker = comp.numberPicker;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render product name', () => {
    const innerText = wrapper.text();

    expect(innerText).toContain(mockProduct.name);
  });

  it('should render product price', () => {
    const innerText = wrapper.text();

    expect(innerText).toContain(mockProduct.price);
  });

  it('should render product available amount', () => {
    const innerText = wrapper.text();

    expect(innerText).toContain(mockProduct.availableAmount);
  });

  it('should render product min order amount', () => {
    const innerText = wrapper.text();

    expect(innerText).toContain(mockProduct.minOrderAmount);
  });

  it('should disable the Add to Cart button when amount is zero', () => {
    expect(actionButton.props('disabled')).toBe(true);
  });

  it('should enable the Add to cart button when amount is greater than zero', async () => {
    numberPicker.setValue(1);

    await wrapper.vm.$nextTick();

    expect(actionButton.props('disabled')).toBe(false);
  });

  it('should show an error if amount is zero when trying to add to cart', async () => {
    await actionButton.trigger('click');

    expect(wrapper.text()).toContain(ERROR_MESSAGES.ZERO_AMOUNT);
  });

  it('should not emit event if amount is zero when trying to add to cart', async () => {
    await actionButton.vm.$emit('click');

    expect(wrapper.emitted('addToCart')).toBeUndefined();
  });

  it('should show an error if amount is less than minOrderAmount', async () => {
    numberPicker.setValue(mockProduct.minOrderAmount - 1);

    await actionButton.vm.$emit('click');

    expect(wrapper.text()).toContain(ERROR_MESSAGES.MIN_ORDER_AMOUNT);
  });

  it('should not emit event if amount is less than minOrderAmount', async () => {
    numberPicker.setValue(mockProduct.minOrderAmount - 1);

    await actionButton.vm.$emit('click');

    expect(wrapper.emitted('addToCart')).toBeUndefined();
  });

  it('should show an error if amount exceeds availableAmount', async () => {
    numberPicker.setValue(mockProduct.availableAmount + 1);

    await actionButton.vm.$emit('click');

    expect(wrapper.text()).toContain(ERROR_MESSAGES.EXCEEDS_AVAILABLE_AMOUNT);
  });

  it('should not emit event if amount exceeds availableAmount', async () => {
    numberPicker.setValue(mockProduct.availableAmount + 1);

    await actionButton.vm.$emit('click');

    expect(wrapper.emitted('addToCart')).toBeUndefined();
  });

  it('should emit addToCart event with correct productId and amount', async () => {
    numberPicker.setValue(3);

    await actionButton.vm.$emit('click');

    expect(wrapper.emitted('addToCart')).toEqual([[mockProduct.id, 3]]);
  });
});
