webpackJsonp([0],{

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(137),
  /* template */
  __webpack_require__(139),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\resources\\assets\\js\\components\\TimeLog\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bf35ae00", Component.options)
  } else {
    hotAPI.reload("data-v-bf35ae00", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qs__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Visitors_state__ = __webpack_require__(17);
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
//
//
//



var d = new Date();
var now = d.getTime();
var TIME = d.toLocaleTimeString();
var DATE = d.toLocaleDateString();

var people = [{
    name: 'egoist',
    birth: now - 60000
}, {
    name: 'chelly',
    birth: now - 60000 * 22
}, {
    name: 'aimer',
    birth: now - 60000 * 102
}, {
    name: 'young boy',
    birth: now - 1000
}, {
    name: 'old man',
    birth: new Date('2014-01-01')
}];
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {

        return {
            data: __WEBPACK_IMPORTED_MODULE_1__Visitors_state__["a" /* data */],
            selectedValue: null,
            addRows: []
        };
    },
    mounted: function mounted() {
        Object(__WEBPACK_IMPORTED_MODULE_1__Visitors_state__["c" /* fetch */])('/api/visitors');
    },

    methods: {
        addRow: function addRow() {
            var vm = this;
            vm.addRows.push({ visitor_id: vm.selectedValue, LocaleDate: DATE, LocaleStartTime: TIME, LocaleEndTime: null });
        }
    }
});

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/**
 * Created by Lorilla on 12/08/2017.
 */
function qs() {
    if (!location.search) {
        return {};
    }
    var search = location.search.substr(1).split('&');
    var ret = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = search[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pair = _step.value;

            var keyValue = pair.split('=');
            ret[keyValue[0]] = keyValue[1];
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

    return ret;
}

/***/ }),

/***/ 139:
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
  }, [_vm._v("Time Logs")]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('el-select', {
    attrs: {
      "clearable": "",
      "filterable": "",
      "placeholder": "Select"
    },
    model: {
      value: (_vm.selectedValue),
      callback: function($$v) {
        _vm.selectedValue = $$v
      },
      expression: "selectedValue"
    }
  }, _vm._l((_vm.data.data), function(item) {
    return _c('el-option', {
      key: item.id,
      attrs: {
        "label": item.name,
        "value": item.id,
        "disabled": item.disabled
      }
    }, [_c('span', {
      staticStyle: {
        "float": "left"
      }
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "right",
        "color": "#8492a6",
        "font-size": "13px"
      }
    }, [_vm._v(_vm._s(item.schoolId))])])
  })), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "plus"
    },
    on: {
      "click": _vm.addRow
    },
    slot: "append"
  }, [_vm._v("Add ")])], 1), _vm._v(" "), _vm._l((_vm.addRows), function(addTd, index) {
    return _c('ul', {
      staticClass: "list-group"
    }, [_c('li', {
      staticClass: "list-group-item"
    }, [_vm._v(_vm._s(addTd.visitor_id))])])
  })], 2)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bf35ae00", module.exports)
  }
}

/***/ })

});