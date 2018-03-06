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
import clubMember from './mock/club/member';
import clubCadre from './mock/club/cadre';
import clubClass from './mock/clubClass';
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'POST /login': login,
  // 'GET /api/currentUser': login,
  'GET /logout': logout,
  //上传文件
  'POST /sys/file/upload': File.uploadFile,
  //社联-资料下载管理
  'POST /sys/dataDownload/save': clubUnionDataDownload.add,
  'GET /sys/dataDownload/enable': clubUnionDataDownload.enable,
  'GET /sys/dataDownload/disable': clubUnionDataDownload.disable,
  'POST /sys/dataDownload/update': clubUnionDataDownload.update,
  'POST /sys/dataDownload/page': clubUnionDataDownload.queryList,
  'GET /sys/dataDownload/getOne': clubUnionDataDownload.getOne,
  'GET /sys/dataDownload/delete': clubUnionDataDownload.dels,
  //社团会员管理
  'POST /sys/clubMember/save': clubMember.add,
  'GET /sys/clubMember/enable': clubMember.enable,
  'GET /sys/clubMember/disable': clubMember.disable,
  'POST /sys/clubMember/update': clubMember.update,
  'POST /sys/clubMember/page': clubMember.queryList,
  'GET /sys/clubMember/getOne': clubMember.getOne,
  'GET /sys/clubMember/delete': clubMember.dels,
  //社联干部管理
  'POST /sys/clubUnionDepartment/save': clubUnionDepartment.add,
  'GET /sys/clubUnionDepartment/enable': clubUnionDepartment.enable,
  'GET /sys/clubUnionDepartment/disable': clubUnionDepartment.disable,
  'POST /sys/clubUnionDepartment/update': clubUnionDepartment.update,
  'POST /sys/clubUnionDepartment/page': clubUnionDepartment.queryList,
  'GET /sys/clubUnionDepartment/getOne': clubUnionDepartment.getOne,
  'GET /sys/clubUnionDepartment/delete': clubUnionDepartment.dels,
  //社团类别管理
  'POST /sys/clubClass/save': clubClass.add,
  'GET /sys/clubClass/enable': clubClass.enable,
  'GET /sys/clubClass/disable': clubClass.disable,
  'POST /sys/clubClass/update': clubClass.update,
  'POST /sys/clubClass/page': clubClass.queryList,
  'GET /sys/clubClass/getOne': clubClass.getOne,
  'GET /sys/clubClass/delete': clubClass.dels,

  //字典管理
  'GET /sys/dic/getDic': Dictionary.queryCategory,//按type分别查找
  'POST /sys/dic/save': Dictionary.add,
  'POST /sys/dic/update': Dictionary.update,
  'POST /sys/dic/page': Dictionary.queryList,
  'GET /sys/dic/getOne': Dictionary.getOne,

  //用户管理
  'POST /sys/user/save': User.add,
  'GET /sys/user/enable': User.enable,
  'GET /sys/user/disable': User.disable,
  'POST /sys/user/update': User.update,
  'POST /sys/user/page': User.queryList,
  'GET /sys/user/getOne': User.getOne,

  //社联干部管理
  'POST /sys/saucadre/save': clubUnionCadre.add,
  'GET /sys/saucadre/job': clubUnionCadre.enable,//在职
  'GET /sys/saucadre/quit': clubUnionCadre.disable,//离职
  'POST /sys/saucadre/update': clubUnionCadre.update,
  'POST /sys/saucadre/page': clubUnionCadre.queryList,
  'GET /sys/saucadre/getOne': clubUnionCadre.getOne,
  'GET /sys/saucadre/delete': clubUnionCadre.dels,
  //社团干部管理
  'POST /sys/clubCadre/save': clubCadre.add,
  'GET /sys/clubCadre/job': clubCadre.enable,//在职
  'GET /sys/clubCadre/quit': clubCadre.disable,//离职
  'POST /sys/clubCadre/update': clubCadre.update,
  'POST /sys/clubCadre/page': clubCadre.queryList,
  'GET /sys/clubCadre/getOne': clubCadre.getOne,
  'GET /sys/clubCadre/delete': clubCadre.dels,


  //工作流相关
  'POST /sys/workflow/saveDeployment': Workflow.saveDeployment,
  'GET /sys/workflow/getDeployInfo': Workflow.getDeployInfo,
  'GET /sys/workflow/delDeployment': Workflow.delDeployment,
  'GET /sys/workflow/viewImage': Workflow.viewImage,
  'GET /sys/workflow/getImageUrl': Workflow.getImageUrl,
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
  'GET /api/users': [{
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

export default noProxy ? {} : delay(proxy, 500);
