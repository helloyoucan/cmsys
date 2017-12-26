import request from '../utils/request';


export async function saveDeployment(params) {
  /*
   zipFile：流程压缩文件（必传）
   processDefinitionName：部署名称（必传）
   * */
  return request('/sys/workflow/saveDeployment', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getDeployInfo(params) {
  /*
   upload_file：上传文件（必传）
   * */
  return request(`/sys/workflow/getDeployInfo`);
}

export async function delDeployment(params) {
  /*
   deploymentId：部署id（必传）
   * */
  return request(`/sys/workflow/delDeployment?id=${params.id}`);
}

export async function viewImage(params) {
  /*
   deploymentId：部署id（必传）
   diagramResourceName：图片资源名称（必传）
   * */
  return request(`/sys/workflow/viewImage?
  deploymentId=${params.deploymentId}
  &
  diagramResourceName=${params.diagramResourceName}
  `);
}

export async function getImageUrl(params) {
  /*
   deploymentId：部署id（必传）
   diagramResourceName：图片资源名称（必传）
   * */
  return request(`/sys/workflow/getImageUrl?
  deploymentId=${params.deploymentId}
  &
  diagramResourceName=${params.diagramResourceName}
  `);
}

