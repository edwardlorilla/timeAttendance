webpackJsonp([0],{

/***/ 647:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(652),
  /* template */
  __webpack_require__(653),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\timeAttendance\\resources\\assets\\js\\components\\Visitors\\report.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] report.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e6c1644", Component.options)
  } else {
    hotAPI.reload("data-v-2e6c1644", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(20);
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


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            data: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* data */]

        };
    },

    filters: {
        formatStr: function formatStr(str) {
            var value;
            if (str === 'year') {
                value = str.toUpperCase();
            } else if (str === 'gender') {
                value = str.toUpperCase();
            } else if (str === 'category.name') {
                value = 'category'.toUpperCase();
            } else if (str === 'course.course') {
                value = 'Course'.toUpperCase();
            }
            return value;
        }
    },
    computed: {
        groupByYear: function groupByYear() {
            var vm = this,
                visitorsData = vm.data.data;
            return _(visitorsData).groupBy('year').map(function (items, student) {
                return { course: vm.level(student), count: items.length };
            }).value();
        },
        groupByGender: function groupByGender() {
            var vm = this,
                visitorsData = vm.data.data;
            return _(visitorsData).groupBy('gender').map(function (items, student) {
                return { course: vm.gender(student), count: items.length };
            }).value();
        },
        groupByCategory: function groupByCategory() {
            var vm = this,
                visitorsData = vm.data.data;
            return _(visitorsData).groupBy('category.name').map(function (items, student) {
                return { course: _.upperCase(student), count: items.length };
            }).value();
        },
        groupByCourse: function groupByCourse() {
            var vm = this,
                visitorsData = vm.data.data;
            return _(visitorsData).groupBy('course.course').map(function (items, student) {
                return { course: student, count: items.length };
            }).value();
        }
    },
    methods: {
        level: function level(year) {
            var level;
            if (year == '1') {
                level = year + 'st year';
            } else if (year == '2') {
                level = year + 'nd year';
            } else if (year == '3') {
                level = year + 'rd year';
            } else {
                level = year + 'th year';
            }
            return level;
        },
        gender: function gender(str) {
            return str === '1' ? 'Male' : 'Female';
        }
    },
    mounted: function mounted() {
        Object(__WEBPACK_IMPORTED_MODULE_0__state__["d" /* fetch */])('/api/visitors');
    }
});

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-fluid"
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', {
    staticClass: "clearfix",
    slot: "header"
  }, [_c('span', {
    staticStyle: {
      "line-height": "36px"
    }
  }, [_vm._v("Report")])]), _vm._v(" "), _c('report-visitor', {
    attrs: {
      "groupByYear": _vm.groupByYear,
      "groupByGender": _vm.groupByGender,
      "groupByCategory": _vm.groupByCategory,
      "groupByCourse": _vm.groupByCourse
    }
  })], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2e6c1644", module.exports)
  }
}

/***/ })

});