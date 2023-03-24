import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    SNACKBAR_STATE: {
      model: false,
      timeout: 3000,
      bgColor: '#ca850e',
      fontColor: '#047C00',
      text: 'Processo efetuado com sucesso!',
    }
  }),
  actions: {
    SNACKBAR_DISPATCH(payload: any) {
      this.SNACKBAR_STATE = payload;
    },
  },
});
