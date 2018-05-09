import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Link, Route, Redirect, Switch} from 'dva/router';
import {Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin, Divider} from 'antd';

import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

import moment from 'moment';
import groupBy from 'lodash/groupBy';
import classNames from 'classnames';
import {ContainerQuery} from 'react-container-query';
import UpdatePsw from './updatePsw.js';
import styles from './BasicLayout.less';
import logo from '../assets/logo.png';
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }

  constructor(props) {
    super(props);
    // 把一级 Layout 的 children 作为菜单项
    this.menus = props.navData.reduce((arr, current) => arr.concat(current.children), []);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
      visible: false
    };
  }

  /* getChildContext() {
   const {location, navData, getRouteData} = this.props;
   const routeData = getRouteData('BasicLayout');
   const firstMenuData = navData.reduce((arr, current) => arr.concat(current.children), []);
   const menuData = this.getMenuData(firstMenuData, '');
   const breadcrumbNameMap = {};
   routeData.concat(menuData).forEach((item) => {
   breadcrumbNameMap[item.path] = item.name;
   });
   return {location, breadcrumbNameMap};
   }*/
  componentDidMount() {
    this.props.dispatch({
      type: 'login/checkLogin',
      payload: {},
    });
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimeout);
  }

  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  onMenuClick = ({key}) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
        payload: {}
      });
    }

    if (key === 'updatePsw') {
      this.setState({
        visible: true
      })
    }
  }
  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach((item) => {
      if (item.children) {
        arr.push({path: `${parentPath}/${item.path}`, name: item.name});
        arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
      }
    });
    return arr;
  }

  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }

  getCurrentMenuSelectedKeys(props) {
    const {location: {pathname}} = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }

  getNavMenuItems(menusData, parentPath = '') {
    const {currentUser} = this.props.login;
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if ((item.isShow != undefined && !item.isShow)//UI权限控制
        || item.insert_man == undefined
        || (item.insert_man != undefined
        && currentUser
        && currentUser.categoryId
        && !item.insert_man.includes(currentUser.categoryId))) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon}/>
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon}/>;
      return (
        <Menu.Item key={item.key || item.path}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}<span>{item.name}</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                target={item.target}
                replace={itemPath === this.props.location.pathname}
              >
                {icon}<span>{item.name}</span>
              </Link>
            )
          }
        </Menu.Item>
      );
    });
  }

  getPageTitle() {
    const {location, getRouteData} = this.props;
    const {pathname} = location;
    let title = '社团管理系统';
    getRouteData('BasicLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name}`;
      }
    });
    return title;
  }

  getNoticeData() {
    const {notices = []} = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = {...notice};
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{marginRight: 0}}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }
  toggle = () => {
    const {collapsed} = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
    this.resizeTimeout = setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    }, 600);
  }
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }
  handleNoticeVisibleChange = (visible) => {
    /*if (visible) {
     this.props.dispatch({
     type: 'global/fetchNotices',
     });
     }*/
  }

  onCancel() {
    this.setState({
      visible: false
    })
  }

  onOk(psw) {
    this.state.dispatch({
      type: 'user/updatePsw',
      payload: {
        id: psw
      },
      callback: () => {
        this.setState({
          visible: false
        })
      }
    });
  }

  render() {
    const {login: {currentUser}, collapsed, fetchingNotices, getRouteData} = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="updatePsw"><Icon type="key"/>修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();

    //控制路由权限
    const PrivateRoute = ({component: Component, insert_man: insert_man, ...rest}) => (
      <Route {...rest} render={props => {
        // console.log(insert_man)//权限控制
        return (
          !!currentUser && currentUser.id ? (
            <Component {...props}/>
          ) : (
            <Redirect to={{
              pathname: '/user/login',
              state: {from: props.location}
            }}/>
          )
        )
      }}/>
    )
    const layout = (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onCollapse={this.onCollapse}
          width={256}
          className={styles.sider}
        >
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="logo"/>
              <h1>社团管理系统</h1>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            onOpenChange={this.handleOpenChange}
            selectedKeys={this.getCurrentMenuSelectedKeys()}
            style={{margin: '16px 0', width: '100%'}}
          >
            {this.getNavMenuItems(this.menus)}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className={styles.right}>
              {/*<NoticeIcon
                className={styles.action}
                count={10}
                onItemClick={(item, tabProps) => {
                  console.log(item, tabProps); // eslint-disable-line
                }}
                onClear={this.handleNoticeClear}
                onPopupVisibleChange={this.handleNoticeVisibleChange}
                loading={fetchingNotices}
                popupAlign={{offset: [20, -16]}}
              >
                <NoticeIcon.Tab
                  list={noticeData['通知']}
                  title="通知"
                  emptyText="你已查看所有通知"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['消息']}
                  title="消息"
                  emptyText="您已读完所有消息"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['待办']}
                  title="待办"
                  emptyText="你已完成所有待办"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                />
              </NoticeIcon>*/}
              {!!currentUser && currentUser.id ? (
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    {currentUser.categoryName }
                    <Divider type="vertical"/>
                    { currentUser.username}
                    <Icon type="down"/>
                  </span>
                </Dropdown>
              ) : <Spin size="small" style={{marginLeft: 8}}/>}
            </div>
          </Header>
          <Content style={{margin: '24px 24px 0', height: '100%'}}>
            <Switch>
              {
                getRouteData('BasicLayout').map(item => {
                    return (
                      <PrivateRoute
                        insert_man={item.insert_man}
                        exact={item.exact}
                        key={item.path}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  }
                )
              }
              <Redirect exact from="/" to="/home"/>
            </Switch>
            <UpdatePsw
              visible={this.state.visible}
              onCancel={this.onCancel.bind(this)}
              dispatch={this.props.dispatch}
            />
            <GlobalFooter
              links={[{
                title: '吴灿龙',
                href: 'http://helloyoucan.com.',
                blankTarget: true,
              }, {
                title: '王泽锴',
                href: '#',
                blankTarget: true,
              }]}
              copyright={
                <div>
                  Copyright <Icon type="copyright"/> 2018 14商业软件1班
                </div>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  login: state.login,
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
}))(BasicLayout);
