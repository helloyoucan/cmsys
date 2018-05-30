import { getUrlParams } from '../utils';
function del(req, res) {
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
function getOne(req, res) {
  res.send(
    {
      "ret": true, "msg": "获取用户信息成功",
      "data": {
        "id": 0,
        actName: '活动名称',//活动名称
        actTime: new Date(),//活动时间
        actZone: '校内',//活动区域（校内或校外）
        actPlace: '活动地点',//活动地点
        actType: '活动类型',//活动类型
        actNumber: '20',//活动人数
        actRemarks: '活动简介',//活动简介
        hostUnit: '主办单位',//主办单位
        coUnit: '协办单位',//协办单位
        actLead: '{"name":"活动负责人","phone":"123456789"}',//活动负责人
        actLeadTeacher: '{"name":"活动负责老师","phone":"123456789"}',//活动负责老师
        actPlan: [],//活动策划资料存储路径
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
function queryList(req, res) {
  /**
   *@param
   * auditStatus
   * 1:初始录入
   * 2：审核中
   * 3：审核通过
   * 4:审核部通过
   **/
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
    list.push(
      {
        id: i,
        assId: '1',
        insertTime: new Date(),
        auditStatus: 1,
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
function getTaskList(req, res) {
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
    list.push(
      {
        "id": "id" + i,
        "name": `任务名称` + i,
        "createTime": new Date(),
        "assignee": "任务办理人",
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
function add(req, res) {
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
function startProcess(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "启动社团注销流程成功",
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
function submitTask(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "提交任务成功",
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
function update(req, res) {
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
function viewHisComment(req, res) {

  res.send(
    {
      "ret": true,
      "msg": "获取信息成功",
      "data": {
        businessData: {
          actName: '活动名称',//活动名称
          actTime: new Date(),//活动时间
          actZone: '校内',//活动区域（校内或校外）
          actPlace: '活动地点',//活动地点
          actType: '活动类型',//活动类型
          actNumber: '20',//活动人数
          actRemarks: '活动简介',//活动简介
          hostUnit: '主办单位',//主办单位
          coUnit: '协办单位',//协办单位
          actLead: '{"name":"活动负责人","phone":"123456789"}',//活动负责人
          actLeadTeacher: '{"name":"活动负责老师","phone":"123456789"}',//活动负责老师
          actPlan: [],//活动策划资料存储路径
        },
        commentVoList: [{
          time: new Date(),
          userId: 'userId',
          fullMessage: '历史审批信息'
        }],

      }
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
function viewTaskFrom(req, res) {
  res.send(
    {
      "ret": true, "msg": "获取信息成功",
      "data": {
        taskId: '1',
        businessData: {
          actName: '活动名称',//活动名称
          actTime: new Date(),//活动时间
          actZone: '校内',//活动区域（校内或校外）
          actPlace: '活动地点',//活动地点
          actType: '活动类型',//活动类型
          actNumber: '20',//活动人数
          actRemarks: '活动简介',//活动简介
          hostUnit: '主办单位',//主办单位
          coUnit: '协办单位',//协办单位
          actLead: '{"name":"活动负责人","phone":"123456789"}',//活动负责人
          actLeadTeacher: '{"name":"活动负责老师","phone":"123456789"}',//活动负责老师
          actPlan: [],//活动策划资料存储路径
        },
        commentVoList: [{
          time: new Date(),
          userId: 'userId',
          fullMessage: '历史审批信息'
        }],
        outcomeList: [
          '初次录入', '审批不通过'
        ]
      }
    }
  );
}


export default {
  del, getOne, queryList, getTaskList, add, startProcess, submitTask, update, viewHisComment, viewTaskFrom
};
