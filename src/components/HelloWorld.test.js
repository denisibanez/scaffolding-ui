import HelloWorld from './HelloWorld.vue';
import { shallowMount } from '@vue/test-utils';

test('HelloWorld Component renders', () => {
  const wrapper = shallowMount(HelloWorld, {});
  expect(wrapper).toBeTruthy();
});
