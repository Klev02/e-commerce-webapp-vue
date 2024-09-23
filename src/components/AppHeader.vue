<script setup lang="ts">
import { ref } from 'vue';
import { ROUTER_PATH } from '../constants';
import SideDrawer from './base/SideDrawer.vue';
import ActionButton from './base/ActionButton.vue';

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <a href="/">WebShop</a>
      </div>

      <nav class="header__nav">
        <ul>
          <li><RouterLink :to="ROUTER_PATH.PRODUCTS">Products</RouterLink></li>
          <li><RouterLink :to="ROUTER_PATH.CART">Cart</RouterLink></li>
        </ul>
      </nav>
      
      <ActionButton class="header__toggle" @click="toggleDrawer">
        <div class="header__toggle-content">
          <span></span><span></span><span></span>
        </div>
      </ActionButton>
    </div>

    <SideDrawer :is-open="isDrawerOpen" @click-outside="closeDrawer">
      <nav class="drawer-body">
        <ul>
          <li><RouterLink :to="ROUTER_PATH.PRODUCTS" @click="closeDrawer">Products</RouterLink></li>
          <li><RouterLink :to="ROUTER_PATH.CART" @click="closeDrawer">Cart</RouterLink></li>
        </ul>
      </nav>
    </SideDrawer>
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: $primary-color;
  color: $white;
  z-index: 1000;
  padding: 15px 20px;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__logo a {
    color: $white;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
  }

  &__nav {
    ul {
      list-style: none;
      display: flex;
      gap: 20px;
      margin: 0;
      padding: 0;

      li a {
        color: $white;
        text-decoration: none;
        font-size: 18px;
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__toggle {
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__toggle-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 25px;
    width: 30px;

    span {
      width: 100%;
      height: 3px;
      background-color: $white;
      display: block;
    }
  }

  .drawer-body {
    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 20px 0;

        a {
        color: $white;
        text-decoration: none;
        font-size: 18px;
        }
      }
    }
  }
}

.router-link-active {
  font-weight: bold;
}

</style>
