import ErrorNotFound from './ErrorNotFound.vue';
import { shallowMount } from '@vue/test-utils';

test('ErrorNotFound Component renders', () => {
  const wrapper = shallowMount(ErrorNotFound, {});
  expect(wrapper).toBeTruthy();
});
