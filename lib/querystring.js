'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;
exports.stringify = stringify;
exports.merge = merge;
exports.mergeUrl = mergeUrl;

// parse querystring
function parse(str) {
  if (!str || typeof str !== 'string') {
    return {};
  }
  return str.split('&').reduce(function (obj, item) {
    var key = void 0,
        value = void 0;
    if (~item.indexOf('=')) {
      var _item$split = item.split('=');

      var _item$split2 = _slicedToArray(_item$split, 2);

      key = _item$split2[0];
      value = _item$split2[1];
    } else if (item) {
      key = item;
      value = true;
    }
    if (typeof obj[key] !== 'undefined') {
      obj[key] = [].concat(obj[key], decodeURIComponent(value));
    } else {
      obj[key] = decodeURIComponent(value);
    }
    return obj;
  }, {});
}

// stringify
function stringify(obj) {
  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    return '';
  }
  return Object.keys(obj).map(function (key) {
    if (_typeof(obj[key]) !== 'object') {
      return key + '=' + encodeURIComponent(obj[key]);
    } else {
      return obj[key].map(function (value) {
        return key + '=' + encodeURIComponent(value);
      }).join('&');
    }
  }).join('&');
}

// merge queryString
function merge(str, opts) {
  var query = parse(str);
  var query2 = typeof opts === 'string' ? parse(opts) : opts;
  return stringify(_extends({}, query, query2));
}

// merge query
function mergeUrl(url, opts) {
  var _url$split = url.split('?'),
      _url$split2 = _slicedToArray(_url$split, 2),
      pathname = _url$split2[0],
      _url$split2$ = _url$split2[1],
      query = _url$split2$ === undefined ? '' : _url$split2$;

  return pathname + '?' + merge(query, opts);
}

exports.default = {
  parse: parse,
  stringify: stringify,
  merge: merge,
  mergeUrl: mergeUrl
};