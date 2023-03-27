import Login from './Login.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, test, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

describe('Login Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Login, {
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

  test('Login Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
