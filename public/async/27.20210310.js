(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/RouteList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/admin/RouteList.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    appendRootMenu: function appendRootMenu() {
      this.dialogVisible = true;
      this.menu = this.origin_menu;
      this.is_edit = false;
      this.parent_name = 'Add Root Menu Path';
    },
    //点击左侧树
    NodeClick: function NodeClick(data) {},
    showAppend: function showAppend(data) {
      console.log(data);
      this.dialogVisible = true;
      this.menu = this.origin_menu;
      this.menu.pid = data.id;
      this.parent_name = 'Add submenu to ' + data.name;
    },
    showEdit: function showEdit(data) {
      console.log(data);
      this.dialogVisible = true;
      this.menu = data;
      this.is_edit = true;
      this.parent_name = 'Edit ' + data.name;
      console.log(this.menu);
    },
    append: function append(data) {
      var _this = this;

      //请求接口
      axios.post('/admin/settings/routes', this.menu).then(function (res) {
        if (res.data.code != 0 || res.status != 200) {
          _this.$notify({
            title: 'Failed',
            message: res.data.message,
            type: 'error'
          });
        } else {
          _this.$notify({
            title: 'Success',
            message: res.data.message,
            type: 'success'
          });

          _this.button_loading = true;

          if (_this.is_edit) {
            //修改
            data.name = _this.menu.name;
          } else {
            //新增
            window.location.href = window.location.href;
          }

          _this.button_loading = false;
          _this.menu = _this.origin_menu;
          _this.dialogVisible = false;
        }
      });
    },
    remove: function remove(node, data) {
      var _this2 = this;

      this.$confirm('Delete this path?', 'Notice', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(function () {
        axios["delete"]('/admin/settings/routes?id=' + data.id).then(function (res) {
          if (res.data.code != 0 || res.status != 200) {
            _this2.$notify({
              title: 'Failed',
              message: res.data.message,
              type: 'error'
            });
          } else {
            _this2.$notify({
              title: 'Success',
              message: res.data.message,
              type: 'success'
            });

            var parent = node.parent;
            var children = parent.data.submenus || parent.data;
            var index = children.findIndex(function (d) {
              return d.id === data.id;
            });
            children.splice(index, 1);
          }
        });
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.loading = true;
    axios.post('/admin/role/get_menu').then(function (res) {
      if (res.data.code !== 0 || res.status !== 200) {
        _this3.$notify({
          title: 'Failed',
          message: res.data.message,
          type: 'error'
        });
      } else {
        _this3.tree = res.data.data;
        _this3.loading = false;
      }
    });
  },
  data: function data() {
    return {
      dialogVisible: false,
      loading: false,
      visible: false,
      defaultProps: {
        children: 'submenus',
        label: 'name'
      },
      is_edit: false,
      button_loading: false,
      //上传数据时的button加载中
      parent_name: null,
      menu: {
        pid: 0,
        name: "",
        url: "",
        icon: "",
        id: 0
      },
      origin_menu: {
        pid: 0,
        name: "",
        url: "",
        icon: "",
        id: 0
      },
      rules: {
        name: [{
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
      tree: []
    };
  },
  props: []
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/RouteList.vue?vue&type=template&id=6c22f360&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/admin/RouteList.vue?vue&type=template&id=6c22f360& ***!
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
      _vm.dialogVisible
        ? _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.parent_name,
                "close-on-click-modal": false,
                visible: _vm.dialogVisible,
                width: "40%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogVisible = $event
                }
              }
            },
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  attrs: { model: _vm.menu, rules: _vm.rules, size: "small" }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "Title", prop: "name" } },
                    [
                      _c("el-input", {
                        attrs: { type: "text", placeholder: "menu title" },
                        model: {
                          value: _vm.menu.name,
                          callback: function($$v) {
                            _vm.$set(_vm.menu, "name", $$v)
                          },
                          expression: "menu.name"
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
                        attrs: { type: "text", placeholder: "menu url" },
                        model: {
                          value: _vm.menu.url,
                          callback: function($$v) {
                            _vm.$set(_vm.menu, "url", $$v)
                          },
                          expression: "menu.url"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "Icon" } },
                    [
                      _c("el-input", {
                        attrs: {
                          type: "text",
                          placeholder: "el-icon-something"
                        },
                        model: {
                          value: _vm.menu.icon,
                          callback: function($$v) {
                            _vm.$set(_vm.menu, "icon", $$v)
                          },
                          expression: "menu.icon"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("el-input", {
                    attrs: { type: "hidden" },
                    model: {
                      value: _vm.menu.id,
                      callback: function($$v) {
                        _vm.$set(_vm.menu, "id", $$v)
                      },
                      expression: "menu.id"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "dialog-footer",
                  attrs: { slot: "footer" },
                  slot: "footer"
                },
                [
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialogVisible = false
                        }
                      }
                    },
                    [_vm._v("Cancel")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary", loading: _vm.button_loading },
                      on: {
                        click: function() {
                          return _vm.append(_vm.menu)
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
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-card",
        { attrs: { shadow: "hover" } },
        [
          _c(
            "div",
            { attrs: { slot: "header" }, slot: "header" },
            [
              _vm._v("\n                Route Menu List\n                "),
              _c(
                "el-button",
                {
                  staticClass: "pull-right",
                  attrs: { type: "primary", size: "small" },
                  on: {
                    click: function($event) {
                      return _vm.appendRootMenu()
                    }
                  }
                },
                [_vm._v("Add a Root Menu")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("el-tree", {
            ref: "tree",
            staticClass: "filter-tree",
            staticStyle: { "font-size": "16px" },
            attrs: {
              data: _vm.tree,
              props: _vm.defaultProps,
              "highlight-current": true,
              "expand-on-click-node": false,
              "default-expand-all": true,
              "node-key": "url"
            },
            on: { "node-click": _vm.NodeClick },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var node = ref.node
                  var data = ref.data
                  return _c("span", { staticClass: "custom-tree-node" }, [
                    _c("span", [
                      _c("i", {
                        class: data.icon,
                        staticStyle: { "margin-right": "10px" }
                      }),
                      _vm._v(_vm._s(data.name) + "\n                        "),
                      _c("a", { attrs: { href: "" } }, [
                        _vm._v("( " + _vm._s(data.url) + " )")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      [
                        _c("el-button", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: data.pid === 0,
                              expression: "data.pid === 0"
                            }
                          ],
                          attrs: {
                            type: "text",
                            icon: "el-icon-plus",
                            circle: "",
                            alt: "Add Submenu"
                          },
                          on: {
                            click: function($event) {
                              return _vm.showAppend(data)
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("el-button", {
                          attrs: {
                            type: "text",
                            icon: "el-icon-edit",
                            circle: "",
                            alt: "Edit Menu"
                          },
                          on: {
                            click: function($event) {
                              return _vm.showEdit(data)
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("el-button", {
                          attrs: {
                            type: "text",
                            icon: "el-icon-delete",
                            circle: "",
                            alt: "Delete"
                          },
                          on: {
                            click: function($event) {
                              return _vm.remove(node, data)
                            }
                          }
                        })
                      ],
                      1
                    )
                  ])
                }
              }
            ])
          })
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

/***/ "./resources/assets/js/components/admin/RouteList.vue":
/*!************************************************************!*\
  !*** ./resources/assets/js/components/admin/RouteList.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RouteList_vue_vue_type_template_id_6c22f360___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RouteList.vue?vue&type=template&id=6c22f360& */ "./resources/assets/js/components/admin/RouteList.vue?vue&type=template&id=6c22f360&");
/* harmony import */ var _RouteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RouteList.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/admin/RouteList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RouteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RouteList_vue_vue_type_template_id_6c22f360___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RouteList_vue_vue_type_template_id_6c22f360___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/admin/RouteList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/admin/RouteList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/admin/RouteList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RouteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RouteList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/RouteList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RouteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/admin/RouteList.vue?vue&type=template&id=6c22f360&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/admin/RouteList.vue?vue&type=template&id=6c22f360& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RouteList_vue_vue_type_template_id_6c22f360___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RouteList.vue?vue&type=template&id=6c22f360& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/admin/RouteList.vue?vue&type=template&id=6c22f360&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RouteList_vue_vue_type_template_id_6c22f360___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RouteList_vue_vue_type_template_id_6c22f360___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);