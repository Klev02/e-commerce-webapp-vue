<script setup lang="ts">
import { inject } from 'vue';
import { STORE_NAME } from '../constants';
import type { Store } from '../interfaces/Store';
import CartTable from '../components/CartTable.vue';

const { getCartDetails, removeFromCart } = inject(STORE_NAME) as Store;
</script>

<template>
  <div class="cart-view">
    <CartTable :cart-details="getCartDetails" @remove-from-cart="removeFromCart" />
  </div>
</template>
<style lang="scss" scoped>
.cart-view {
  margin: 20px;
}
</style>
