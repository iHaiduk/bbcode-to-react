"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tag = _interopRequireDefault(require("../tag"));

var _simple = _interopRequireDefault(require("./simple"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  b: (0, _simple["default"])('strong'),
  i: (0, _simple["default"])('em'),
  u: (0, _simple["default"])('u'),
  s: (0, _simple["default"])('strike')
};
exports["default"] = _default;