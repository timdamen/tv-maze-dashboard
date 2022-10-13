import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ShowPoster from '../ShowPoster.vue';

describe('ShowPoster', () => {
  it('shows the image', () => {
    const wrapper = mount(ShowPoster, {
      props: { src: 'https://test.io/image', name: 'poster' },
    });
    expect(wrapper.html()).toContain('https://test.io/image');
  });

  it('show name is shown', () => {
    const wrapper = mount(ShowPoster, {
      props: { src: '', name: 'poster' },
    });
    expect(wrapper.html()).toContain('poster');
  });
});
