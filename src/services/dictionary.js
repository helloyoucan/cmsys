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
  return request(`/sys/dic/getDisForPage?${stringify(params)}`);
}

export async function getOne(params) {
  return request(`/sys/dic/getOne?id=${params.id}`);
}


/*-----------------------------------------------------*/
export async function queryforPmappname(params) {
  return request(`/sys/dic/getDic?pmappname=${params.type}`);
}
