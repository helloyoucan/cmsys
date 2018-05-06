import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [{
  component: dynamicWrapper(app, ['login', 'user'], () => import('../layouts/BasicLayout')),
  layout: 'BasicLayout',
  path: '/',
  children: [{
    name: '首页',
    path: 'home',
    icon: 'home',
    insert_man: 'admin', // 权限控制
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
      children: [
        {
          name: '任务列表',
          path: 'list',
          component: dynamicWrapper(app, ['login', 'workflow', 'club/logout', 'club/info'], () => import('../routes/task/TaskTable')),
        },
        {
          name: '提交注销审批',
          path: 'logoutPage',
          component: dynamicWrapper(app,
            ['workflow', 'club/logout'],
            () => import('../routes/task/page/LogoutPage')),
        },
        {
          name: '提交年审审批',
          path: 'ybPage',
          component: dynamicWrapper(app,
            ['workflow', 'club/yearbook'],
            () => import('../routes/task/page/YbPage')),
        },
        {
          name: '提交活动审批',
          path: 'actPage',
          component: dynamicWrapper(app,
            ['workflow', 'club/activityList'],
            () => import('../routes/task/page/LogoutPage')),
        },
        {
          name: '提交推文审批',
          path: 'artPage',
          component: dynamicWrapper(app,
            ['workflow', 'club/logout', 'club/article'],
            () => import('../routes/task/page/LogoutPage')),
        },
        {
          name: '进度查看',
          path: 'progress',
          component: dynamicWrapper(app, ['login', 'club/logout', 'club/info', 'workflow'], () => import('../routes/task/TaskProgress')),
        },

        /*
         {
         name: '注销任务申请列表',
         path: 'tSClubLogout',
         component: dynamicWrapper(app, ['login', 'workflow', 'club/logout', 'club/info'], () => import('../routes/task/submit/ClubLogout/LogoutTable')),
         },{
         name: '注销任务申请进度查看',
         path: 'tSClubLogoutProgress',
         component: dynamicWrapper(app, ['login', 'club/logout', 'club/info', 'workflow'], () => import('../routes/task/submit/ClubLogout/clubLogoutProgress')),
         },
         {
         name: '注销任务审批列表',
         path: 'tHClubLogout',
         component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/task/handle/ClubLogout/LogoutTable')),
         },
         {
         name: '注销任务审批',
         path: 'tHClubLogoutPage',
         component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/task/handle/ClubLogout/LogoutPage')),
         },
         {
         name: '注销任务审批进度查看',
         path: 'tHClubLogoutProgress',
         component: dynamicWrapper(app, ['login', 'club/logout', 'club/info', 'workflow'], () => import('../routes/task/handle/ClubLogout/clubLogoutProgress')),
         },*/
      ]
    },
    {
      name: '社团管理',
      path: 'clubManagement',
      icon: 'team',
      children: [
        {
          name: '信息管理',
          path: 'cinfo',
          component: dynamicWrapper(app, ['login', 'club/info', 'dataManagement'], () => import('../routes/club/Info/InfoPage')),
        },
        {
          name: '社团信息列表',
          path: 'cinfoList',
          component: dynamicWrapper(app, ['club/info', 'dataManagement'], () => import('../routes/club/Info/InfoTable')),
        },
        {
          name: '干部管理',
          path: 'ccadre',
          component: dynamicWrapper(app, ['login', 'club/cadre', 'dataManagement'], () => import('../routes/club/Cadre/CadreTable')),
        },
        {
          name: '会员管理',
          path: 'member',
          component: dynamicWrapper(app, ['login', 'club/member', 'dataManagement'], () => import('../routes/club/Member/MemberTable')),
        },
        {
          name: '社团审批',
          path: 'clubApproval',
          children: [
            {
              name: '年审列表',
              path: 'ybList',
              component: dynamicWrapper(app, ['login', 'club/yearbook', 'club/info'], () => import('../routes/club/Yearbook/YearbookTable')),
            },
            {
              name: '年审申请',
              path: 'ybPage',
              component: dynamicWrapper(app, ['login', 'club/yearbook', 'club/info'], () => import('../routes/club/Yearbook/YearbookPage')),
            },
            {
              name: '年审申请结果查看',
              path: 'ybResult',
              component: dynamicWrapper(app, ['club/info', 'club/yearbook'], () => import('../routes/club/Yearbook/TaskResult')),
            },
            {
              name: '成立列表',
              path: 'setUpList',
              component: dynamicWrapper(app, ['club/setUpList'], () => import('../routes/club/SetUpList/SetUpListTable')),
            },
            {
              name: '注销列表',
              path: 'logoutList',
              component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/club/Logout/LogoutTable')),
            },
            {
              name: '审批结果查看',
              path: 'result',
              component: dynamicWrapper(app, ['club/info', 'club/logout'], () => import('../routes/club/Logout/TaskResult')),
            },
            /* {
             name: '注销申请',
             path: 'clubLogoutPage',
             component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/club/Logout/LogoutPage')),
             },*/
            /* {
             name: '注销进度查看',
             path: 'logoutRead',
             component: dynamicWrapper(app, ['club/logout'], () => import('../routes/club/Logout/clubLogoutRead')),
             }*/
          ]
        },
        {
          name: '活动管理',
          path: 'activity',
          children: [
            {
              name: '推文',
              path: 'article',
              component: dynamicWrapper(app, ['club/article'], () => import('../routes/club/Article/ArticleTable')),
            },
            {
              name: '活动列表',
              path: 'activityList',
              component: dynamicWrapper(app, ['club/activityList'], () => import('../routes/club/ActivityList/ActivityListTable')),
            },
          ]

        },
      ]
    },
    {
      name: '社联及社联干部管理',
      path: 'clubUnionManagement',
      icon: 'solution',
      children: [
        /*{
         name: '基本信息',
         path: 'cuinfo',
         component: dynamicWrapper(app, ['clubUnion/info'], () => import('../routes/clubUnion/Info/InfoPage')),
         },*/
        {
          name: '社联干部管理',
          path: 'cucadre',
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
          component: dynamicWrapper(app, ['file', 'clubUnion/dataDownload'], () => import('../routes/clubUnion/DataDownload/DataDownloadTable')),
        },
      ]
    },
    {
      name: '用户管理',
      path: 'userManagement',
      icon: 'user',
      component: dynamicWrapper(app, ['user', 'dataManagement', 'club/info'], () => import('../routes/User/UserTable')),
    },
    {
      name: '数据管理',
      path: 'dataManagement',
      icon: 'database',
      children: [
        {
          name: '字典表管理',
          path: 'dictionary',
          component: dynamicWrapper(app, ['dataManagement'], () => import('../routes/dataManagement/Dictionary/DictionaryTable')),
        },
        {
          name: '字典类型管理',
          path: 'type',
          component: dynamicWrapper(app, ['dataManagement'], () => import('../routes/dataManagement/Type/DictionaryTable')),
        }
      ]
    },
    {
      path: 'success',
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
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

