<script setup lang="ts">
import type { Product } from '../interfaces/Product';
import Counter from './base/Counter.vue';
import Button from './base/Button.vue';
import { computed, ref } from 'vue';

const { product } = defineProps<{ product: Product }>();
const emit = defineEmits<{ (e: "addToCart", product: Product, orderAmount: number): void }>();

const orderAmount = ref<number>(0);
const errorMessage = ref<string>();

const availableAmount = computed(() => (product.availableAmount - orderAmount.value));

const onClickAddToCart = () => {
    if(orderAmount.value > 0 && orderAmount.value < product.minOrderAmount) {
        errorMessage.value = 'Amount does not reach minimum order amount!';
    } else if(orderAmount.value > product.availableAmount) {
        errorMessage.value = 'Amount exceeds available amount!'
    } else {
        errorMessage.value = '';
        emit("addToCart", product, orderAmount.value);
    }

}

</script>

<template>
  <div class="product-item">
    <p>{{ product.name }} - {{ product.price }}</p>
    <img class="product-item__image" :src="product.img" :alt="product.name" />
    <p>Available amount: {{ availableAmount }}</p>
    <p>Min. order amount: {{ product.minOrderAmount }}</p>
    <Counter :value="orderAmount" :max="product.availableAmount" @increase="orderAmount++" @decrease="orderAmount--" />
    <Button @click="onClickAddToCart">Add to cart</Button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <!-- <Button v-if="orderAmount > 0" >Update cart</Button>
    <Button v-if="orderAmount > 0">Remove from cart</Button> -->
  </div>
</template>

<style lang="scss" scoped>
.product-item {
  &__image {
    width: 250px;
  }
}
</style>
