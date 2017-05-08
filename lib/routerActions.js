'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ROUTER_LOCATION_CHANGE = exports.ROUTER_LOCATION_CHANGE = '@ASYNC-REDUX-ROUTER/CHANGE';

var routerChange = function routerChange(history, Components, match) {
  return {
    type: ROUTER_LOCATION_CHANGE,
    history: history,
    Components: Components,
    match: match
  };
};

exports.default = routerChange;