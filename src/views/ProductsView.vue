<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Product } from '../interfaces/Product';

const API_URL = "https://63c10327716562671870f959.mockapi.io/products";

const products = ref<Product[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);

async function fetchProducts() {
  isLoading.value = true;
  hasError.value = false;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('SOmething went wrong!');
    }

    products.value = await response.json();
  } catch (error) {
    console.log(error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchProducts();
})

</script>

<template>
  <p>Products</p>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="hasError">Something went wrong</p>
  <p v-else-if="!isLoading && !hasError && products.length > 0">
    {{ JSON.stringify(products) }}
  </p>
</template>
