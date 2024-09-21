<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { ProductsResponse } from '../interfaces/ProductsResponse'
import ProductList from '../components/ProductList.vue'

const API_URL = 'https://63c10327716562671870f959.mockapi.io/products'

const productsApiResponse = reactive<ProductsResponse>({
  products: [],
  isLoading: false,
  hasError: false
})

async function fetchProducts() {
  productsApiResponse.isLoading = true
  productsApiResponse.hasError = false

  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('SOmething went wrong!')
    }

    productsApiResponse.products = await response.json()
  } catch (error) {
    console.log(error)
    productsApiResponse.hasError = true
  } finally {
    productsApiResponse.isLoading = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <p>Products</p>
  <p v-if="productsApiResponse.isLoading">Loading...</p>
  <p v-else-if="productsApiResponse.hasError">Something went wrong</p>
  <p
    v-else-if="
      !productsApiResponse.isLoading &&
      !productsApiResponse.hasError &&
      productsApiResponse.products.length > 0
    "
  >
    <ProductList :products="productsApiResponse.products" />
  </p>
</template>
