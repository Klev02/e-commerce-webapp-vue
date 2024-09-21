<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<template>
  <button class="action-button" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<style scoped lang="scss">
.action-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

    &:hover {
      background-color: #2c9e70;
    }

    &:active {
      background-color: #1b6d4b;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.4);
    }
}

</style>
