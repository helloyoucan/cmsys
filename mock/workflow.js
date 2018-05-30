export function saveDeployment(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "发布流程成功",
      "data": null
    }
  );
}
export function getDeployInfo(req, res) {
  /*
   * deploymentVoList：部署对象信息的List
   id：部署对象id
   name：部署对象名称
   deploymentTime": 添加时间
   processDefinitionVoList：流程定义信息的List
   id：流程定义id
   name：流程定义名称
   key：流程定义的key
   version：流程定义的版本
   resourceName：流程定义的资源文件
   diagramResourceName：流程定义的图片资源文件
   deploymentId：部署对象id
   * */
  res.send(
    {
      "ret": true,
      "msg": "获取部署信息成功",
      "data": {
        "deploymentVoList": [
          {
            "id": "7509",
            "name": "推文审批流程",
            "deploymentTime": 1513596491000
          },
          {
            "id": "7513",
            "name": "推文审批流程2",
            "deploymentTime": 1513596542000
          },
          {
            "id": "10001",
            "name": "推文审批流程3",
            "deploymentTime": 1513773504000
          }
        ],
        "processDefinitionVoList": [
          {
            "id": "act-art:1:7512",
            "name": "推文发布审批流程",
            "key": "act-art",
            "version": 1,
            "resourceName": "act-art.bpmn",
            "diagramResourceName": "act-art.png",
            "deploymentId": "7509"
          },
          {
            "id": "act-art:2:7516",
            "name": "推文发布审批流程",
            "key": "act-art",
            "version": 2,
            "resourceName": "act-art.bpmn",
            "diagramResourceName": "act-art.png",
            "deploymentId": "7513"
          },
          {
            "id": "act-art:3:10004",
            "name": "推文发布审批流程",
            "key": "act-art",
            "version": 3,
            "resourceName": "act-art.bpmn",
            "diagramResourceName": "act-art.png",
            "deploymentId": "10001"
          }
        ]
      }
    }
  );
}
export function delDeployment(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "删除流程定义成功",
      "data": null
    }
  );
}
export function viewImage(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "查看流程图成功",
      "data": {
        "deploymentId": '1',
        "diagramResourceName": "act-art.png"
      }
    }
  );
}
export function getImageUrl(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "获取图片链接成功",
      "data": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524047622841&di=be387467353d487e2d82176895f155f5&imgtype=0&src=http%3A%2F%2Fwww.hqew.com%2Ffile%2Ftech2%2Fsheji%2F2010%2F0108%2F2011011214405221420110508211632938.gif"
    }
  );
}
export function viewCurrentImage(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "获取图片链接成功",
      "data": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524047622841&di=be387467353d487e2d82176895f155f5&imgtype=0&src=http%3A%2F%2Fwww.hqew.com%2Ffile%2Ftech2%2Fsheji%2F2010%2F0108%2F2011011214405221420110508211632938.gif"
    }
  );
}
export function getTaskList(req, res) {
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
    list.push(
      {
        "id": "id" + i,
        "processDefinitionKey": ['ass-cancel', 'ass-act', 'ass-ann', 'act-art'][i % 4],
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
export default {
  getTaskList, saveDeployment, getDeployInfo, delDeployment, viewImage, getImageUrl, viewCurrentImage
};
