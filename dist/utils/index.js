'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unifiedToNative = exports.deepMerge = exports.intersect = exports.getSanitizedData = exports.getData = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fromCodePoint = require('babel-runtime/core-js/string/from-code-point');

var _fromCodePoint2 = _interopRequireDefault(_fromCodePoint);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _buildSearch = require('./build-search');

var _buildSearch2 = _interopRequireDefault(_buildSearch);

var _data = require('../../data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
var SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];

function unifiedToNative(unified) {
  var unicodes = unified.split('-'),
      codePoints = unicodes.map(function (u) {
    return '0x' + u;
  });

  return _fromCodePoint2.default.apply(String, (0, _toConsumableArray3.default)(codePoints));
}

function sanitize(emoji) {
  var name = emoji.name;
  var short_names = emoji.short_names;
  var skin_tone = emoji.skin_tone;
  var skin_variations = emoji.skin_variations;
  var emoticons = emoji.emoticons;
  var unified = emoji.unified;
  var custom = emoji.custom;
  var imageUrl = emoji.imageUrl;
  var id = emoji.id || short_names[0];
  var colons = ':' + id + ':';

  if (custom) {
    return {
      id: id,
      name: name,
      colons: colons,
      emoticons: emoticons,
      custom: custom,
      imageUrl: imageUrl
    };
  }

  if (skin_tone) {
    colons += ':skin-tone-' + skin_tone + ':';
  }

  return {
    id: id,
    name: name,
    colons: colons,
    emoticons: emoticons,
    unified: unified.toLowerCase(),
    skin: skin_tone || (skin_variations ? 1 : null),
    native: unifiedToNative(unified)
  };
}

function getSanitizedData() {
  return sanitize(getData.apply(undefined, arguments));
}

function getData(emoji, skin, set) {
  var emojiData = {};

  if (typeof emoji == 'string') {
    var matches = emoji.match(COLONS_REGEX);

    if (matches) {
      emoji = matches[1];

      if (matches[2]) {
        skin = parseInt(matches[2]);
      }
    }

    if (_data2.default.short_names.hasOwnProperty(emoji)) {
      emoji = _data2.default.short_names[emoji];
    }

    if (_data2.default.emojis.hasOwnProperty(emoji)) {
      emojiData = _data2.default.emojis[emoji];
    }
  } else if (emoji.custom) {
    emojiData = emoji;

    emojiData.search = (0, _buildSearch2.default)({
      short_names: emoji.short_names,
      name: emoji.name,
      keywords: emoji.keywords,
      emoticons: emoji.emoticons
    });

    emojiData.search = emojiData.search.join(',');
  } else if (emoji.id) {
    if (_data2.default.short_names.hasOwnProperty(emoji.id)) {
      emoji.id = _data2.default.short_names[emoji.id];
    }

    if (_data2.default.emojis.hasOwnProperty(emoji.id)) {
      emojiData = _data2.default.emojis[emoji.id];
      skin || (skin = emoji.skin);
    }
  }

  emojiData.emoticons || (emojiData.emoticons = []);
  emojiData.variations || (emojiData.variations = []);

  if (emojiData.skin_variations && skin > 1 && set) {
    emojiData = JSON.parse((0, _stringify2.default)(emojiData));

    var skinKey = SKINS[skin - 1],
        variationData = emojiData.skin_variations[skinKey];

    if (!variationData.variations && emojiData.variations) {
      delete emojiData.variations;
    }

    if (variationData['has_img_' + set]) {
      emojiData.skin_tone = skin;

      for (var k in variationData) {
        var v = variationData[k];
        emojiData[k] = v;
      }
    }
  }

  if (emojiData.variations && emojiData.variations.length) {
    emojiData = JSON.parse((0, _stringify2.default)(emojiData));
    emojiData.unified = emojiData.variations.shift();
  }

  return emojiData;
}

function intersect(a, b) {
  var aSet = new _set2.default(a),
      bSet = new _set2.default(b),
      intersection = null;

  intersection = new _set2.default([].concat((0, _toConsumableArray3.default)(aSet)).filter(function (x) {
    return bSet.has(x);
  }));

  return (0, _from2.default)(intersection);
}

function deepMerge(a, b) {
  var o = {};

  for (var key in a) {
    var originalValue = a[key],
        value = originalValue;

    if (b.hasOwnProperty(key)) {
      value = b[key];
    }

    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      value = deepMerge(originalValue, value);
    }

    o[key] = value;
  }

  return o;
}

exports.getData = getData;
exports.getSanitizedData = getSanitizedData;
exports.intersect = intersect;
exports.deepMerge = deepMerge;
exports.unifiedToNative = unifiedToNative;