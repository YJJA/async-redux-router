'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadRoutes = require('./loadRoutes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

var _matchRoutes = require('./matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _routerActions = require('./routerActions');

var _routerActions2 = _interopRequireDefault(_routerActions);

var _querystring = require('./querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unlisten = null;

// 加载页面
var loadContainer = function loadContainer(store, history, routes) {
  // 匹配路由
  var branch = (0, _matchRoutes2.default)(routes, history.location.pathname);

  // 重定向判断
  var redirect = getRedirect(branch);

  // 判断权限
  if (!redirect) {
    var state = store.getState();
    redirect = authorization(state, branch);
    if (redirect) {
      redirect = _querystring2.default.mergeUrl(redirect, { form: history.location.pathname });
    }
  }

  // 是否重定向
  if (redirect) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('\u6CA1\u6709\u6743\u9650\u8BBF\u95EE\u8BE5\u8DEF\u7531\uFF0C\u91CD\u5B9A\u5411\u5230\uFF1A' + redirect);
    }
    // 如果是服务端渲染
    if (typeof window === 'undefined') {
      return Promise.resolve(redirect);
    }

    // 客户端渲染
    history.replace(redirect);
    // console.log(qs.parse(history.location.search.substr(1)))
    return loadContainer(store, history, routes);
  }

  // 监听路由
  if (!unlisten) {
    unlisten = history.listen(function () {
      return loadContainer(store, history, routes);
    });
  }

  // 加载组件
  var dispatch = function dispatch(action) {
    return store.dispatch(action);
  };
  return (0, _loadRoutes2.default)(dispatch, history.location, branch).then(function (Components) {
    store.dispatch((0, _routerActions2.default)(history, Components));
  });
};

exports.default = loadContainer;

// 判断权限

function authorization(state, branch) {
  for (var i = 0; i < branch.length; i++) {
    var route = branch[i].route;
    if (typeof route.auth === 'function') {
      return route.auth(state);
    }
  }
}

// 重定向
function getRedirect(branch) {
  for (var i = 0; i < branch.length; i++) {
    var route = branch[i].route;
    if (typeof route.redirect === 'string') {
      return route.redirect;
    }
  }
}