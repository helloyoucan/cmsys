import {getUrlParams} from './utils';
export function addUser(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "保存用户成功",
      "data": null
    }
  );
  /*
   res.send({
   "ret": false,
   "msg": "用户权限不足，请重新登录",
   "data": null
   })
   */

}
export function enableUser(req, res) {
  res.send(
    {
      "ret": true, "msg": "修改用户状态成功", "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );*/
}
export function disableUser(req, res) {
  res.send(
    {
      "ret": true, "msg": "修改用户状态成功", "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );*/
}
export function updateUser(req, res) {
  res.send(
    {
      "ret": true, "msg": "保存用户成功", "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );
   //错误返回信息包括：用户权限不足，请重新登录、用户名已存在、待更新的用户不存在、创建社团管理员，需要关联社团等
   */
}
export function queryUserList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  let list = new Array();
  for (let i = (params.pageNo - 1) * params.pageSize; i < params.pageNo * params.pageSize; i++) {
    list.push(
      {
        "id": i,
        "username": "admin" + i,
        "lastupdTime": 1513827722000,
        "insertTime": 1513064417000,
        "status": 1,
        "categoryId": "chaojiguanliyuan",
        "assId": -1,
        "lastupdMan": "admin",
        "insertMan": "admin"
      });
  }
  res.send(
    {
      "ret": true,
      "msg": "获取用户信息成功",
      "data": {
        "list": list,
        pagination: {
          "total": 100,
          "currentPage": parseInt(params.pageNo),
          "pageSize": parseInt(params.pageSize)
        }

      }
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   // 错误返回信息包括：用户权限不足，请重新登录
   );*/
}
export function getOneUser(req, res) {
  res.send(
    {
      "ret": true, "msg": "获取用户信息成功",
      "data": {
        "id": 2,
        "username": "admin",
        "lastupdTime": 1513827722000,
        "insertTime": 1513064417000,
        "status": 1,
        "categoryId": "chaojiguanliyuan",
        "assId": -1,
        "lastupdMan": "admin",
        "insertMan": "admin"
      }
    }
  );
  /* res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );
   //错误返回信息包括：用户权限不足，请重新登录、获取用户信息失败等
   */
}
export default {
  addUser, enableUser, disableUser, updateUser, queryUserList, getOneUser
};
