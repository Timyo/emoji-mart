'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('../vendor/raf-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _measureScrollbar = require('measure-scrollbar');

var _measureScrollbar2 = _interopRequireDefault(_measureScrollbar);

var _data = require('../../data');

var _data2 = _interopRequireDefault(_data);

var _store = require('../utils/store');

var _store2 = _interopRequireDefault(_store);

var _frequently = require('../utils/frequently');

var _frequently2 = _interopRequireDefault(_frequently);

var _utils = require('../utils');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RECENT_CATEGORY = { name: 'Recent', emojis: null };
var SEARCH_CATEGORY = { name: 'Search', emojis: null, anchor: false };
var CUSTOM_CATEGORY = { name: 'Custom', emojis: [] };

var I18N = {
  search: 'Search',
  notfound: 'No Emoji Found',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  }
};

var Picker = function (_React$Component) {
  (0, _inherits3.default)(Picker, _React$Component);

  function Picker(props) {
    (0, _classCallCheck3.default)(this, Picker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Picker.__proto__ || (0, _getPrototypeOf2.default)(Picker)).call(this, props));

    _this.i18n = (0, _utils.deepMerge)(I18N, props.i18n);
    _this.state = {
      skin: _store2.default.get('skin') || props.skin,
      firstRender: true
    };

    _this.categories = [];
    var allCategories = [].concat(_data2.default.categories);

    if (props.custom.length > 0) {
      CUSTOM_CATEGORY.emojis = props.custom.map(function (emoji) {
        return (0, _extends3.default)({}, emoji, {
          // `<Category />` expects emoji to have an `id`.
          id: emoji.short_names[0],
          custom: true
        });
      });

      allCategories.push(CUSTOM_CATEGORY);
    }

    _this.hideRecent = true;

    if (props.include != undefined) {
      _data2.default.categories.sort(function (a, b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();

        if (props.include.indexOf(aName) > props.include.indexOf(bName)) {
          return 1;
        }

        return 0;
      });
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(allCategories), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var category = _step.value;

        var isIncluded = props.include && props.include.length ? props.include.indexOf(category.name.toLowerCase()) > -1 : true;
        var isExcluded = props.exclude && props.exclude.length ? props.exclude.indexOf(category.name.toLowerCase()) > -1 : false;
        if (!isIncluded || isExcluded) {
          continue;
        }

        if (props.emojisToShowFilter) {
          var newEmojis = [];

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(category.emojis), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var emoji = _step2.value;

              if (props.emojisToShowFilter(_data2.default.emojis[emoji] || emoji)) {
                newEmojis.push(emoji);
              }
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

          if (newEmojis.length) {
            var newCategory = {
              emojis: newEmojis,
              name: category.name
            };

            _this.categories.push(newCategory);
          }
        } else {
          _this.categories.push(category);
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

    var includeRecent = props.include && props.include.length ? props.include.indexOf('recent') > -1 : true;
    var excludeRecent = props.exclude && props.exclude.length ? props.exclude.indexOf('recent') > -1 : false;
    if (includeRecent && !excludeRecent) {
      _this.hideRecent = false;
      _this.categories.unshift(RECENT_CATEGORY);
    }

    if (_this.categories[0]) {
      _this.categories[0].first = true;
    }

    _this.categories.unshift(SEARCH_CATEGORY);
    return _this;
  }

  (0, _createClass3.default)(Picker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.skin && !_store2.default.get('skin')) {
        this.setState({ skin: props.skin });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.firstRender) {
        this.testStickyPosition();
        this.firstRenderTimeout = setTimeout(function () {
          _this2.setState({ firstRender: false });
        }, 60);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateCategoriesSize();
      this.handleScroll();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      SEARCH_CATEGORY.emojis = null;

      clearTimeout(this.leaveTimeout);
      clearTimeout(this.firstRenderTimeout);
    }
  }, {
    key: 'testStickyPosition',
    value: function testStickyPosition() {
      var stickyTestElement = document.createElement('div');
      var _arr = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
      for (var _i = 0; _i < _arr.length; _i++) {
        var prefix = _arr[_i];
        stickyTestElement.style.position = prefix + 'sticky';
      }

      this.hasStickyPosition = !!stickyTestElement.style.position.length;
    }
  }, {
    key: 'handleEmojiOver',
    value: function handleEmojiOver(emoji) {
      var preview = this.refs.preview;
      // Use Array.prototype.find() when it is more widely supported.

      var emojiData = CUSTOM_CATEGORY.emojis.filter(function (customEmoji) {
        return customEmoji.id === emoji.id;
      })[0];
      preview.setState({ emoji: (0, _assign2.default)(emoji, emojiData) });
      clearTimeout(this.leaveTimeout);
    }
  }, {
    key: 'handleEmojiLeave',
    value: function handleEmojiLeave(emoji) {
      var _this3 = this;

      this.leaveTimeout = setTimeout(function () {
        var preview = _this3.refs.preview;

        preview.setState({ emoji: null });
      }, 16);
    }
  }, {
    key: 'handleEmojiClick',
    value: function handleEmojiClick(emoji, e) {
      var _this4 = this;

      this.props.onClick(emoji, e);
      if (!this.hideRecent) _frequently2.default.add(emoji);

      var component = this.refs['category-1'];
      if (component) {
        var maxMargin = component.maxMargin;
        component.forceUpdate();

        window.requestAnimationFrame(function () {
          component.memoizeSize();
          if (maxMargin == component.maxMargin) return;

          _this4.updateCategoriesSize();
          _this4.handleScrollPaint();

          if (SEARCH_CATEGORY.emojis) {
            component.updateDisplay('none');
          }
        });
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (!this.waitingForPaint) {
        this.waitingForPaint = true;
        window.requestAnimationFrame(this.handleScrollPaint.bind(this));
      }
    }
  }, {
    key: 'handleScrollPaint',
    value: function handleScrollPaint() {
      this.waitingForPaint = false;

      if (!this.refs.scroll) {
        return;
      }

      var activeCategory = null;

      if (SEARCH_CATEGORY.emojis) {
        activeCategory = SEARCH_CATEGORY;
      } else {
        var target = this.refs.scroll,
            scrollTop = target.scrollTop,
            scrollingDown = scrollTop > (this.scrollTop || 0),
            minTop = 0;

        for (var i = 0, l = this.categories.length; i < l; i++) {
          var ii = scrollingDown ? this.categories.length - 1 - i : i,
              category = this.categories[ii],
              component = this.refs['category-' + ii];

          if (component) {
            var active = component.handleScroll(scrollTop);

            if (!minTop || component.top < minTop) {
              if (component.top > 0) {
                minTop = component.top;
              }
            }

            if (active && !activeCategory) {
              activeCategory = category;
            }
          }
        }

        if (scrollTop < minTop) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(this.categories), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _category = _step3.value;

              if (_category.anchor === false) {
                continue;
              }

              activeCategory = _category;
              break;
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
        } else if (scrollTop + this.clientHeight >= this.scrollHeight) {
          activeCategory = this.categories[this.categories.length - 1];
        }
      }

      if (activeCategory) {
        var anchors = this.refs.anchors;
        var _activeCategory = activeCategory;
        var categoryName = _activeCategory.name;


        if (anchors.state.selected != categoryName) {
          anchors.setState({ selected: categoryName });
        }
      }

      this.scrollTop = scrollTop;
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(emojis) {
      SEARCH_CATEGORY.emojis = emojis;

      for (var i = 0, l = this.categories.length; i < l; i++) {
        var component = this.refs['category-' + i];

        if (component && component.props.name != 'Search') {
          var display = emojis ? 'none' : 'inherit';
          component.updateDisplay(display);
        }
      }

      this.forceUpdate();
      this.refs.scroll.scrollTop = 0;
      this.handleScroll();
    }
  }, {
    key: 'handleAnchorClick',
    value: function handleAnchorClick(category, i) {
      var component = this.refs['category-' + i];
      var _refs = this.refs;
      var scroll = _refs.scroll;
      var anchors = _refs.anchors;
      var scrollToComponent = null;

      scrollToComponent = function scrollToComponent() {
        if (component) {
          var top = component.top;


          if (category.first) {
            top = 0;
          } else {
            top += 1;
          }

          scroll.scrollTop = top;
        }
      };

      if (SEARCH_CATEGORY.emojis) {
        this.handleSearch(null);
        this.refs.search.clear();

        window.requestAnimationFrame(scrollToComponent);
      } else {
        scrollToComponent();
      }
    }
  }, {
    key: 'handleSkinChange',
    value: function handleSkinChange(skin) {
      var newState = { skin: skin };

      this.setState(newState);
      _store2.default.update(newState);
    }
  }, {
    key: 'updateCategoriesSize',
    value: function updateCategoriesSize() {
      for (var i = 0, l = this.categories.length; i < l; i++) {
        var component = this.refs['category-' + i];
        if (component) component.memoizeSize();
      }

      if (this.refs.scroll) {
        var target = this.refs.scroll;
        this.scrollHeight = target.scrollHeight;
        this.clientHeight = target.clientHeight;
      }
    }
  }, {
    key: 'getCategories',
    value: function getCategories() {
      return this.state.firstRender ? this.categories.slice(0, 3) : this.categories;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props;
      var perLine = _props.perLine;
      var emojiSize = _props.emojiSize;
      var set = _props.set;
      var sheetSize = _props.sheetSize;
      var style = _props.style;
      var title = _props.title;
      var emoji = _props.emoji;
      var color = _props.color;
      var native = _props.native;
      var backgroundImageFn = _props.backgroundImageFn;
      var emojisToShowFilter = _props.emojisToShowFilter;
      var include = _props.include;
      var exclude = _props.exclude;
      var autoFocus = _props.autoFocus;
      var previewEmojiSize = _props.previewEmojiSize;
      var skin = this.state.skin;
      var width = perLine * (emojiSize + 12) + 12 + 2 + (0, _measureScrollbar2.default)();

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({ width: width }, style), className: 'emoji-mart' },
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-bar' },
          _react2.default.createElement(_.Anchors, {
            ref: 'anchors',
            i18n: this.i18n,
            color: color,
            categories: this.categories,
            onAnchorClick: this.handleAnchorClick.bind(this)
          })
        ),
        _react2.default.createElement(_.Search, {
          ref: 'search',
          onSearch: this.handleSearch.bind(this),
          i18n: this.i18n,
          emojisToShowFilter: emojisToShowFilter,
          include: include,
          exclude: exclude,
          custom: CUSTOM_CATEGORY.emojis,
          autoFocus: autoFocus
        }),
        _react2.default.createElement(
          'div',
          { ref: 'scroll', className: 'emoji-mart-scroll', onScroll: this.handleScroll.bind(this) },
          this.getCategories().map(function (category, i) {
            return _react2.default.createElement(_.Category, {
              ref: 'category-' + i,
              key: category.name,
              name: category.name,
              emojis: category.emojis,
              perLine: perLine,
              native: native,
              hasStickyPosition: _this5.hasStickyPosition,
              i18n: _this5.i18n,
              custom: category.name == 'Recent' ? CUSTOM_CATEGORY.emojis : undefined,
              emojiProps: {
                native: native,
                skin: skin,
                size: emojiSize,
                set: set,
                sheetSize: sheetSize,
                forceSize: native,
                backgroundImageFn: backgroundImageFn,
                onOver: _this5.handleEmojiOver.bind(_this5),
                onLeave: _this5.handleEmojiLeave.bind(_this5),
                onClick: _this5.handleEmojiClick.bind(_this5)
              }
            });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-bar' },
          _react2.default.createElement(_.Preview, {
            ref: 'preview',
            title: title,
            emoji: emoji,
            emojiProps: {
              native: native,
              size: { previewEmojiSize: previewEmojiSize },
              skin: skin,
              set: set,
              sheetSize: sheetSize,
              backgroundImageFn: backgroundImageFn
            },
            skinsProps: {
              skin: skin,
              onChange: this.handleSkinChange.bind(this)
            }
          })
        )
      );
    }
  }]);
  return Picker;
}(_react2.default.Component);

exports.default = Picker;


Picker.defaultProps = {
  onClick: function onClick() {},
  emojiSize: 24,
  previewEmojiSize: 38,
  perLine: 9,
  i18n: {},
  style: {},
  title: 'Emoji Mart™',
  emoji: 'department_store',
  color: '#ae65c5',
  set: _.Emoji.defaultProps.set,
  skin: _.Emoji.defaultProps.skin,
  native: _.Emoji.defaultProps.native,
  sheetSize: _.Emoji.defaultProps.sheetSize,
  backgroundImageFn: _.Emoji.defaultProps.backgroundImageFn,
  emojisToShowFilter: null,
  autoFocus: false,
  custom: []
};