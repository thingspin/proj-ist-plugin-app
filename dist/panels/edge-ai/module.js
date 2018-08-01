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
/******/ 	return __webpack_require__(__webpack_require__.s = "./panels/edge-ai/module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./panels/edge-ai/module.ts":
/*!**********************************!*\
  !*** ./panels/edge-ai/module.ts ***!
  \**********************************/
/*! exports provided: PanelCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PanelCtrl\", function() { return ProjEdgeAiPanelCtrl; });\n/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/plugins/sdk */ \"grafana/app/plugins/sdk\");\n/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar appId = \"proj-edge-ai-app\";\nvar baseCssFilename = \"proj-edge-ai-app\";\nObject(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__[\"loadPluginCss\"])({\n    dark: \"plugins/\" + appId + \"/css/\" + baseCssFilename + \".dark.css\",\n    light: \"plugins/\" + appId + \"/css/\" + baseCssFilename + \".light.css\"\n});\nvar ProjEdgeAiPanelCtrl = /** @class */ (function (_super) {\n    __extends(ProjEdgeAiPanelCtrl, _super);\n    function ProjEdgeAiPanelCtrl($scope, $injector, $element) {\n        var _this = _super.call(this, $scope, $injector) || this;\n        _this.$element = $element;\n        _this.divID = \"app-edge-ai-panel\";\n        _this.events.on('panel-initialized', _this.onInitialized.bind(_this));\n        _this.events.on('data-received', _this.onDataReceived.bind(_this));\n        return _this;\n    }\n    Object.defineProperty(ProjEdgeAiPanelCtrl.prototype, \"container\", {\n        get: function () { return this._container; },\n        set: function (container) { this._container = container; },\n        enumerable: true,\n        configurable: true\n    });\n    ProjEdgeAiPanelCtrl.prototype.onInitialized = function () {\n        var node = this.$element.find(\"ng-transclude > div\");\n        if (node.length === 0) {\n            console.error(\"cannot find element id '#\" + this.divID + \"'\");\n            return;\n        }\n        this.container = node;\n    };\n    ProjEdgeAiPanelCtrl.prototype.onDataReceived = function (dataList) {\n        console.log(dataList);\n    };\n    ProjEdgeAiPanelCtrl.template = __webpack_require__(/*! ./partial/template.html */ \"./panels/edge-ai/partial/template.html\");\n    return ProjEdgeAiPanelCtrl;\n}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__[\"MetricsPanelCtrl\"]));\n\n\n\n//# sourceURL=webpack:///./panels/edge-ai/module.ts?");

/***/ }),

/***/ "./panels/edge-ai/partial/template.html":
/*!**********************************************!*\
  !*** ./panels/edge-ai/partial/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div id=\\\"{{ctrl.divID}}\\\" class=\\\"app-edge-ai-panel\\\">\\n    Hello Edge AI\\n</div>\\n\";\n\n//# sourceURL=webpack:///./panels/edge-ai/partial/template.html?");

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