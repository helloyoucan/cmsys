import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});
const inserts = ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan']
// nav data
export const getNavData = app => [{
  component: dynamicWrapper(app, ['login', 'user'], () => import('../layouts/BasicLayout')),
  layout: 'BasicLayout',
  path: '/',
  children: [{
    name: '首页',
    path: 'home',
    icon: 'home',
    isShow: true,
    insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
    component: dynamicWrapper(app, [], () => import('../routes/new/test')),
  },
    /* {
     name: '前台管理',
     path: 'frontDeskManagement',
     icon: 'ie',
     children: [
     {
     name: '页面管理',
     path: 'page',
     component: dynamicWrapper(app, [], () => import('../routes/new/test')),
     },
     ]
     },*/
    {
      name: '任务管理',
      path: 'task',
      icon: 'usergroup-add',
      isShow: true,
      insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
      children: [
        {
          name: '任务列表',
          path: 'list',
          isShow: true,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['login', 'workflow', 'club/logout', 'club/info'], () => import('../routes/task/TaskTable')),
        },
        {
          name: '提交注销审批',
          path: 'taskLogoutPage',
          isShow: false,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app,
            ['workflow', 'club/logout'],
            () => import('../routes/task/page/LogoutPage')),
        },
        {
          name: '提交年审审批',
          path: 'taskYbPage',
          isShow: false,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app,
            ['workflow', 'club/yearbook'],
            () => import('../routes/task/page/YbPage')),
        },
        {
          name: '提交活动审批',
          path: 'taskActPage',
          isShow: false,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app,
            ['workflow', 'club/activityList'],
            () => import('../routes/task/page/AlPage')),
        },
        {
          name: '提交推文审批',
          path: 'taskArtPage',
          isShow: false,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app,
            ['workflow', 'club/logout', 'club/article', 'dataManagement'],
            () => import('../routes/task/page/ArtPage')),
        },
        {
          name: '进度查看',
          path: 'progress',
          isShow: false,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['login', 'club/logout', 'club/info', 'workflow'], () => import('../routes/task/TaskProgress')),
        }
      ]
    },
    {
      name: '社团管理',
      path: 'clubManagement',
      icon: 'team',
      isShow: true,
      insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
      children: [
        {
          name: '信息管理',
          path: 'cinfo',
          isShow: false,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['login', 'club/info', 'dataManagement'], () => import('../routes/club/Info/InfoPage')),
        },
        {
          name: '信息管理',
          path: 'cinfo',
          isShow: true,
          insert_man: ['shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['login', 'club/info', 'dataManagement'], () => import('../routes/club/Info/InfoPage')),
        },
        {
          name: '社团信息列表',
          isShow: true,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
          path: 'cinfoList',
          component: dynamicWrapper(app, ['club/info', 'dataManagement'], () => import('../routes/club/Info/InfoTable')),
        },
        {
          name: '干部管理',
          path: 'ccadre',
          isShow: true,
          insert_man: ['shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['login', 'club/cadre', 'dataManagement'], () => import('../routes/club/Cadre/CadreTable')),
        },
        {
          name: '会员管理',
          path: 'member',
          isShow: true,
          insert_man: ['shetuanguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['login', 'club/member', 'dataManagement'], () => import('../routes/club/Member/MemberTable')),
        },
        {
          name: '社团审批',
          path: 'clubApproval',
          isShow: true,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan', 'shetuanguanliyuan'], // 权限控制
          children: [
            {
              name: '年审列表',
              path: 'ybList',
              isShow: true,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/yearbook', 'club/info'], () => import('../routes/club/Yearbook/YearbookTable')),
            },
            {
              name: '年审申请',
              path: 'ybPage',
              isShow: false,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/yearbook', 'club/info'], () => import('../routes/club/Yearbook/YearbookPage')),
            },
            {
              name: '年审申请结果查看',
              path: 'ybResult',
              isShow: false,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['club/info', 'club/yearbook'], () => import('../routes/club/Yearbook/TaskResult')),
            },
            {
              name: '注销列表',
              path: 'logoutList',
              isShow: true,
              insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/club/Logout/LogoutTable')),
            },
            {
              name: '注销审批结果查看',
              path: 'result',
              isShow: false,
              insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['club/info', 'club/logout'], () => import('../routes/club/Logout/TaskResult')),
            },
            {
              name: '活动列表',
              path: 'alList',
              isShow: true,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/activityList', 'club/info'], () => import('../routes/club/ActivityList/ActivityListTable')),
            },
            {
              name: '活动申请',
              path: 'alPage',
              isShow: false,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/activityList', 'club/info'], () => import('../routes/club/ActivityList/ActivityListPage')),
            },
            {
              name: '活动申请结果查看',
              path: 'alResult',
              isShow: false,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['club/info', 'club/activityList'], () => import('../routes/club/ActivityList/TaskResult')),
            },
            {
              name: '推文列表',
              path: 'artList',
              isShow: true,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/article', 'club/info', 'dataManagement'], () => import('../routes/club/Article/ArticleTable')),
            },
            {
              name: '推文发布申请',
              path: 'artPage',
              isShow: false,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['login', 'club/article', 'club/info', 'dataManagement'], () => import('../routes/club/Article/ArticlePage')),
            },
            {
              name: '推文发布申请结果查看',
              path: 'artResult',
              isShow: false,
              insert_man: ['shetuanguanliyuan'], // 权限控制
              component: dynamicWrapper(app, ['club/info', 'club/article', 'dataManagement'], () => import('../routes/club/Article/TaskResult')),
            },
          ]
        }
      ]
    },
    {
      name: '社联及社联干部管理',
      path: 'clubUnionManagement',
      icon: 'solution',
      isShow: true,
      insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
      children: [
        /*{
         name: '基本信息',
         path: 'cuinfo',
         component: dynamicWrapper(app, ['clubUnion/info'], () => import('../routes/clubUnion/Info/InfoPage')),
         },*/
        {
          name: '社联干部管理',
          path: 'cucadre',
          isShow: true,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['clubUnion/cadre', 'dataManagement'], () => import('../routes/clubUnion/Cadre/CadreTable')),
        },
        /*{
         name: '部门管理',
         path: 'department',
         component: dynamicWrapper(app, ['clubUnion/department'], () => import('../routes/clubUnion/Department/DepartmentTable')),
         },*/
        {
          name: '资料下载管理',
          path: 'dataDownload',
          isShow: true,
          insert_man: ['chaojiguanliyuan', 'tuanweiguanliyuan', 'shelianguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['file', 'clubUnion/dataDownload'], () => import('../routes/clubUnion/DataDownload/DataDownloadTable')),
        },
      ]
    },
    {
      name: '用户管理',
      path: 'userManagement',
      icon: 'user',
      isShow: true,
      insert_man: ['chaojiguanliyuan'], // 权限控制
      component: dynamicWrapper(app, ['user', 'dataManagement', 'club/info'], () => import('../routes/User/UserTable')),
    },
    {
      name: '数据管理',
      path: 'dataManagement',
      icon: 'database',
      isShow: true,
      insert_man: ['chaojiguanliyuan'], // 权限控制
      children: [
        {
          name: '字典表管理',
          path: 'dictionary',
          isShow: true,
          insert_man: ['chaojiguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['dataManagement'], () => import('../routes/dataManagement/Dictionary/DictionaryTable')),
        },
        {
          name: '字典类型管理',
          path: 'type',
          isShow: true,
          insert_man: ['chaojiguanliyuan'], // 权限控制
          component: dynamicWrapper(app, ['dataManagement'], () => import('../routes/dataManagement/Type/DictionaryTable')),
        }
      ]
    },
    /*{
      path: 'success',
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },*/
  ],
},
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        path: 'user',
        children: [
          {
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
        ],
      },
    ],
  },
];

