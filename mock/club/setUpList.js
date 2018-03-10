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
export function queryList(req, res, u) {

  let list = new Array();
  for (let i = (req.body.pageNo - 1) * req.body.pageSize; i < req.body.pageNo * req.body.pageSize; i++) {
    list.push(
      {
        "position": "正主席",
        "sex": i % 2 == 1 ? "MAN" : "WOMAN",
        "annual": "2015-2016",
        "status": i % 2,
        "college": "KUAIJI",
        "remarks": "",
        "sanction": "无",
        "id": i,
        "insertTime": 1513156716000,
        "name": "小王" + i,
        "dept": "主席团",
        "insertMan": "admin",
        "major": "财务管理专业",
        "stuNum": "201411888999"
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
        "id": 4,
        "stuNum": "201411888777",
        "name": "小丽",
        "sex": "MAN",
        "annual": "2016-2017",
        "college": "KUAIJI",
        "major": "财务管理专业",
        "dept": "主席团",
        "position": "正主席",
        "sanction": "无",
        "remarks": "这是备注",
        "status": 1,
        "insertTime": 1513156359000,
        "insertMan": "admin",
        "lastupdTime": 1513156737000,
        "lastupdMan": "admin"
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

export function dels(req, res) {
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
  add, enable, disable, update, queryList, getOne, dels
};
