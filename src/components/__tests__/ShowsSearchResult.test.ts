import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { Quasar } from 'quasar';

import ShowsSearchResults from '../ShowsSearchResults.vue';

describe('ShowsSearchResults', () => {
  it('renders properly without shows', () => {
    const wrapper = mount(ShowsSearchResults, {
      props: {
        shows: [],
        isLoading: false,
      },
      global: {
        plugins: [Quasar],
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.text()).toContain('No shows matching the search criteria');
  });
});
