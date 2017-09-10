'use strict';

var _emojiIndex = require('./emoji-index');

var _emojiIndex2 = _interopRequireDefault(_emojiIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#emojiIndex', function () {
  describe('search', function () {
    it('should work', function () {
      expect(_emojiIndex2.default.search('pineapple')).toEqual([{
        id: 'pineapple',
        name: 'Pineapple',
        colons: ':pineapple:',
        emoticons: [],
        unified: '1f34d',
        skin: null,
        native: '🍍'
      }]);
    });

    it('should filter only emojis we care about, exclude pineapple', function () {
      var emojisToShowFilter = function emojisToShowFilter(unified) {
        return unified !== '1F34D';
      };
      expect(_emojiIndex2.default.search('apple', { emojisToShowFilter: emojisToShowFilter }).map(function (obj) {
        return obj.id;
      })).not.toContain('pineapple');
    });

    it('can include/exclude categories', function () {
      expect(_emojiIndex2.default.search('flag', { include: ['people'] })).toEqual([]);
    });
  });
});