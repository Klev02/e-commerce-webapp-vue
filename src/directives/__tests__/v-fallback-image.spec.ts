import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { fallbackImageDirective } from '../v-fallback-image';

const mockImage = 'https://mock.com/image.jpg';
const mockFallbackImage = 'https://mock.com/fallback.jpg';

const MockComponent = {
  template: `<img v-fallback-image="{ fallback: fallbackSrc }" :src="imgSrc" />`,
  data() {
    return {
      imgSrc: mockImage,
      fallbackSrc: mockFallbackImage
    };
  }
};

describe('fallbackImageDirective', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(MockComponent, {
      global: {
        directives: {
          fallbackImage: fallbackImageDirective
        }
      }
    });
  });
  it('should set fallback image on error', async () => {
    const img = wrapper.find('img');

    await img.trigger('error');

    expect(img.element.src).toBe(mockFallbackImage);
  });

  it('should not change src if no error occurs', () => {
    const img = wrapper.find('img');

    expect(img.element.src).toBe(mockImage);
  });
});
