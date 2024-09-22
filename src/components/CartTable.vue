<script setup lang="ts">
import type { CartDetails } from '../interfaces/CartDetails';
import Button from '../components/base/Button.vue';

const { cartDetails } = defineProps<{cartDetails: CartDetails}>();
const emit = defineEmits<{ (event: "removeFromCart", productId: string): void}>();

</script>
<template>
<table class="cart-table">
      <thead>
        <tr class="cart-table__header-row">
          <th>Product</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="cart-table__body-row" v-for="cartItem in cartDetails.cart" :key="cartItem.productId">
          <td>{{ cartItem.name }}</td>
          <td>{{ cartItem.price }}</td>
          <td>{{ cartItem.amount }}</td>
          <td>{{ cartItem.price * cartItem.amount }}</td>
          <td>
            <Button @click="() => emit('removeFromCart', cartItem.productId)">X</Button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="cart-table__footer-row">
          <td colspan="3">Total:</td>
          <td>{{ cartDetails.totalPrice }}</td>
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
  border-collapse: collapse;

  &__header-row {
    border-bottom: 2px solid #fff;
    & > th {
      @include cart-table-row();
      font-weight: bold;
    }
  }

  &__body-row {
    & > td {
      @include cart-table-row();
    }
  }

  &__footer-row {
    border-top: 2px solid #fff;
    & > td {
      @include cart-table-row();
      font-weight: bold;
    }
  }
}
</style>