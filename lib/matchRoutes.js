'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matchPath = require('./matchPath');

var matchRoutes = function matchRoutes(routes, pathname) {
  var branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  routes.some(function (route) {
    var match = route.path ? (0, _matchPath.matchPath)(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
    : (0, _matchPath.computeMatch)(pathname); // use default "root" match

    if (match) {
      branch.push({ route: route, match: match });
      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });

  return branch;
};

exports.default = matchRoutes;