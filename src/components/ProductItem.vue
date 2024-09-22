<script setup lang="ts">
import type { Product } from '../interfaces/Product';
import Counter from './base/Counter.vue';
import Button from './base/Button.vue';
import { ref } from 'vue';

const { product } = defineProps<{ product: Product }>();
const emit = defineEmits<{ (e: "addToCart", product: Product, orderAmount: number): void }>();

const errorMessage = ref<string>();
const amount = ref<number>(0);

const onClickAddToCart = () => {
    if(amount.value === 0) {
        errorMessage.value = 'Please add at least 1 product!';
    } else if(amount.value > 0 && amount.value < product.minOrderAmount) {
        errorMessage.value = 'Amount does not reach minimum order amount!';
    } else if(amount.value > product.availableAmount) {
        errorMessage.value = 'Amount exceeds available amount!';
    } else if(amount.value < 0) {
        errorMessage.value = 'Should not be negative amount!';
    } else {
        errorMessage.value = '';
        emit("addToCart", product, amount.value);
        amount.value = 0;
    }
}

</script>

<template>
  <div class="product-item">
    <p>{{ product.name }} - {{ product.price }}</p>
    <img class="product-item__image" :src="product.img" :alt="product.name" />
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
