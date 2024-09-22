import type { DirectiveBinding } from 'vue';

export const fallbackImageDirective = (el: HTMLImageElement, binding: DirectiveBinding) => {
  //   const originalSrc = binding.value.src;
  const fallbackSrc = binding.value.fallback;

  //   el.src = originalSrc;

  el.onerror = () => {
    el.src = fallbackSrc;
  };
};
