import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ActionButton from '../ActionButton.vue';

describe('ActionButton.vue', () => {
  it('should render the button with default slot content', () => {
    const wrapper = mount(ActionButton);

    expect(wrapper.text()).toBe('Button');
  });

  it('should render the button with custom slot content', () => {
    const mockContent = 'MOCK';
    const wrapper = mount(ActionButton, {
      slots: {
        default: mockContent
      }
    });

    expect(wrapper.text()).toBe(mockContent);
  });

  it('should emit a click event when button is clicked', async () => {
    const wrapper = mount(ActionButton);

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should disable the button when disabled prop is true', async () => {
    const wrapper = mount(ActionButton, {
      props: {
        disabled: true
      }
    });

    const button = wrapper.find('button');

    expect(button.element.disabled).toBe(true);
  });

  it('should not disabled by default', () => {
    const wrapper = mount(ActionButton);

    const button = wrapper.find('button');

    expect(button.element.disabled).toBe(false);
  });
});
