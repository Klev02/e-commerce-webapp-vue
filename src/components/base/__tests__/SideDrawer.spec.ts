import { shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SideDrawer from '../SideDrawer.vue';

const renderComponent = (props = { isOpen: false }): VueWrapper => {
  const wrapper = shallowMount(SideDrawer, {
    props
  });
  return wrapper;
};

describe('Drawer.vue', () => {
  it('should not have drawer open by default', () => {
    const wrapper = renderComponent();

    expect(wrapper.find('.drawer').classes()).not.toContain('drawer--open');
  });

  it('should open drawer when isOpen is true', () => {
    const wrapper = renderComponent({ isOpen: true });

    expect(wrapper.find('.drawer').classes()).toContain('drawer--open');
  });

  it('should emit clickOutside event when overlay is clicked', async () => {
    const wrapper = renderComponent({ isOpen: true });

    await wrapper.find('.overlay').trigger('click');

    expect(wrapper.emitted('clickOutside')).toBeTruthy();
  });

  it('should not render overlay when isOpen is false', () => {
    const wrapper = renderComponent();

    expect(wrapper.find('.overlay').exists()).toBe(false);
  });
});
