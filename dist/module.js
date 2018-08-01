define(["app/core/core_module","app/plugins/sdk"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_core_module__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__) { return /******/ (function(modules) { // webpackBootstrap
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

module.exports = "<div class=\"page-header\">\r\n\tHello Config Page\r\n</div>";

/***/ }),

/***/ "./app-config/config.ts":
/*!******************************!*\
  !*** ./app-config/config.ts ***!
  \******************************/
/*! exports provided: AppConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigCtrl", function() { return AppConfigCtrl; });
var AppConfigCtrl = /** @class */ (function () {
    function AppConfigCtrl($q) {
        this.$q = $q;
        this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
        this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
    }
    AppConfigCtrl.prototype.preUpdate = function () {
        return this.$q.resolve();
    };
    AppConfigCtrl.prototype.postUpdate = function () {
        return this.$q.resolve();
    };
    AppConfigCtrl.template = __webpack_require__(/*! ./config.html */ "./app-config/config.html");
    return AppConfigCtrl;
}());
// AppConfigCtrl.templateURL = './pages/config.html';



/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: ConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_projEdgeAiSrv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/projEdgeAiSrv */ "./services/projEdgeAiSrv.ts");
/* harmony import */ var _app_config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-config/config */ "./app-config/config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _app_config_config__WEBPACK_IMPORTED_MODULE_2__["AppConfigCtrl"]; });


// register Remote Solution Services


var appId = "proj-edge-ai-app";
var baseCssFilename = "proj-edge-ai-app";
Object(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__["loadPluginCss"])({
    dark: "plugins/" + appId + "/css/" + baseCssFilename + ".dark.css",
    light: "plugins/" + appId + "/css/" + baseCssFilename + ".light.css"
});



/***/ }),

/***/ "./services/projEdgeAiSrv.ts":
/*!***********************************!*\
  !*** ./services/projEdgeAiSrv.ts ***!
  \***********************************/
/*! exports provided: ProjEdgeAiAppSrvCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjEdgeAiAppSrvCtrl", function() { return ProjEdgeAiAppSrvCtrl; });
/* harmony import */ var grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grafana/app/core/core_module */ "grafana/app/core/core_module");
/* harmony import */ var grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_0__);

var ProjEdgeAiAppSrvCtrl = /** @class */ (function () {
    function ProjEdgeAiAppSrvCtrl() {
    }
    return ProjEdgeAiAppSrvCtrl;
}());

grafana_app_core_core_module__WEBPACK_IMPORTED_MODULE_0___default.a.service('projEdgeAiSrv', ProjEdgeAiAppSrvCtrl);


/***/ }),

/***/ "grafana/app/core/core_module":
/*!***************************************!*\
  !*** external "app/core/core_module" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_core_module__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map