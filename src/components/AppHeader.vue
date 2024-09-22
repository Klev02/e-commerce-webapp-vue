<script setup lang="ts">
import { ROUTER_PATH } from '../constants';
</script>

<template>
    <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="ROUTER_PATH.PRODUCTS">Products</RouterLink>
        <RouterLink :to="ROUTER_PATH.CART">Cart</RouterLink>
      </nav>
    </div>
  </header>
</template>