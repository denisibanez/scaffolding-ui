import App from './App.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, test, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

describe('App Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {},
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
        propsData: {},
      },
    });
  });

  test('App Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
