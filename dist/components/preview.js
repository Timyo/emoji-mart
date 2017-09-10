'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('.');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Preview = function (_React$Component) {
  (0, _inherits3.default)(Preview, _React$Component);

  function Preview(props) {
    (0, _classCallCheck3.default)(this, Preview);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Preview.__proto__ || (0, _getPrototypeOf2.default)(Preview)).call(this, props));

    _this.state = { emoji: null };
    return _this;
  }

  (0, _createClass3.default)(Preview, [{
    key: 'render',
    value: function render() {
      var emoji = this.state.emoji;
      var _props = this.props;
      var emojiProps = _props.emojiProps;
      var skinsProps = _props.skinsProps;
      var title = _props.title;
      var idleEmoji = _props.emoji;


      if (emoji) {
        var emojiData = (0, _utils.getData)(emoji);
        var emoticons = emojiData.emoticons;
        var knownEmoticons = [];
        var listedEmoticons = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(emoticons), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var emoticon = _step.value;

            if (knownEmoticons.indexOf(emoticon.toLowerCase()) == -1) {
              knownEmoticons.push(emoticon.toLowerCase());
              listedEmoticons.push(emoticon);
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

        return _react2.default.createElement(
          'div',
          { className: 'emoji-mart-preview' },
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-emoji' },
            (0, _.Emoji)((0, _extends3.default)({
              key: emoji.id,
              emoji: emoji
            }, emojiProps))
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-data' },
            _react2.default.createElement(
              'span',
              { className: 'emoji-mart-title-label' },
              title
            ),
            _react2.default.createElement(
              'div',
              { className: 'emoji-mart-preview-shortnames' },
              emojiData.short_names.map(function (short_name) {
                return _react2.default.createElement(
                  'span',
                  { key: short_name, className: 'emoji-mart-preview-shortname' },
                  ':',
                  short_name,
                  ':'
                );
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'emoji-mart-preview-emoticons' },
              listedEmoticons.map(function (emoticon) {
                return _react2.default.createElement(
                  'span',
                  { key: emoticon, className: 'emoji-mart-preview-emoticon' },
                  emoticon
                );
              })
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'emoji-mart-preview' },
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-emoji' },
            idleEmoji && idleEmoji.length && (0, _.Emoji)((0, _extends3.default)({
              emoji: idleEmoji
            }, emojiProps))
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-data' },
            _react2.default.createElement(
              'span',
              { className: 'emoji-mart-title-label' },
              title
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-preview-skins' },
            _react2.default.createElement(_.Skins, skinsProps)
          )
        );
      }
    }
  }]);
  return Preview;
}(_react2.default.Component);

exports.default = Preview;