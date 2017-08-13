webpackJsonp([1],{

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(136),
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

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_view__ = __webpack_require__(18);
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
            isEdit: __WEBPACK_IMPORTED_MODULE_0__state__["d" /* isEdit */],
            data: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* data */],
            state_view: __WEBPACK_IMPORTED_MODULE_1__state_view__["d" /* state_view */],
            titles: [{
                prop: "category",
                label: "Categorize"
            }, {
                prop: "name",
                label: "Name"
            }, {
                prop: "year",
                label: "Level"
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
                        Object(__WEBPACK_IMPORTED_MODULE_0__state__["f" /* setEditData */])(row);
                        Object(__WEBPACK_IMPORTED_MODULE_0__state__["e" /* isToggle */])();
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
        Object(__WEBPACK_IMPORTED_MODULE_0__state__["c" /* fetch */])('/api/visitors');
    },

    computed: {
        getData: function getData() {
            return _.map(this.data.data, function (num) {
                var pick = _.pick(num, 'id', 'name', 'category', 'year', 'category_id');
                var object = {
                    id: pick.id,
                    name: pick.name,
                    year: pick.year,
                    category: pick.category ? pick.category.name : ''
                };
                return object;
            });
        }
    },
    methods: {
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

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8 col-md-offset-2"
  }, [(_vm.state_view.state_view) ? _c('create-data') : _vm._e(), _vm._v(" "), (_vm.isEdit.isToggle) ? _c('edit-data') : _vm._e(), _vm._v(" "), _c('data-tables', {
    attrs: {
      "data": _vm.getData,
      "actions-def": _vm.actionsDef,
      "checkbox-filter-def": _vm.checkFilterDef,
      "action-col-def": _vm.actionColDef
    }
  }, _vm._l((_vm.titles), function(title) {
    return _c('el-table-column', {
      key: title.label,
      attrs: {
        "prop": title.prop,
        "label": title.label,
        "sortable": "custom"
      }
    })
  }))], 1)])])
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