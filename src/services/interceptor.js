// STORE
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

const { SNACKBAR_DISPATCH } = useSnackbarStore();

import axios from 'axios';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error, 'statusCode error');
    if (error.response.status === 403 || error.response.status === 401) {
      SNACKBAR_DISPATCH({
        model: true,
        bgColor: 'negative',
        text: 'Ocorreu um erro!',
        icon: 'check_circle',
        actionLabelColor: 'white',
        textColor: 'white',
      });

      localStorage.removeItem('ACCESS_TOKEN');
      window.location.replace('/sdsdf');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
