(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reference"],{

/***/ "DbGD":
/*!***************************************************************************************!*\
  !*** ./packages/@rm-frontend/reference/source/2-molecules/reference/ReferenceItem.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ReferenceItem; });\n/* harmony import */ var _rm_frontend_base_source_0_base_1_tools_js_linkedArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-frontend/base/source/0-base/1-tools/js/linkedArea */ \"sGy1\");\n/* harmony import */ var _rm_frontend_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rm-frontend/core */ \"9igf\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar ReferenceItem = /*#__PURE__*/function (_Component) {\n  _inherits(ReferenceItem, _Component);\n\n  var _super = _createSuper(ReferenceItem);\n\n  function ReferenceItem(element) {\n    var _this;\n\n    _classCallCheck(this, ReferenceItem);\n\n    _this = _super.call(this, element);\n    var link = element.querySelector('a');\n\n    if (link) {\n      element.classList.add('js-linked');\n      Object(_rm_frontend_base_source_0_base_1_tools_js_linkedArea__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, link);\n    }\n\n    return _this;\n  }\n\n  return ReferenceItem;\n}(_rm_frontend_core__WEBPACK_IMPORTED_MODULE_1__[\"Component\"]);\n\n_defineProperty(ReferenceItem, \"identifier\", 'reference.item');\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGJHRC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhY2thZ2VzL0BybS1mcm9udGVuZC9yZWZlcmVuY2Uvc291cmNlLzItbW9sZWN1bGVzL3JlZmVyZW5jZS9SZWZlcmVuY2VJdGVtLmpzPzBkYjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxpbmtlZEFyZWEgZnJvbSAnQHJtLWZyb250ZW5kL2Jhc2Uvc291cmNlLzAtYmFzZS8xLXRvb2xzL2pzL2xpbmtlZEFyZWEnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHJtLWZyb250ZW5kL2NvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWZlcmVuY2VJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGlkZW50aWZpZXIgPSAncmVmZXJlbmNlLml0ZW0nO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIGNvbnN0IGxpbmsgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblxuICAgIGlmIChsaW5rKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2pzLWxpbmtlZCcpO1xuICAgICAgbGlua2VkQXJlYShlbGVtZW50LCBsaW5rKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBR0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVNBO0FBQ0E7O0FBYkE7QUFDQTtBQURBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///DbGD\n");

/***/ }),

/***/ "mpmv":
/*!*************************************************************!*\
  !*** ./packages/@rm-frontend/reference/source/reference.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rm_frontend_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-frontend/core */ \"9igf\");\n/* harmony import */ var _2_molecules_reference_ReferenceItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./2-molecules/reference/ReferenceItem */ \"DbGD\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nObject(_rm_frontend_core__WEBPACK_IMPORTED_MODULE_0__[\"registerModule\"])(_defineProperty({}, _2_molecules_reference_ReferenceItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"].identifier, _2_molecules_reference_ReferenceItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"]));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXBtdi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhY2thZ2VzL0BybS1mcm9udGVuZC9yZWZlcmVuY2Uvc291cmNlL3JlZmVyZW5jZS5qcz85YTk5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZ2lzdGVyTW9kdWxlIH0gZnJvbSAnQHJtLWZyb250ZW5kL2NvcmUnO1xuXG5pbXBvcnQgUmVmZXJlbmNlSXRlbSBmcm9tICcuLzItbW9sZWN1bGVzL3JlZmVyZW5jZS9SZWZlcmVuY2VJdGVtJztcblxucmVnaXN0ZXJNb2R1bGUoe1xuICBbUmVmZXJlbmNlSXRlbS5pZGVudGlmaWVyXTogUmVmZXJlbmNlSXRlbSxcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBRUE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///mpmv\n");

/***/ })

},[["mpmv","shared"]]]);