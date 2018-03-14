import request from '../../utils/request';
import {stringify} from 'qs';

export async function dels(params) {//DELETE
  /**
   *  params:
   * ids id的数组
   * */
  return request(`/sys/assmember/delete?ids=${params.ids.join(',')}`, {
    method: 'DELETE'
  });
}
export async function getOne(params) {//GET
  return request(`/sys/assmember/getOne?id=${params.id}`);
}

export async function queryList(params) {//GET
  /*
   params:
   assId 社团id
   keyword 关键字
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  return request(`/sys/assmember/getPage?${stringify(params)}`);
}


export async function add(params) {
  /*
   {
   "college": "string",
   "id": 0,
   "major": "string",
   "name": "string",
   "remarks": "string",
   "sex": "string",
   "stuNum": "string"
   }
   * */
  return request('/sys/assmember/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


export async function update(params) {
  /**
   {
  "college": "string",
  "id": 0,
  "major": "string",
  "name": "string",
  "remarks": "string",
  "sex": "string",
  "stuNum": "string"
  }
   * */
  return request('/sys/assmember/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}


