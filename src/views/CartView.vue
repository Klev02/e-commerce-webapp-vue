<script setup lang="ts">
import { computed, inject } from 'vue';
import { STORE_NAME } from '../constants';
import type { useStore } from '../store';

const { state } = inject(STORE_NAME) as ReturnType<typeof useStore>;
const cart = computed(() => state.cart);
</script>

<template>
  <div v-for="cartItem in cart" :key="cartItem.product.id">
    <p>{{ cartItem.product.name }}</p>
    <p>{{  cartItem.quantity }}</p>
  </div>
</template>
