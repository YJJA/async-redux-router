'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 加载路由
var loadRoutes = function loadRoutes(dispatch, location, branch) {
  var promise = branch.map(function (_ref) {
    var match = _ref.match,
        route = _ref.route;

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' && !route.server) {
      return null;
    }
    if (route.component) {
      return route.component;
    }
    return route.asyncComponent();
  });
  return Promise.all(promise).then(function (Components) {
    // 初始化页面数据
    var promise = Components.map(function (Component) {
      // 初始化页面数据，只在服务端进行，客户端不初始化
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' && Component && typeof Component.getInitialProps === 'function') {
        return Component.getInitialProps(dispatch, location);
      }
      return null;
    });
    return Promise.all(promise).then(function () {
      return Components;
    });
  });
};

exports.default = loadRoutes;