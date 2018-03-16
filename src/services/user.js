import request from '../utils/request';
import {stringify} from 'qs';

export async function disable(params) {
  /*
   * params:{
   * id:''
   * }
   * */
  return request(`/sys/user/disable?id=${params.id}`, {
    method: 'PUT'
  });
}
export async function enable(params) {
  return request(`/sys/user/enable?id=${params.id}`, {
    method: 'PUT'
  });
}
export async function getOne(params) {
  return request(`/sys/user/getOne?id=${params.id}`);
}
//查询用户列表
export async function queryList(params) {
  /*
   params:
   categoryId	用户类型	否	String
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  /* for (let key in params) {
   if (params[key] == undefined) {
   params[key] = "";
   }
   }*/
  return request(`/sys/user/getPage?${stringify(params)}`);
}
export async function resetPs(params) {
  return request(`/sys/user/resetPs?id=${params.id}`, {
    method: 'PUT'
  });
}
//添加用户
export async function add(params) {
  /*
   *username	用户名	是	String
   categoryId	用户类型	是	String
   associationId	社团ID，只有社团管理员才需要传	否	int
   status	用户状态，可不传，后端默认设置为启用	否	int
   * */
  return request('/sys/user/save', {
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
  return request('/sys/user/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function updatePsw(params) {
  return request(`/sys/user/updatePsw?newPwd=${params.newPwd}`, {
    method: 'PUT'
  });
}
