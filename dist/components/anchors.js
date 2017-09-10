'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _svgs = require('../svgs');

var SVGs = _interopRequireWildcard(_svgs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Anchors = function (_React$Component) {
  (0, _inherits3.default)(Anchors, _React$Component);

  function Anchors(props) {
    (0, _classCallCheck3.default)(this, Anchors);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Anchors.__proto__ || (0, _getPrototypeOf2.default)(Anchors)).call(this, props));

    var defaultCategory = null;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(props.categories), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var category = _step.value;

        if (category.first) {
          defaultCategory = category;
          break;
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

    _this.state = {
      selected: defaultCategory.name
    };
    return _this;
  }

  (0, _createClass3.default)(Anchors, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var categories = _props.categories;
      var onAnchorClick = _props.onAnchorClick;
      var color = _props.color;
      var i18n = _props.i18n;
      var selected = this.state.selected;


      return _react2.default.createElement(
        'div',
        { className: 'emoji-mart-anchors' },
        categories.map(function (category, i) {
          var name = category.name;
          var anchor = category.anchor;
          var isSelected = name == selected;
          var SVGElement = SVGs[name];

          if (anchor === false) {
            return null;
          }

          return _react2.default.createElement(
            'span',
            {
              key: name,
              title: i18n.categories[name.toLowerCase()],
              onClick: function onClick() {
                return onAnchorClick(category, i);
              },
              className: 'emoji-mart-anchor ' + (isSelected ? 'emoji-mart-anchor-selected' : ''),
              style: { color: isSelected ? color : null }
            },
            _react2.default.createElement(SVGElement, null),
            _react2.default.createElement('span', { className: 'emoji-mart-anchor-bar', style: { backgroundColor: color } })
          );
        })
      );
    }
  }]);
  return Anchors;
}(_react2.default.Component);

exports.default = Anchors;


Anchors.defaultProps = {
  categories: [],
  onAnchorClick: function onAnchorClick() {}
};