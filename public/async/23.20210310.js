(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{200:function(t,a,e){"use strict";e.r(a);var s={data:function(){return{rules:{key_value:[{required:!0,message:"Required",trigger:"blur"}]},translate:{meta_id:this.obj.meta_id,word_count:this.obj.word_count,locale:"",translation_id:null,key_value:""},loading:!1,autosize:{minRows:6}}},created:function(){},methods:{translateRecord:function(){var t=this;this.loading=!0,axios.post("/admin/translate/record",{model:"SeoListTranslation",relate_id:"meta_id",id:this.translate.meta_id,locale:this.translate.locale}).then((function(a){0!=a.data.code||200!=a.status?t.$notify({message:a.data.message,type:"error"}):(console.log(a.data.data),a.data.data?(t.translate.translation_id=a.data.data.translation_id,t.translate.key_value=a.data.data.key_value):(t.translate.translation_id=null,t.translate.key_value="")),t.loading=!1}))},submitForm:function(){var t=this;this.$refs.form.validate((function(a){a&&(t.loading=!0,axios.post("/admin/seo_list/translate",t.translate).then((function(a){0!=a.data.code||200!=a.status?t.$notify({message:a.data.message,type:"error"}):(t.$notify({message:a.data.message,type:"success"}),t.$confirm("Do you want to jump to the list?","Confirm",{confirmButtonText:"Yes",cancelButtonText:"No",type:"warning"}).then((function(){window.location.href="/admin/seo_list/"})).catch((function(){window.location.href=window.location.href}))),t.loading=!1})))}))}},props:["obj","languageSelect"]},l=e(0),n=Object(l.a)(s,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[e("el-row",[e("el-col",{attrs:{xs:24,sm:24,md:20,lg:12,xl:12}},[e("el-card",{attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("Translate")])]),t._v(" "),e("p",{staticClass:"translate_desc"},[t._v("Column name: "+t._s(t.obj.key_name))]),t._v(" "),e("p",{staticClass:"translate_desc"},[t._v("Site URL："+t._s(t.obj.website))]),t._v(" "),e("p",{staticClass:"translate_desc"},[t._v("Page name: "+t._s(t.obj.page_name)+"（"),e("a",{attrs:{href:"#"}},[t._v(t._s(t.obj.url))]),t._v(" ）")]),t._v(" "),e("el-form",{ref:"form",attrs:{model:t.translate,rules:t.rules,size:"medium","label-position":"top"}},[e("el-form-item",{attrs:{label:"Column description (English) :"}},[e("el-input",{attrs:{disabled:"",type:"textarea",autosize:t.autosize},model:{value:t.obj.key_value,callback:function(a){t.$set(t.obj,"key_value",a)},expression:"obj.key_value"}})],1),t._v(" "),e("div",{staticClass:"word-count"},[t._v("WordCount: "),e("b",[t._v(t._s(this.obj.word_count))])]),t._v(" "),e("el-form-item",{attrs:{prop:"key_value"}},[e("template",{slot:"label"},[t._v("Translated into :\r\n                        "),e("el-select",{staticStyle:{width:"120px","margin-left":"20px"},attrs:{size:"mini"},on:{change:t.translateRecord},model:{value:t.translate.locale,callback:function(a){t.$set(t.translate,"locale",a)},expression:"translate.locale"}},t._l(t.languageSelect,(function(t,a){return e("el-option",{key:a,attrs:{label:a,value:t}})})),1)],1),t._v(" "),e("el-input",{attrs:{type:"textarea",autosize:t.autosize},model:{value:t.translate.key_value,callback:function(a){t.$set(t.translate,"key_value",a)},expression:"translate.key_value"}})],2),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(a){return t.submitForm()}}},[t._v("Submit")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);a.default=n.exports}}]);