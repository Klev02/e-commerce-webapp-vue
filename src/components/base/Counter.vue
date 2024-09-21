<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

const { value = 0, min = 0 } = defineProps<{ value?: number; min?: number; }>();
const emit = defineEmits<{ (e: 'increase'): void; (e: 'decrease'): void  }>();

</script>

<template>
  <div class="counter">
    <button class="counter__action-button" @click="emit('decrease')" :disabled="value <= min">-</button>
    <input class="counter__input" type="number" :value="value" :min="min" />
    <button class="counter__action-button" @click="emit('increase')">+</button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: center;

  &__input {
    font-size: 24px;
    width: 60px;
    text-align: center;
  }

  &__action-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    margin: 0 10px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
