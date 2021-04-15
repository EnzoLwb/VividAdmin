(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/news_letter/Form.vue?vue&type=script&lang=js& ***!
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
var current_url = '/admin/news_letter';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      article: this.originObj,
      editorConfig: {
        filebrowserBrowseUrl: '/ckfinder/browser',
        filebrowserImageBrowseUrl: '/ckfinder/browser?type=Images',
        filebrowserFlashBrowseUrl: '/ckfinder/browser?type=Flash',
        filebrowserUploadUrl: '/ckfinder/connector?command=QuickUpload&type=Files',
        filebrowserImageUploadUrl: '/ckfinder/connector?command=QuickUpload&type=Images',
        filebrowserFlashUploadUrl: '/ckfinder/connector?command=QuickUpload&type=Flash',
        // filebrowserWindowWidth : '600',     //文件浏览宽
        // filebrowserWindowHeight : '300',     //文件浏览宽
        height: 425,
        allowedContent: true,
        toolbarCanCollapse: false,
        language: 'en'
      },
      form: {
        emailName: '',
        funcCode: '',
        emailSubject: '',
        emailFrom: '',
        emailText: '',
        fromName: '',
        Disabled: 0,
        wordCount: 0,
        emailId: '',
        module: ''
      },
      rules: {
        emailName: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        emailSubject: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        fromName: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        emailFrom: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        module: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        funcCode: [{
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
    if (Object.keys(this.originObj).length == 0) {
      this.article = this.form;
    } else {
      this.article.emailText = decodeURIComponent(this.article.emailText.replace(/\+/g, '%20'));
    }
  },
  methods: {
    countWord: function countWord() {
      var val = this.article.emailText.trim();

      if (!val) {
        this.article.wordCount = 0;
      } else {
        this.article.wordCount = val.split(" ").length;
      }
    },
    submitForm: function submitForm() {
      var _this = this;

      console.log(this.article);
      this.$refs['form'].validate(function (valid) {
        if (valid) {
          _this.loading = true;
          axios.post(current_url + '/save', _this.article).then(function (res) {
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

              _this.$confirm('Do you want to jump to the list?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
              }).then(function () {
                window.location.href = current_url;
              })["catch"](function () {
                window.location.href = window.location.href;
              });
            }

            _this.loading = false;
          });
        }
      });
    }
  },
  props: ['originObj', 'title', 'editSite']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Form.vue?vue&type=template&id=22bbf150&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/news_letter/Form.vue?vue&type=template&id=22bbf150& ***!
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
            { attrs: { xs: 24, sm: 24, md: 20, lg: 20, xl: 20 } },
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
                        {
                          attrs: { label: "Templete Name", prop: "emailName" }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.emailName,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "emailName", $$v)
                              },
                              expression: "article.emailName"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Function Code", prop: "funcCode" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.funcCode,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "funcCode", $$v)
                              },
                              expression: "article.funcCode"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Subject", prop: "emailSubject" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.emailSubject,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "emailSubject", $$v)
                              },
                              expression: "article.emailSubject"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "From Address", prop: "emailFrom" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.emailFrom,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "emailFrom", $$v)
                              },
                              expression: "article.emailFrom"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "From Name", prop: "fromName" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.fromName,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "fromName", $$v)
                              },
                              expression: "article.fromName"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Deactive" } },
                        [
                          _c("el-switch", {
                            attrs: {
                              "active-color": "#13ce66",
                              "inactive-color": "#ff4949"
                            },
                            model: {
                              value: _vm.article.Disabled,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "Disabled", $$v)
                              },
                              expression: "article.Disabled"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Module", prop: "module" } },
                        [
                          _c(
                            "el-select",
                            {
                              model: {
                                value: _vm.article.module,
                                callback: function($$v) {
                                  _vm.$set(_vm.article, "module", $$v)
                                },
                                expression: "article.module"
                              }
                            },
                            [
                              _c("el-option", {
                                attrs: { label: "console", value: "console" }
                              }),
                              _vm._v(" "),
                              _c("el-option", {
                                attrs: { label: "online", value: "online" }
                              }),
                              _vm._v(" "),
                              _c("el-option", {
                                attrs: { label: "hawk", value: "hawk" }
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
                        { attrs: { label: "Column description" } },
                        [
                          _c("ckeditor", {
                            attrs: { config: _vm.editorConfig },
                            on: { input: _vm.countWord },
                            model: {
                              value: _vm.article.emailText,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "emailText", $$v)
                              },
                              expression: "article.emailText"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "word-count" }, [
                        _vm._v("WordCount: "),
                        _c("b", [_vm._v(_vm._s(this.article.wordCount))])
                      ]),
                      _vm._v(" "),
                      _c("el-input", {
                        attrs: { type: "hidden" },
                        model: {
                          value: _vm.article.emailId,
                          callback: function($$v) {
                            _vm.$set(_vm.article, "emailId", $$v)
                          },
                          expression: "article.emailId"
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/news_letter/Form.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/news_letter/Form.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_22bbf150___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=22bbf150& */ "./resources/assets/js/components/news_letter/Form.vue?vue&type=template&id=22bbf150&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/news_letter/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_22bbf150___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_22bbf150___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/news_letter/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/news_letter/Form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/news_letter/Form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/news_letter/Form.vue?vue&type=template&id=22bbf150&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/news_letter/Form.vue?vue&type=template&id=22bbf150& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_22bbf150___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=22bbf150& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Form.vue?vue&type=template&id=22bbf150&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_22bbf150___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_22bbf150___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);