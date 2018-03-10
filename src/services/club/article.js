import request from '../../utils/request';
import {stringify} from 'qs';

//添加用户
export async function add(params) {
  /*
   *username	用户名	是	String
   categoryId	用户类型	是	String
   associationId	社团ID，只有社团管理员才需要传	否	int
   status	用户状态，可不传，后端默认设置为启用	否	int
   * */
  return request('/sys/article/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function enable(params) {
  return request(`/sys/article/enable?ids=${params.ids}`);
}
export async function disable(params) {
  /*
   * params:{
   * ids:''
   * }
   * */
  return request(`/sys/article/disable?ids=${params.ids}`);
}
export async function update(params) {
  /**
   id  用户id  是  int
   username  用户名  是  String
   categoryId  用户类型  是  String
   associationId  社团ID，只有社团管理员才需要传  否  int
   status  用户状态，可不传，后端默认设置为启用  否  int

   * */
  return request('/sys/article/update', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryList(params) {
  /*
   params:
   categoryId	用户类型	否	String
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  // return request(`/sys/article/page?${stringify(params)}`);
  return request('/sys/article/page', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getOne(params) {
  return request(`/sys/article/getOne?id=${params.id}`);
}
export async function dels(params) {
  return request(`/sys/article/delete?ids=${params.ids}`);
}

