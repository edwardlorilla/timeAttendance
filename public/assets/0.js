webpackJsonp([0],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(128),
  /* template */
  __webpack_require__(130),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\resources\\assets\\js\\components\\Visitors\\timeTracker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] timeTracker.vue: functional components are not supported with templates, they should use render functions.")}

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

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(129);
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
            data: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].data,
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
                        vm.$router.push({ name: 'visitorCreate' });
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
                        console.log('edit' + row);
                        row.flow_no = "hello word";
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
            },
            filterFunction: function filterFunction(el, filter) {
                return el['category'] === filter.vals[0];
            }
        };
    },
    mounted: function mounted() {
        __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].fetch('/api/visitors');
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

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Lorilla on 09/08/2017.
 */
window.Vue = __webpack_require__(2);
/* harmony default export */ __webpack_exports__["a"] = ({
    data: {
        data: [],
        editData: {}
    },

    dataReceive: function dataReceive(id, data) {
        var vm = this;
        // vm.data.data.unshift({id: id, name: data})
    },
    fetch: function fetch(urlFetch) {
        var _this = this;

        axios.get(urlFetch).then(function (response) {
            return _this.data.data = _.map(response.data, function (num) {
                var pick = _.pick(num, 'id', 'name', 'category', 'year');
                var object = { id: pick.id, name: pick.name, year: pick.year, category: pick.category ? pick.category.name : '' };
                return object;
            });
        });
    },
    findIndex: function findIndex(data) {
        console.log(data);
        var vm = this;
        var found = _.findIndex(this.data, data);
        vm.data.editData = vm.data.data[found];
    },
    dataEdit: function dataEdit() {
        var vm = this;
        var DATA = vm.data.editData;
        var found = _.findIndex(this.data.data, { id: DATA.id });
        this.data.data[found].name = DATA.name;
    },
    deleteData: function deleteData(dataId) {
        var found = _.find(this.data.data, ['id', dataId]);
        if ((typeof found === 'undefined' ? 'undefined' : _typeof(found)) == 'object') {
            var index = _.indexOf(this.data.data, found);
            this.data.data.splice(index, 1);
        }
    }
});

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8 col-md-offset-2"
  }, [_c('data-tables', {
    attrs: {
      "data": _vm.data.data,
      "actions-def": _vm.actionsDef,
      "checkbox-filter-def": _vm.checkFilterDef,
      "action-col-def": _vm.actionColDef
    }
  }, _vm._l((_vm.titles), function(title) {
    return _c('el-table-column', {
      key: title.props,
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