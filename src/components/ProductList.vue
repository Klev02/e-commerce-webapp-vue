<script setup lang="ts">
import type { Product } from '../interfaces/Product';
import ProductItem from './ProductItem.vue';

const { products } = defineProps<{ products: Product[] }>();

</script>

<template>
    <div>
        <ul>
            <li v-for="product in products" :key="product.id">
                <ProductItem :product="product" />
            </li>
        </ul>
    </div> 
</template>