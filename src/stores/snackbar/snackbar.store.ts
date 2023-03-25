import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    SNACKBAR_STATE: {
      model: false,
      bgColor: 'primary',
      text: 'Alerta!',
      icon: 'warning',
      actionLabelColor: 'white',
      textColor: 'white',
    },
  }),
  actions: {
    SNACKBAR_DISPATCH(payload: any) {
      this.SNACKBAR_STATE = payload;
    },
  },
});
