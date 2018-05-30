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
        "id": "1",
        "assId": "2",
        "cancelReasons": "注销理由55",
        "assSituation": "社团情况",
        recheckNum: 5,
        status: 1
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
        "id": "id" + i,
        "assId": (i % 4) + 1,
        "cancelReasons": "注销理由" + i,
        "assSituation": "社团情况",
        recheckNum: 1,
        auditStatus: (i % 3) + 1
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
          id: 1,
          assId: 1,
          cancelReasons: '注销理由',
          assSituation: '社团情况',
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
      "ret": true, "msg": "获取用户信息成功",
      "data": {
        taskId: '1',
        businessData: {
          id: 1,
          assId: 1,
          cancelReasons: '注销理由',
          assSituation: '社团情况',
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
