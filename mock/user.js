import {getUrlParams} from './utils';
export function add(req, res) {
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
export function enable(req, res) {
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
export function disable(req, res) {
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
export function update(req, res) {
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
export function queryList(req, res) {
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
    list.push(
      {
        "id": i,
        "username": "admin" + i,
        "lastupdTime": 1513827722000,
        "insertTime": 1513064417000,
        "status": i % 2,
        "categoryId": "chaojiguanliyuan",
        "assId": (i+1) % 4,
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
          "currentPage": parseInt(req.query.pageNo),
          "pageSize": parseInt(req.query.pageSize)
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
export function getOne(req, res) {
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
        "assId": 1,
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
export function resetPs(req, res) {
  res.send(
    {
      "ret": true, "msg": "重置密码成功", "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );*/
}
export function updatePsw(req, res) {
  res.send(
    {
      "ret": true, "msg": "修改密码成功", "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );*/
}
export default {
  add, enable, disable, update, queryList, getOne, resetPs, updatePsw
};
