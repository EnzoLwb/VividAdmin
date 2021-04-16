(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/img_list/Form.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/img_list/Form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
var current_url = '/admin/img_list';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      article: this.originObj,
      form: {
        title: '',
        url: '',
        page_id: '',
        pic_id: '',
        pic_type: '',
        pic: '',
        word_count: 0,
        descriptions: ["", "", ""]
      },
      rules: {
        page_id: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        pic: [{
          required: true,
          message: 'Pic Required',
          trigger: 'blur'
        }],
        pic_type: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        title: [{
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
    countWord: function countWord() {
      var count = 0;
      this.article.descriptions.forEach(function (item) {
        var val = item.trim();

        if (val) {
          count += val.split(" ").length;
        }
      });
      this.article.word_count = count;
    },
    successUpload: function successUpload(response, file, fileList) {
      console.log(response.data);
      this.article.pic = response.data.path;
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
  props: ['originObj', 'title', 'editSite', 'typeSelect']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/img_list/Form.vue?vue&type=template&id=c683fd9c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/img_list/Form.vue?vue&type=template&id=c683fd9c& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
                        size: "small",
                        "label-position": "top"
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "Title", prop: "title" } },
                        [
                          _c("el-input", {
                            attrs: { placeholder: "Enter the title" },
                            model: {
                              value: _vm.article.title,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "title", $$v)
                              },
                              expression: "article.title"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Url", prop: "url" } },
                        [
                          _c("el-input", {
                            attrs: { placeholder: "Enter the Open page link" },
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
                        { attrs: { label: "Category", prop: "pic_type" } },
                        [
                          _c(
                            "el-select",
                            {
                              staticStyle: { width: "150px" },
                              attrs: { clearable: "" },
                              model: {
                                value: _vm.article.pic_type,
                                callback: function($$v) {
                                  _vm.$set(_vm.article, "pic_type", $$v)
                                },
                                expression: "article.pic_type"
                              }
                            },
                            _vm._l(_vm.typeSelect, function(item) {
                              return _c("el-option", {
                                key: item,
                                attrs: { label: item, value: item }
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
                        { attrs: { label: "Description 1" } },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea" },
                            on: { input: _vm.countWord },
                            model: {
                              value: _vm.article.descriptions[0],
                              callback: function($$v) {
                                _vm.$set(_vm.article.descriptions, 0, $$v)
                              },
                              expression: "article.descriptions[0]"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Description 2" } },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea" },
                            on: { input: _vm.countWord },
                            model: {
                              value: _vm.article.descriptions[1],
                              callback: function($$v) {
                                _vm.$set(_vm.article.descriptions, 1, $$v)
                              },
                              expression: "article.descriptions[1]"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Description 3" } },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea" },
                            on: { input: _vm.countWord },
                            model: {
                              value: _vm.article.descriptions[2],
                              callback: function($$v) {
                                _vm.$set(_vm.article.descriptions, 2, $$v)
                              },
                              expression: "article.descriptions[2]"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "word-count" }, [
                        _vm._v("WordCount: "),
                        _c("b", [_vm._v(_vm._s(this.article.word_count))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Upload image", prop: "pic" } },
                        [
                          _c(
                            "el-upload",
                            {
                              staticClass: "upload-demo",
                              attrs: {
                                action: this.unils.upload_img_path,
                                "before-upload": this.unils.beforeUploadImg,
                                "on-success": _vm.successUpload,
                                "show-file-list": false
                              }
                            },
                            [
                              _vm.article.pic
                                ? _c("img", {
                                    staticClass: "avatar",
                                    attrs: { src: _vm.article.pic }
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "el-button",
                                { attrs: { size: "small", type: "info" } },
                                [_vm._v("Browse")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("el-input", {
                        attrs: { type: "hidden" },
                        model: {
                          value: _vm.article.pic_id,
                          callback: function($$v) {
                            _vm.$set(_vm.article, "pic_id", $$v)
                          },
                          expression: "article.pic_id"
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

/***/ "./resources/assets/js/components/img_list/Form.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/img_list/Form.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_c683fd9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=c683fd9c& */ "./resources/assets/js/components/img_list/Form.vue?vue&type=template&id=c683fd9c&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/img_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_c683fd9c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_c683fd9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/img_list/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/img_list/Form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/img_list/Form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/img_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/img_list/Form.vue?vue&type=template&id=c683fd9c&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/img_list/Form.vue?vue&type=template&id=c683fd9c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_c683fd9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=c683fd9c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/img_list/Form.vue?vue&type=template&id=c683fd9c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_c683fd9c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_c683fd9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);