import {getUrlParams} from '../utils';
export function add(req, res) {
  /*
   stuNum：学号
   name：姓名
   sex：性别
   annual：任职年度
   college：所属学院（从字典值中取）
   major：所属专业
   dept：部门
   position：现任职位
   sanction：奖罚情况
   remarks：备注*/
  res.send(
    {
      "ret": true,
      "msg": "保存信息成功",
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
  /* ids：id数组*/
  res.send(
    {
      "ret": true,
      "msg": "修改状态成功",
      "data": null
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
      "ret": true,
      "msg": "修改状态成功",
      "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );*/
}
export function update(req, res) {
  /*  id：id
   stuNum：学号
   name：姓名
   sex：性别
   annual：任职年度
   college：所属学院（从字典值中取）
   major：所属专业
   dept：部门
   position：现任职位
   sanction：奖罚情况
   remarks：备注*/
  res.send(
    {
      "ret": true,
      "msg": "更新信息成功",
      "data": null
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
        "id": "id" + i,
        "assId": i,
        "cancelReasons": "注销理由" + i,
        "assSituation": "社团情况"
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
  /*id：id
   stuNum：学号
   name：姓名
   sex：性别
   annual：任职年度
   college：所属学院（关联字典表）
   major：所属专业
   dept：部门
   position：现任职位
   sanction：奖罚情况
   remarks：备注
   status：任职状态
   insertTime：添加时间
   insertMan：添加人
   lastupdTime：最后修改时间
   lastupdMan：最后修改人*/
  res.send(
    {
      "ret": true, "msg": "获取用户信息成功",
      "data": {
        "id": "1",
        "assId": "1",
        "cancelReasons": "注销理由55",
        "assSituation": "社团情况"
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
  /* ids：id数组*/
  res.send(
    {
      "ret": true,
      "msg": "删除信息成功",
      "data": null
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
  add, enable, disable, update, queryList, getOne, del
};
