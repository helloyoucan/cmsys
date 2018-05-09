import fetch from 'dva/fetch';
import {notification} from 'antd';
import {routerRedux} from 'dva/router';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = {...defaultOptions, ...options};
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    for (let key in newOptions.body) {
      if (newOptions.body[key] == undefined) {
        newOptions.body[key] = "";
      }
    }
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      return response.json()
    })
    .then(function (data) {
      let results = data;
      if (!results.ret && !results.data && results.msg == 'false') {
        /* notification.error({
         message: "提示",
         description: '用户未登录',
         });*/
        if (window.sessionStorage) {
          sessionStorage.removeItem('currentUser');
        }
        window.location.reload()
        return {}
      }
      if (results.ret) {
        if (results.data == null) {//获取page以外的接口返回的data都是null
          notification.success({
            message: "提示",
            description: results.msg || '操作成功',
          });
        }
      } else {
        notification.error({
          message: "提示",
          description: results.msg || (results.msg != "false" && '操作失败'),
        });
      }
      return results;
    })
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          //message: `请求错误: ${url}`,
          message: `请求失败`,
          //description: error.message || '操作失败',
          description: '请检查服务器是否有错误',
        });
      }
      return error;
    });
}
