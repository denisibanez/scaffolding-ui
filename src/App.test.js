import App from './App.vue';
import { shallowMount } from '@vue/test-utils';

test('App Component renders', () => {
  const wrapper = shallowMount(App, {});
  expect(wrapper).toBeTruthy();
});
