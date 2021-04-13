(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/video_list/Index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
var current_url = '/admin/video_list/';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      search_form: {
        title: '',
        module_id: '',
        sort_prop: '',
        sort_order: '',
        page: 0,
        per_page: this.unils.per_page
      },
      tabledata: {}
    };
  },
  mounted: function mounted() {
    this.getData({});
  },
  methods: {
    //update display
    changeDisplay: function changeDisplay(index, row) {
      var _this = this;

      this.loading = true;
      axios.post('/admin/common/common_publish', {
        object: 'VideoList',
        id: row.id,
        display: row.display
      }).then(function (res) {
        if (res.data.code !== 0 || res.status !== 200) {
          _this.$notify({
            title: 'Error',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this.$notify({
            title: 'success',
            message: res.data.message,
            type: 'success'
          });

          row.display = res.data.data.result;
        }

        _this.loading = false;
      });
    },
    sortChange: function sortChange(column) {
      console.log(column.prop, column.order);
      this.search_form.sort_prop = column.prop;
      this.search_form.sort_order = column.order === 'descending' ? 'desc' : 'asc';
      this.getData(this.search_form);
    },
    handleSizeChange: function handleSizeChange(val) {
      this.search_form.per_page = val;
      this.handleCurrentChange();
    },
    handleCurrentChange: function handleCurrentChange() {
      this.search_form.page = this.tabledata.current_page;
      this.getData(this.search_form);
    },
    getData: function getData(data) {
      var _this2 = this;

      this.loading = true;
      axios.post(current_url + this.module, data).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this2.$notify({
            title: 'Request Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this2.tabledata = res.data.data;
        }

        _this2.loading = false;
      });
    },
    reset: function reset() {
      window.location.href = current_url;
    },
    search: function search() {
      this.getData(this.search_form);
    },
    handleOperation: function handleOperation(operation) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var url = current_url + operation;
      window.location.href = id ? url + '?id=' + id : url;
    },
    handleDelete: function handleDelete(index, row) {
      var _this3 = this;

      this.$confirm(' Do you want to delete it?', 'Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(function () {
        _this3.loading = true;
        axios["delete"](current_url + '?id=' + row.id).then(function (res) {
          if (res.data.code != 0 || res.status != 200) {
            _this3.$notify({
              title: 'Request Failed',
              message: res.data.message,
              type: 'error'
            });
          } else {
            _this3.$notify({
              title: 'Success',
              message: res.data.message,
              type: 'success'
            });
          }

          _this3.tabledata.data.splice(index, 1);

          _this3.loading = false;
        });
      });
    }
  },
  props: ['module', 'moduleSelect', 'wordCount', 'group']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Index.vue?vue&type=template&id=ec69fc48&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/video_list/Index.vue?vue&type=template&id=ec69fc48& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
                [
                  _c("el-input", {
                    attrs: { type: "text", placeholder: "Title" },
                    model: {
                      value: _vm.search_form.title,
                      callback: function($$v) {
                        _vm.$set(_vm.search_form, "title", $$v)
                      },
                      expression: "search_form.title"
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
                    "el-select",
                    {
                      staticStyle: { width: "150px" },
                      attrs: { clearable: "" },
                      model: {
                        value: _vm.search_form.module_id,
                        callback: function($$v) {
                          _vm.$set(_vm.search_form, "module_id", $$v)
                        },
                        expression: "search_form.module_id"
                      }
                    },
                    _vm._l(_vm.moduleSelect, function(item) {
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
                  attrs: { type: "primary", size: "medium" },
                  on: {
                    click: function($event) {
                      return _vm.handleOperation("add")
                    }
                  }
                },
                [_vm._v("Add a Video")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { staticClass: "word-count", attrs: { type: "text" } },
                [
                  _vm._v("WordCount: "),
                  _c("b", [_vm._v(_vm._s(this.wordCount))])
                ]
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
              attrs: { data: _vm.tabledata.data, size: "medium" },
              on: { "sort-change": _vm.sortChange }
            },
            [
              _c("el-table-column", {
                attrs: {
                  resizable: "",
                  prop: "title",
                  label: "Title",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  resizable: "",
                  prop: "descriptions",
                  label: "Descriptions",
                  width: "250"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  resizable: "",
                  label: "Display",
                  sortable: "custom",
                  prop: "display",
                  width: "150"
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c("el-switch", {
                          attrs: {
                            "active-text": "Yes",
                            "inactive-text": "No"
                          },
                          on: {
                            change: function($event) {
                              return _vm.changeDisplay(scope.$index, scope.row)
                            }
                          },
                          model: {
                            value: scope.row.display === 1,
                            callback: function($$v) {
                              _vm.$set(scope.row, "display === 1", $$v)
                            },
                            expression: "scope.row.display === 1"
                          }
                        })
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", prop: "module", label: "Module" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  resizable: "",
                  prop: "name",
                  label: "Page Name",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  resizable: "",
                  label: "URL",
                  prop: "url",
                  sortable: "custom"
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c(
                          "a",
                          {
                            attrs: {
                              href: _vm._f("ContainsHttp")(scope.row.url)
                            }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm._f("ContainsHttp")(scope.row.url))
                            )
                          ]
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
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.group != 3,
                                expression: "group != 3"
                              }
                            ],
                            staticStyle: { color: "rgb(0, 0, 255)" },
                            attrs: { type: "text" },
                            on: {
                              click: function($event) {
                                return _vm.handleOperation("edit", scope.row.id)
                              }
                            }
                          },
                          [_vm._v("Edit | ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.group != 3,
                                expression: "group != 3"
                              }
                            ],
                            attrs: { type: "text" },
                            on: {
                              click: function($event) {
                                return _vm.handleDelete(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("Delete | ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.group != 2,
                                expression: "group != 2"
                              }
                            ],
                            attrs: { type: "text" },
                            on: {
                              click: function($event) {
                                return _vm.handleOperation(
                                  "translate",
                                  scope.row.id
                                )
                              }
                            }
                          },
                          [_vm._v(" Translate")]
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/video_list/Index.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/video_list/Index.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_ec69fc48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=ec69fc48& */ "./resources/assets/js/components/video_list/Index.vue?vue&type=template&id=ec69fc48&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/video_list/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_ec69fc48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_ec69fc48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/video_list/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/video_list/Index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/video_list/Index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/video_list/Index.vue?vue&type=template&id=ec69fc48&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/video_list/Index.vue?vue&type=template&id=ec69fc48& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_ec69fc48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=ec69fc48& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Index.vue?vue&type=template&id=ec69fc48&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_ec69fc48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_ec69fc48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);