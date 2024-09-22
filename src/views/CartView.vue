<script setup lang="ts">
import { inject } from 'vue';
import { STORE_NAME } from '../constants';
import type { Store } from '../interfaces/Store';
import CartTable from '../components/CartTable.vue';

const { getCartDetails, removeFromCart } = inject(STORE_NAME) as Store;

</script>

<template>
  <CartTable :cart-details="getCartDetails" @remove-from-cart="removeFromCart"/>
</template>
