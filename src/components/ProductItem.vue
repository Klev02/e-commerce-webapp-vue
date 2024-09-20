<script setup lang="ts">
import type { Product } from '../interfaces/Product';

const { product } = defineProps<{ product: Product }>();
</script>

<template>
    <p>{{ product.name }} {{  product.price }}</p>
    <img class="product-image" :src="product.img" :alt="product.name">
    <p>{{ product.availableAmount }}</p>
    <p>{{ product.minOrderAmount }}</p>
</template>

<style lang="scss" scoped>
.product-image {
    width: 250px;
}
</style>