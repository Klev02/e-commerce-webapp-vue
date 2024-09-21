<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import ProductList from '../components/ProductList.vue';
import { STORE_NAME } from '../constants';
import type { useStore } from '../store';

const { state, fetchProducts } = inject(STORE_NAME) as ReturnType<typeof useStore>;

const isLoading = computed(() => state.isLoading);
const hasError = computed(() => state.hasError);
const products = computed(() => state.products);

onMounted(() => {
  fetchProducts();
});

</script>

<template>
  <p>Products</p>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="hasError">Something went wrong</p>
  <p
    v-else-if="
      !isLoading &&
      !hasError &&
      products.length > 0
    "
  >
    <ProductList :products="products" />
  </p>
</template>
