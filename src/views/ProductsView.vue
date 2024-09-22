<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import { STORE_NAME } from '../constants';
import ProductItem from '../components/ProductItem.vue';
import type { Store } from '../interfaces/Store';
import LoadingSpinner from '../components/base/LoadingSpinner.vue';

const { hasLoaded, isLoading, hasError, products, fetchProducts, addToCart } = inject(STORE_NAME) as Store;

onMounted(() => {
  if (!hasLoaded.value) {
    fetchProducts();
  }
});

</script>

<template>
  <LoadingSpinner v-if="isLoading" />
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
      <ProductItem :product="product" @add-to-cart="addToCart" />
    </li>
  </ul>
</div>
</template>
