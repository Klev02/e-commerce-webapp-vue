import { RouterLinkStub, shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import AppHeader from '../AppHeader.vue';
import ActionButton from '../base/ActionButton.vue';
import SideDrawer from '../base/SideDrawer.vue';
import { ROUTER_PATH } from '../../constants';

const renderComponent = (): { wrapper: VueWrapper; actionButton: any; drawer: any } => {
  const wrapper = shallowMount(AppHeader, {
    global: {
      provide: { ROUTER_PATH },
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  });

  const actionButton = wrapper.findComponent(ActionButton);
  const drawer = wrapper.findComponent(SideDrawer);

  return { wrapper, actionButton, drawer };
};

describe('Header.vue', () => {
  let wrapper: VueWrapper;
  let actionButton: any;
  let drawer: any;

  beforeEach(() => {
    const comp = renderComponent();
    wrapper = comp.wrapper;
    actionButton = comp.actionButton;
    drawer = comp.drawer;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should drawer be closed by default', async () => {
    expect(drawer.props('isOpen')).toBe(false);
  });

  it('should toggle the drawer when the ActionButton is clicked', async () => {
    await actionButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(drawer.props('isOpen')).toBe(true);
  });

  it('should close the drawer when clicking outside', async () => {
    await actionButton.trigger('click');

    await wrapper.vm.$nextTick();

    await drawer.vm.$emit('clickOutside');

    await wrapper.vm.$nextTick();

    expect(drawer.props('isOpen')).toBe(false);
  });

  it('should assign correct path to links', () => {
    const routerLinks = wrapper.findAllComponents(RouterLinkStub);

    expect(routerLinks[0].props().to).toBe(ROUTER_PATH.PRODUCTS);

    expect(routerLinks[1].props().to).toBe(ROUTER_PATH.CART);
  });
});
