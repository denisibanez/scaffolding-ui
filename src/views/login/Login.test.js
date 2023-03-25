import Login from './Login.vue';
import { shallowMount } from '@vue/test-utils';

test('Login Component renders', () => {
  const wrapper = shallowMount(Login, {});
  expect(wrapper).toBeTruthy();
});
