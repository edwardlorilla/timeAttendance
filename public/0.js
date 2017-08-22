webpackJsonp([0],{

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(274),
  /* template */
  __webpack_require__(275),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\resources\\assets\\js\\components\\Visitors\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51b76af2", Component.options)
  } else {
    hotAPI.reload("data-v-51b76af2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_view__ = __webpack_require__(22);
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



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        var vm = this;
        return {
            courses: [],
            isEdit: __WEBPACK_IMPORTED_MODULE_0__state__["h" /* isEdit */],
            data: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* data */],
            state_view: __WEBPACK_IMPORTED_MODULE_1__state_view__["d" /* state_view */],

            customFilters: [{
                vals: '',
                props: 'course'
            }, {
                vals: []
            }, {
                vals: '',
                props: 'year'
            }, {
                vals: []
            }],
            titles: [{
                prop: "category",
                label: "Categorize"
            }, {
                prop: "name",
                label: "Name"
            }, {
                prop: "year",
                label: "Level"
            }, {
                prop: "course",
                label: "Course"
            }],
            actionsDef: {
                colProps: {
                    span: 5
                },

                def: [{

                    name: "new",
                    handler: function handler() {
                        Object(__WEBPACK_IMPORTED_MODULE_1__state_view__["b" /* change_view */])();
                    },
                    buttonProps: {
                        type: "text"
                    }
                }, {
                    name: "import",
                    handler: function handler() {
                        console.log('import');
                    },
                    icon: "upload"
                }]
            },
            checkFilterDef: {
                props: 'category',
                def: [{
                    code: "teacher",
                    name: "Teacher"
                }, {
                    code: "senior high",
                    name: "Senior High"
                }, {
                    code: "outsider",
                    name: "Outsider"
                }, {
                    code: "mkd student",
                    name: "Mkd Student"
                }]
            },
            actionColDef: {
                label: "Actions",
                def: [{
                    handler: function handler(row) {
                        Object(__WEBPACK_IMPORTED_MODULE_0__state__["j" /* setEditData */])(row.id);
                        Object(__WEBPACK_IMPORTED_MODULE_0__state__["i" /* isToggle */])();
                    },
                    name: "Edit"
                }, {
                    icon: "message",
                    type: "text",
                    handler: function handler(row) {
                        console.log('RUA' + row);
                        console.log("RUA in row clicked", row);
                    },
                    name: "RUA"
                }]
            }
        };
    },
    mounted: function mounted() {
        Object(__WEBPACK_IMPORTED_MODULE_0__state__["d" /* fetch */])('/api/visitors');
    },

    computed: {
        pluckCourses: function pluckCourses() {
            var courses = this.getData;
            var map = _.map(courses, function (num, key) {
                return !_.isEmpty(num) ? num.course : null;
            });
            var unique = _.uniq(map);
            var pluckFilter = _.filter(unique, function (fil) {
                return fil == "" ? null : fil;
            });
            return pluckFilter;
        },
        pluckLevel: function pluckLevel() {
            var courses = this.getData;
            var map = _.map(courses, function (num, key) {
                return !_.isEmpty(num) ? num.year : null;
            });
            var unique = _.uniq(map);
            var pluckFilter = _.filter(unique, function (fil) {
                return fil == "" ? null : fil;
            });
            return pluckFilter;
        },
        getData: function getData() {
            return _.map(this.data.data, function (num) {
                var pick = _.pick(num, 'id', 'name', 'category', 'year', 'category_id', 'course');
                var object = {
                    id: pick.id,
                    name: pick.name,
                    year: pick.year,
                    category: pick.category ? pick.category.name : '',
                    course: pick.course ? pick.course.course : ''
                };
                return object;
            });
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
        getRowActionsDef: function getRowActionsDef() {
            var self = this;
            return [{
                type: 'primary',
                handler: function handler(row) {
                    console.log('Edit clicked');
                    console.log('Edit in row clicked', row);
                },

                name: 'Edit'
            }];
        }
    }
});

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-10 col-md-offset-1"
  }, [(_vm.state_view.state_view) ? _c('create-data') : _vm._e(), _vm._v(" "), (_vm.isEdit.isToggle) ? _c('edit-data') : _vm._e(), _vm._v(" "), _c('data-tables', {
    attrs: {
      "custom-filters": _vm.customFilters,
      "data": _vm.getData,
      "actions-def": _vm.actionsDef,
      "checkbox-filter-def": _vm.checkFilterDef,
      "action-col-def": _vm.actionColDef
    }
  }, [_c('el-row', {
    staticStyle: {
      "margin-bottom": "10px"
    },
    slot: "custom-tool-bar"
  }, [_c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "Filter Selected Level",
      "multiple": "multiple"
    },
    model: {
      value: (_vm.customFilters[2].vals),
      callback: function($$v) {
        _vm.customFilters[2].vals = $$v
      },
      expression: "customFilters[2].vals"
    }
  }, _vm._l((_vm.pluckLevel), function(value, index) {
    return _c('el-option', {
      key: index,
      attrs: {
        "label": _vm.level(value),
        "value": value
      }
    })
  }))], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "Filter Selected Course",
      "multiple": "multiple"
    },
    model: {
      value: (_vm.customFilters[1].vals),
      callback: function($$v) {
        _vm.customFilters[1].vals = $$v
      },
      expression: "customFilters[1].vals"
    }
  }, _vm._l((_vm.pluckCourses), function(value, index) {
    return _c('el-option', {
      key: index,
      attrs: {
        "label": value,
        "value": value
      }
    })
  }))], 1)], 1), _vm._v(" "), _vm._l((_vm.titles), function(title) {
    return _c('el-table-column', {
      key: title.label,
      attrs: {
        "prop": title.prop,
        "label": title.label,
        "sortable": "custom"
      }
    })
  })], 2)], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-51b76af2", module.exports)
  }
}

/***/ })

});