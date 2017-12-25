import request from '../utils/request';

export async function queryCategory(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function queryAssociation(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function queryCollegeName(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function getSex(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function queryTweet(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
