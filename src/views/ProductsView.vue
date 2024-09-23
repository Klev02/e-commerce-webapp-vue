<script setup lang="ts">
import { inject, onMounted } from 'vue';
import { STORE_NAME } from '../constants';
import ProductItem from '../components/ProductItem.vue';
import type { Store } from '../interfaces/Store';
import LoadingSpinner from '../components/base/LoadingSpinner.vue';

const { hasLoaded, isLoading, hasError, products, fetchProducts, addToCart } = inject(
  STORE_NAME
) as Store;

onMounted(() => {
  if (!hasLoaded.value) {
    fetchProducts();
  }
});
</script>

<template>
  <div class="products-view">
    <LoadingSpinner v-if="isLoading" />
    <p v-else-if="hasError">Something went wrong</p>
    <ul class="products-view__list" v-else-if="!isLoading && !hasError && products.length > 0">
      <li class="products-view__item" v-for="product in products" :key="product.id">
        <ProductItem :product="product" @add-to-cart="addToCart" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.products-view {
  margin: 20px;
  display: flex;
  justify-content: center;
  max-width: 1100px;
  width: 100%;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }

  &__item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    flex-grow: 1;
    flex-basis: calc(33% - 10px);
    min-width: 220px;
    flex-shrink: 1;
  }
}
</style>
