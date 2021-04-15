(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Translate.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/news_letter/Translate.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
var current_url = '/admin/news_letter';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      editorConfig: {
        language: 'en'
      },
      rules: {
        emailText: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }]
      },
      translate: {
        emailId: this.obj.emailId,
        //此字段会不同
        wordCount: this.obj.wordCount,
        emailSubject: this.obj.emailSubject,
        locale: '',
        translationId: null,
        emailText: "" //翻译后的内容

      },
      loading: false
    };
  },
  created: function created() {
    this.obj.emailText = decodeURIComponent(this.obj.emailText.replace(/\+/g, '%20'));
  },
  methods: {
    //根据语言查询是否已有翻译记录
    translateRecord: function translateRecord() {
      var _this = this;

      this.loading = true;
      axios.post('/admin/translate/record', {
        model: 'NewsLetterTranslation',
        relate_id: 'emailId',
        id: this.translate.emailId,
        locale: this.translate.locale
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            message: res.data.message,
            type: 'error'
          });
        } else {
          if (res.data.data) {
            _this.translate.translationId = res.data.data.translationId; //url decode

            _this.translate.emailText = decodeURIComponent(res.data.data.emailText.replace(/\+/g, '%20'));
          } else {
            _this.$notify({
              message: "No translation result, default to original content",
              type: 'info'
            });

            _this.translate.translationId = null;
            _this.translate.emailText = _this.obj.emailText;
          }
        }

        _this.loading = false;
      });
    },
    submitForm: function submitForm() {
      var _this2 = this;

      this.$refs['form'].validate(function (valid) {
        if (valid) {
          _this2.loading = true;
          axios.post(current_url + '/translate', _this2.translate).then(function (res) {
            if (res.data.code != 0 || res.status != 200) {
              _this2.$notify({
                message: res.data.message,
                type: 'error'
              });
            } else {
              _this2.$notify({
                message: res.data.message,
                type: 'success'
              });

              _this2.$confirm('Do you want to jump to the list?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
              }).then(function () {
                window.location.href = current_url;
              })["catch"](function () {
                window.location.href = window.location.href;
              });
            }

            _this2.loading = false;
          });
        }
      });
    }
  },
  props: ['obj', 'languageSelect']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Translate.vue?vue&type=template&id=f2143f2c&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/news_letter/Translate.vue?vue&type=template&id=f2143f2c& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
                    [_c("span", [_vm._v("Translate")])]
                  ),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v("Template Name: "),
                    _c("span", [_vm._v(_vm._s(_vm.obj.emailName))])
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v("Subject："),
                    _c("span", [_vm._v(_vm._s(_vm.obj.emailSubject))])
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v("Function Code："),
                    _c("span", [_vm._v(_vm._s(_vm.obj.funcCode))])
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-form",
                    {
                      ref: "form",
                      attrs: {
                        model: _vm.translate,
                        rules: _vm.rules,
                        size: "medium",
                        "label-position": "top"
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "Column description (English) :" } },
                        [
                          _c("ckeditor", {
                            attrs: {
                              config: { language: "en", readOnly: true },
                              id: "origin"
                            },
                            model: {
                              value: _vm.obj.emailText,
                              callback: function($$v) {
                                _vm.$set(_vm.obj, "emailText", $$v)
                              },
                              expression: "obj.emailText"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "word-count" }, [
                        _vm._v("WordCount: "),
                        _c("b", [_vm._v(_vm._s(this.obj.wordCount))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { prop: "emailText" } },
                        [
                          _c(
                            "template",
                            { slot: "label" },
                            [
                              _vm._v(
                                "Translated into :\r\n                        "
                              ),
                              _c(
                                "el-select",
                                {
                                  staticStyle: {
                                    width: "120px",
                                    "margin-left": "20px"
                                  },
                                  attrs: {
                                    size: "mini",
                                    prop: "locale",
                                    rules: {
                                      required: true,
                                      message: "Required",
                                      trigger: "blur"
                                    }
                                  },
                                  on: { change: _vm.translateRecord },
                                  model: {
                                    value: _vm.translate.locale,
                                    callback: function($$v) {
                                      _vm.$set(_vm.translate, "locale", $$v)
                                    },
                                    expression: "translate.locale"
                                  }
                                },
                                _vm._l(_vm.languageSelect, function(
                                  item,
                                  index
                                ) {
                                  return _c("el-option", {
                                    key: index,
                                    attrs: { label: index, value: item }
                                  })
                                }),
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("ckeditor", {
                            attrs: {
                              config: _vm.editorConfig,
                              id: "translate"
                            },
                            model: {
                              value: _vm.translate.emailText,
                              callback: function($$v) {
                                _vm.$set(_vm.translate, "emailText", $$v)
                              },
                              expression: "translate.emailText"
                            }
                          })
                        ],
                        2
                      ),
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

/***/ "./resources/assets/js/components/news_letter/Translate.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/news_letter/Translate.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Translate_vue_vue_type_template_id_f2143f2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Translate.vue?vue&type=template&id=f2143f2c& */ "./resources/assets/js/components/news_letter/Translate.vue?vue&type=template&id=f2143f2c&");
/* harmony import */ var _Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Translate.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/news_letter/Translate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Translate_vue_vue_type_template_id_f2143f2c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Translate_vue_vue_type_template_id_f2143f2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/news_letter/Translate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/news_letter/Translate.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/news_letter/Translate.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Translate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Translate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/news_letter/Translate.vue?vue&type=template&id=f2143f2c&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/news_letter/Translate.vue?vue&type=template&id=f2143f2c& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_f2143f2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Translate.vue?vue&type=template&id=f2143f2c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/news_letter/Translate.vue?vue&type=template&id=f2143f2c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_f2143f2c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_f2143f2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);