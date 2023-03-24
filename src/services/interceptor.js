// import store from '@/store/index';

import axios from 'axios';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (ACCESS_TOKEN) {
      config.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
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
    // console.log(error.response.status, 'statusCode error');
    if (error.response.status === 403 || error.response.status === 401) {
      /* store.dispatch('generalChangeState', {
      key: 'snackbar',
      payload: {
        model: true,
        timeout: 5000,
        bgColor: '#ca850e',
        fontColor: '#ffffff',
        text: (error.response.data.message) || 'Erro',
        type: 403,
      },
    });

    setTimeout(() => {
      store.dispatch('logoff');
    }, 6000); */
    } else {
      const errors = error.response.data.message || 'Erro';
      /* store.dispatch('generalChangeState', {
      key: 'snackbar',
      payload: {
        model: true,
        timeout: 5000,
        bgColor: '#ca850e',
        fontColor: '#ffffff',
        text: errors,
        type: null,
      },
    });*/
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
