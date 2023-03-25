/* eslint-disable */
import request from '@/services/plugins/request';

export default {
  async getExample(payload, success, error, done) {
    return await request(
      {
        method: 'get',
        url: `${process.env.VITE__BASE_PATH_EXAMPLE}`,
      },
      success,
      error,
      done
    );
  },

  async postExample(payload, success, error, done) {
    return await request(
      {
        method: 'post',
        url: `${process.env.VITE__BASE_PATH_EXAMPLE}`,
        body: payload,
      },
      success,
      error,
      done
    );
  },
};
/* eslint-enable */
