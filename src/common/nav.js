import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
    {
      component: dynamicWrapper(app, ['login'], () => import('../layouts/BasicLayout')),
      layout: 'BasicLayout',
      path: '/',
      children: [
        {
          name: '首页',
          path: 'home',
          icon: 'home',
          insert_man: 'admin',//权限控制
          component: dynamicWrapper(app, [], () => import('../routes/new/test')),
        }
        ,
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
          name: '社团类别管理',
          path: 'clubClassManagement',
          icon: 'usergroup-add',
          component: dynamicWrapper(app, ['clubClass'], () => import('../routes/ClubClass/ClubClassTable')),
        },
        {
          name: '社团管理',
          path: 'clubManagement',
          icon: 'team',
          children: [
            {
              name: '信息管理',
              path: 'info',
              component: dynamicWrapper(app, [], () => import('../routes/new/test')),
            },
            {
              name: '干部管理',
              path: 'cadres',
              component: dynamicWrapper(app, [], () => import('../routes/new/test')),
            },
            {
              name: '会员管理',
              path: 'member',
              component: dynamicWrapper(app, [], () => import('../routes/new/test')),
            },
            {
              name: '社团审批',
              path: 'clubApproval',
              children: [
                {
                  name: '年审',
                  path: 'yearbook',
                  component: dynamicWrapper(app, [], () => import('../routes/new/test')),
                },
                {
                  name: '成立',
                  path: 'setUp',
                  component: dynamicWrapper(app, [], () => import('../routes/new/test')),
                },
                {
                  name: '注销',
                  path: 'logout',
                  component: dynamicWrapper(app, [], () => import('../routes/new/test')),
                },
              ]
            },
            {
              name: '活动管理',
              path: 'activity',
              children: [
                {
                  name: '推文',
                  path: 'foretell',
                  component: dynamicWrapper(app, [], () => import('../routes/new/test')),
                },
                {
                  name: '活动审批',
                  path: 'approval',
                  component: dynamicWrapper(app, [], () => import('../routes/new/test')),
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
              path: 'basicInfo',
              component: dynamicWrapper(app, [], () => import('../routes/new/test')),
            },
            {
              name: '社联干部管理',
              path: 'cadre',
              component: dynamicWrapper(app, ['clubUnion/cadre', 'dictionary'], () => import('../routes/clubUnion/Cadre/CadreTable')),
            },
            {
              name: '部门管理',
              path: 'department',
              component: dynamicWrapper(app, [], () => import('../routes/new/test')),
            },
            {
              name: '资料下载管理',
              path: 'dataDownload',
              component: dynamicWrapper(app, [], () => import('../routes/new/test')),
            },
          ]
        },
        {
          name: '用户管理',
          path: 'userManagement',
          icon: 'user',
          component: dynamicWrapper(app, ['user', 'dictionary'], () => import('../routes/User/UserTable')),
        },
        {
          name: '数据管理',
          path: 'dataManagement',
          icon: 'database',
          component: dynamicWrapper(app, ['dictionary'], () => import('../routes/Dictionary/DictionaryTable')),
        },
        {
          name: '查询表格',
          path: 'table-list',
          component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
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
  ]
;

