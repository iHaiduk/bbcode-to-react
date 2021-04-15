"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tag = /*#__PURE__*/function () {
  function Tag(renderer) {
    var _this = this;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tag);

    this.renderer = renderer;
    this.CLOSED_BY = [];
    this.SELF_CLOSE = false;
    this.STRIP_INNER = false;
    this.STRIP_OUTER = false;
    this.DISCARD_TEXT = false;
    this.name = settings.name || null;
    this.parent = settings.parent || null;
    this.text = settings.text || '';
    this.params = {};
    this.children = [];

    if (this.parent) {
      this.parent.children.push(this);
    }

    settings.params = settings.params || [];
    settings.params.forEach(function (item) {
      if (item.length > 1 && item[1]) {
        _this.params[item[0]] = item[1];
      }
    });
  }

  _createClass(Tag, [{
    key: "getComponents",
    value: function getComponents() {
      var _this2 = this;

      var components = [];

      if (this.text && this.text.length) {
        // todo linkify and emotion
        components.push(this.text);
      }

      this.children.forEach(function (child) {
        if (!(_this2.DISCARD_TEXT && child.name === null)) {
          var childComponents = child.toReact();
          components.push(childComponents);
        }
      });
      return _react["default"].Children.toArray(components);
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this3 = this;

      var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pieces = [];
      var text;
      var content;

      if (this.text && this.text.length) {
        text = this.renderer.escape(this.text);

        if (!raw) {
          if (this.renderer.options.linkify) {
            text = this.renderer.linkify(text);
          }

          text = this.renderer.cosmeticReplace(text.replace(_constants.NEWLINE_RE, _constants.LINE_BREAK));
        }

        pieces.push(text);
      }

      this.children.forEach(function (child) {
        if (raw) {
          pieces.push(child.toText());
        } else {
          if (!(_this3.DISCARD_TEXT && child.name === null)) {
            var childPieces = child.toHTML();

            if (typeof childPieces === 'string') {
              pieces.push(childPieces);
            } else {
              pieces.push.apply(pieces, _toConsumableArray(childPieces));
            }
          }
        }
      });
      content = pieces.join('');

      if (!raw && this.STRIP_INNER) {
        content = this.renderer.strip(content);

        while (content.slice(0, _constants.LINE_BREAK.length) === _constants.LINE_BREAK) {
          content = content.slice(_constants.LINE_BREAK.length);
        }

        while (content.slice(-_constants.LINE_BREAK.length) === _constants.LINE_BREAK) {
          content = content.slice(0, -_constants.LINE_BREAK.length);
        }

        content = this.renderer.strip(content);
      }

      return content;
    }
  }, {
    key: "toText",
    value: function toText() {
      var _this4 = this;

      var contentAsHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pieces = [];

      if (this.name !== null) {
        if (this.params.length) {
          var params = Object.keys(this.params).map(function (k) {
            return "".concat(k, "=").concat(_this4.params[k]);
          }).join(' ');

          if (this.params[this.name]) {
            pieces.push("[".concat(params, "]"));
          } else {
            pieces.push("[".concat(this.name, " ").concat(params, "]"));
          }
        } else {
          pieces.push("[".concat(this.name, "]"));
        }
      }

      pieces.push(this.getContent(!contentAsHTML));

      if (this.name !== null && this.CLOSED_BY.indexOf(this.name) === -1) {
        pieces.push("[/".concat(this.name, "]"));
      }

      return pieces.join('');
    }
  }, {
    key: "toHTML",
    value: function toHTML() {
      var pieces = this.toText(true);
      return typeof pieces === 'string' ? pieces : pieces.join('');
    }
  }, {
    key: "toReact",
    value: function toReact() {
      return _react["default"].Children.toArray(this.getComponents());
    }
  }]);

  return Tag;
}();

exports["default"] = Tag;