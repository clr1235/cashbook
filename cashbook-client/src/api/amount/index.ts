import axiosHttp, { handledGetParams } from "../axiosHttp";

// 获取账单列表
function getBillList(params: any) {
  return axiosHttp({
    url: `/bill/list`,
    method: "POST",
    data: params,
  });
}

// 获取账单详情
function getBillDetail(params: any) {
  return axiosHttp({
    url: `/bill/detail`,
    method: "GET",
    data: params,
  });
}

export default {
  getBillList,
  getBillDetail,
};
