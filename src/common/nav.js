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
    name: '概览',
    path: 'home',
    icon: 'home',
    insert_man: 'admin', // 权限控制
    component: dynamicWrapper(app, [], () => import('../routes/new/test')),
  },
    {
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
    },
    {
      name: '任务管理',
      path: 'task',
      icon: 'usergroup-add',
      children: [
        {
          name: '注销任务申请列表',
          path: 'tSClubLogout',
          component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/task/submit/ClubLogout/LogoutTable')),
        },
        {
          name: '注销任务申请',
          path: 'tSClubLogoutPage',
          component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/task/submit/ClubLogout/LogoutPage')),
        },
        {
          name: '注销任务审批列表',
          path: 'tHClubLogout',
          component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/task/handle/ClubLogout/LogoutTable')),
        },
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
          component: dynamicWrapper(app, ['login', 'club/info'], () => import('../routes/club/Info/InfoPage')),
        },
        {
          name: '社团信息列表',
          path: 'cinfoList',
          component: dynamicWrapper(app, ['club/info'], () => import('../routes/club/Info/InfoTable')),
        },
        {
          name: '干部管理',
          path: 'ccadre',
          component: dynamicWrapper(app, ['login', 'club/cadre', 'dictionary'], () => import('../routes/club/Cadre/CadreTable')),
        },
        {
          name: '会员管理',
          path: 'member',
          component: dynamicWrapper(app, ['login', 'club/member', 'dictionary'], () => import('../routes/club/Member/MemberTable')),
        },
        {
          name: '社团审批',
          path: 'clubApproval',
          children: [
            {
              name: '年审列表',
              path: 'yearbookList',
              component: dynamicWrapper(app, ['login', 'club/yearbook'], () => import('../routes/club/Yearbook/YearbookTable')),
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
              name: '注销申请',
              path: 'clubLogoutPage',
              component: dynamicWrapper(app, ['login', 'club/logout', 'club/info'], () => import('../routes/club/Logout/LogoutPage')),
            },
            {
              name: '注销进度查看',
              path: 'logoutRead',
              component: dynamicWrapper(app, ['club/logout'], () => import('../routes/club/Logout/clubLogoutRead')),
            }
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
        {
          name: '基本信息',
          path: 'cuinfo',
          component: dynamicWrapper(app, ['clubUnion/info'], () => import('../routes/clubUnion/Info/InfoPage')),
        },
        {
          name: '社联干部管理',
          path: 'cucadre',
          component: dynamicWrapper(app, ['clubUnion/cadre', 'dictionary'], () => import('../routes/clubUnion/Cadre/CadreTable')),
        },
        {
          name: '部门管理',
          path: 'department',
          component: dynamicWrapper(app, ['clubUnion/department'], () => import('../routes/clubUnion/Department/DepartmentTable')),
        },
        {
          name: '资料下载管理',
          path: 'dataDownload',
          component: dynamicWrapper(app, ['dictionary', 'file', 'clubUnion/dataDownload'], () => import('../routes/clubUnion/DataDownload/DataDownloadTable')),
        },
      ]
    },
    {
      name: '用户管理',
      path: 'userManagement',
      icon: 'user',
      component: dynamicWrapper(app, ['user', 'dictionary', 'club/info'], () => import('../routes/User/UserTable')),
    },
    {
      name: '数据管理',
      path: 'dataManagement',
      icon: 'database',
      component: dynamicWrapper(app, ['dictionary'], () => import('../routes/Dictionary/DictionaryTable')),
    },
    {
      path: 'success',
      component: dynamicWrapper(app, ['dictionary'], () => import('../routes/Result/Success')),
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

