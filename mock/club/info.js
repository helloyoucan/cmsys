import {getUrlParams} from '../utils';

export function getAll(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "获取全部社团信息成功",
      "data": [
        {
          id: 0,
          name: '社团0'
        },
        {
          id: 1,
          name: '社团1'
        },
        {
          id: 2,
          name: '社团2'
        },
        {
          id: 3,
          name: '社团2'
        },
        {
          id: 4,
          name: '社团2'
        }
      ]
    }
  );
}
export function getOne(req, res) {
  /*
   * actField :'',//活动领域 ,
   applicationFile :'',//申请表（文件路径） ,
   applicationFilename :'',//申请表（文件名称） ,
   busDeptAdviceFile :'',//业务指导部门意见（文件路径） ,
   busDeptAdviceFilename :'',//业务指导部门意见（文件名称） ,
   category :'',//社团类型 ,
   constitutionFile :'',//社团章程（文件路径） ,
   constitutionFilename :'',//社团章程（文件名称） ,
   id (integer, optional): 社团id ,
   initSituation :'',//发起人基本情况（json串） ,
   leadSituation :'',//现任负责人基本情况（json串） ,
   leadTeacherSituation :'',//指导老师基本情况（json串） ,
   name :'',//社团名称 ,
   purpose :'',//社团宗旨 ,
   remarks :'',//备注*/
  res.send(
    {
      "ret": true, "msg": "获取用户信息成功",
      "data": {
        actField: '第一教学楼105',// 活动领域 ,
        applicationFile: 'url申请表.doc',//申请表（文件路径） ,
        applicationFilename: '申请表',//申请表（文件名称） ,
        busDeptAdviceFile: 'url业务指导部门意见.doc',//业务指导部门意见（文件路径） ,
        busDeptAdviceFilename: '业务指导部门意见.doc',//业务指导部门意见（文件名称） ,
        category: '123',//社团类型 ,
        constitutionFile: 'url社团章程.doc',//社团章程（文件路径） ,
        constitutionFilename: '社团章程.doc',//社团章程（文件名称） ,
        id: '1',//社团id,
        initSituation: {
          name: '发起人姓名',
          phone: '15603011304'
        },//发起人基本情况（json串） ,
        leadSituation: {
          name: '现任负责人姓名',
          phone: '15603011304'
        },//现任负责人基本情况（json串） ,
        leadTeacherSituation: {
          name: '指导老师姓名',
          phone: '15603011304'
        },//指导老师基本情况（json串） , ,
        name: '社团名称',//社团名称 ,
        purpose: '社团宗旨',//社团宗旨 ,
        remarks: '备注'//备注
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
        actField: '第一教学楼105',// 活动领域 ,
        applicationFile: 'url申请表.doc',//申请表（文件路径） ,
        applicationFilename: '申请表',//申请表（文件名称） ,
        busDeptAdviceFile: 'url业务指导部门意见.doc',//业务指导部门意见（文件路径） ,
        busDeptAdviceFilename: '业务指导部门意见.doc',//业务指导部门意见（文件名称） ,
        category: '123',//社团类型 ,
        constitutionFile: 'url社团章程.doc',//社团章程（文件路径） ,
        constitutionFilename: '社团章程.doc',//社团章程（文件名称） ,
        id: i,//社团id,
        initSituation: {
          name: '发起人姓名',
          phone: '15603011304'
        },//发起人基本情况（json串） ,
        leadSituation: {
          name: '现任负责人姓名',
          phone: '15603011304'
        },//现任负责人基本情况（json串） ,
        leadTeacherSituation: {
          name: '指导老师姓名',
          phone: '15603011304'
        },//指导老师基本情况（json串） ,
        name: '社团名称' + i,//社团名称 ,
        purpose: '社团宗旨',//社团宗旨 ,
        remarks: '备注'//备注
      }
    );
  }
  res.send(
    {
      "ret": true,
      "msg": "获取会员信息成功",
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
export function add(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "保存会员信息成功",
      "data": null
    }
  );
}
export function update(req, res) {
  /*  id：会员id
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
      "msg": "更新会员信息成功",
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
  getAll, add, update, queryList, getOne
};
