import {getUrlParams} from '../utils';
export function add(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "保存信息成功",
      "data": null
    }
  );
}
export function enable(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "修改状态成功",
      "data": null
    }
  );
}
export function disable(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "修改状态成功",
      "data": null
    }
  );
}
export function update(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "更新信息成功",
      "data": null
    }
  );
}
export function queryList(req, res, u) {
  /**
   * id (integer, optional): 资料编号 ,
   name (string, optional): 资料名称 ,
   path (string, optional): 资料路径 ,
   remarks (string, optional): 备注 ,
   status (integer, optional): 资料状态，0为不显示，1为显示
   * */
  let list = new Array();
  for (let i = (req.body.pageNo - 1) * req.body.pageSize; i < req.body.pageNo * req.body.pageSize; i++) {
    list.push(
      {
        "id": i,
        "name": '文件名' + i,
        "remarks": "备注" + i,
        "path": "www.baidu.com/1.png",
        "status": i % 2,
      }
    );
  }
  res.send(
    {
      "ret": true,
      "msg": "获取信息成功",
      "data": {
        "list": list,
        pagination: {
          "total": 100,
          "currentPage": parseInt(req.body.pageNo),
          "pageSize": parseInt(req.body.pageSize)
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
        "id": 1,
        "name": '文件名',
        "remarks": "备注",
        "path": "www.baidu.com/1.png",
        "status": 0,
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
export function del(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "删除信息成功",
      "data": null
    }
  );
}
export default {
  add, enable, disable, update, queryList, getOne, del
};
