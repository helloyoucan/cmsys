import request from '../utils/request';
import {stringify} from 'qs';

export async function deleteDicType(params) {
  return request(`/sys/dic/deleteDicType?id=${params.id}`, {
    method: 'DELETE',
  });
}

export async function getDicParamsForPage(params) {
  /**
   * @param
   * {
   * pmappname 字典分类
   * pageNo 页码
   * pageSize 每页显示条数
   * }
   * */
  return request(`/sys/dic/getDicParamsForPage?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getDicTypeForPage(params) {
  /**
   * @param
   * {
   * pageNo 页码
   * pageSize 每页显示条数
   * }
   * */
  return request(`/sys/dic/getDicTypeForPage?${stringify(params)}`, {
    method: 'GET',
  });
}
export async function getOne(params) {
  return request(`/sys/dic/getOne?id=${params.id}`, {
    method: 'GET',
  });
}
export async function saveDicParams(params) {
  /**
   * @param
   *{
  *id (integer, optional): 字典编号 ,
  *pmappname (string, optional): 分类名称 ,
  *pmname (string, optional): 项名 ,
  *pmvalue (string, optional): 项值 ,
  *remarks (string, optional): 备注
  }
   */
  return request('/sys/dic/saveDicParams', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function saveDicType(params) {
  /**
   * @param
   *{
  *id (integer, optional): 字典编号 ,
 *pmappname (string, optional): 分类名称 ,
 *pmname (string, optional): 项名 ,
 *pmvalue (string, optional): 项值 ,
 *remarks (string, optional): 备注
  }
   */
  return request('/sys/dic/saveDicType', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function setDicParamsIsDisable(params) {
  /**
   * @param
   *{
  *id (integer, optional): 字典编号 ,
   */
  return request('/sys/dic/setDicParamsIsDisable', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function setDicParamsIsEnable(params) {
  /**
   * @param
   *{
  *id (integer, optional): 字典编号 ,
   */
  return request('/sys/dic/setDicParamsIsEnable', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}


export async function updateDicParams(params) {
  /**
   * @param
   *{
  *id (integer, optional): 字典编号 ,
 *pmappname (string, optional): 分类名称 ,
 *pmname (string, optional): 项名 ,
 *pmvalue (string, optional): 项值 ,
 *remarks (string, optional): 备注
   */
  return request('/sys/dic/updateDicParams', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updateDicType(params) {
  /**
   * @param
   *{
*id (integer, optional): 字典编号 ,
*pmappname (string, optional): 分类名称 ,
*pmname (string, optional): 项名 ,
*pmvalue (string, optional): 项值 ,
*remarks (string, optional): 备注
   */
  return request('/sys/dic/updateDicType', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
/*-----------------------------------------------------*/
export async function queryforPmappname(params) {
  return request(`/sys/dic/getDic?pmappname=${params.type}`);
}
export async function getAllDicType(params) {
  return request(`/sys/dic/getAllDicType`);
}
/*---------下面的为旧接口--------*/
/*
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
*/


