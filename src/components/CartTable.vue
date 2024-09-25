<script setup lang="ts">
import { computed } from 'vue';
import type { CartDetails } from '../interfaces/CartDetails';
import ActionButton from './base/ActionButton.vue';
import { capitalizeFirstLetter } from '../utils';
import type { CartItemDetails } from '../interfaces/CartItemDetails';

const { cartDetails } = defineProps<{cartDetails: CartDetails}>();
const emit = defineEmits<{ (event: "removeFromCart", productId: string): void}>();

const cartItemDetails = computed<(CartItemDetails & {totalPrice: number })[]>(() => {
    return cartDetails.cart.map((cartItem: CartItemDetails) => ({ ...cartItem, name: capitalizeFirstLetter(cartItem.name), totalPrice: cartItem.price * cartItem.amount}));
});

</script>

<template>
    <table class="cart-table">
      <thead class="cart-table__header">
        <tr class="cart-table__header-row">
          <th>Product</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="cart-table__body">
        <tr class="cart-table__body-row" v-for="cartItem in cartItemDetails" :key="cartItem.productId" data-cy="cart-item">
          <td data-label="Product" data-cy="cart-item-name">{{ cartItem.name }}</td>
          <td data-label="Price" data-cy="cart-item-price">€{{ cartItem.price }}</td>
          <td data-label="Amount" data-cy="cart-item-amount">{{ cartItem.amount }}</td>
          <td data-label="Total Price" data-cy="cart-item-total-price">€{{ cartItem.totalPrice }}</td>
          <td>
            <ActionButton @click="$emit('removeFromCart', cartItem.productId)">X</ActionButton>
          </td>
        </tr>
      </tbody>
      <tfoot class="cart-table__footer">
        <tr class="cart-table__footer-row">
          <td colspan="3">Total:</td>
          <td data-cy="cart-total-price">€{{ cartDetails.totalPrice }}</td>
        </tr>
      </tfoot>
  </table>
</template>

<style lang="scss" scoped>
@mixin cart-table-row() {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
  border: none;
}

.cart-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  &__header-row {
    border-bottom: 2px solid $black;
    & > th {
      @include cart-table-row();
      font-weight: bold;
    }
  }

  &__body {
    border-radius: 5px;
  }

  &__body-row {
    background: $white;

    & > td {
      @include cart-table-row();
    }
  }

  &__footer-row {
    border-top: 2px solid $black;
    & > td {
      @include cart-table-row();
      font-weight: bold;
    }
  }
}

@media screen and (max-width: 600px) {
    .cart-table {
        border: 0;

        &__header {
            display: none;
        }

        &__body-row {
            display: block;
            margin-bottom: .625em;
            border-radius: 5px;

            & > td:not(:last-child) {
                border-bottom: 1px solid #ddd;
                display: block;
                text-align: right;

                &::before {
                    content: attr(data-label);
                    float: left;
                    font-weight: bold;
                }
            }
        }

        &__footer-row {
            display: flex;
            justify-content: space-between;
            border-top: none;
        }
    }
}
</style>