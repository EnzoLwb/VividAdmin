(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/video_list/Form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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
var current_url = '/admin/video_list';
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _this = this;

    var validateRepeatWord = function validateRepeatWord(rule, value, callback) {
      if (value === '') {
        callback(new Error('Required'));
      }

      axios.post('/admin/repeat_word', {
        model: 'VideoList',
        key: 'title',
        value: _this.article.title,
        current_id: _this.article.video_id
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            title: 'Request Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          if (res.data.data.exist) {
            callback(new Error('This word already exists, please do not add it repeatedly'));
          }

          callback();
        }
      });
    };

    return {
      article: this.originObj,
      form: {
        title: '',
        page_id: '',
        video_id: '',
        video: '',
        word_count: 0,
        descriptions: ''
      },
      rules: {
        page_id: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        }],
        video: [{
          required: true,
          message: 'Video Required',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: 'Required',
          trigger: 'blur'
        } // { validator: validateRepeatWord, trigger: 'blur' }
        ]
      },
      site: this.editSite,
      pages: [],
      loading: false,
      pagesLoading: false
    };
  },
  created: function created() {
    var _this2 = this;

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
          _this2.$notify({
            title: 'Request Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this2.pages = res.data.data;
          _this2.article.page_id = page_id;
        }

        _this2.pagesLoading = false;
      });
    }
  },
  methods: {
    countWord: function countWord() {
      var val = this.article.descriptions.trim();

      if (!val) {
        this.article.word_count = 0;
      } else {
        this.article.word_count = val.split(" ").length;
      }
    },
    successUpload: function successUpload(response, file, fileList) {
      console.log(response.data);
      this.article.video = response.data.path;
    },
    getPages: function getPages() {
      var _this3 = this;

      this.pagesLoading = true;
      this.article.page_id = null; //默认change会清空选择

      axios.post('/admin/pages_by_site', {
        site: this.site
      }).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this3.$notify({
            title: 'Request Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this3.pages = res.data.data;
        }

        _this3.pagesLoading = false;
      });
    },
    submitForm: function submitForm() {
      var _this4 = this;

      this.$refs['form'].validate(function (valid) {
        if (valid) {
          _this4.loading = true;
          axios.post(current_url + '/save', _this4.article).then(function (res) {
            if (res.data.code != 0 || res.status != 200) {
              _this4.$notify({
                message: res.data.message,
                type: 'error'
              });
            } else {
              _this4.$notify({
                message: res.data.message,
                type: 'success'
              });

              _this4.$confirm('Do you want to jump to the list?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
              }).then(function () {
                window.location.href = current_url;
              })["catch"](function () {
                window.location.href = window.location.href;
              });
            }

            _this4.loading = false;
          });
        }
      });
    }
  },
  props: ['originObj', 'title', 'editSite', 'typeSelect']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Form.vue?vue&type=template&id=3fcbb0ac&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/video_list/Form.vue?vue&type=template&id=3fcbb0ac& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
                        {
                          attrs: { label: "Description", prop: "descriptions" }
                        },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea" },
                            on: { input: _vm.countWord },
                            model: {
                              value: _vm.article.descriptions,
                              callback: function($$v) {
                                _vm.$set(_vm.article, "descriptions", $$v)
                              },
                              expression: "article.descriptions"
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
                        { attrs: { label: "Upload video", prop: "video" } },
                        [
                          _c(
                            "el-upload",
                            {
                              staticClass: "upload-demo",
                              attrs: {
                                action: this.unils.upload_video_path,
                                "on-success": _vm.successUpload,
                                "show-file-list": false
                              }
                            },
                            [
                              _vm.article.video
                                ? _c("video", {
                                    staticClass: "avatar",
                                    attrs: {
                                      src: _vm.article.video,
                                      controls: "controls"
                                    }
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
                          value: _vm.article.video_id,
                          callback: function($$v) {
                            _vm.$set(_vm.article, "video_id", $$v)
                          },
                          expression: "article.video_id"
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

/***/ "./resources/assets/js/components/video_list/Form.vue":
/*!************************************************************!*\
  !*** ./resources/assets/js/components/video_list/Form.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_3fcbb0ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=3fcbb0ac& */ "./resources/assets/js/components/video_list/Form.vue?vue&type=template&id=3fcbb0ac&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/video_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_3fcbb0ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_3fcbb0ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/video_list/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/video_list/Form.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/video_list/Form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/video_list/Form.vue?vue&type=template&id=3fcbb0ac&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/video_list/Form.vue?vue&type=template&id=3fcbb0ac& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_3fcbb0ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=3fcbb0ac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/video_list/Form.vue?vue&type=template&id=3fcbb0ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_3fcbb0ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_3fcbb0ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);