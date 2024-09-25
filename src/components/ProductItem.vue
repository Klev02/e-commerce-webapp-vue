<script setup lang="ts">
import type { Product } from '../interfaces/Product';
import NumberPicker from './base/NumberPicker.vue';
import ActionButton from './base/ActionButton.vue';
import { computed, ref } from 'vue';
import { ERROR_MESSAGES } from '../constants';
import fallbackImage from '@/assets/fallback_img.jpg';
import { capitalizeFirstLetter } from '../utils';

const { product } = defineProps<{ product: Product }>();
const emit = defineEmits<{ (e: 'addToCart', productId: string, orderAmount: number): void }>();

const errorMessage = ref<string>();
const amount = ref<number>(0);

const productName = computed(() => capitalizeFirstLetter(product.name));

const onClickAddToCart = () => {
  if (amount.value === 0) {
    errorMessage.value = ERROR_MESSAGES.ZERO_AMOUNT;
  } else if (amount.value > 0 && amount.value < product.minOrderAmount) {
    errorMessage.value = ERROR_MESSAGES.MIN_ORDER_AMOUNT;
  } else if (amount.value > product.availableAmount) {
    errorMessage.value = ERROR_MESSAGES.EXCEEDS_AVAILABLE_AMOUNT;
  } else if (amount.value < 0) {
    errorMessage.value = ERROR_MESSAGES.ZERO_AMOUNT;
  } else {
    errorMessage.value = '';
    emit('addToCart', product.id, amount.value);
    amount.value = 0;
  }
};
</script>

<template>
  <div class="product-item" data-cy="product-item">
    <img
      v-fallback-image="{ fallback: fallbackImage }"
      class="product-item__image"
      :src="product.img"
      :alt="product.name"
    />
    <div class="product-item__content">
      <div class="product-item__info">
        <p data-cy="product-name">{{ productName }}</p>
        <p data-cy="product-price">€{{ product.price }}</p>
      </div>
      <div class="product-item__actions">
        <NumberPicker v-model="amount" :max="product.availableAmount" />
        <ActionButton :disabled="amount === 0" @click="onClickAddToCart">Add to cart</ActionButton>
      </div>
      <p data-cy="product-available-amount">Available amount: {{ product.availableAmount }}</p>
      <p data-cy="product-min-amount">Min. order amount: {{ product.minOrderAmount }}</p>
      <p class="product-item__error" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  &__image {
    width: 100%;
  }

  &__actions,
  &__info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__error {
    color: #ff0000;
  }
}
</style>
