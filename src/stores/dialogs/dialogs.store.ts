import { defineStore } from 'pinia';

export default interface DIALOG_STORE {
  key: string;
  value: boolean;
}

export const useDialogsStore = defineStore('Dialogs', {
  state: () => {
    return { DIALOG_CHANGE_PASSWORD_STATE: false };
  },
  actions: {
    DIALOGS_DISPATCH(payload: DIALOG_STORE) {
      this.DIALOG_CHANGE_PASSWORD_STATE = payload.value;
    },
  },
});
