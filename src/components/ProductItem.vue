<script setup lang="ts">
import type { Product } from '../interfaces/Product';
import Counter from './base/Counter.vue';
import Button from './base/Button.vue';
import { ref } from 'vue';
import { ERROR_MESSAGES } from '../constants';
import fallbackImage from '@/assets/fallback_img.jpg';

const { product } = defineProps<{ product: Product }>();
const emit = defineEmits<{ (e: "addToCart", product: Product, orderAmount: number): void }>();

const errorMessage = ref<string>();
const amount = ref<number>(0);

const onClickAddToCart = () => {
    if(amount.value === 0) {
        errorMessage.value = ERROR_MESSAGES.ZERO_AMOUNT;
    } else if(amount.value > 0 && amount.value < product.minOrderAmount) {
        errorMessage.value = ERROR_MESSAGES.MIN_ORDER_AMOUNT;
    } else if(amount.value > product.availableAmount) {
        errorMessage.value = ERROR_MESSAGES.EXCEEDS_AVAILABLE_AMOUNT;
    } else if(amount.value < 0) {
        errorMessage.value = ERROR_MESSAGES.ZERO_AMOUNT;
    } else {
        errorMessage.value = '';
        amount.value = 0;
        emit("addToCart", product, amount.value);
    }
}

</script>

<template>
  <div class="product-item">
    <p>{{ product.name }} - {{ product.price }}</p>
    <img v-fallback-image="{ fallback: fallbackImage}" class="product-item__image" :src="product.img" :alt="product.name" />
    <p>Available amount: {{ product.availableAmount }}</p>
    <p>Min. order amount: {{ product.minOrderAmount }}</p>
    <Counter v-model="amount" :max="product.availableAmount" />
    <Button :disabled="amount === 0" @click="onClickAddToCart">Add to cart</Button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.product-item {
  &__image {
    width: 250px;
  }
}
</style>
