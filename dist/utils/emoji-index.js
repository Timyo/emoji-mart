'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _data = require('../../data');

var _data2 = _interopRequireDefault(_data);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extend = require('util')._extend;

var index = {};
var emojisList = {};
var emoticonsList = {};
var previousInclude = [];
var previousExclude = [];

for (var emoji in _data2.default.emojis) {
  var emojiData = _data2.default.emojis[emoji];
  var short_names = emojiData.short_names;
  var emoticons = emojiData.emoticons;
  var id = short_names[0];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(emoticons || []), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var emoticon = _step.value;

      if (!emoticonsList[emoticon]) {
        emoticonsList[emoticon] = id;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  emojisList[id] = (0, _.getSanitizedData)(id);
}

function search(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var emojisToShowFilter = _ref.emojisToShowFilter;
  var maxResults = _ref.maxResults;
  var include = _ref.include;
  var exclude = _ref.exclude;
  var _ref$custom = _ref.custom;
  var custom = _ref$custom === undefined ? [] : _ref$custom;

  maxResults || (maxResults = 75);
  include || (include = []);
  exclude || (exclude = []);

  if (custom.length) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(custom), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _emoji = _step2.value;

        _data2.default.emojis[_emoji.id] = (0, _.getData)(_emoji);
        emojisList[_emoji.id] = (0, _.getSanitizedData)(_emoji);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    _data2.default.categories.push({
      name: 'Custom',
      emojis: custom.map(function (emoji) {
        return emoji.id;
      })
    });
  }

  var results = null,
      pool = _data2.default.emojis;

  if (value.length) {
    if (value == '-' || value == '-1') {
      return [emojisList['-1']];
    }

    var values = value.toLowerCase().split(/[\s|,|\-|_]+/),
        allResults = [];

    if (values.length > 2) {
      values = [values[0], values[1]];
    }

    if (include.length || exclude.length) {
      pool = {};

      if (previousInclude != include.sort().join(',') || previousExclude != exclude.sort().join(',')) {
        previousInclude = include.sort().join(',');
        previousExclude = exclude.sort().join(',');
        index = {};
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(_data2.default.categories), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var category = _step3.value;

          var isIncluded = include && include.length ? include.indexOf(category.name.toLowerCase()) > -1 : true;
          var isExcluded = exclude && exclude.length ? exclude.indexOf(category.name.toLowerCase()) > -1 : false;
          if (!isIncluded || isExcluded) {
            continue;
          }

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = (0, _getIterator3.default)(category.emojis), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var emojiId = _step4.value;

              pool[emojiId] = _data2.default.emojis[emojiId];
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    } else if (previousInclude.length || previousExclude.length) {
      index = {};
    }

    allResults = values.map(function (value) {
      var aPool = pool,
          aIndex = index,
          length = 0;

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, _getIterator3.default)(value.split('')), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var char = _step5.value;

          length++;

          aIndex[char] || (aIndex[char] = {});
          aIndex = aIndex[char];

          if (!aIndex.results) {
            (function () {
              var scores = {};

              aIndex.results = [];
              aIndex.pool = {};

              for (var id in aPool) {
                var _emoji2 = aPool[id];
                var _search = _emoji2.search;
                var sub = value.substr(0, length);
                var subIndex = _search.indexOf(sub);

                if (subIndex != -1) {
                  var score = subIndex + 1;
                  if (sub == id) score = 0;

                  aIndex.results.push(emojisList[id]);
                  aIndex.pool[id] = _emoji2;

                  scores[id] = score;
                }
              }

              aIndex.results.sort(function (a, b) {
                var aScore = scores[a.id],
                    bScore = scores[b.id];

                return aScore - bScore;
              });
            })();
          }

          aPool = aIndex.pool;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return aIndex.results;
    }).filter(function (a) {
      return a;
    });

    if (allResults.length > 1) {
      results = _.intersect.apply(undefined, (0, _toConsumableArray3.default)(allResults));
    } else if (allResults.length) {
      results = allResults[0];
    } else {
      results = [];
    }
  }

  if (results) {
    if (emojisToShowFilter) {
      results = results.filter(function (result) {
        return emojisToShowFilter(_data2.default.emojis[result.id].unified);
      });
    }

    if (results && results.length > maxResults) {
      results = results.slice(0, maxResults);
    }
  }

  return results;
}

exports.default = { search: search, emojis: emojisList, emoticons: emoticonsList };