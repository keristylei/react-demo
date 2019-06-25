import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/apis';
}

export default async (url = '', data = {}) => {
  const tmpUrl = baseUrl + url;
  return new Promise((resolve, reject) => {
    const params = qs.stringify(data);
    axios({
      method: 'post',
      url: tmpUrl,
      data: params,
    }).then((res) => {
      let obj = res.data;
      if (typeof obj !== 'object') {
        obj = JSON.stringify(obj);
      }
      resolve(obj);
    }).catch((err) => {
      reject(err);
    });
  });
};
