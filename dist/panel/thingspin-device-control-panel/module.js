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
/******/ 	return __webpack_require__(__webpack_require__.s = "./panel/thingspin-device-control-panel/module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./panel/thingspin-device-control-panel/module.ts":
/*!********************************************************!*\
  !*** ./panel/thingspin-device-control-panel/module.ts ***!
  \********************************************************/
/*! exports provided: PanelCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PanelCtrl\", function() { return ThingspinDeviceControlPanelCtrl; });\n/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/plugins/sdk */ \"grafana/app/plugins/sdk\");\n/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__);\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar ThingspinDeviceControlPanelCtrl = /** @class */ (function (_super) {\r\n    __extends(ThingspinDeviceControlPanelCtrl, _super);\r\n    function ThingspinDeviceControlPanelCtrl($scope, $injector, $location, mqttSrv, backendSrv) {\r\n        var _this = _super.call(this, $scope, $injector) || this;\r\n        _this.appInfo = __webpack_require__(/*! ../../plugin.json */ \"./plugin.json\");\r\n        _this.backendSrv = backendSrv;\r\n        _this.location = $location;\r\n        _this.mqttInfo = {\r\n            //brocker: 'localhost:1883',\r\n            base: 'THINGSPIN/IST',\r\n            topic: '',\r\n            inprefix: 'IN',\r\n            outprefix: 'OUT',\r\n            routes: _this.appInfo[\"routes\"][0]\r\n        };\r\n        _this.mqttSrv = mqttSrv;\r\n        _this.baseUrl = \"ws://\" + _this.location.host() + \":\" + _this.location.port() + \"/api/plugin-proxy/\" + _this.appInfo[\"id\"] + _this.mqttInfo.routes[\"path\"];\r\n        // get mqtt info from the parent app\r\n        _this.backendSrv.get(\"api/plugins/\" + _this.appInfo[\"id\"] + \"/settings\").then(function (result) {\r\n            if (result.hasOwnProperty('jsonData')) {\r\n                _this.mqttInfo.base = result['jsonData']['base'];\r\n                //this.mqttInfo.brocker = result['jsonData']['brocker'];\r\n                _this.mqttInfo.inprefix = result['jsonData']['inprefix'];\r\n                _this.mqttInfo.outprefix = result['jsonData']['outprefix'];\r\n                _this.baseUrl = \"ws://\" + _this.location.host() + \":\" + _this.location.port() + \"/api/plugin-proxy/\" + _this.appInfo[\"id\"] + _this.mqttInfo.routes[\"path\"];\r\n            }\r\n        });\r\n        _this.mqttSrv.connect(_this.baseUrl);\r\n        _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));\r\n        _this.events.on('render', _this.onRender.bind(_this));\r\n        _this.events.on('panel-initialized', _this.onRender.bind(_this));\r\n        _this.events.on('data-received', _this.onDataReceived.bind(_this));\r\n        return _this;\r\n    }\r\n    ThingspinDeviceControlPanelCtrl.prototype.OnInitialized = function () {\r\n    };\r\n    ThingspinDeviceControlPanelCtrl.prototype.onClicked = function (flag) {\r\n        console.log(\"mqtt start : \" + flag);\r\n        var topic;\r\n        if (this.mqttInfo.topic == \"\") {\r\n            topic = this.mqttInfo.base + \"/\" + this.mqttInfo.outprefix;\r\n        }\r\n        else {\r\n            topic = this.mqttInfo.base + \"/\" + this.mqttInfo.topic + \"/\" + this.mqttInfo.outprefix;\r\n        }\r\n        var data = {\r\n            \"flag\": flag\r\n        };\r\n        this.mqttSrv.publishMessage(topic, JSON.stringify(data), {\r\n            qos: 0,\r\n            retain: true,\r\n            dup: false,\r\n        });\r\n    };\r\n    ThingspinDeviceControlPanelCtrl.prototype.onInitEditMode = function () {\r\n        this.addEditorTab('Options', \"public/plugins/\" + this.appInfo[\"id\"] + \"/panel/thingspin-device-control-panel/options.html\", 2);\r\n    };\r\n    ThingspinDeviceControlPanelCtrl.prototype.onDataReceived = function (dataList) {\r\n    };\r\n    ThingspinDeviceControlPanelCtrl.prototype.onRender = function () {\r\n    };\r\n    ThingspinDeviceControlPanelCtrl.prototype.link = function (scope, elem, attrs, ctrl) {\r\n    };\r\n    ThingspinDeviceControlPanelCtrl.template = __webpack_require__(/*! ./templet.html */ \"./panel/thingspin-device-control-panel/templet.html\");\r\n    return ThingspinDeviceControlPanelCtrl;\r\n}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__[\"MetricsPanelCtrl\"]));\r\n\r\n\n\n//# sourceURL=webpack:///./panel/thingspin-device-control-panel/module.ts?");

/***/ }),

/***/ "./panel/thingspin-device-control-panel/templet.html":
/*!***********************************************************!*\
  !*** ./panel/thingspin-device-control-panel/templet.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"example-button-row\\\">\\r\\n        <button ng-style=\\\"{'background-color':'blue','background-size':'100% 100%'}\\\" ng-click=\\\"ctrl.onClicked(1)\\\">Start</button>\\r\\n        <button ng-style=\\\"{'background-color':'red','background-size':'100% 100%'}\\\" ng-click=\\\"ctrl.onClicked(0)\\\">Stop</button>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./panel/thingspin-device-control-panel/templet.html?");

/***/ }),

/***/ "./plugin.json":
/*!*********************!*\
  !*** ./plugin.json ***!
  \*********************/
/*! exports provided: type, name, id, info, HideFromList, includes, routes, dependencies, default */
/***/ (function(module) {

eval("module.exports = {\"type\":\"app\",\"name\":\"소포제\",\"id\":\"proj-ist-plugin-app\",\"info\":{\"description\":\"ThingSPIN ist\",\"author\":{\"name\":\"daseul@hancommds.com\",\"url\":\"http://thingspin.io\"},\"keywords\":[\"thingspin app\"],\"logos\":{\"small\":\"img/M03.jpg\",\"large\":\"img/M03.jpg\"},\"links\":[{\"name\":\"Project site\",\"url\":\"\"},{\"name\":\"License & Terms\",\"url\":\"\"}],\"version\":\"1.0.2\",\"updated\":\"2018-01-19\"},\"HideFromList\":false,\"includes\":[{\"type\":\"menu\",\"name\":\"소포제\",\"mainMenu\":true,\"slug\":\"saengsan-gyehoeg\",\"img\":\"img/M03.jpg\",\"menuId\":0},{\"type\":\"dashboard\",\"name\":\"모니터링\",\"path\":\"dashboards/ist-01.json\",\"AddToNav\":true,\"menuID\":0,\"ico\":\"fa fa-industry\"},{\"type\":\"dashboard\",\"name\":\"제어\",\"path\":\"dashboards/ist-02.json\",\"AddToNav\":true,\"menuID\":0,\"ico\":\"fa fa-industry\"}],\"routes\":[{\"path\":\"/mqtt\",\"method\":\"*\",\"url\":\"ws://localhost:1884\",\"reqSignedIn\":false}],\"dependencies\":{\"grafanaVersion\":\"4.x.x 5.x.x\",\"plugins\":[]}};\n\n//# sourceURL=webpack:///./plugin.json?");

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