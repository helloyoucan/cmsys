import {getRule, postRule} from './mock/rule';
import {getNotices} from './mock/notices';
import {delay} from 'roadhog-api-doc';
import {login, logout} from './mock/login';
import File from './mock/file';
import Workflow from './mock/workflow';

import Dictionary from './mock/dictionary';
import User from './mock/user';
import clubUnionCadre from './mock/clubUnion/cadre';
import clubUnionDepartment from './mock/clubUnion/department';
import clubUnionDataDownload from './mock/clubUnion/dataDownload';
import clubUnionInfo from './mock/clubUnion/info';

import clubMember from './mock/club/member';
import clubYearbook from './mock/club/yearbook';
import clubCadre from './mock/club/cadre';
import clubSetUpList from './mock/club/setUpList';
import clubLogoutList from './mock/club/logoutList';
import clubActivityList from './mock/club/activityList';
import clubArticle from './mock/club/article';
import clubInfo from './mock/club/info';
import clubClass from './mock/clubClass';
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /login': login,
  // 'GET /api/currentUser': login,
  'GET /logout': logout,
  //文件上传
  'POST /sys/file/upload': File.uploadFile,

  //社团成注销/列表
  'DELETE /sys/asscancel/delete': '',//删除社团注销申请单接口
  'GET /sys/asscancel/getOne': clubLogoutList.getOne,//根据申请单id获取社团注销信息
  'POST /sys/asscancel/getPage': clubLogoutList.queryList,//获取社团注销申请单列表接口
  'GET /sys/asscancel/getTaskList': '',//获取社团注销申请任务列表接口
  'POST /sys/asscancel/save': clubLogoutList.add,//保存社团注销申请单接口
  'PUT /sys/asscancel/startProcess': '',//启动社团注销流程接口
  'PUT /sys/asscancel/submitTask': '',//提交任务接口
  'POST /sys/asscancel/update': clubLogoutList.update,//修改社团注销申请单接口
  'GET /sys/asscancel/viewHisComment': '',//查看历史的审批信息接口
  'GET /sys/asscancel/viewTaskFrom': '',//办理任务，获取审批信息接口
  /*--------*/
  'GET /sys/logoutList/enable': clubLogoutList.enable,
  'GET /sys/logoutList/disable': clubLogoutList.disable,
  'GET /sys/logoutList/delete': clubLogoutList.dels,

  //社团信息-社团接口
  'POST /sys/ass/save': clubInfo.add,//保存社团信息接口（超级管理员）
  'POST /sys/ass/update': clubInfo.update,//更新社团信息接口（超级管理员）
  'POST /sys/ass/getPage': clubInfo.queryList,//获取社团列表（超级管理员）
  'GET /sys/ass/getOne': clubInfo.getOne,//根据id获取社团信息接口
  /*-------*/
  'GET /sys/clubInfo/enable': clubInfo.enable,
  'GET /sys/clubInfo/disable': clubInfo.disable,
  'GET /sys/clubInfo/delete': clubInfo.dels,
  //字典管理
  'GET /sys/dic/getDic': Dictionary.queryCategory,//根据字典分类名称获取字典数据（除了字典类型）接口
  'GET /sys/dic/getDisCategoryForPage': Dictionary.queryList,//分页获取所有的字典类型接口
  'GET /sys/dic/getDisCategoryIsEnable': '',//获取所有启用状态的字典类型接口
  'GET /sys/dic/getDisForPage': '',//分页获取所有的字典数据（除了字典类型）接口
  /*-------*/
  'POST /sys/dic/save': Dictionary.add,
  'POST /sys/dic/update': Dictionary.update,
  'GET /sys/dic/getOne': Dictionary.getOne,

  //社联干部管理
  'DELETE /sys/saucadre/delete': clubUnionCadre.dels,//删除社联干部接口
  'GET /sys/saucadre/getOne': clubUnionCadre.getOne,//根据id获取社联干部信息接口
  'GET /sys/saucadre/getPage': clubUnionCadre.queryList,//分页获取社联干部列表接口
  'PUT /sys/saucadre/job': clubUnionCadre.enable,//修改社联干部的状态为在职接口
  'PUT /sys/saucadre/quit': clubUnionCadre.disable,//离职
  'POST /sys/saucadre/save': clubUnionCadre.add,//添加社联干部信息接口
  'PUT /sys/saucadre/update': clubUnionCadre.update,//更新社联干部信息接口

  //用户管理
  'PUT /sys/user/disable': User.disable,//禁用系统用户接口（超级管理员）
  'PUT /sys/user/enable': User.enable,//启用系统用户接口（超级管理员）
  'GET /sys/user/getOne': User.getOne,//根据id获取用户信息接口（超级管理员）
  'GET /sys/user/getPage': User.queryList,//获取系统用户列表接口（超级管理员）
  'PUT /sys/user/resetPs': '',//重置密码接口（超级管理员）
  'POST /sys/user/save': User.add,//保存系统用户接口（超级管理员）
  'PUT /sys/user/update': User.update,//更新系统用户接口（超级管理员）
  'PUT /sys/user/updatePsw': '',//修改密码接口（已登录的用户）

  //工作流相关
  'DELETE /sys/workflow/delDeployment': Workflow.delDeployment,//删除部署信息接口
  'GET /sys/workflow/getDeployInfo': Workflow.getDeployInfo,//获取部署信息接口
  'GET /sys/workflow/getImageUrl': Workflow.getImageUrl,//获取图片url
  'POST /sys/workflow/saveDeployment': Workflow.saveDeployment,//发布流程接口
  'GET /sys/workflow/viewImage': Workflow.viewImage,//查看流程图接口
  'GET /sys/workflow/viewCurrentImage': '',//查看当前流程图接口

  /*-----上面是已确定的----------*/
  //社联-资料下载管理
  'POST /sys/dataDownload/save': clubUnionDataDownload.add,
  'GET /sys/dataDownload/enable': clubUnionDataDownload.enable,
  'GET /sys/dataDownload/disable': clubUnionDataDownload.disable,
  'POST /sys/dataDownload/update': clubUnionDataDownload.update,
  'POST /sys/dataDownload/page': clubUnionDataDownload.queryList,
  'GET /sys/dataDownload/getOne': clubUnionDataDownload.getOne,
  'GET /sys/dataDownload/delete': clubUnionDataDownload.dels,
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

  //社团会员管理
  'POST /sys/clubMember/save': clubMember.add,
  'GET /sys/clubMember/enable': clubMember.enable,
  'GET /sys/clubMember/disable': clubMember.disable,
  'POST /sys/clubMember/update': clubMember.update,
  'POST /sys/clubMember/page': clubMember.queryList,
  'GET /sys/clubMember/getOne': clubMember.getOne,
  'GET /sys/clubMember/delete': clubMember.dels,
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
  'POST /sys/clubUnionInfo/update': clubUnionInfo.update,
  'POST /sys/clubUnionInfo/page': clubUnionInfo.queryList,
  'GET /sys/clubUnionInfo/getOne': clubUnionInfo.getOne,
  'GET /sys/clubUnionInfo/delete': clubUnionInfo.dels,

  //社团干部管理
  'POST /sys/clubCadre/save': clubCadre.add,
  'GET /sys/clubCadre/job': clubCadre.enable,//在职
  'GET /sys/clubCadre/quit': clubCadre.disable,//离职
  'POST /sys/clubCadre/update': clubCadre.update,
  'POST /sys/clubCadre/page': clubCadre.queryList,
  'GET /sys/clubCadre/getOne': clubCadre.getOne,
  'GET /sys/clubCadre/delete': clubCadre.dels,
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
