import Layout from './Layout.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, test, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";


describe('Layout Component', () => {
  let wrapper = null;

  beforeEach(() => {

    wrapper = shallowMount(Layout, {
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

  test('Layout Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
