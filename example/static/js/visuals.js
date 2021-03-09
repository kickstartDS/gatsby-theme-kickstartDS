(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["visuals"],{

/***/ "axc8":
/*!***************************************************************************!*\
  !*** ./packages/@rm-frontend/visuals/source/2-molecules/visual/Visual.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Visual; });\n/* harmony import */ var _rm_frontend_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-frontend/core */ \"9igf\");\n/* harmony import */ var _rm_frontend_base_source_0_base_2_generic_window_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rm-frontend/base/source/0-base/2-generic/window/window */ \"sfUa\");\n/* harmony import */ var objectFitPolyfill_dist_objectFitPolyfill_basic_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! objectFitPolyfill/dist/objectFitPolyfill.basic.min */ \"I6/X\");\n/* harmony import */ var objectFitPolyfill_dist_objectFitPolyfill_basic_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(objectFitPolyfill_dist_objectFitPolyfill_basic_min__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar Visual = /*#__PURE__*/function (_Component) {\n  _inherits(Visual, _Component);\n\n  var _super = _createSuper(Visual);\n\n  function Visual(element) {\n    var _this;\n\n    _classCallCheck(this, Visual);\n\n    _this = _super.call(this, element);\n    _this.continueBtn = element.querySelector('.visual__continue-btn');\n\n    if (_this.continueBtn) {\n      _this.continueBtn.addEventListener('click', _assertThisInitialized(_this));\n    }\n\n    _this.video = element.querySelector('.visual__video');\n\n    if (_this.video) {\n      // prevent multiple scroll listeners\n      if (!_this.scrollToken) {\n        _this.scrollToken = window.rm.radio.on(_rm_frontend_base_source_0_base_2_generic_window_window__WEBPACK_IMPORTED_MODULE_1__[\"events\"].scroll, function () {\n          return _this.playVideo();\n        });\n      }\n\n      _this.videoIsPlaying = false;\n\n      _this.playVideo();\n    }\n\n    return _this;\n  }\n\n  _createClass(Visual, [{\n    key: \"onclick\",\n    value: function onclick() {\n      // TODO: handle multiple intro-visuals\n      // this was the first approach,\n      // but additionally the scrolling header-height has to be substracted:\n      // const rect = this.element.getBoundingClientRect();\n      // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n      // const height = this.element.offsetHeight;\n      // window.scrollTo(0, rect.top + scrollTop + height /* - scolling heder height */);\n      if (this.element.nextElementSibling) {\n        this.element.nextElementSibling.scrollIntoView();\n      } else {\n        this.element.parentNode.nextElementSibling.scrollIntoView();\n      }\n    }\n  }, {\n    key: \"playVideo\",\n    value: function playVideo() {\n      if (this.isScrolledOutOfView) {\n        if (this.videoIsPlaying) {\n          this.video.pause();\n          this.videoIsPlaying = false;\n        }\n      } else if (!this.videoIsPlaying) {\n        this.video.play();\n        this.videoIsPlaying = true;\n      }\n    }\n  }, {\n    key: \"isScrolledOutOfView\",\n    get: function get() {\n      var docViewTop = window.pageYOffset;\n      var elemBottom = this.element.offsetHeight;\n      return docViewTop > elemBottom;\n    }\n  }]);\n\n  return Visual;\n}(_rm_frontend_core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n_defineProperty(Visual, \"identifier\", 'visual');\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhjOC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhY2thZ2VzL0BybS1mcm9udGVuZC92aXN1YWxzL3NvdXJjZS8yLW1vbGVjdWxlcy92aXN1YWwvVmlzdWFsLmpzPzZiMTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHJtLWZyb250ZW5kL2NvcmUnO1xuaW1wb3J0IHsgZXZlbnRzIGFzIHdpbmRvd0V2ZW50cyB9IGZyb20gJ0BybS1mcm9udGVuZC9iYXNlL3NvdXJjZS8wLWJhc2UvMi1nZW5lcmljL3dpbmRvdy93aW5kb3cnO1xuaW1wb3J0ICdvYmplY3RGaXRQb2x5ZmlsbC9kaXN0L29iamVjdEZpdFBvbHlmaWxsLmJhc2ljLm1pbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpc3VhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBpZGVudGlmaWVyID0gJ3Zpc3VhbCc7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5jb250aW51ZUJ0biA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpc3VhbF9fY29udGludWUtYnRuJyk7XG4gICAgaWYgKHRoaXMuY29udGludWVCdG4pIHtcbiAgICAgIHRoaXMuY29udGludWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlzdWFsX192aWRlbycpO1xuICAgIGlmICh0aGlzLnZpZGVvKSB7XG4gICAgICAvLyBwcmV2ZW50IG11bHRpcGxlIHNjcm9sbCBsaXN0ZW5lcnNcbiAgICAgIGlmICghdGhpcy5zY3JvbGxUb2tlbikge1xuICAgICAgICB0aGlzLnNjcm9sbFRva2VuID0gd2luZG93LnJtLnJhZGlvLm9uKHdpbmRvd0V2ZW50cy5zY3JvbGwsICgpID0+IHRoaXMucGxheVZpZGVvKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy52aWRlb0lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5wbGF5VmlkZW8oKTtcbiAgICB9XG4gIH1cblxuICBvbmNsaWNrKCkge1xuICAgIC8vIFRPRE86IGhhbmRsZSBtdWx0aXBsZSBpbnRyby12aXN1YWxzXG4gICAgLy8gdGhpcyB3YXMgdGhlIGZpcnN0IGFwcHJvYWNoLFxuICAgIC8vIGJ1dCBhZGRpdGlvbmFsbHkgdGhlIHNjcm9sbGluZyBoZWFkZXItaGVpZ2h0IGhhcyB0byBiZSBzdWJzdHJhY3RlZDpcbiAgICAvLyBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIC8vIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gd2luZG93LnNjcm9sbFRvKDAsIHJlY3QudG9wICsgc2Nyb2xsVG9wICsgaGVpZ2h0IC8qIC0gc2NvbGxpbmcgaGVkZXIgaGVpZ2h0ICovKTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLm5leHRFbGVtZW50U2libGluZy5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIHBsYXlWaWRlbygpIHtcbiAgICBpZiAodGhpcy5pc1Njcm9sbGVkT3V0T2ZWaWV3KSB7XG4gICAgICBpZiAodGhpcy52aWRlb0lzUGxheWluZykge1xuICAgICAgICB0aGlzLnZpZGVvLnBhdXNlKCk7XG4gICAgICAgIHRoaXMudmlkZW9Jc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnZpZGVvSXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLnZpZGVvLnBsYXkoKTtcbiAgICAgIHRoaXMudmlkZW9Jc1BsYXlpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc1Njcm9sbGVkT3V0T2ZWaWV3KCkge1xuICAgIGNvbnN0IGRvY1ZpZXdUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgY29uc3QgZWxlbUJvdHRvbSA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICByZXR1cm4gKGRvY1ZpZXdUb3AgPiBlbGVtQm90dG9tKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQWpCQTtBQWlCQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7O0FBdkRBO0FBQ0E7QUFEQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///axc8\n");

/***/ }),

/***/ "tIWK":
/*!*********************************************************!*\
  !*** ./packages/@rm-frontend/visuals/source/visuals.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rm_frontend_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-frontend/core */ \"9igf\");\n/* harmony import */ var _2_molecules_visual_Visual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./2-molecules/visual/Visual */ \"axc8\");\n/* eslint-disable import/newline-after-import, import/first */\n\nvar components = {};\n\ncomponents[_2_molecules_visual_Visual__WEBPACK_IMPORTED_MODULE_1__[\"default\"].identifier] = _2_molecules_visual_Visual__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\nObject(_rm_frontend_core__WEBPACK_IMPORTED_MODULE_0__[\"registerModule\"])(components);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidElXSy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhY2thZ2VzL0BybS1mcm9udGVuZC92aXN1YWxzL3NvdXJjZS92aXN1YWxzLmpzP2I0ODUiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25ld2xpbmUtYWZ0ZXItaW1wb3J0LCBpbXBvcnQvZmlyc3QgKi9cbmltcG9ydCB7IHJlZ2lzdGVyTW9kdWxlIH0gZnJvbSAnQHJtLWZyb250ZW5kL2NvcmUnO1xuXG5jb25zdCBjb21wb25lbnRzID0ge307XG5cbmltcG9ydCBWaXN1YWwgZnJvbSAnLi8yLW1vbGVjdWxlcy92aXN1YWwvVmlzdWFsJztcbmNvbXBvbmVudHNbVmlzdWFsLmlkZW50aWZpZXJdID0gVmlzdWFsO1xuXG5yZWdpc3Rlck1vZHVsZShjb21wb25lbnRzKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///tIWK\n");

/***/ })

},[["tIWK","shared"]]]);