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
    list.push({
      "id": i,
      "username": "admin" + i,
      "category_name": "超级管理员" + i,
      "lastupd_time": 1513752834000,
      "status": 1,
      "ass_id": '所属社团id' + i,
      "lastupd_man": "admin" + i,
      "insert_time": 1513064417000,
      "category_id": "chaojiguanliyuan",
      "insert_man": "admin" + i
    })
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
        "username": "tuanweiguanliyuan2",
        "lastupd_time": 1513091336000,
        "status": 1,
        "lastupd_man": "admin",
        "value": "团委管理员",
        "insert_time": 1513072188000,
        "category_id": "tuanweiguanliyuan",
        "insert_man": "admin"
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
