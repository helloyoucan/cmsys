import request from '../utils/request';
import {stringify} from 'qs';
export async function login(params) {
  console.log(params)
  //return request(`/login?${stringify(params)}`);
  return request(`/login?username=${params.username}&password=${params.password}`);
}
export async function logout() {
  return request('/logout');
}

