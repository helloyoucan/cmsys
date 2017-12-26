import request from '../utils/request';


export async function uploadFile(params) {
  /*
   upload_file：上传文件（必传）
   * */
  return request('/sys/file/upload', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
