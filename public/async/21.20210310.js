(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/seo_list/Translate.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/seo_list/Translate.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
var current_url = '/admin/seo_list/';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      rules: {
        key_value: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }]
      },
      translate: {
        meta_id: this.obj.meta_id,
        //此字段会不同
        word_count: this.obj.word_count,
        locale: '',
        translation_id: null,
        key_value: "" //翻译后的内容

      },
      loading: false,
      autosize: {
        minRows: 6
      }
    };
  },
  created: function created() {},
  methods: {
    //根据语言查询是否已有翻译记录
    translateRecord: function translateRecord() {
      var _this = this;

      this.loading = true;
      axios.post('/admin/translate/record', {
        model: 'SeoListTranslation',
        relate_id: 'meta_id',
        id: this.translate.meta_id,
        locale: this.translate.locale
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            message: res.data.message,
            type: 'error'
          });
        } else {
          console.log(res.data.data);

          if (res.data.data) {
            _this.translate.translation_id = res.data.data.translation_id;
            _this.translate.key_value = res.data.data.key_value; //此字段会不同
          } else {
            _this.translate.translation_id = null;
            _this.translate.key_value = '';
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
          axios.post(current_url + 'translate', _this2.translate).then(function (res) {
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/seo_list/Translate.vue?vue&type=template&id=34236014&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/seo_list/Translate.vue?vue&type=template&id=34236014& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
            { attrs: { xs: 24, sm: 24, md: 20, lg: 12, xl: 12 } },
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
                    _vm._v("Column name: " + _vm._s(_vm.obj.key_name))
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v("Site URL：" + _vm._s(_vm.obj.website))
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v("Page name: " + _vm._s(_vm.obj.page_name) + "（"),
                    _c("a", { attrs: { href: "#" } }, [
                      _vm._v(_vm._s(_vm.obj.url))
                    ]),
                    _vm._v(" ）")
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
                          _c("el-input", {
                            attrs: {
                              disabled: "",
                              type: "textarea",
                              autosize: _vm.autosize
                            },
                            model: {
                              value: _vm.obj.key_value,
                              callback: function($$v) {
                                _vm.$set(_vm.obj, "key_value", $$v)
                              },
                              expression: "obj.key_value"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "word-count" }, [
                        _vm._v("WordCount: "),
                        _c("b", [_vm._v(_vm._s(this.obj.word_count))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { prop: "key_value" } },
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
                                  attrs: { size: "mini" },
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
                          _c("el-input", {
                            attrs: { type: "textarea", autosize: _vm.autosize },
                            model: {
                              value: _vm.translate.key_value,
                              callback: function($$v) {
                                _vm.$set(_vm.translate, "key_value", $$v)
                              },
                              expression: "translate.key_value"
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

/***/ "./resources/assets/js/components/seo_list/Translate.vue":
/*!***************************************************************!*\
  !*** ./resources/assets/js/components/seo_list/Translate.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Translate_vue_vue_type_template_id_34236014___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Translate.vue?vue&type=template&id=34236014& */ "./resources/assets/js/components/seo_list/Translate.vue?vue&type=template&id=34236014&");
/* harmony import */ var _Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Translate.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/seo_list/Translate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Translate_vue_vue_type_template_id_34236014___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Translate_vue_vue_type_template_id_34236014___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/seo_list/Translate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/seo_list/Translate.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/assets/js/components/seo_list/Translate.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Translate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/seo_list/Translate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/seo_list/Translate.vue?vue&type=template&id=34236014&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/seo_list/Translate.vue?vue&type=template&id=34236014& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_34236014___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Translate.vue?vue&type=template&id=34236014& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/seo_list/Translate.vue?vue&type=template&id=34236014&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_34236014___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_34236014___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);