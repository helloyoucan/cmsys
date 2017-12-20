import request from '../utils/request';

export async function queryCategory(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
