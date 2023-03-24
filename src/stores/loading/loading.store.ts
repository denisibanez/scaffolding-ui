import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => {
    return { LOADING_STATE: false };
  },
  actions: {
    LOADING_DISPATCH(payload: boolean) {
      this.LOADING_STATE = payload;
    },
  },
});
