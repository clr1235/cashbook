import axios from "axios";
import {Toast} from 'antd-mobile'
import { UploadOutline } from 'antd-mobile-icons'
export function handledGetParams(params: any) {
  let arr = [] as any;
  if (Object.prototype.toString.call(params) !== "[object Object]") {
    return "";
  }
  const keys = Object.keys(params);
  if (keys.length === 0) {
    return "";
  }
  for (let key of keys) {
    let item = `${key}=${params[key]}`;
    if (!arr.includes(item)) {
      arr.push(item);
    }
  }
  return `?${arr.join("&")}`;
}

type envType = 'production' | 'development' | 'test';
// 处理baseURL
function getBaseURL(env: envType) {
  let baseMap = {
    production: "/",
    development: "http://localhost:3000",
    test: "http://localhost:3001",
  };
  if (!env) {
    return "/";
  }
  return baseMap[env];
}

// 创建axios的实例
function axiosHttp(axiosConfig: any) {
  const service = axios.create({
    baseURL: "/api",
    timeout: 30000,
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `${localStorage.getItem('token') || null}`,
      'Content-Type': 'application/json'
    },
    ...axiosConfig,
  });
  // 添加请求拦截器
  service.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      Toast.show({
        content: "正在加载...",
        icon: 'loading',
      });
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  service.interceptors.response.use(
    function (response: any) {
      // 对响应数据做点什么
      if (typeof response.data !== 'object') {
        Toast.show({
          content: '服务端异常'
        })
        return Promise.reject(response)
      }
      if (response.data.code && response.data.code !== 200) {
        if (response.data.msg) Toast.show(response.data.msg)
        if (response.data.code == 401) {
          window.location.href = '/login'
        }
        return Promise.reject(response.data)
      }
      return response.data;
    },
    function (error) {
      // 统一错误处理
      if (error && error.response) {
        Toast.show({
          content: error.response.data.message
        });
      }
      return Promise.resolve(error.response.data);
    }
  );
  return service(axiosConfig);
}

export default axiosHttp;
