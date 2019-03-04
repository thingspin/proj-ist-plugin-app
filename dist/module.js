define(["app/plugins/sdk"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app-config/config.html":
/*!********************************!*\
  !*** ./app-config/config.html ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class='edit-row'>\\r\\n\\t<div class='section gf-form-group'>\\r\\n\\t\\t<h5 class=\\\"section-heading\\\">MQTT</h5>\\r\\n\\t\\t<div class=\\\"gf-form\\\">\\r\\n\\t\\t\\t<span class=\\\"gf-form-label width-8\\\">Topic Base</span>\\r\\n\\t\\t\\t<input type=\\\"text\\\" class=\\\"gf-form-input width-16 ng-valid\\\" ng-model=\\\"ctrl.mqtt.base\\\" placeholder=\\\"{{ctrl.mqtt.base}}\\\" required />\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\\"gf-form\\\">\\r\\n\\t\\t\\t<span class=\\\"gf-form-label width-8\\\">Input Prefix</span>\\r\\n\\t\\t\\t<input type=\\\"text\\\" class=\\\"gf-form-input width-16 ng-valid\\\" ng-model=\\\"ctrl.mqtt.inprefix\\\" placeholder=\\\"{{ctrl.mqtt.inprefix}}\\\" required />\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\\"gf-form\\\">\\r\\n\\t\\t\\t<span class=\\\"gf-form-label width-8\\\">Output Prefix</span>\\r\\n\\t\\t\\t<input type=\\\"text\\\" class=\\\"gf-form-input width-16 ng-valid\\\" ng-model=\\\"ctrl.mqtt.outprefix\\\" placeholder=\\\"{{ctrl.mqtt.outprefix}}\\\" required />\\r\\n\\t\\t</div>\\t\\r\\n\\t</div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./app-config/config.html?");

/***/ }),

/***/ "./app-config/config.ts":
/*!******************************!*\
  !*** ./app-config/config.ts ***!
  \******************************/
/*! exports provided: AppConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AppConfigCtrl\", function() { return AppConfigCtrl; });\n//import appEvents from 'grafana/app/core/app_events';\r\nvar AppConfigCtrl = /** @class */ (function () {\r\n    function AppConfigCtrl($q) {\r\n        this.$q = $q;\r\n        this.mqtt = {\r\n            //brocker: 'localhost:1883',\r\n            base: 'THINGSPIN/IST',\r\n            inprefix: 'IN',\r\n            outprefix: 'OUT',\r\n        };\r\n        this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));\r\n        this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));\r\n    }\r\n    AppConfigCtrl.prototype.preUpdate = function () {\r\n        console.log(\"=====preUpdate!\");\r\n        this.appModel.jsonData = Object.assign({}, this.mqtt, this.appModel.jsonData);\r\n        console.log(this.appModel);\r\n        /*\r\n        let message = {\r\n          title: 'Update Configuration',\r\n          text: 'Do you want to modify to the set value?',\r\n          yesText: \"Update\",\r\n          icon: \"fa-thumbs-o-up\",\r\n          onConfirm: (): void => {\r\n            this.$q.resolve();\r\n          },\r\n        };\r\n        \r\n        appEvents.emit('confirm-modal', message);\r\n    */\r\n        return this.$q.resolve();\r\n    };\r\n    AppConfigCtrl.prototype.postUpdate = function () {\r\n        console.log(\"=====postUpdate!\");\r\n        this.appModel.jsonData = Object.assign({}, this.mqtt, this.appModel.jsonData);\r\n        console.log(this.appModel);\r\n        this.$q.resolve();\r\n    };\r\n    AppConfigCtrl.template = __webpack_require__(/*! ./config.html */ \"./app-config/config.html\");\r\n    return AppConfigCtrl;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./app-config/config.ts?");

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: ConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/plugins/sdk */ \"grafana/app/plugins/sdk\");\n/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-config/config */ \"./app-config/config.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ConfigCtrl\", function() { return _app_config_config__WEBPACK_IMPORTED_MODULE_1__[\"AppConfigCtrl\"]; });\n\n\r\n\r\nvar appId = \"proj-ist-plugin-app\";\r\nObject(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__[\"loadPluginCss\"])({\r\n    dark: \"plugins/\" + appId + \"/css/dark.css\",\r\n    light: \"plugins/\" + appId + \"/css/light.css\"\r\n});\r\n\r\n\n\n//# sourceURL=webpack:///./module.ts?");

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;\n\n//# sourceURL=webpack:///external_%22app/plugins/sdk%22?");

/***/ })

/******/ })});;