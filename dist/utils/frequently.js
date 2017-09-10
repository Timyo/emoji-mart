'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = ['+1', 'grinning', 'kissing_heart', 'heart_eyes', 'laughing', 'stuck_out_tongue_winking_eye', 'sweat_smile', 'joy', 'scream', 'disappointed', 'unamused', 'weary', 'sob', 'sunglasses', 'heart', 'poop'];

var frequently = _store2.default.get('frequently');
var defaults = {};

function add(emoji) {
  var id = emoji.id;


  frequently || (frequently = defaults);
  frequently[id] || (frequently[id] = 0);
  frequently[id] += 1;

  _store2.default.set('last', id);
  _store2.default.set('frequently', frequently);
}

function get(perLine) {
  if (!frequently) {
    defaults = {};

    // Use Array.prototype.fill() when it is more widely supported.
    return [].concat((0, _toConsumableArray3.default)(Array(perLine))).map(function (_, i) {
      defaults[DEFAULTS[i]] = perLine - i;
      return DEFAULTS[i];
    });
  }

  var quantity = perLine * 4,
      sorted = (0, _keys2.default)(frequently).sort(function (a, b) {
    return frequently[a] - frequently[b];
  }).reverse(),
      sliced = sorted.slice(0, quantity),
      last = _store2.default.get('last');

  if (last && sliced.indexOf(last) == -1) {
    sliced.pop();
    sliced.push(last);
  }

  return sliced;
}

exports.default = { add: add, get: get };