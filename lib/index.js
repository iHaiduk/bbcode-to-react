"use strict";

var _parser = _interopRequireDefault(require("./parser"));

var _tag = _interopRequireDefault(require("./tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// export default new Parser();
// export {
//   Parser,
//   Tag
// };
module.exports = new _parser["default"]();
module.exports.Parser = _parser["default"];
module.exports.Tag = _tag["default"];