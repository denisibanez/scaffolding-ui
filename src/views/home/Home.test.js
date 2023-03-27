import Home from './Home.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, test, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";


describe('Home Component', () => {
  let wrapper = null;

  beforeEach(() => {

    wrapper = shallowMount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
            },
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
        propsData: {},
      },
    });

  });

  test('Home Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
