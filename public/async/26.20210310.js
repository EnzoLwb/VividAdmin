(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/word/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/word/Index.vue?vue&type=script&lang=js& ***!
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
var current_url = '/admin/db_terms/';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      locale: "",
      //当前表格翻译语种 默认为中文
      search_form: {
        word: '',
        locale: "",
        word_ids: [],
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
    translateWord: function translateWord(word_id, translate) {
      var _this = this;

      axios.post('/admin/db_terms/translate', {
        word_id: word_id,
        locale: this.locale,
        translate: translate
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this.$notify({
            message: res.data.message,
            type: 'success'
          });
        }

        _this.loading = false;
      });
    },
    //根据语言查询是否已有翻译记录
    getAllTranslateRecord: function getAllTranslateRecord() {
      this.loading = true;
      var word_ids = [];
      this.tabledata.data.forEach(function (item) {
        word_ids.push(item.word_id);
      });
      this.search_form.word_ids = word_ids;
      this.search_form.locale = this.locale;
      console.log(this.search_form);
      this.getData(this.search_form);
    },
    sortChange: function sortChange(column) {
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
        axios["delete"](current_url + '?id=' + row.word_id).then(function (res) {
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
  props: ['module', 'languageSelect', 'group']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/word/Index.vue?vue&type=template&id=370cd844&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/word/Index.vue?vue&type=template&id=370cd844& ***!
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
                [
                  _c("el-input", {
                    attrs: { type: "text", placeholder: "Word" },
                    model: {
                      value: _vm.search_form.word,
                      callback: function($$v) {
                        _vm.$set(_vm.search_form, "word", $$v)
                      },
                      expression: "search_form.word"
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
                  attrs: { type: "primary", size: "medium" },
                  on: {
                    click: function($event) {
                      return _vm.handleOperation("add")
                    }
                  }
                },
                [_vm._v("New Word")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { staticClass: "word-count", attrs: { type: "text" } },
                [
                  _vm._v("WordCount: "),
                  _c("b", [
                    _vm._v(
                      _vm._s(this.tabledata.total ? this.tabledata.total : 0)
                    )
                  ])
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
              attrs: { data: _vm.tabledata.data, border: "", size: "medium" },
              on: { "sort-change": _vm.sortChange }
            },
            [
              _c("el-table-column", {
                attrs: {
                  resizable: "",
                  prop: "word",
                  label: "Word",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "header",
                    fn: function(scope) {
                      return [
                        _c(
                          "el-select",
                          {
                            attrs: { size: "mini" },
                            on: {
                              change: function($event) {
                                return _vm.getAllTranslateRecord()
                              }
                            },
                            model: {
                              value: _vm.locale,
                              callback: function($$v) {
                                _vm.locale = $$v
                              },
                              expression: "locale"
                            }
                          },
                          _vm._l(_vm.languageSelect, function(item, index) {
                            return _c("el-option", {
                              key: index,
                              attrs: { label: index, value: item }
                            })
                          }),
                          1
                        )
                      ]
                    }
                  },
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c("el-input", {
                          attrs: { size: "small" },
                          on: {
                            blur: function($event) {
                              return _vm.translateWord(
                                scope.row.word_id,
                                scope.row.translate
                              )
                            }
                          },
                          model: {
                            value: scope.row.translate,
                            callback: function($$v) {
                              _vm.$set(scope.row, "translate", $$v)
                            },
                            expression: "scope.row.translate"
                          }
                        })
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", label: "Module" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return _vm._l(scope.row.page_detail, function(
                        item,
                        index
                      ) {
                        return _c("p", { key: index }, [
                          _vm._v(_vm._s(item.module))
                        ])
                      })
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", label: "Page Name" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return _vm._l(scope.row.page_detail, function(
                        item,
                        index
                      ) {
                        return _c("p", { key: index }, [
                          _vm._v(_vm._s(item.name))
                        ])
                      })
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { resizable: "", label: "URL" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return _vm._l(scope.row.page_detail, function(
                        item,
                        index
                      ) {
                        return _c("p", { key: index }, [
                          _c(
                            "a",
                            {
                              attrs: { href: _vm._f("ContainsHttp")(item.url) }
                            },
                            [_vm._v(_vm._s(_vm._f("ContainsHttp")(item.url)))]
                          )
                        ])
                      })
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
                          [_vm._v("Delete")]
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

/***/ "./resources/assets/js/components/word/Index.vue":
/*!*******************************************************!*\
  !*** ./resources/assets/js/components/word/Index.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_370cd844___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=370cd844& */ "./resources/assets/js/components/word/Index.vue?vue&type=template&id=370cd844&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/word/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_370cd844___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_370cd844___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/word/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/word/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/assets/js/components/word/Index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/word/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/word/Index.vue?vue&type=template&id=370cd844&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/word/Index.vue?vue&type=template&id=370cd844& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_370cd844___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=370cd844& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/word/Index.vue?vue&type=template&id=370cd844&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_370cd844___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_370cd844___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);