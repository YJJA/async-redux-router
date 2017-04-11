'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 加载路由
var loadRoutes = function loadRoutes(dispatch, location, branch) {
  var promise = branch.map(function (_ref) {
    var match = _ref.match,
        route = _ref.route;

    if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object' && !route.server) {
      return null;
    }
    if (route.component) {
      return route.component;
    }
    return route.asyncComponent();
  });
  return _promise2.default.all(promise).then(function (Components) {
    // 初始化页面数据
    var promise = Components.map(function (Component) {
      // 初始化页面数据，只在服务端进行，客户端不初始化
      if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object' && Component && typeof Component.getInitialProps === 'function') {
        return Component.getInitialProps(dispatch, location);
      }
      return null;
    });
    return _promise2.default.all(promise).then(function () {
      return Components;
    });
  });
};

exports.default = loadRoutes;