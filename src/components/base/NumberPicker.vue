<script setup lang="ts">
const { min = 0, max } = defineProps<{ min?: number; max: number }>();
const model = defineModel({ default: 0 });
</script>

<template>
  <div class="number-picker">
    <input class="number-picker__input" type="number" v-model="model" :min="min" :max="max" data-cy="number-picker" />
  </div>
</template>

<style lang="scss" scoped>
.number-picker {
  display: flex;
  align-items: center;
  justify-content: center;

  &__input {
    font-size: 24px;
    width: 60px;
    text-align: center;
  }
}
</style>
