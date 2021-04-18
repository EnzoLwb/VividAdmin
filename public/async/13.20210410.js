(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Translate.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/content_list/Translate.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
var current_url = '/admin/content_list';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      rules: {
        locale: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }]
      },
      translate: {
        key_id: this.obj.key_id,
        //此字段会不同
        word_count: this.obj.word_count,
        locale: '',
        translation_id: null,
        key_value: [] //翻译后的内容

      },
      loading: false,
      autosize: {
        minRows: 3
      }
    };
  },
  created: function created() {
    var _this = this;

    //根据原文的个数 push 多个译文textarea
    this.obj.key_value.forEach(function (item) {
      _this.translate.key_value.push("");
    });
  },
  methods: {
    //根据语言查询是否已有翻译记录
    translateRecord: function translateRecord() {
      var _this2 = this;

      this.loading = true;
      axios.post('/admin/translate/record', {
        model: 'ContentListTranslation',
        relate_id: 'key_id',
        id: this.translate.key_id,
        locale: this.translate.locale
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this2.$notify({
            message: res.data.message,
            type: 'error'
          });
        } else {
          if (res.data.data) {
            _this2.translate.translation_id = res.data.data.translation_id;
            _this2.translate.key_value = JSON.parse(res.data.data.key_value); //此字段会不同
          } else {
            _this2.translate.translation_id = null;
            _this2.translate.key_value = [];

            _this2.obj.key_value.forEach(function (item) {
              _this2.translate.key_value.push("");
            });
          }
        }

        _this2.loading = false;
      });
    },
    submitForm: function submitForm() {
      var _this3 = this;

      this.$refs['form'].validate(function (valid) {
        if (valid) {
          // 处理翻译内容不填或为空情况
          var trim = false;

          _this3.translate.key_value.forEach(function (item) {
            if (!item.trim()) {
              trim = true;
              return;
            }
          });

          if (trim) {
            _this3.$notify({
              message: 'translate content required',
              type: 'error'
            });

            return;
          }

          _this3.loading = true;
          axios.post(current_url + '/translate', _this3.translate).then(function (res) {
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
  props: ['obj', 'languageSelect']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Translate.vue?vue&type=template&id=506552da&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/content_list/Translate.vue?vue&type=template&id=506552da& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
                    _vm._v("Column name: " + _vm._s(_vm.obj.key_name))
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v("Site URL：" + _vm._s(_vm.obj.website))
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "translate_desc" }, [
                    _vm._v(
                      "Web Page name: " + _vm._s(_vm.obj.page_name) + "（"
                    ),
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
                        "label-position": "top",
                        inline: true
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        {
                          staticStyle: { width: "45%" },
                          attrs: { label: "Column description :" }
                        },
                        _vm._l(_vm.obj.key_value, function(item, index) {
                          return _c("el-input", {
                            key: index,
                            staticStyle: { "margin-bottom": "10px" },
                            attrs: {
                              value: item,
                              disabled: "",
                              type: "textarea",
                              autosize: _vm.autosize
                            }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          staticStyle: { width: "45%" },
                          attrs: { prop: "locale" }
                        },
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
                          _vm._l(_vm.translate.key_value, function(
                            item,
                            index
                          ) {
                            return _c("el-input", {
                              key: index,
                              staticStyle: { "margin-bottom": "10px" },
                              attrs: {
                                disabled: !_vm.translate.locale,
                                placeholder: _vm.translate.locale
                                  ? ""
                                  : "Please Select Language",
                                type: "textarea",
                                autosize: _vm.autosize
                              },
                              model: {
                                value: _vm.translate.key_value[index],
                                callback: function($$v) {
                                  _vm.$set(_vm.translate.key_value, index, $$v)
                                },
                                expression: "translate.key_value[index]"
                              }
                            })
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "word-count" }, [
                        _vm._v("WordCount: "),
                        _c("b", [_vm._v(_vm._s(this.obj.word_count))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { staticStyle: { width: "100%" } },
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

/***/ "./resources/assets/js/components/content_list/Translate.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/content_list/Translate.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Translate_vue_vue_type_template_id_506552da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Translate.vue?vue&type=template&id=506552da& */ "./resources/assets/js/components/content_list/Translate.vue?vue&type=template&id=506552da&");
/* harmony import */ var _Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Translate.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/content_list/Translate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Translate_vue_vue_type_template_id_506552da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Translate_vue_vue_type_template_id_506552da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/content_list/Translate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/content_list/Translate.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/content_list/Translate.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Translate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Translate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/content_list/Translate.vue?vue&type=template&id=506552da&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/content_list/Translate.vue?vue&type=template&id=506552da& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_506552da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Translate.vue?vue&type=template&id=506552da& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/content_list/Translate.vue?vue&type=template&id=506552da&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_506552da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_506552da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);