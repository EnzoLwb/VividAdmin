(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/content_list/Form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
var current_url = '/admin/content_list';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      article: this.originObj,
      form: {
        key_name: '',
        key_value: [""],
        page_id: '',
        key_id: '',
        word_count: 0
      },
      rules: {
        page_id: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        key_name: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }]
      },
      site: this.editSite,
      pages: [],
      loading: false,
      pagesLoading: false
    };
  },
  created: function created() {
    var _this = this;

    if (Object.keys(this.originObj).length == 0) {
      this.article = this.form;
    } else {
      //加载pages 和 默认选中的内容
      var page_id = this.originObj.page_id;
      this.pagesLoading = true;
      this.article.page_id = null;
      axios.post('/admin/pages_by_site', {
        site: this.site
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            title: 'Request Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this.pages = res.data.data;
          _this.article.page_id = page_id;
        }

        _this.pagesLoading = false;
      });
    }
  },
  methods: {
    /*动态添加*/
    removeDesc: function removeDesc(index) {
      this.article.key_value.splice(index, 1);
    },
    addDesc: function addDesc() {
      this.article.key_value.push('');
    },
    countWord: function countWord() {
      //计算每个desc 的 countword
      var count = 0;
      this.article.key_value.forEach(function (item) {
        var val = item.trim();

        if (val) {
          count += val.split(" ").length;
        }
      });
      this.article.word_count = count;
    },
    getPages: function getPages() {
      var _this2 = this;

      this.pagesLoading = true;
      this.article.page_id = null; //默认change会清空选择

      axios.post('/admin/pages_by_site', {
        site: this.site
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this2.$notify({
            title: 'Request Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this2.pages = res.data.data;
        }

        _this2.pagesLoading = false;
      });
    },
    submitForm: function submitForm() {
      var _this3 = this;

      console.log(this.article);
      this.$refs['form'].validate(function (valid) {
        if (valid) {
          _this3.loading = true;
          axios.post(current_url + '/save', _this3.article).then(function (res) {
            if (res.data.code != 0 || res.status != 200) {
              _this3.$notify({
                message: res.data.message,
                type: 'error'
              });
            } else {
              _this3.$notify({
                message: res.data.message,
                type: 'success'
              });

              _this3.$confirm('Do you want to jump to the list?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
              }).then(function () {
                window.location.href = current_url;
              })["catch"](function () {
                window.location.href = window.location.href;
              });
            }

            _this3.loading = false;
          });
        }
      });
    }
  },
  props: ['originObj', 'title', 'editSite']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Form.vue?vue&type=template&id=37de6230&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/content_list/Form.vue?vue&type=template&id=37de6230& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ]
    },
    [
      _c(
        "el-row",
        [
          _c(
            "el-col",
            { attrs: { xs: 24, sm: 24, md: 20, lg: 13, xl: 13 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "hover" } },
                [
                  _c(
                    "div",
                    {
                      staticClass: "clearfix",
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [_c("span", [_vm._v(_vm._s(_vm.title))])]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form",
                    {
                      ref: "form",
                      staticStyle: { width: "80%" },
                      attrs: {
                        model: _vm.article,
                        rules: _vm.rules,
                        size: "medium",
                        "label-position": "top"
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "Column Name", prop: "key_name" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.key_name,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "key_name", $$v)
                              },
                              expression: "article.key_name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Site" } },
                        [
                          _c(
                            "el-select",
                            {
                              on: { change: _vm.getPages },
                              model: {
                                value: _vm.site,
                                callback: function($$v) {
                                  _vm.site = $$v
                                },
                                expression: "site"
                              }
                            },
                            [
                              _c("el-option", {
                                attrs: { label: "Service", value: "Service" }
                              }),
                              _vm._v(" "),
                              _c("el-option", {
                                attrs: { label: "Media", value: "Media" }
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
                        {
                          directives: [
                            {
                              name: "loading",
                              rawName: "v-loading",
                              value: _vm.pagesLoading,
                              expression: "pagesLoading"
                            }
                          ],
                          attrs: { label: "Web page name", prop: "page_id" }
                        },
                        [
                          _c(
                            "el-select",
                            {
                              staticStyle: { "min-width": "250px" },
                              attrs: { clearable: "" },
                              model: {
                                value: _vm.article.page_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.article, "page_id", $$v)
                                },
                                expression: "article.page_id"
                              }
                            },
                            _vm._l(_vm.pages, function(item) {
                              return _c("el-option", {
                                key: item.page_id,
                                attrs: {
                                  label: item.name + "   (" + item.url + ")",
                                  value: item.page_id
                                }
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
                        { staticStyle: { "margin-bottom": "0" } },
                        [
                          _c("template", { slot: "label" }, [
                            _c("span", [_vm._v(" Column description: ")]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v("( WordCount: "),
                              _c("b", { staticStyle: { color: "red" } }, [
                                _vm._v(_vm._s(this.article.word_count))
                              ]),
                              _vm._v(" )")
                            ])
                          ])
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _vm._l(_vm.article.key_value, function(val, index) {
                        return _c(
                          "el-form-item",
                          {
                            key: index,
                            attrs: {
                              prop: "key_value." + index,
                              rules: {
                                required: true,
                                message: "Required",
                                trigger: "blur"
                              }
                            }
                          },
                          [
                            _c(
                              "el-row",
                              [
                                _c(
                                  "el-col",
                                  { attrs: { span: 22 } },
                                  [
                                    _c("el-input", {
                                      attrs: { type: "textarea" },
                                      on: { input: _vm.countWord },
                                      model: {
                                        value: _vm.article.key_value[index],
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.article.key_value,
                                            index,
                                            $$v
                                          )
                                        },
                                        expression: "article.key_value[index]"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-col",
                                  { attrs: { span: 1, offset: 1 } },
                                  [
                                    _c("el-button", {
                                      attrs: {
                                        type: "danger",
                                        size: "mini",
                                        round: "",
                                        icon: "el-icon-delete"
                                      },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.removeDesc(index)
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
                      }),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          attrs: {
                            icon: "el-icon-plus",
                            size: "small",
                            type: "success"
                          },
                          on: { click: _vm.addDesc }
                        },
                        [_vm._v("Add Desc")]
                      ),
                      _vm._v(" "),
                      _c("el-input", {
                        attrs: { type: "hidden" },
                        model: {
                          value: _vm.article.key_id,
                          callback: function($$v) {
                            _vm.$set(_vm.article, "key_id", $$v)
                          },
                          expression: "article.key_id"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", loading: _vm.loading },
                              on: {
                                click: function($event) {
                                  return _vm.submitForm()
                                }
                              }
                            },
                            [_vm._v("Submit")]
                          )
                        ],
                        1
                      )
                    ],
                    2
                  )
                ],
                1
              )
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

/***/ "./resources/assets/js/components/content_list/Form.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/content_list/Form.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_37de6230___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=37de6230& */ "./resources/assets/js/components/content_list/Form.vue?vue&type=template&id=37de6230&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/content_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_37de6230___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_37de6230___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/content_list/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/content_list/Form.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/content_list/Form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/content_list/Form.vue?vue&type=template&id=37de6230&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/content_list/Form.vue?vue&type=template&id=37de6230& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_37de6230___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=37de6230& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Form.vue?vue&type=template&id=37de6230&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_37de6230___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_37de6230___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);