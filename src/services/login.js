import request from '../utils/request';

export async function login(params) {
  return request('/login', {
    method: 'GET',
    body: {
      ...params,
    },
  });
}
export async function logout() {
  return request('/logout');
}

