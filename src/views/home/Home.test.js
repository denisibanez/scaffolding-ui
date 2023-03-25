import Home from './Home.vue';
import { shallowMount } from '@vue/test-utils';
import { PiniaVuePlugin, setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { createApp } from 'vue';

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

describe('Home Component', () => {
  let wrapper = null;

  beforeEach(() => {
    setActivePinia(createPinia());

    const pinia = createPinia();
    const app = createApp(Home);
    app.use(pinia);

    wrapper = shallowMount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: true,
            plugins: [PiniaVuePlugin],
            fakeApp: true,
            initialState: {
              greeting: {
                snackbar: {
                  model: false,
                  bgColor: 'primary',
                  text: 'Alerta!',
                  icon: 'warning',
                  actionLabelColor: 'white',
                  textColor: 'white',
                },
              },
            },
          }),
        ],
        propsData: {},
      },
    });

    const LOADING_DISPATCH = useLoadingStore();
    const SNACKBAR_DISPATCH = useSnackbarStore();
    const LOADING_STATE = storeToRefs(useLoadingStore());
  });

  test('Home Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
