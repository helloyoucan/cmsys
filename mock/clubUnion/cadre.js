import {getUrlParams} from '../utils';
export function dels(req, res) {
  /* ids：社联干部id数组*/
  res.send(
    {
      "ret": true,
      "msg": "删除社联干部信息成功",
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
export function getOne(req, res) {
  /*id：社联干部id
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
export function queryList(req, res) {
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
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
      "msg": "获取社联干部信息成功",
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
export function enable(req, res) {
  /* ids：社联干部id数组*/
  res.send(
    {
      "ret": true,
      "msg": "修改社联干部状态成功",
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
      "msg": "修改社联干部状态成功",
      "data": null
    }
  );
  /*res.send(
   {
   "ret": false, "msg": "用户权限不足，请重新登录", "data": null
   }
   );*/
}
export function add(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "保存社联干部信息成功",
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
export function update(req, res) {
  /*  id：社联干部id
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
      "msg": "更新社联干部信息成功",
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




export default {
  dels,getOne,queryList,enable,disable,add,update
};
