webpackJsonp([1],{

/***/ 645:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(649),
  /* template */
  __webpack_require__(650),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\timeAttendance\\resources\\assets\\js\\components\\Visitors\\index.vue"
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

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_view__ = __webpack_require__(78);
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
            toggleChart: false,
            courses: [],
            isEdit: __WEBPACK_IMPORTED_MODULE_0__state__["i" /* isEdit */],
            data: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* data */],
            state_view: __WEBPACK_IMPORTED_MODULE_1__state_view__["d" /* state_view */],
            courseFilter: {
                data: [],
                data2: []
            },

            customFilters: [{
                vals: [],
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
                prop: "schoolId",
                label: "School ID"
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
                        Object(__WEBPACK_IMPORTED_MODULE_0__state__["k" /* setEditData */])(row.id);
                        Object(__WEBPACK_IMPORTED_MODULE_0__state__["j" /* isToggle */])();
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
        pluckSchoolId: function pluckSchoolId() {
            var vm = this;
            return _.map(vm.data.data, 'schoolId');
        },
        getData: function getData() {
            var vm = this;
            return _.map(vm.data.data, function (num) {
                return {
                    id: num.id,
                    name: num.name,
                    year: vm.level(num.year),
                    category: num.category ? num.category.name : '',
                    course: num.course ? num.course.course : '',
                    avatar: !_.isEmpty(num.photo) ? '/images/' + num.photo.file : { file: null, id: null },
                    schoolId: num.schoolId
                };
            });
        },
        chartCourse: function chartCourse() {
            var vm = this;
            var getData = vm.getData;
            var countBy = _.countBy(getData, function (o) {
                return o.course;
            });

            var data1 = vm.courseFilter.data;
            var data2 = vm.courseFilter.data2;
            var array = [];
            for (var key in countBy) {
                if (countBy.hasOwnProperty(key)) {
                    data1.push(key);
                    data2.push(countBy[key]);
                    array.push({ key: key, val: countBy[key] });
                }
            }
            return array;
        },
        pluckYear: function pluckYear() {
            var vm = this;
            var getData = vm.getData;
            return _.countBy(getData, function (o) {
                return o.year;
            });
        }
    },
    methods: {
        updateData: function updateData(event) {
            var vm = this;
            var user = _.findIndex(vm.data.data, { id: event.id });
            vm.$set(vm.data.data, user, event);
        },
        deleteData: function deleteData(event) {
            var vm = this;
            var user = _.findIndex(vm.data.data, { id: event });
            vm.$delete(vm.data.data, user);
        },
        level: function level(year) {
            var level;
            if (year == '1') {
                level = year + 'st year';
            } else if (year == '2') {
                level = year + 'nd year';
            } else if (year == '3') {
                level = year + 'rd year';
            } else if (year == '4') {
                level = year + 'th year';
            } else if (year == '11') {
                level = 'GRADE ' + year;
            } else if (year == '12') {
                level = 'GRADE ' + year;
            } else if (year == '13') {
                level = 'FACULTY';
            } else if (year == '14') {
                level = 'ADMINISTRATOR';
            } else if (year == '15') {
                level = 'BOARD';
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

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-10 col-md-offset-1"
  }, [(_vm.state_view.state_view) ? _c('create-data', {
    attrs: {
      "pluckSchoolId": _vm.pluckSchoolId
    }
  }) : _vm._e(), _vm._v(" "), (_vm.isEdit.isToggle) ? _c('edit-data', {
    attrs: {
      "pluckSchoolId": _vm.pluckSchoolId
    },
    on: {
      "updateData": function($event) {
        _vm.updateData($event)
      },
      "deleteData": function($event) {
        _vm.deleteData($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('el-card', {
    staticClass: "box-card"
  }, [_c('div', {
    staticClass: "clearfix",
    slot: "header"
  }, [_c('span', {
    staticStyle: {
      "line-height": "36px"
    }
  }, [_vm._v("\n\n                        Visitor Lists\n\n                    ")]), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.toggleChart = !_vm.toggleChart
      }
    }
  }, [_vm._v("Toggle\n                        Chart\n                    ")])], 1), _vm._v(" "), (_vm.toggleChart) ? _c('time-line', {
    attrs: {
      "type": "bar",
      "dataSet": _vm.chartCourse
    }
  }) : _vm._e(), _vm._v(" "), _c('data-tables', {
    staticStyle: {
      "margin-top": "2vh"
    },
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
      value: (_vm.customFilters[0].vals),
      callback: function($$v) {
        _vm.customFilters[0].vals = $$v
      },
      expression: "customFilters[0].vals"
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
  })], 2)], 1)], 1)])])
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