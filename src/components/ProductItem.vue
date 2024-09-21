<script setup lang="ts">
import type { Product } from '../interfaces/Product';
import Counter from './base/Counter.vue';
import Button from './base/Button.vue';
import { ref } from 'vue';

const { product } = defineProps<{ product: Product }>();

const orderAmount = ref<number>(0);
</script>

<template>
  <div class="product-item">
    <p>{{ product.name }} {{ product.price }}</p>
    <img class="product-item__image" :src="product.img" :alt="product.name" />
    <p>Available amount: {{ product.availableAmount }}</p>
    <p>Min. order amount: {{ product.minOrderAmount }}</p>
    <Counter :value="orderAmount" @increase="orderAmount++" @decrease="orderAmount--" />
    <Button v-if="orderAmount <= 0">Add to cart</Button>
    <Button v-if="orderAmount > 0" >Update cart</Button>
    <Button v-if="orderAmount > 0">Remove from cart</Button>
  </div>
</template>

<style lang="scss" scoped>
.product-item {
  &__image {
    width: 250px;
  }
}
</style>
