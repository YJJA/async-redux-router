'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ROUTER_LOCATION_CHANGE = exports.ROUTER_LOCATION_CHANGE = 'ROUTER_LOCATION_CHANGE';

var routerChange = function routerChange(history, Components) {
  return {
    type: ROUTER_LOCATION_CHANGE,
    history: history,
    Components: Components
  };
};

exports.default = routerChange;