'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSearch = function (_Component) {
    _inherits(MultiSearch, _Component);

    function MultiSearch(props, context) {
        _classCallCheck(this, MultiSearch);

        var _this = _possibleConstructorReturn(this, (MultiSearch.__proto__ || Object.getPrototypeOf(MultiSearch)).call(this, props, context));

        console.log(props.data);
        _this.state = {
            hinText: props.hinText,
            maxResult: props.maxResult,
            inputData: props.data,
            data: _this.dataDicider(props.data, props.converter),
            selectedItem: [],
            selectedItemConvereted: [],
            maxItems: props.maxItems,
            onItemChange: props.onItemChange
        };
        _this.handleItemChange = _this.handleItemChange.bind(_this);
        return _this;
    }

    _createClass(MultiSearch, [{
        key: 'dataDicider',
        value: function dataDicider(data, converter) {
            if (_typeof(data[0]) === "object") {
                console.log("this is an object list");
                return this.mangedData(data, converter);
            } else {
                return data;
            }
        }
    }, {
        key: 'mangedData',
        value: function mangedData(data, converter) {
            var convertedData = [];
            for (var d in data) {
                convertedData.push(converter(data[d]));
            }
            return convertedData;
        }
    }, {
        key: 'handleItemChange',
        value: function handleItemChange(value, index) {
            var _this2 = this;

            var item = this.state.inputData[index];
            if (this.state.selectedItem.length < this.state.maxItems) {
                if (!this.checkInList(this.state.selectedItem, item)) {
                    this.setState(function (prevState) {
                        var newItems = prevState.selectedItem;
                        var convertedItem = prevState.selectedItemConvereted;
                        newItems.push(item);
                        convertedItem.push(_this2.state.data[index]);
                        return { selectedItem: newItems, selectedItemConvereted: convertedItem };
                    });
                }
            }
            this.state.onItemChange(this.state.selectedItem);
        }
    }, {
        key: 'checkInList',
        value: function checkInList(selectedItem, item) {
            for (var i = 0; i < selectedItem.length; i++) {
                if ((0, _deepEqual2.default)(item, selectedItem[i])) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'handleListClick',
        value: function handleListClick(index) {
            var _this3 = this;

            console.log(index);
            this.setState(function (prevState) {
                return { selectedItem: _this3.removeElmentAt(prevState.selectedItem, index), selectedItemConvereted: _this3.removeElmentAt(prevState.selectedItemConvereted, index) };
            });
        }
    }, {
        key: 'removeElmentAt',
        value: function removeElmentAt(arr, index) {
            var len = arr.length;
            var newArr = [];
            for (var i = 0; i < len; i++) {
                if (i !== index) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'column' } },
                this.state.selectedItemConvereted.map(function (item, index) {
                    return _react2.default.createElement(_RaisedButton2.default, { key: index, style: { margin: 5 }, secondary: true, label: item, onTouchTap: _this4.handleListClick.bind(_this4, index) });
                }),
                _react2.default.createElement(_AutoComplete2.default, {
                    floatingLabelText: this.state.hinText,
                    filter: _AutoComplete2.default.caseInsensitiveFilter,
                    dataSource: this.state.data,
                    maxSearchResults: this.state.maxResult,
                    onNewRequest: this.handleItemChange,
                    fullWidth: true

                })
            );
        }
    }]);

    return MultiSearch;
}(_react.Component);

MultiSearch.defaultProps = {
    data: [],
    maxItems: 5,
    onItemChange: function onItemChange() {}

};

exports.default = MultiSearch;