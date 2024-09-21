<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';

const { initial = 0 } = defineProps<{ initial?: number }>();
const emit = defineEmits<{ (e: 'change', value: number): void }>();

const counter = ref(initial);

const increase = () => {
  counter.value++;
  emit('change', counter.value);
};

const decrease = () => {
  counter.value--;
  emit('change', counter.value);
};
</script>

<template>
  <div class="counter">
    <button class="counter__action-button" @click="decrease" :disabled="counter <= 0">-</button>
    <input class="counter__input" type="number" v-model.number="counter" :min="0" />
    <button class="counter__action-button" @click="increase">+</button>
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
