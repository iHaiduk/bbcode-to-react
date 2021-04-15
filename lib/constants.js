"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COSMETIC_RE = exports.COSMETIC_DICT = exports.URL_RE = exports.ESCAPE_DICT = exports.ESCAPE_RE = exports.START_NEWLINE_RE = exports.TOKEN_RE = exports.SPACE_RE = exports.LINE_BREAK = exports.NEWLINE_RE = void 0;
var NEWLINE_RE = /\r?\n/g;
exports.NEWLINE_RE = NEWLINE_RE;
var LINE_BREAK = '<br />';
exports.LINE_BREAK = LINE_BREAK;
var SPACE_RE = /^\s*$/;
exports.SPACE_RE = SPACE_RE;
var TOKEN_RE = /(\[\/?.+?\])/;
exports.TOKEN_RE = TOKEN_RE;
var START_NEWLINE_RE = /^\r?\n/;
exports.START_NEWLINE_RE = START_NEWLINE_RE;
var ESCAPE_RE = /[&<>"]/g;
exports.ESCAPE_RE = ESCAPE_RE;
var ESCAPE_DICT = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
exports.ESCAPE_DICT = ESCAPE_DICT;
var URL_RE = /\b((?:([\w-]+):(\/{1,3})|www[.])(?:(?:(?:[^\s&()]|&amp;|&quot;)*(?:[^!"#$%&'()*+,.:;<=>?@\[\]^`{|}~\s]))|(?:\((?:[^\s&()]|&amp;|&quot;)*\)))+)/g;
exports.URL_RE = URL_RE;
var COSMETIC_DICT = {
  '--': '&ndash;',
  '---': '&mdash;',
  '...': '&#8230;',
  '(c)': '&copy;',
  '(reg)': '&reg;',
  '(tm)': '&trade;'
};
exports.COSMETIC_DICT = COSMETIC_DICT;
var COSMETIC_RE = /--|---|\.\.\.|\(c\)|\(reg\)|\(tm\)/;
exports.COSMETIC_RE = COSMETIC_RE;