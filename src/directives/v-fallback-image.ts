import type { DirectiveBinding } from 'vue';

export const fallbackImageDirective = (el: HTMLImageElement, binding: DirectiveBinding) => {
  const fallbackSrc = binding.value.fallback;

  el.onerror = () => {
    el.src = fallbackSrc;
  };
};
