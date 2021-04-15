(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/page_list/Form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/page_list/Form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
var current_url = '/admin/page_list';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      article: this.originObj,
      form: {
        website: '',
        module_id: '',
        name: '',
        url: '',
        note: '',
        page_id: '',
        screenshots: []
      },
      rules: {
        name: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        website: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        module_id: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        note: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        screenshots: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        url: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      loading: false
    };
  },
  created: function created() {
    if (Object.keys(this.originObj).length == 0) {
      this.article = this.form;
    }
  },
  methods: {
    handleRemove: function handleRemove(file, fileList) {
      this.article.screenshots = fileList;
    },
    handlePictureCardPreview: function handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    successUpload: function successUpload(response) {
      this.loading = false;
      this.article.screenshots.push(response.data);
    },
    submitForm: function submitForm() {
      var _this = this;

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
  props: ['moduleSelect', 'originObj', 'title']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/page_list/Form.vue?vue&type=template&id=6f60095c&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/page_list/Form.vue?vue&type=template&id=6f60095c& ***!
  \************************************************************************************************************************************************************************************************************************/
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
            { attrs: { xs: 24, sm: 24, md: 20, lg: 16, xl: 16 } },
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
                        { attrs: { label: "Page Name", prop: "name" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.name,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "name", $$v)
                              },
                              expression: "article.name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Page URL", prop: "url" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.article.url,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "url", $$v)
                              },
                              expression: "article.url"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Site", prop: "website" } },
                        [
                          _c(
                            "el-select",
                            {
                              model: {
                                value: _vm.article.website,
                                callback: function($$v) {
                                  _vm.$set(_vm.article, "website", $$v)
                                },
                                expression: "article.website"
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
                        { attrs: { label: "Site Module", prop: "module_id" } },
                        [
                          _c(
                            "el-select",
                            {
                              staticStyle: { width: "150px" },
                              attrs: { clearable: "" },
                              model: {
                                value: _vm.article.module_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.article, "module_id", $$v)
                                },
                                expression: "article.module_id"
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
                        { attrs: { label: "Note", prop: "note" } },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea" },
                            model: {
                              value: _vm.article.note,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "note", $$v)
                              },
                              expression: "article.note"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { prop: "screenshots" } },
                        [
                          _c(
                            "template",
                            { slot: "label" },
                            [
                              _vm._v(
                                "\r\n                        Page ScreenShots\r\n                        "
                              ),
                              _c(
                                "el-tooltip",
                                {
                                  staticClass: "item",
                                  attrs: {
                                    effect: "dark",
                                    content:
                                      "More than 1 screenshot can be added to display various page status",
                                    placement: "top-start"
                                  }
                                },
                                [_c("i", { staticClass: "el-icon-question" })]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-upload",
                            {
                              attrs: {
                                action: this.unils.upload_img_path,
                                "on-success": _vm.successUpload,
                                "before-upload": this.unils.beforeUploadImg,
                                "list-type": "picture-card",
                                "on-preview": _vm.handlePictureCardPreview,
                                "on-remove": _vm.handleRemove,
                                "file-list": _vm.article.screenshots
                              }
                            },
                            [_c("i", { staticClass: "el-icon-plus" })]
                          )
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("el-input", {
                        attrs: { type: "hidden" },
                        model: {
                          value: _vm.article.page_id,
                          callback: function($$v) {
                            _vm.$set(_vm.article, "page_id", $$v)
                          },
                          expression: "article.page_id"
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { visible: _vm.dialogVisible },
          on: {
            "update:visible": function($event) {
              _vm.dialogVisible = $event
            }
          }
        },
        [
          _c("img", {
            attrs: { width: "100%", src: _vm.dialogImageUrl, alt: "" }
          })
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/js/components/page_list/Form.vue":
/*!***********************************************************!*\
  !*** ./resources/assets/js/components/page_list/Form.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_6f60095c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=6f60095c& */ "./resources/assets/js/components/page_list/Form.vue?vue&type=template&id=6f60095c&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/page_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_6f60095c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_6f60095c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/page_list/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/page_list/Form.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/page_list/Form.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/page_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/page_list/Form.vue?vue&type=template&id=6f60095c&":
/*!******************************************************************************************!*\
  !*** ./resources/assets/js/components/page_list/Form.vue?vue&type=template&id=6f60095c& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_6f60095c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=6f60095c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/page_list/Form.vue?vue&type=template&id=6f60095c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_6f60095c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_6f60095c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);