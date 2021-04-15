"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderer = /*#__PURE__*/function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);

    this.options = Object.assign({
      linkify: false
    }, options);
    this.contexts = [];
  }

  _createClass(Renderer, [{
    key: "context",
    value: function context(_context, func) {
      var newOptions = Object.assign({}, this.options, _context);
      this.contexts.push(this.options);
      this.options = newOptions;
      var v = func();
      this.options = this.contexts.pop();
      return v;
    }
  }, {
    key: "escape",
    value: function escape(value) {
      // Escapes a string so it is valid within XML or XHTML
      return value.replace(_constants.ESCAPE_RE, function (match) {
        return _constants.ESCAPE_DICT[match];
      });
    }
  }, {
    key: "linkify",
    value: function linkify(value) {
      return value.replace(_constants.URL_RE, function () {
        var url = arguments.length <= 1 ? undefined : arguments[1];
        var proto = arguments.length <= 2 ? undefined : arguments[2];

        if (proto && ['http', 'https'].indexOf(proto) === -1) {
          return url; // bad protocol, no linkify
        }

        var href = proto ? url : "http://".concat(url);
        return "<a href=\"".concat(href, "\" target=\"_blank\">").concat(url, "</a>");
      });
    }
  }, {
    key: "strip",
    value: function strip(text) {
      return text.replace(/^\s+|\s+$/g, '');
    }
  }, {
    key: "cosmeticReplace",
    value: function cosmeticReplace(value) {
      return value.replace(_constants.COSMETIC_RE, function () {
        var item = arguments.length <= 0 ? undefined : arguments[0];
        return _constants.COSMETIC_DICT[item] || item;
      });
    }
  }, {
    key: "htmlAttributes",
    value: function htmlAttributes(attributes) {
      if (!attributes) {
        return '';
      }

      return Object.keys(attributes).map(function (k) {
        return "".concat(k, "=\"").concat(attributes[k], "\"");
      }).join(' ');
    }
  }]);

  return Renderer;
}();

exports["default"] = Renderer;