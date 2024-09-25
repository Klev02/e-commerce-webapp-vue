import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NumberPicker from '../NumberPicker.vue';

const renderComponent = (props: {
  min?: number;
  max: number;
  modelValue?: number;
}): { wrapper: VueWrapper; input: DOMWrapper<Element> } => {
  const wrapper = shallowMount(NumberPicker, {
    props: {
      ...props,
      'onUpdate:modelValue': async (e) => await wrapper.setProps({ modelValue: e })
    }
  });

  const input = wrapper.find('.number-picker__input');

  return { wrapper, input };
};

describe('NumberPicker.vue', () => {
  it('should render with default model value', () => {
    const { input } = renderComponent({ max: 10 });

    expect((input.element as HTMLInputElement).value).toBe('0');
  });

  it('should render with custom min and max props', () => {
    const { input } = renderComponent({ min: 1, max: 10 });

    expect(input.attributes('min')).toBe('1');
  });

  it('should update model value correctly', async () => {
    const { input } = renderComponent({ max: 10 });

    await input.setValue('5');

    expect((input.element as HTMLInputElement).value).toBe('5');
  });

  it('should emit update:modelValue event when input value changes', async () => {
    const { input, wrapper } = renderComponent({ max: 10 });

    await input.setValue('7');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([7]);
  });
});
