import { defineStore } from 'pinia';
import QcSnackbarInterface from './snackbar';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    SNACKBAR_STATE: {
      model: false,
      bgColor: 'primary',
      text: 'Alerta!',
      icon: 'warning',
      actionLabelColor: 'white',
      textColor: 'white',
      closeLabel: 'Fechar',
    } as QcSnackbarInterface,
  }),
  actions: {
    SNACKBAR_DISPATCH(payload: QcSnackbarInterface) {
      this.SNACKBAR_STATE = payload;
    },
  },
});
