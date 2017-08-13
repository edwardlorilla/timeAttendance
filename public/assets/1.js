webpackJsonp([1],{

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(131),
  /* template */
  __webpack_require__(132),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\resources\\assets\\js\\components\\Visitors\\create.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] create.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0cea3e0c", Component.options)
  } else {
    hotAPI.reload("data-v-0cea3e0c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            textData: 'Add Visitor',
            urlData: '../api/visitors',
            nameData: {
                name: '',
                category_id: 3,
                year: ''

            }
        };
    },
    mounted: function mounted() {
        document.title = 'Create ' + this.textData;
    }
});

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8 col-md-offset-2"
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._v("Create " + _vm._s(_vm.textData))]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0cea3e0c", module.exports)
  }
}

/***/ })

});