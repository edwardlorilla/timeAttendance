webpackJsonp([3],{

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(631),
  /* template */
  __webpack_require__(632),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\timeAttendance\\resources\\assets\\js\\components\\Auth\\loginUser.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] loginUser.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-151758d2", Component.options)
  } else {
    hotAPI.reload("data-v-151758d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Visitors_state__ = __webpack_require__(27);
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
        return {
            activeName: null,
            formInline: {
                studentid: '',
                user: {}
            },
            rule: {
                studentid: [{ required: true, message: 'Please input your Student I.D' }, { min: 7, max: 10, message: 'Student ID must be between 7 and 10', trigger: 'blur' }]
            }
        };
    },
    mounted: function mounted() {
        Object(__WEBPACK_IMPORTED_MODULE_0__Visitors_state__["d" /* fetch */])('/api/visitors');
    },

    computed: {
        isEmpty: function isEmpty() {
            var vm = this;
            return !_.isEmpty(vm.formInline.user);
        }
    },
    watch: {
        'formInline.studentid': function formInlineStudentid(username) {
            this.setUsername(username);
        }
    },
    methods: {
        setUsername: _.debounce(function (username) {
            if (username) {
                this.onSubmit('ruleForm');
            }

            if (!username) {
                this.studentid = null;
            }
        }, 500),

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
        startTime: function startTime() {
            var vm = this;
            if (vm.foundUser) {
                var userDetail = vm.formInline.user;
                Object(__WEBPACK_IMPORTED_MODULE_0__Visitors_state__["c" /* disableSelected */])(userDetail, 1);
            }

            var addTime = {
                id: userDetail ? userDetail.id : '',
                visitor_id: vm.selectedValue,
                visitor: {
                    name: userDetail ? userDetail.name : '',
                    schoolId: userDetail ? userDetail.schoolId : '',
                    year: userDetail ? userDetail.year : '',
                    photo: userDetail ? userDetail.photo : ''
                },

                LocaleDate: this.$moment().format('YYYY-MM-DD'),
                LocaleStartTime: new Date().getTime() - 1000,
                LocaleEndTime: null,
                tempStartTime: utcDate()
            };
        },
        onSubmit: function onSubmit(form) {
            var vm = this;

            var formData = vm.formInline.studentid;

            this.$refs[form].validate(function (valid) {
                if (valid) {

                    vm.formInline.user = Object(__WEBPACK_IMPORTED_MODULE_0__Visitors_state__["g" /* findStudent */])(formData);
                    /*if (vm.foundUser) {
                     }*/
                }
            });
        }
    }
});

/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "w3-content w3-margin-top",
    staticStyle: {
      "max-width": "1400px"
    }
  }, [_c('div', {
    staticClass: "w3-row-padding"
  }, [_c('div', {
    staticClass: "w3-col",
    staticStyle: {
      "width": "100%"
    }
  }, [_c('div', {
    staticClass: "w3-container w3-card w3-margin-bottom"
  }, [_vm._m(0), _vm._v(" "), _c('el-form', {
    ref: "ruleForm",
    staticClass: "demo-form-inline",
    attrs: {
      "inline": true,
      "rules": _vm.rule,
      "model": _vm.formInline
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "Student I.D",
      "prop": "studentid"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "Student I.D"
    },
    model: {
      value: (_vm.formInline.studentid),
      callback: function($$v) {
        _vm.formInline.studentid = $$v
      },
      expression: "formInline.studentid"
    }
  })], 1), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onSubmit('ruleForm')
      }
    }
  }, [_vm._v("Submit")])], 1)], 1)]), _vm._v(" "), (_vm.isEmpty) ? _c('div', {
    staticClass: "w3-third"
  }, [_c('div', {
    staticClass: "w3-white w3-text-grey w3-card-4"
  }, [_c('div', {
    staticClass: "w3-display-container"
  }, [_c('img', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "src": _vm.formInline.user.photo ? '/images/' + _vm.formInline.user.photo.file : '/images/img_avatar.png',
      "alt": "Avatar"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "w3-display-bottomleft w3-container w3-text-black"
  }), _vm._v(" "), _c('hr')]), _vm._v(" "), _c('div', {
    staticClass: "w3-container"
  }, [_c('h3', [_c('p', [_c('i', {
    staticClass: "fa fa-user fa-fw w3-margin-right w3-large w3-text-teal"
  }), _vm._v("\n                        " + _vm._s(_vm.formInline.user.name) + "\n                    ")])]), _vm._v(" "), _c('p', [_c('i', {
    staticClass: "fa fa-graduation-cap fa-fw w3-margin-right w3-large w3-text-teal"
  }), _vm._v("\n                    " + _vm._s(_vm.formInline.user.category.name === 'mkd student' ? 'College' : 'Senior Highschool'))]), _vm._v(" "), _c('p', [_c('i', {
    staticClass: "fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"
  }), _vm._v("\n                    " + _vm._s(_vm.level(_vm.formInline.user.year)) + "-" + _vm._s(_vm.formInline.user.course.description) + " (" + _vm._s(_vm.formInline.user.course.course) + ")\n\n                    ")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('br')])]), _c('br')]) : _vm._e(), _vm._v(" "), (_vm.isEmpty) ? _c('div', {
    staticClass: "w3-twothird"
  }, [_c('el-tabs', {
    attrs: {
      "type": "border-card"
    }
  }, [_c('el-tab-pane', {
    attrs: {
      "label": "Time"
    }
  }, [_c('button', {
    staticClass: "w3-button w3-block w3-teal",
    on: {
      "click": _vm.startTime
    }
  }, [_vm._v("Start")])]), _vm._v(" "), _c('el-tab-pane', {
    attrs: {
      "label": "Config"
    }
  }, [_vm._v("Config")]), _vm._v(" "), _c('el-tab-pane', {
    attrs: {
      "label": "Role"
    }
  }, [_vm._v("Role")]), _vm._v(" "), _c('el-tab-pane', {
    attrs: {
      "label": "Task"
    }
  }, [_vm._v("Task")])], 1)], 1) : _vm._e()])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h2', {
    staticClass: "w3-text-grey w3-padding-16"
  }, [_c('i', {
    staticClass: "fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-teal"
  }), _vm._v("Student I.D")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-151758d2", module.exports)
  }
}

/***/ })

});