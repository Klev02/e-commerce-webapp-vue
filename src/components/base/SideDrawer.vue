<script setup lang="ts">
const { isOpen } = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['clickOutside']);
</script>
<template>
  <aside class="drawer" :class="{ 'drawer--open': isOpen }">
    <slot></slot>
  </aside>

  <div class="overlay" v-if="isOpen" @click="emit('clickOutside')"></div>
</template>
<style lang="scss" scoped>
.drawer {
  position: fixed;
  top: 0;
  left: -250px;
  height: 100%;
  width: 250px;
  background-color: $primary-color;
  color: $white;
  transition: left 0.3s;
  z-index: 1000;
  padding: 20px;

  &.drawer--open {
    left: 0;
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;

  @media (min-width: 768px) {
    display: none;
  }
}
</style>
