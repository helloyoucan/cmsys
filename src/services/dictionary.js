import request from '../utils/request';
import {stringify} from 'qs';

export async function add(params) {
  return request('/sys/dic/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function update(params) {
  return request('/sys/dic/update', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function queryList(params) {
  return request('/sys/dic/page', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getOne(params) {
  return request(`/sys/dic/getOne?id=${params.id}`);
}


/*-----------------------------------------------------*/
export async function queryUserCategory(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function queryAssociation(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function queryCollegeName(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function querySex(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}
export async function queryTweet(params) {
  return request(`/sys/dic/getDic?type=${params.type}`);
}

