import Layout from './Layout.vue';
import { shallowMount } from '@vue/test-utils';
import { PiniaVuePlugin, setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { createApp } from 'vue';

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

const app = createApp({});

describe('Layout Component', () => {
  let wrapper = null;

  beforeEach(() => {
    const pinia = createPinia().use(PiniaVuePlugin);
    app.use(pinia);
    setActivePinia(pinia);

    wrapper = shallowMount(Layout, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            plugins: [PiniaVuePlugin],
          }),
        ],
        propsData: {
          leftDrawerOpen: {
            value: false,
          },
        },
      },
    });

    const LOADING_STATE = storeToRefs(useLoadingStore());
    const SNACKBAR_STATE = storeToRefs(useSnackbarStore());
  });

  test('Layout Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
