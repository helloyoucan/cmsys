import request from '../../utils/request';
import {stringify} from 'qs';
export async function del(params) {
  return request(`/sys/assact/delete?id=${params.id}`, {
    method: 'DELETE'
  });
}
export async function getOne(params) {
  return request(`/sys/assact/getOne?id=${params.id}`);
}
export async function queryList(params) {
  /*
   params:
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  // return request(`/sys/assact/page?${stringify(params)}`);
  return request(`/sys/assact/getPage?${stringify(params)}`);
}
export async function getTaskList(params) {
  /*
   params:
   pageNo	页码，默认为1	否	int
   pageSize	每页显示条数，默认为10	否	int
   * */
  return request(`/sys/assact/getTaskList?${stringify(params)}`);
}
export async function add(params) {
  /*
   assId (integer, optional): 社团id ,
   assSituation (string, optional): 社团情况 ,
   cancelReasons (string, optional): 注销理由 ,
   id (integer, optional): 申请id
   * */
  return request('/sys/assact/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function startProcess(params) {
  return request(`/sys/assact/startProcess?id=${params.id}`, {
    method: 'PUT',
  });
}
export async function submitTask(params) {
  /**
   * SubmitTaskBean {
comment (string, optional),
id (integer, optional),
outcome (string, optional),
taskId (string, optional)
}
   * */
  return request('/sys/assact/submitTask', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function update(params) {
  /**
   社团注销申请实体类 {
assId (integer, optional): 社团id ,
assSituation (string, optional): 社团情况 ,
cancelReasons (string, optional): 注销理由 ,
id (integer, optional): 申请id
}

   * */
  return request('/sys/assact/update', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function viewHisComment(params) {
  return request(`/sys/assact/viewHisComment?id=${params.id}`);
}


export async function viewTaskFrom(params) {
  return request(`/sys/assact/viewTaskFrom?taskId=${params.taskId}`);
}



