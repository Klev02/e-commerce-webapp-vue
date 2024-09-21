<script setup lang="ts">
import type { Product } from '../interfaces/Product'
import Counter from './base/Counter.vue'
import Button from './base/Button.vue'

const { product } = defineProps<{ product: Product }>()
</script>

<template>
    <div class="product-item">
        <p>{{ product.name }} {{ product.price }}</p>
  <img class="product-item__image" :src="product.img" :alt="product.name" />
  <p>Available amount: {{ product.availableAmount }}</p>
  <p>Min. order amount: {{ product.minOrderAmount }}</p>
  <Counter :min="product.minOrderAmount" :max="product.availableAmount" />
  <Button>Add to cart</Button>
  <Button>Update cart</Button>
  <Button>Remove from cart</Button>
    </div>
</template>

<style lang="scss" scoped>
.product-item {
    &__image {
        width: 250px;
    }
}
</style>
