import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => {
    return { LOADING_STATE: false as boolean };
  },
  actions: {
    LOADING_DISPATCH(payload: boolean) {
      this.LOADING_STATE = payload;
    },
  },
});
