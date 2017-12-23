'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _tabs = require('antd/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _class, _temp2;

require('antd/lib/breadcrumb/style/css');

require('antd/lib/tabs/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var styles = {
  'pageHeader': 'antd-pro-page-header-pageHeader',
  'detail': 'antd-pro-page-header-detail',
  'row': 'antd-pro-page-header-row',
  'breadcrumb': 'antd-pro-page-header-breadcrumb',
  'tabs': 'antd-pro-page-header-tabs',
  'ant-tabs-bar': 'antd-pro-page-header-ant-tabs-bar',
  'logo': 'antd-pro-page-header-logo',
  'title': 'antd-pro-page-header-title',
  'action': 'antd-pro-page-header-action',
  'ant-btn-group': 'antd-pro-page-header-ant-btn-group',
  'ant-btn': 'antd-pro-page-header-ant-btn',
  'content': 'antd-pro-page-header-content',
  'extraContent': 'antd-pro-page-header-extraContent',
  'main': 'antd-pro-page-header-main'
};
var TabPane = _tabs2.default.TabPane;


function getBreadcrumbNameWithParams(breadcrumbNameMap, url) {
  var name = '';
  Object.keys(breadcrumbNameMap).forEach(function (item) {
    var itemRegExpStr = '^' + item.replace(/:[\w-]+/g, '[\\w-]+') + '$';
    var itemRegExp = new RegExp(itemRegExpStr);
    if (itemRegExp.test(url)) {
      name = breadcrumbNameMap[item];
    }
  });
  return name;
}

var PageHeader = (_temp2 = _class = function (_PureComponent) {
  _inherits(PageHeader, _PureComponent);

  function PageHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PageHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (key) {
      if (_this.props.onTabChange) {
        _this.props.onTabChange(key);
      }
    }, _this.getBreadcrumbProps = function () {
      return {
        routes: _this.props.routes || _this.context.routes,
        params: _this.props.params || _this.context.params,
        location: _this.props.location || _this.context.location,
        breadcrumbNameMap: _this.props.breadcrumbNameMap || _this.context.breadcrumbNameMap
      };
    }, _this.itemRender = function (route, params, routes, paths) {
      var _this$props$linkEleme = _this.props.linkElement,
        linkElement = _this$props$linkEleme === undefined ? 'a' : _this$props$linkEleme;
      var last = routes.indexOf(route) === routes.length - 1;
      return last || !route.component ? _react2.default.createElement(
        'span',
        null,
        route.breadcrumbName
      ) : (0, _react.createElement)(linkElement, {
        href: paths.join('/') || '/',
        to: paths.join('/') || '/'
      }, route.breadcrumbName);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PageHeader, [{
    key: 'render',
    value: function render() {
      var _getBreadcrumbProps = this.getBreadcrumbProps(),
        routes = _getBreadcrumbProps.routes,
        params = _getBreadcrumbProps.params,
        location = _getBreadcrumbProps.location,
        breadcrumbNameMap = _getBreadcrumbProps.breadcrumbNameMap;

      var _props = this.props,
        title = _props.title,
        logo = _props.logo,
        action = _props.action,
        content = _props.content,
        extraContent = _props.extraContent,
        breadcrumbList = _props.breadcrumbList,
        tabList = _props.tabList,
        className = _props.className,
        _props$linkElement = _props.linkElement,
        linkElement = _props$linkElement === undefined ? 'a' : _props$linkElement;

      var clsString = (0, _classnames2.default)(styles.pageHeader, className);
      var breadcrumb = void 0;
      if (routes && params) {
        breadcrumb = _react2.default.createElement(_breadcrumb2.default, {
          className: styles.breadcrumb,
          routes: routes.filter(function (route) {
            return route.breadcrumbName;
          }),
          params: params,
          itemRender: this.itemRender
        });
      } else if (location && location.pathname) {
        var pathSnippets = location.pathname.split('/').filter(function (i) {
          return i;
        });
        var extraBreadcrumbItems = pathSnippets.map(function (_, index) {
          var url = '/' + pathSnippets.slice(0, index + 1).join('/');
          return _react2.default.createElement(
            _breadcrumb2.default.Item,
            {key: url},
            // (0, _react.createElement)(index === pathSnippets.length - 1 ? 'span' : linkElement, _defineProperty({}, linkElement === 'a' ? 'href' : 'to', url), breadcrumbNameMap[url] || breadcrumbNameMap[url.replace('/', '')] || getBreadcrumbNameWithParams(breadcrumbNameMap, url) || url)
            (0, _react.createElement)(pathSnippets.length? 'span' : linkElement, _defineProperty({}, linkElement === 'a' ? 'href' : 'to', url), breadcrumbNameMap[url] || breadcrumbNameMap[url.replace('/', '')] || getBreadcrumbNameWithParams(breadcrumbNameMap, url) || url)
          );
        });

        var breadcrumbItems = [_react2.default.createElement(
          _breadcrumb2.default.Item,
          {key: 'home'},
          (0, _react.createElement)(linkElement, _defineProperty({}, linkElement === 'a' ? 'href' : 'to', '/'), '首页')
        )].concat(extraBreadcrumbItems);

        breadcrumb = _react2.default.createElement(
          _breadcrumb2.default,
          {className: styles.breadcrumb},
          extraBreadcrumbItems
          // breadcrumbItems
        );
      } else if (breadcrumbList && breadcrumbList.length) {
        breadcrumb = _react2.default.createElement(
          _breadcrumb2.default,
          {className: styles.breadcrumb},
          breadcrumbList.map(function (item) {
            return _react2.default.createElement(
              _breadcrumb2.default.Item,
              {key: item.title},
              item.href ? (0, _react.createElement)(linkElement, _defineProperty({}, linkElement === 'a' ? 'href' : 'to', item.href), item.title) : item.title
            );
          })
        );
      } else {
        breadcrumb = null;
      }

      var tabDefaultValue = tabList && (tabList.filter(function (item) {
          return item.default;
        })[0] || tabList[0]);

      return _react2.default.createElement(
        'div',
        {className: clsString},
        breadcrumb,
        _react2.default.createElement(
          'div',
          {className: styles.detail},
          logo && _react2.default.createElement(
            'div',
            {className: styles.logo},
            logo
          ),
          _react2.default.createElement(
            'div',
            {className: styles.main},
            _react2.default.createElement(
              'div',
              {className: styles.row},
              title && _react2.default.createElement(
                'h1',
                {className: styles.title},
                title
              ),
              action && _react2.default.createElement(
                'div',
                {className: styles.action},
                action
              )
            ),
            _react2.default.createElement(
              'div',
              {className: styles.row},
              content && _react2.default.createElement(
                'div',
                {className: styles.content},
                content
              ),
              extraContent && _react2.default.createElement(
                'div',
                {className: styles.extraContent},
                extraContent
              )
            )
          )
        ),
        tabList && tabList.length && _react2.default.createElement(
          _tabs2.default,
          {
            className: styles.tabs,
            defaultActiveKey: tabDefaultValue && tabDefaultValue.key,
            onChange: this.onChange
          },
          tabList.map(function (item) {
            return _react2.default.createElement(TabPane, {tab: item.tab, key: item.key});
          })
        )
      );
    }
  }]);

  return PageHeader;
}(_react.PureComponent), _class.contextTypes = {
  routes: _propTypes2.default.array,
  params: _propTypes2.default.object,
  location: _propTypes2.default.object,
  breadcrumbNameMap: _propTypes2.default.object
}, _temp2);
exports.default = PageHeader;
module.exports = exports['default'];

