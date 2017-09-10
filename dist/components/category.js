'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _frequently = require('../utils/frequently');

var _frequently2 = _interopRequireDefault(_frequently);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = function (_React$Component) {
  (0, _inherits3.default)(Category, _React$Component);

  function Category() {
    (0, _classCallCheck3.default)(this, Category);
    return (0, _possibleConstructorReturn3.default)(this, (Category.__proto__ || (0, _getPrototypeOf2.default)(Category)).apply(this, arguments));
  }

  (0, _createClass3.default)(Category, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.container = this.refs.container;
      this.label = this.refs.label;
      this.parent = this.container.parentNode;

      this.margin = 0;
      this.minMargin = 0;

      this.memoizeSize();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _props = this.props;
      var name = _props.name;
      var perLine = _props.perLine;
      var native = _props.native;
      var hasStickyPosition = _props.hasStickyPosition;
      var emojis = _props.emojis;
      var emojiProps = _props.emojiProps;
      var skin = emojiProps.skin;
      var size = emojiProps.size;
      var set = emojiProps.set;
      var nextPerLine = nextProps.perLine;
      var nextNative = nextProps.native;
      var nextHasStickyPosition = nextProps.hasStickyPosition;
      var nextEmojis = nextProps.emojis;
      var nextEmojiProps = nextProps.emojiProps;
      var nextSkin = nextEmojiProps.skin;
      var nextSize = nextEmojiProps.size;
      var nextSet = nextEmojiProps.set;
      var shouldUpdate = false;

      if (name == 'Recent' && perLine != nextPerLine) {
        shouldUpdate = true;
      }

      if (name == 'Search') {
        shouldUpdate = !(emojis == nextEmojis);
      }

      if (skin != nextSkin || size != nextSize || native != nextNative || set != nextSet || hasStickyPosition != nextHasStickyPosition) {
        shouldUpdate = true;
      }

      return shouldUpdate;
    }
  }, {
    key: 'memoizeSize',
    value: function memoizeSize() {
      var _container$getBoundin = this.container.getBoundingClientRect();

      var top = _container$getBoundin.top;
      var height = _container$getBoundin.height;

      var _parent$getBoundingCl = this.parent.getBoundingClientRect();

      var parentTop = _parent$getBoundingCl.top;

      var _label$getBoundingCli = this.label.getBoundingClientRect();

      var labelHeight = _label$getBoundingCli.height;


      this.top = top - parentTop + this.parent.scrollTop;

      if (height == 0) {
        this.maxMargin = 0;
      } else {
        this.maxMargin = height - labelHeight;
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(scrollTop) {
      var margin = scrollTop - this.top;
      margin = margin < this.minMargin ? this.minMargin : margin;
      margin = margin > this.maxMargin ? this.maxMargin : margin;

      if (margin == this.margin) return;
      var name = this.props.name;


      if (!this.props.hasStickyPosition) {
        this.label.style.top = margin + 'px';
      }

      this.margin = margin;
      return true;
    }
  }, {
    key: 'getEmojis',
    value: function getEmojis() {
      var _props2 = this.props;
      var name = _props2.name;
      var emojis = _props2.emojis;
      var perLine = _props2.perLine;


      if (name == 'Recent') {
        var custom = this.props.custom;

        var frequentlyUsed = _frequently2.default.get(perLine);

        if (frequentlyUsed.length) {
          emojis = frequentlyUsed.map(function (id) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (0, _getIterator3.default)(custom), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var emoji = _step.value;

                if (emoji.id === id) {
                  return emoji;
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

            return id;
          });
        }
      }

      if (emojis) {
        emojis = emojis.slice(0);
      }

      return emojis;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay(display) {
      var emojis = this.getEmojis();

      if (!emojis) {
        return;
      }

      this.container.style.display = display;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var name = _props3.name;
      var hasStickyPosition = _props3.hasStickyPosition;
      var emojiProps = _props3.emojiProps;
      var i18n = _props3.i18n;
      var emojis = this.getEmojis();
      var labelStyles = {};
      var labelSpanStyles = {};
      var containerStyles = {};

      if (!emojis) {
        containerStyles = {
          display: 'none'
        };
      }

      if (!hasStickyPosition) {
        labelStyles = {
          height: 28
        };

        labelSpanStyles = {
          position: 'absolute'
        };
      }

      return _react2.default.createElement(
        'div',
        { ref: 'container', className: 'emoji-mart-category ' + (emojis && !emojis.length ? 'emoji-mart-no-results' : ''), style: containerStyles },
        _react2.default.createElement(
          'div',
          { style: labelStyles, 'data-name': name, className: 'emoji-mart-category-label' },
          _react2.default.createElement(
            'span',
            { style: labelSpanStyles, ref: 'label' },
            i18n.categories[name.toLowerCase()]
          )
        ),
        emojis && emojis.map(function (emoji) {
          return (0, _.Emoji)((0, _extends3.default)({
            emoji: emoji
          }, emojiProps));
        }),
        emojis && !emojis.length && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            (0, _.Emoji)((0, _extends3.default)({}, emojiProps, {
              size: 38,
              emoji: 'sleuth_or_spy',
              onOver: null,
              onLeave: null,
              onClick: null
            }))
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-no-results-label' },
            i18n.notfound
          )
        )
      );
    }
  }]);
  return Category;
}(_react2.default.Component);

exports.default = Category;


Category.defaultProps = {
  emojis: [],
  hasStickyPosition: true
};