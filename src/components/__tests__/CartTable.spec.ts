import { shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CartTable from '../CartTable.vue';
import type { CartDetails } from '../../interfaces/CartDetails';
import { capitalizeFirstLetter } from '../../utils';
import ActionButton from '../base/ActionButton.vue';

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

const mockCartDetails: CartDetails = {
  cart: [
    {
      productId: '1',
      amount: 2,
      name: 'MOCK PRODUCT 1',
      price: 50
    },
    {
      productId: '2',
      amount: 1,
      name: 'MOCK PRODUCT 2',
      price: 100
    }
  ],
  totalPrice: 200
};

const renderComponent = (): VueWrapper => {
  return shallowMount(CartTable, {
    props: {
      cartDetails: mockCartDetails
    }
  });
};

describe('CartTable.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = renderComponent();
  });

  it('should render the correct number of cart items', () => {
    const cartItems = wrapper.findAll('.cart-table__body-row');

    expect(cartItems).toHaveLength(mockCartDetails.cart.length);
  });

  it('should display the correct product name for the first item', () => {
    const productName = wrapper
      .find('.cart-table__body-row:nth-child(1) td[data-label="Product"]')
      .text();

    expect(productName).toBe(mockCartDetails.cart[0].name);
  });

  it('should display the correct price for the first item', () => {
    const productPrice = wrapper
      .find('.cart-table__body-row:nth-child(1) td[data-label="Price"]')
      .text();

    expect(productPrice).toBe(`€${mockCartDetails.cart[0].price}`);
  });

  it('should display the correct amount for the first item', () => {
    const productAmount = wrapper
      .find('.cart-table__body-row:nth-child(1) td[data-label="Amount"]')
      .text();
    expect(productAmount).toBe(`${mockCartDetails.cart[0].amount}`);
  });

  it('should display the correct total price for the first item', () => {
    const expectedTotalPrice = mockCartDetails.cart[0].price * mockCartDetails.cart[0].amount;

    const totalPrice = wrapper
      .find('.cart-table__body-row:nth-child(1) td[data-label="Total Price"]')
      .text();

    expect(totalPrice).toBe(`€${expectedTotalPrice}`);
  });

  it('should emit removeFromCart with the correct product ID when the button is clicked', async () => {
    const removeButton = wrapper.findComponent(ActionButton);

    await removeButton.trigger('click');

    expect(wrapper.emitted('removeFromCart')).toStrictEqual([[mockCartDetails.cart[0].productId]]);
  });

  it('should display the correct total price in the footer', () => {
    const footerTotalPrice = wrapper.find('.cart-table__footer-row td:last-child').text();

    expect(footerTotalPrice).toBe(`€${mockCartDetails.totalPrice}`);
  });
});
