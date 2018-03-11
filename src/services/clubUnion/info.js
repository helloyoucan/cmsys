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
  return request('/sys/clubUnionInfo/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function enable(params) {
  return request(`/sys/clubUnionInfo/job?ids=${params.ids}`);
}
export async function disable(params) {
  /*
   * params:{
   * ids:''
   * }
   * */
  return request(`/sys/clubUnionInfo/quit?ids=${params.ids}`);
}
export async function update(params) {
  /**
   id  用户id  是  int
   username  用户名  是  String
   categoryId  用户类型  是  String
   associationId  社团ID，只有社团管理员才需要传  否  int
   status  用户状态，可不传，后端默认设置为启用  否  int

   * */
  return request('/sys/clubUnionInfo/update', {
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
  // return request(`/sys/clubUnionInfo/page?${stringify(params)}`);
  return request('/sys/clubUnionInfo/page', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getOne(params) {
  return request(`/sys/clubUnionInfo/getOne?id=${params.id}`);
}
export async function dels(params) {
  return request(`/sys/clubUnionInfo/delete?ids=${params.ids}`);
}

