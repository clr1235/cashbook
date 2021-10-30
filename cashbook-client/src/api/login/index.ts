import axiosHttp, { handledGetParams } from "../axiosHttp";

// 注册
function register(params: any) {
  return axiosHttp({
    url: `/user/register`,
    method: "POST",
    data: params,
  });
}

// 登录
function login(params: any) {
  return axiosHttp({
    url: `/user/login`,
    method: "POST",
    data: params,
  });
}

export default {
  register,
  login,
};
