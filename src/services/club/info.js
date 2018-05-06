import request from '../../utils/request';
import {stringify} from 'qs';

export async function getAll(params) {
  return request(`/sys/ass/getAllIdAndName?${stringify(params)}`);
}
export async function add(params) {
  /*
   *username	用户名	是	String
   categoryId	用户类型	是	String
   associationId	社团ID，只有社团管理员才需要传	否	int
   status	用户状态，可不传，后端默认设置为启用	否	int
   * */
  return request('/sys/ass/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function update(params) {
  /**
   id  用户id  是  int
   username  用户名  是  String
   categoryId  用户类型  是  String
   associationId  社团ID，只有社团管理员才需要传  否  int
   status  用户状态，可不传，后端默认设置为启用  否  int

   * */
  return request('/sys/ass/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function queryList(params) {
  /*
   params:
   keyword	用户类型	否	String
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  return request(`/sys/ass/getPage?${stringify(params)}`);
}
export async function getOne(params) {
  return request(`/sys/ass/getOne?id=${params.id}`);
}


