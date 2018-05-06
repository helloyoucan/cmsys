import {getRule, postRule} from './mock/rule';
import {getNotices} from './mock/notices';
import {delay} from 'roadhog-api-doc';
import {login, logout} from './mock/login';
import File from './mock/file';
import Workflow from './mock/workflow';

import dataManagement from './mock/dataManagement';
import User from './mock/user';
import clubUnionCadre from './mock/clubUnion/cadre';
import clubUnionDepartment from './mock/clubUnion/department';
import clubUnionDataDownload from './mock/clubUnion/dataDownload';
import clubUnionInfo from './mock/clubUnion/info';

import clubMember from './mock/club/member';
import clubYearbook from './mock/club/yearbook';
import clubCadre from './mock/club/cadre';
import clubSetUpList from './mock/club/setUpList';
import clubLogout from './mock/club/logout';
import clubActivityList from './mock/club/activityList';
import clubArticle from './mock/club/article';
import clubInfo from './mock/club/info';
import clubClass from './mock/clubClass';
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /login': login,//系统用户登录接口
  // 'GET /api/currentUser': login,
  'GET /logout': logout,//系统用户注销登录接口

  //社联干部管理(完成接口对接-页面修改完成)
  'DELETE /sys/saucadre/delete': clubUnionCadre.dels,//删除社联干部接口
  'GET /sys/saucadre/getOne': clubUnionCadre.getOne,//根据id获取社联干部信息接口
  'GET /sys/saucadre/getPage': clubUnionCadre.queryList,//分页获取社联干部列表接口
  'PUT /sys/saucadre/job': clubUnionCadre.enable,//修改社联干部的状态为在职接口
  'PUT /sys/saucadre/quit': clubUnionCadre.disable,//修改社联干部的状态为离职接口
  'POST /sys/saucadre/save': clubUnionCadre.add,//添加社联干部信息接口
  'PUT /sys/saucadre/update': clubUnionCadre.update,//更新社联干部信息接口

  //用户管理(完成接口对接-页面修改完成)
  'PUT /sys/user/disable': User.disable,//禁用系统用户接口（超级管理员）
  'PUT /sys/user/enable': User.enable,//启用系统用户接口（超级管理员）
  'GET /sys/user/getOne': User.getOne,//根据id获取用户信息接口（超级管理员）
  'GET /sys/user/getPage': User.queryList,//获取系统用户列表接口（超级管理员）
  'PUT /sys/user/resetPs': User.resetPs,//重置密码接口（超级管理员）
  'POST /sys/user/save': User.add,//保存系统用户接口（超级管理员）
  'PUT /sys/user/update': User.update,//更新系统用户接口（超级管理员）
  'PUT /sys/user/updatePsw': User.updatePsw,//修改密码接口（已登录的用户）


  //社团干部管理（已完成接口对接-页面修改完成)
  'DELETE /sys/asscadre/delete': clubCadre.dels,//删除社团干部接口（社团管理员）
  'GET /sys/asscadre/getOne': clubCadre.getOne,//根据id获取社团干部信息接口
  'GET /sys/asscadre/getPage': clubCadre.queryList,//分页获取社团干部列表接口
  'PUT /sys/asscadre/job': clubCadre.enable,//修改社团干部的状态为在职接口（社团管理员）
  'PUT /sys/asscadre/quit': clubCadre.disable,//修改社团干部的状态为离职接口（社团管理员）
  'POST /sys/asscadre/save': clubCadre.add,//添加社团干部信息接口(社团管理员)
  'PUT /sys/asscadre/update': clubCadre.update,//更新社团干部信息接口（社团管理员）

  //社团会员管理(已完成接口对接-页面修改完成)
  'DELETE /sys/assmember/delete': clubMember.dels,//删除社团会员接口（社团管理员）
  'GET /sys/assmember/getOne': clubMember.getOne,//根据id获取社团干部信息接口
  'GET /sys/assmember/getPage': clubMember.queryList,//分页获取社团会员列表接口
  'POST /sys/assmember/save': clubMember.add,//添加社团会员信息接口(社团管理员
  'PUT /sys/assmember/update': clubMember.update,//更新社团会员信息接口（社团管理员）
  //字典管理(已完成接口对接-页面修改完成)
  'DELETE /sys/dic/deleteDicType': dataManagement.deleteDicType,//根据id删除字典分类接口*
  'GET /sys/dic/getDicParamsForPage': dataManagement.getDicParamsForPage,//分页获取字典数据接口*
  'GET /sys/dic/getDicTypeForPage': dataManagement.getDicTypeForPage,//分页获取字典分类接口*
  'GET /sys/dic/getOne': dataManagement.getOne,//根据id获取字典表数据接口*
  'POST /sys/dic/saveDicParams': dataManagement.saveDicParams,//新增字典数据接口*
  'POST /sys/dic/saveDicType': dataManagement.saveDicType,//新增字典分类接口
  'PUT /sys/dic/setDicParamsIsDisable': dataManagement.setDicParamsIsDisable,//根据id禁用字典表数据接口*
  'PUT /sys/dic/setDicParamsIsEnable': dataManagement.setDicParamsIsEnable,//根据id启用字典表数据接口*
  'PUT /sys/dic/updateDicParams': dataManagement.updateDicParams,//修改字典数据接口*
  'PUT /sys/dic/updateDicType': dataManagement.updateDicType,//修改字典分类接口
  'GET /sys/dic/getDic': dataManagement.queryCategory,//根据字典分类名称获取字典数据（除了字典类型）接口*
  'GET /sys/dic/getAllDicType': dataManagement.getAllDicType,//根据字典分类名称获取字典数据（除了字典类型）接口*
  /*-------*/
  /*  'GET /sys/dic/getDisCategoryForPage': '',//分页获取所有的字典类型接口
   'GET /sys/dic/getDisCategoryIsEnable': '',//获取所有启用状态的字典类型接口
   'GET /sys/dic/getDisForPage': Dictionary.queryList,//分页获取所有的字典数据（除了字典类型）接口
   'POST /sys/dic/save': Dictionary.add,
   'POST /sys/dic/update': Dictionary.update,
   'GET /sys/dic/getOne': Dictionary.getOne,*/
  /*--------上面为已经完成-------*/
  //文件上传
  'POST /sys/file/upload': File.uploadFile,

  //社团注销（已完成接口对接-页面修改完成）
  'DELETE /sys/asscancel/delete': clubLogout.del,//删除社团注销申请单接口*
  'GET /sys/asscancel/getOne': clubLogout.getOne,//根据申请单id获取社团注销信息*
  'GET /sys/asscancel/getPage': clubLogout.queryList,//获取社团注销申请单列表接口*
  'GET /sys/asscancel/getTaskList': clubLogout.getTaskList,//获取社团注销申请任务列表接口*
  'POST /sys/asscancel/save': clubLogout.add,//保存社团注销申请单接口*
  'PUT /sys/asscancel/startProcess': clubLogout.startProcess,//启动社团注销流程接口*
  'PUT /sys/asscancel/submitTask': clubLogout.submitTask,//提交任务接口
  'PUT /sys/asscancel/update': clubLogout.update,//修改社团注销申请单接口*
  'GET /sys/asscancel/viewHisComment': clubLogout.viewHisComment,//查看历史的审批信息接口
  'GET /sys/asscancel/viewTaskFrom': clubLogout.viewTaskFrom,//办理任务，获取审批信息接口

  //社团年审（）
  'DELETE /sys/assann/delete': clubYearbook.del,//删除社团年审申请单接口*
  'GET /sys/assann/getOne': clubYearbook.getOne,//根据申请单id获取社团年审信息*
  'GET /sys/assann/getPage': clubYearbook.queryList,//获取社团年审申请单列表接口*
  'GET /sys/assann/getTaskList': clubYearbook.getTaskList,//获取社团年审申请任务列表接口*
  'POST /sys/assann/save': clubYearbook.add,//保存社团年审申请单接口*
  'PUT /sys/assann/startProcess': clubYearbook.startProcess,//启动社团年审流程接口*
  'PUT /sys/assann/submitTask': clubYearbook.submitTask,//提交任务接口
  'PUT /sys/assann/update': clubYearbook.update,//修改社团注销申请单接口*
  'GET /sys/assann/viewHisComment': clubYearbook.viewHisComment,//查看历史的审批信息接口
  'GET /sys/assann/viewTaskFrom': clubYearbook.viewTaskFrom,//办理任务，获取审批信息接口
  //工作流相关
  'DELETE /sys/workflow/delDeployment': Workflow.delDeployment,//删除部署信息接口
  'GET /sys/workflow/getDeployInfo': Workflow.getDeployInfo,//获取部署信息接口
  'GET /sys/workflow/getImageUrl': Workflow.getImageUrl,//获取图片url
  'GET /sys/workflow/getTaskList': Workflow.getTaskList,//获取任务列表接口
  'POST /sys/workflow/saveDeployment': Workflow.saveDeployment,//发布流程接口
  'GET /sys/workflow/viewCurrentImage': Workflow.viewCurrentImage,//查看当前流程图接口（提交或审批的相关人员查看）
  'GET /sys/workflow/viewImage': Workflow.viewImage,//查看流程图接口

  //社团信息-社团列表接口（已完成接口对接）
  'POST /sys/ass/save': clubInfo.add,//保存社团信息接口（超级管理员）
  'POST /sys/ass/update': clubInfo.update,//更新社团信息接口（超级管理员）
  'GET /sys/ass/getPage': clubInfo.queryList,//获取社团列表（超级管理员）
  'GET /sys/ass/getOne': clubInfo.getOne,//根据id获取社团信息接口
  'GET /sys/ass/getAllIdAndName': clubInfo.getAll,//获取所有社团的接口

//社联-资料下载管理(接口对接完成-页面修改完成)
  'DELETE /sys/datadow/delete': clubUnionDataDownload.del,
  'GET /sys/datadow/getOne': clubUnionDataDownload.getOne,
  'GET /sys/datadow/getPage': clubUnionDataDownload.queryList,
  //'POST /sys/datadow/getPage': clubUnionDataDownload.queryList,
  'POST /sys/datadow/save': clubUnionDataDownload.add,
  'PUT /sys/datadow/setDataDowIsDisable': clubUnionDataDownload.disable,
  'PUT /sys/datadow/setDataDowIsEnable': clubUnionDataDownload.enable,
  'PUT /sys/datadow/update': clubUnionDataDownload.update,


  /*---------------上面是已确定的----------*/
  //社团活动
  'POST /sys/activityList/save': clubActivityList.add,
  'GET /sys/activityList/enable': clubActivityList.enable,
  'GET /sys/activityList/disable': clubActivityList.disable,
  'POST /sys/activityList/update': clubActivityList.update,
  'POST /sys/activityList/page': clubActivityList.queryList,
  'GET /sys/activityList/getOne': clubActivityList.getOne,
  'GET /sys/activityList/delete': clubActivityList.dels,
  //社团推文
  'POST /sys/article/save': clubArticle.add,
  'GET /sys/article/enable': clubArticle.enable,
  'GET /sys/article/disable': clubArticle.disable,
  'POST /sys/article/update': clubArticle.update,
  'POST /sys/article/page': clubArticle.queryList,
  'GET /sys/article/getOne': clubArticle.getOne,
  'GET /sys/article/delete': clubArticle.dels,

  //社团成立/列表
  'POST /sys/setUpList/save': clubSetUpList.add,
  'GET /sys/setUpList/enable': clubSetUpList.enable,
  'GET /sys/setUpList/disable': clubSetUpList.disable,
  'POST /sys/setUpList/update': clubSetUpList.update,
  'POST /sys/setUpList/page': clubSetUpList.queryList,
  'GET /sys/setUpList/getOne': clubSetUpList.getOne,
  'GET /sys/setUpList/delete': clubSetUpList.dels,


  //社团年审管理
  'POST /sys/clubMember/save': clubYearbook.add,
  'GET /sys/clubMember/enable': clubYearbook.enable,
  'GET /sys/clubMember/disable': clubYearbook.disable,
  'POST /sys/clubMember/update': clubYearbook.update,
  'POST /sys/clubMember/page': clubYearbook.queryList,
  'GET /sys/clubMember/getOne': clubYearbook.getOne,
  'GET /sys/clubMember/delete': clubYearbook.dels,

  //社团类别管理
  'POST /sys/clubClass/save': clubClass.add,
  'GET /sys/clubClass/enable': clubClass.enable,
  'GET /sys/clubClass/disable': clubClass.disable,
  'POST /sys/clubClass/update': clubClass.update,
  'POST /sys/clubClass/page': clubClass.queryList,
  'GET /sys/clubClass/getOne': clubClass.getOne,
  'GET /sys/clubClass/delete': clubClass.dels,


  //社联信息
  'POST /sys/clubUnionInfo/save': clubUnionInfo.add,
  'GET /sys/clubUnionInfo/enable': clubUnionInfo.enable,
  'GET /sys/clubUnionInfo/disable': clubUnionInfo.disable,
  'PUT /sys/clubUnionInfo/update': clubUnionInfo.update,
  'POST /sys/clubUnionInfo/page': clubUnionInfo.queryList,
  'GET /sys/clubUnionInfo/getOne': clubUnionInfo.getOne,
  'GET /sys/clubUnionInfo/delete': clubUnionInfo.dels,


//社联部门管理
  'POST /sys/clubUnionDepartment/save': clubUnionDepartment.add,
  'GET /sys/clubUnionDepartment/enable': clubUnionDepartment.enable,
  'GET /sys/clubUnionDepartment/disable': clubUnionDepartment.disable,
  'POST /sys/clubUnionDepartment/update': clubUnionDepartment.update,
  'POST /sys/clubUnionDepartment/page': clubUnionDepartment.queryList,
  'GET /sys/clubUnionDepartment/getOne': clubUnionDepartment.getOne,
  'GET /sys/clubUnionDepartment/delete': clubUnionDepartment.dels,


// 支持值为 Object 和 Array
  // 'GET /api/currentUser': {
  //   $desc: "获取当前用户接口",
  //   $params: {
  //     pageSize: {
  //       desc: '分页',
  //       exp: 2,
  //     },
  //   },
  //   $body: {
  //     name: 'Serati Ma',
  //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png',
  //     userid: '00000001',
  //     notifyCount: 12,
  //   },
  // },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }],
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'GET /api/notices': getNotices,
};

export default noProxy ?
  {} :
  delay(proxy, 500);
/*
 ,"proxy": {
 "/": {
 "target": "http://localhost:8085/",
 "changeOrigin": true,
 "pathRewrite": { "^/" : "" }
 }
 }*/
