'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var loadRoutes = function loadRoutes(store, location, query, branch) {
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
    // Initializing Components data
    var promise = Components.map(function (Component) {
      if (Component && typeof Component.dispatchInitialAction === 'function') {
        return Component.dispatchInitialAction({ store: store, location: location, query: query });
      }
      return null;
    });

    var promiseAll = Promise.all(promise);
    if (typeof window === 'undefined') {
      return promiseAll.then(function () {
        return Components;
      });
    } else {
      promiseAll.catch(function (err) {
        return console.log(err);
      });
      return Components;
    }
  });
};

exports.default = loadRoutes;