(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/List.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/admin/List.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      is_add: false,
      outerVisible: false,
      dialog_title: '',
      articles: {},
      search_form: {
        role_id: '',
        real_name: '',
        group: '',
        status: 1
      },
      tabledata: {}
    };
  },
  mounted: function mounted() {
    this.getData({});
  },
  methods: {
    handleSizeChange: function handleSizeChange(val) {
      this.per_page = val;
      this.handleCurrentChange(this.tabledata.current_page);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var data = {};
      Object.assign(data, this.search_form);
      data.page = val;
      data.per_page = this.per_page;
      this.getData(data);
    },
    getData: function getData(data) {
      var _this = this;

      this.loading = true;
      axios.post('/admin/user/list', data).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            title: '请求失败',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this.tabledata = res.data.data;
        }

        _this.loading = false;
      });
    },
    closeDialog: function closeDialog(val) {
      this.outerVisible = val;
      setTimeout(function () {
        window.location.href = '/admin/user/list';
      }, 1500);
    },
    showForm: function showForm(action) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.outerVisible = true;

      if (action != 'add') {
        //编辑
        this.dialog_title = 'Edit User —— ' + param.real_name;
        this.articles = param;
        this.is_add = false;
      } else {
        this.articles = {};
        this.is_add = true;
        this.dialog_title = 'Add User';
      }
    },
    reset: function reset() {
      this.search_form = {
        role_id: '',
        real_name: '',
        status: 1
      };
      this.getData({});
    },
    search: function search() {
      var data = {};
      Object.assign(data, this.search_form);
      this.getData(data);
    },
    handleEdit: function handleEdit(uid) {
      window.location.href = '/admin/user/edit?id=' + uid;
    },
    handleDelete: function handleDelete(index, row) {
      var _this2 = this;

      var updateStatus = row.status == 1 ? 0 : 1;
      var tip = updateStatus == 1 ? 'Enable the user' : 'Disable the user';
      this.$confirm(tip + ', Do you want to continue?', 'Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(function () {
        _this2.loading = true;
        axios.post('/admin/user/delete', {
          id: row.id,
          updateStatus: updateStatus
        }).then(function (res) {
          if (res.data.code != 0 || res.status != 200) {
            _this2.$notify({
              title: 'Failed',
              message: res.data.message,
              type: 'error'
            });
          } else {
            _this2.$notify({
              title: 'Success',
              message: res.data.message,
              type: 'success'
            });

            _this2.tabledata.data[index].status = updateStatus;
          }

          _this2.loading = false;
        });
      });
    }
  },
  props: ['roles']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/List.vue?vue&type=template&id=98848456&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/admin/List.vue?vue&type=template&id=98848456& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-card",
        { attrs: { shadow: "hover" } },
        [
          _c(
            "el-form",
            {
              staticClass: "search-form-inline",
              attrs: { inline: true, size: "mini" }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Role:" } },
                [
                  _c(
                    "el-select",
                    {
                      staticStyle: { width: "150px" },
                      attrs: { placeholder: "Select", clearable: "" },
                      model: {
                        value: _vm.search_form.role_id,
                        callback: function($$v) {
                          _vm.$set(_vm.search_form, "role_id", $$v)
                        },
                        expression: "search_form.role_id"
                      }
                    },
                    _vm._l(_vm.roles, function(item) {
                      return _c("el-option", {
                        key: item.id,
                        attrs: { label: item.name, value: item.id }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "Post:" } },
                [
                  _c(
                    "el-select",
                    {
                      staticStyle: { width: "150px" },
                      attrs: { size: "mini" },
                      model: {
                        value: _vm.search_form.group,
                        callback: function($$v) {
                          _vm.$set(_vm.search_form, "group", $$v)
                        },
                        expression: "search_form.group"
                      }
                    },
                    [
                      _c("el-option", { attrs: { label: "Admin", value: 1 } }),
                      _vm._v(" "),
                      _c("el-option", {
                        attrs: { label: "Marketing Manager", value: 2 }
                      }),
                      _vm._v(" "),
                      _c("el-option", {
                        attrs: { label: "Translator", value: 3 }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "State:" } },
                [
                  _c(
                    "el-radio-group",
                    {
                      model: {
                        value: _vm.search_form.status,
                        callback: function($$v) {
                          _vm.$set(_vm.search_form, "status", $$v)
                        },
                        expression: "search_form.status"
                      }
                    },
                    [
                      _c("el-radio-button", { attrs: { label: "1" } }, [
                        _vm._v("Enable")
                      ]),
                      _vm._v(" "),
                      _c("el-radio-button", { attrs: { label: "0" } }, [
                        _vm._v("Disable")
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "NickName:" } },
                [
                  _c("el-input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.search_form.real_name,
                      callback: function($$v) {
                        _vm.$set(_vm.search_form, "real_name", $$v)
                      },
                      expression: "search_form.real_name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    { attrs: { type: "warning" }, on: { click: _vm.search } },
                    [_vm._v("Search")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    { attrs: { type: "info" }, on: { click: _vm.reset } },
                    [_vm._v("Reset")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-card",
        { staticClass: "margin_top", attrs: { shadow: "hover" } },
        [
          _c(
            "div",
            { attrs: { slot: "header" }, slot: "header" },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    icon: "el-icon-user",
                    type: "primary",
                    size: "mini"
                  },
                  on: {
                    click: function($event) {
                      return _vm.showForm("add")
                    }
                  }
                },
                [_vm._v("Add User")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-table",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.loading,
                  expression: "loading"
                }
              ],
              attrs: { data: _vm.tabledata.data, size: "medium" }
            },
            [
              _c("el-table-column", {
                attrs: { resizable: "", prop: "id", label: "ID", width: "70" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", prop: "username", label: "UserName" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", prop: "real_name", label: "NickName" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", prop: "name", label: "Role" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", label: "Post" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        scope.row.group == 1
                          ? _c("span", [_vm._v("Admin")])
                          : scope.row.group == 2
                          ? _c("span", [_vm._v("Marketing Manager")])
                          : scope.row.group == 3
                          ? _c("span", [_vm._v("Translator")])
                          : _vm._e()
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", prop: "login_at", label: "Login Time" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", label: "State" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              scope.row.status == 1 ? "Enable" : "Disable"
                            ) +
                            "\n        "
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", align: "center", label: "Operation" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text" },
                            on: {
                              click: function($event) {
                                return _vm.showForm("edit", scope.row)
                              }
                            }
                          },
                          [_vm._v("Edit")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text" },
                            on: {
                              click: function($event) {
                                return _vm.handleDelete(scope.$index, scope.row)
                              }
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(
                                scope.row.status == 1 ? "Disable" : "Enable"
                              )
                            )
                          ]
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "pull-right" },
            [
              _c("el-pagination", {
                staticStyle: { margin: "15px 0" },
                attrs: {
                  "current-page": _vm.tabledata.current_page,
                  total: _vm.tabledata.total,
                  "page-sizes": this.unils.page_size,
                  "page-size": parseInt(_vm.tabledata.per_page),
                  layout: "total, sizes, prev, pager, next, jumper"
                },
                on: {
                  "size-change": _vm.handleSizeChange,
                  "current-change": _vm.handleCurrentChange,
                  "update:currentPage": function($event) {
                    return _vm.$set(_vm.tabledata, "current_page", $event)
                  },
                  "update:current-page": function($event) {
                    return _vm.$set(_vm.tabledata, "current_page", $event)
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.outerVisible
        ? _c(
            "el-dialog",
            {
              attrs: {
                visible: _vm.outerVisible,
                "close-on-click-modal": false,
                title: _vm.dialog_title
              },
              on: {
                "update:visible": function($event) {
                  _vm.outerVisible = $event
                }
              }
            },
            [
              _c(
                "el-row",
                { staticStyle: { "margin-top": "15px" } },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 20 } },
                    [
                      _c("admin-form", {
                        attrs: {
                          articles: _vm.articles,
                          is_add: _vm.is_add,
                          roles: _vm.roles
                        },
                        on: { closeDialog: _vm.closeDialog }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/admin/List.vue":
/*!*******************************************************!*\
  !*** ./resources/assets/js/components/admin/List.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _List_vue_vue_type_template_id_98848456___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=98848456& */ "./resources/assets/js/components/admin/List.vue?vue&type=template&id=98848456&");
/* harmony import */ var _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/admin/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _List_vue_vue_type_template_id_98848456___WEBPACK_IMPORTED_MODULE_0__["render"],
  _List_vue_vue_type_template_id_98848456___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/admin/List.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/admin/List.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/assets/js/components/admin/List.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/admin/List.vue?vue&type=template&id=98848456&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/admin/List.vue?vue&type=template&id=98848456& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_98848456___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=template&id=98848456& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/List.vue?vue&type=template&id=98848456&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_98848456___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_98848456___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);