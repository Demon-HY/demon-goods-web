// HTTP Axios 请求封装
import Axios from 'axios'
import Vue from 'vue';
import router from '../router/index'
import Qs from 'qs'

const http = Axios.create({
  baseURL: process.env.BASE_URL,
  responseType: 'json',
  withCredentials: true, // 请求会带上 Cookies
  headers: {
    'Content-Type': 'application/json',
    'X-Device': 'web',
    'X-Token': sessionStorage.getItem('token')
  },
  // 请求前处理数据
  // transformRequest: [function (data) {
  //   // let newData = '';
  //   // for (let k in data) {
  //   //   if (data.hasOwnProperty(k) === true) {
  //   //     newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
  //   //   }
  //   // }
  //   // console.log(data, newData);
  //   // return newData.substring(0, newData.length - 1);
  //   return Qs.stringify(data)
  // }],
  // transformResponse: [(data) => {
  //   // 这里提前处理返回的数据
  //   return data;
  // }],
  timeout: 10000 // 超时时间
});

// 请求时的拦截
http.interceptors.request.use(config => {
    return config;
  }, error => {
    console.log('请求时的拦截');
    return Promise.reject(error);
  }
);

// 响应时的拦截
http.interceptors.response.use(resp => {
    // token失效
    if (resp.data.code === '3000002' || resp.data.code === '3000001') {
      sessionStorage.removeItem('token');
      router.replace({path: '/login', query: {redirect: router.currentRoute.fullPath}});
    } else {
      return resp.data;
    }
  },
  error => {
    console.log('响应时的拦截')
    console.log(error)
    return Promise.reject(error)
  }
);

function apiAxios(method, url, params, callback) {
  return http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }, callback);
}

export default {
  get: function (url, params, callback) {
    return apiAxios('GET', url, params, callback)
  },
  post: function (url, params, callback) {
    return apiAxios('POST', url, params, callback)
  },
  put: function (url, params, callback) {
    return apiAxios('PUT', url, params, callback)
  },
  delete: function (url, params, callback) {
    return apiAxios('DELETE', url, params, callback)
  },
  config: {
    ANNO_PATH: '/anon/'
  }
}
