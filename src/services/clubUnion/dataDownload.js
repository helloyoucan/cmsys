import request from '../../utils/request';
import {stringify} from 'qs';


export async function del(params) {
  return request(`/sys/datadow/delete?id=${params.id}`, {
    method: 'DELETE',
  });
}
export async function getOne(params) {
  return request(`/sys/datadow/getOne?id=${params.id}`);
}
export async function queryList(params) {
  /*
   params:
   keyword	关键词
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  return request(`/sys/datadow/getPage?${stringify(params)}`);
  /*return request('/sys/datadow/getPage', {
    method: 'GET',
    body: {
      ...params,
    },
  });*/
}
export async function add(params) {
  /*
   id (integer, optional): 资料编号 ,
   name (string, optional): 资料名称 ,
   path (string, optional): 资料路径 ,
   remarks (string, optional): 备注 ,
   status (integer, optional): 资料状态，0为不显示，1为显示*/
  return request('/sys/datadow/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function disable(params) {
  return request(`/sys/datadow/setDataDowIsDisable?id=${params.id}`, {
    method: 'PUT',
  });
}
export async function enable(params) {
  return request(`/sys/datadow/setDataDowIsEnable?id=${params.id}`, {
    method: 'PUT',
  });
}
export async function update(params) {
  /**
   id (integer, optional): 资料编号 ,
   name (string, optional): 资料名称 ,
   path (string, optional): 资料路径 ,
   remarks (string, optional): 备注 ,
   status (integer, optional): 资料状态，0为不显示，1为显示
   */
  return request('/sys/datadow/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}




