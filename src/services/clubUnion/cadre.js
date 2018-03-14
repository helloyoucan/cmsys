import request from '../../utils/request';
import {stringify} from 'qs';

export async function dels(params) {//DELETE
  /**
   *  params:
   * ids id的数组
   * */
  return request(`/sys/saucadre/delete?ids=${params.ids.join(',')}`, {
    method: 'DELETE'
  });
}
export async function getOne(params) {//GET
  return request(`/sys/saucadre/getOne?id=${params.id}`);
}

export async function queryList(params) {//GET
  /*
   params:
   keyword 关键字
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  return request(`/sys/saucadre/getPage?${stringify(params)}`);
}
export async function enable(params) {
  return request(`/sys/saucadre/job?ids = ${params.ids.join(',')}`, {
    method: 'PUT'
  });
}
export async function disable(params) {//PUT
  /*
   * params:
   * ids:id数组
   * */
  return request(`/sys/saucadre/quit?ids=${params.ids.join(',')}`, {
    method: 'PUT'
  });
}

//添加用户
export async function add(params) {
  /*
   {
   "annual": "string",
   "college": "string",
   "dept": "string",
   "id": 0,
   "major": "string",
   "name": "string",
   "position": "string",
   "remarks": "string",
   "sanction": "string",
   "sex": "string",
   "stuNum": "string"
   }
   * */
  return request('/sys/saucadre/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


export async function update(params) {
  /**
   {
   "annual": "string",
   "college": "string",
   "dept": "string",
   "id": 0,
   "major": "string",
   "name": "string",
   "position": "string",
   "remarks": "string",
   "sanction": "string",
   "sex": "string",
   "stuNum": "string"
 }
   * */
  return request('/sys/saucadre/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}


