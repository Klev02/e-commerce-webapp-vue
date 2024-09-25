<script setup lang="ts">
const { disabled = false } = defineProps<{ disabled?: boolean }>();
const emit = defineEmits(['click']);
</script>

<template>
  <button class="action-button" @click="emit('click')" :disabled="disabled" data-cy="action-button">
    <slot>Button</slot>
  </button>
</template>

<style scoped lang="scss">
.action-button {
  background-color: $primary-color;
  color: $white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: $secondary-color;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
