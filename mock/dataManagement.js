import {getUrlParams} from './utils';
export function deleteDicType(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "删除成功",
      "data": null
    }
  );
}
export function getDicParamsForPage(req, res) {
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
    list.push(
      {
        "pmappname": "ASSOCIATION_CATEGORY",
        "pmname": "CHUANGXINCHUANGYE",
        "pmvalue": "创新创业类" + i,
        "pmv2": null,
        "pmv3": null,
        "pmv4": null,
        "pmv5": null,
        "remarks": null,
        "status": 1,
        "insertTime": 1513061391000,
        "insertMan": "admin",
        "lastupdTime": 1513061391000,
        "lastupdMan": "admin",
      });
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
export function getDicTypeForPage(req, res) {
  let list = new Array();
  for (let i = (req.query.pageNo - 1) * req.query.pageSize; i < req.query.pageNo * req.query.pageSize; i++) {
    list.push(
      {
        "pmappname": "ASSOCIATION_CATEGORY",
        "pmname": "CHUANGXINCHUANGYE",
        "pmvalue": "创新创业类" + i,
        "pmv2": null,
        "pmv3": null,
        "pmv4": null,
        "pmv5": null,
        "remarks": null,
        "status": 1,
        "insertTime": 1513061391000,
        "insertMan": "admin",
        "lastupdTime": 1513061391000,
        "lastupdMan": "admin",
      });
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
  res.send(
    {
      "ret": true, "msg": "获取信息成功",
      "data": {
        "pmappname": "ASSOCIATION_CATEGORY",
        "pmname": "CHUANGXINCHUANGYE",
        "pmvalue": "创新创业类",
        "pmv2": null,
        "pmv3": null,
        "pmv4": null,
        "pmv5": null,
        "remarks": null,
        "status": 1,
        "insertTime": 1513061391000,
        "insertMan": "admin",
        "lastupdTime": 1513061391000,
        "lastupdMan": "admin",
      },
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
export function saveDicParams(req, res) {
  res.send(
    {
      "ret": true, "msg": "添加成功", "data": null
    }
  );
}
export function saveDicType(req, res) {
  res.send(
    {
      "ret": true, "msg": "添加成功", "data": null
    }
  );
}
export function setDicParamsIsDisable(req, res) {
  res.send(
    {
      "ret": true, "msg": "禁用成功", "data": null
    }
  );
}
export function setDicParamsIsEnable(req, res) {
  res.send(
    {
      "ret": true, "msg": "禁用成功", "data": null
    }
  );
}
export function updateDicParams(req, res) {
  res.send(
    {
      "ret": true, "msg": "修改成功", "data": null
    }
  );
}
export function updateDicType(req, res) {
  res.send(
    {
      "ret": true, "msg": "修改成功", "data": null
    }
  );
}
function queryCategory(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  let data = [];
  switch (params.pmappname) {
    case "ASSOCIATION_CATEGORY":
      data = [
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "CHUANGXINCHUANGYE",
          "pmvalue": "创新创业类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "OTHER",
          "pmvalue": "其他类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "SIXIANGZHENGZHILEI",
          "pmvalue": "思想政治类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "WENHUATIYU",
          "pmvalue": "文化体育类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "XUESHUKEJI",
          "pmvalue": "学术科技类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "ZHIYUANGONGYI",
          "pmvalue": "志愿公益类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "ZILUHUZHU",
          "pmvalue": "自律互助类",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }]
      break;
    case "COLLEGE_NAME":
      data = [
        {
          "pmappname": "COLLEGE_NAME",
          "pmname": "DIANZISHANGWUGUANLI",
          "pmvalue": "电子商务管理学院 ",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "COLLEGE_NAME",
          "pmname": "FA",
          "pmvalue": "法学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "COLLEGE_NAME",
          "pmname": "GUOJI",
          "pmvalue": "国际学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "COLLEGE_NAME",
          "pmname": "JINRONG",
          "pmvalue": "金融学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "COLLEGE_NAME",
          "pmname": "JIXUJIAOYU",
          "pmvalue": "继续教育学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }, {
          "pmappname": "COLLEGE_NAME",
          "pmname": "KUAIJI",
          "pmvalue": "会计学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }, {
          "pmappname": "COLLEGE_NAME",
          "pmname": "LVYOUGUANLI",
          "pmvalue": "旅游管理学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }, {
          "pmappname": "COLLEGE_NAME",
          "pmname": "WAIGUOYU",
          "pmvalue": "外国语学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }, {
          "pmappname": "COLLEGE_NAME",
          "pmname": "XINXIJISHUYUGONGCHENG",
          "pmvalue": "信息技术与工程学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }, {
          "pmappname": "COLLEGE_NAME",
          "pmname": "YISHUSHEJI",
          "pmvalue": "艺术设计学院",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }
      ];
      break;
    case "TWEETS_CATEGORY":
      data = [
        {
          "pmappname": "TWEETS_CATEGORY",
          "pmname": "KUAIXUN",
          "pmvalue": "快讯",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "TWEETS_CATEGORY",
          "pmname": "预告",
          "pmvalue": "女",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },]
      break;
    case "USER_CATEGORY":
      data = [
        {
          "pmappname": "USER_CATEGORY",
          "pmname": "chaojiguanliyuan",
          "pmvalue": "超级管理员",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061391000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "USER_CATEGORY",
          "pmname": "shelianguanliyuan",
          "pmvalue": "社联管理员",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061444000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "USER_CATEGORY",
          "pmname": "shetuanguanliyuan",
          "pmvalue": "社团管理员",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061465000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        },
        {
          "pmappname": "USER_CATEGORY",
          "pmname": "tuanweiguanliyuan",
          "pmvalue": "团委管理员",
          "pmv2": null,
          "pmv3": null,
          "pmv4": null,
          "pmv5": null,
          "remarks": null,
          "status": 1,
          "insertTime": 1513061420000,
          "insertMan": "admin",
          "lastupdTime": null,
          "lastupdMan": null
        }
      ]
      break;
    default:
      break;
  }
  res.send(
    {
      "ret": true,
      "msg": "获取字典数据成功",
      "data": data
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
export function getAll(req, res) {
  res.send(
    {
      "ret": true,
      "msg": "获取全部字典类型",
      "data": [{
        "pmappname": "ASSOCIATION_CATEGORY",
        "pmname": "CHUANGXINCHUANGYE",
        "pmvalue": "创新创业类",
      },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "OTHER",
          "pmvalue": "其他类",
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "SIXIANGZHENGZHILEI",
          "pmvalue": "思想政治类",
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "WENHUATIYU",
          "pmvalue": "文化体育类",
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "XUESHUKEJI",
          "pmvalue": "学术科技类",
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "ZHIYUANGONGYI",
          "pmvalue": "志愿公益类",
        },
        {
          "pmappname": "ASSOCIATION_CATEGORY",
          "pmname": "ZILUHUZHU",
          "pmvalue": "自律互助类",
        }]
    }
  );
}
export default {
  deleteDicType,
  getDicParamsForPage,
  getDicTypeForPage,
  getOne,
  saveDicParams,
  saveDicType,
  setDicParamsIsDisable,
  setDicParamsIsEnable,
  updateDicParams,
  updateDicType,
  queryCategory,
  getAll
};
