<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import { STORE_NAME } from '../constants';
import ProductItem from '../components/ProductItem.vue';
import type { Store } from '../interfaces/Store';

const { state, fetchProducts, addToCart } = inject(STORE_NAME) as Store;

const isLoading = computed(() => state.isLoading);
const hasError = computed(() => state.hasError);
const products = computed(() => state.products);
const hasLoaded = computed(() => state.hasLoaded);

onMounted(() => {
  if (!hasLoaded.value) {
    fetchProducts();
  }
});

const onAddToCart = (productId: string, orderAmount: number) => {
  addToCart(productId, orderAmount);
};

</script>

<template>
  <p>Products</p>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="hasError">Something went wrong</p>
  <div
    v-else-if="
      !isLoading &&
      !hasError &&
      products.length > 0
    "
  >
  <ul>
    <li v-for="product in products" :key="product.id">
      <ProductItem :product="product" @add-to-cart="onAddToCart" />
    </li>
  </ul>
</div>
</template>
