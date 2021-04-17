(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{203:function(e,t,a){"use strict";a.r(t);var i={data:function(){var e=this;return{article:this.originObj,form:{key_name:"",key_value:[""],page_id:"",key_id:"",word_count:0},rules:{page_id:[{required:!0,message:"Required",trigger:"blur"}],key_name:[{required:!0,message:"Required",trigger:"blur"},{validator:function(t,a,i){""===a&&i(new Error("Required")),axios.post("/admin/repeat_word",{model:"ContentList",key:"key_name",value:e.article.key_name,current_id:e.article.key_id}).then((function(t){0!=t.data.code||200!=t.status?e.$notify({title:"Request Failed",message:t.data.message,type:"error"}):(t.data.data.exist&&i(new Error("This word already exists, please do not add it repeatedly")),i())}))},trigger:"blur"}]},site:this.editSite,pages:[],loading:!1,pagesLoading:!1}},created:function(){var e=this;if(0==Object.keys(this.originObj).length)this.article=this.form;else{var t=this.originObj.page_id;this.pagesLoading=!0,this.article.page_id=null,axios.post("/admin/pages_by_site",{site:this.site}).then((function(a){0!=a.data.code||200!=a.status?e.$notify({title:"Request Failed",message:a.data.message,type:"error"}):(e.pages=a.data.data,e.article.page_id=t),e.pagesLoading=!1}))}},methods:{removeDesc:function(e){this.article.key_value.splice(e,1)},addDesc:function(){this.article.key_value.push("")},countWord:function(){var e=0;this.article.key_value.forEach((function(t){var a=t.trim();a&&(e+=a.split(" ").length)})),this.article.word_count=e},getPages:function(){var e=this;this.pagesLoading=!0,this.article.page_id=null,axios.post("/admin/pages_by_site",{site:this.site}).then((function(t){0!=t.data.code||200!=t.status?e.$notify({title:"Request Failed",message:t.data.message,type:"error"}):e.pages=t.data.data,e.pagesLoading=!1}))},submitForm:function(){var e=this;console.log(this.article),this.$refs.form.validate((function(t){t&&(e.loading=!0,axios.post("/admin/content_list/save",e.article).then((function(t){0!=t.data.code||200!=t.status?e.$notify({message:t.data.message,type:"error"}):(e.$notify({message:t.data.message,type:"success"}),e.$confirm("Do you want to jump to the list?","Confirm",{confirmButtonText:"Yes",cancelButtonText:"No",type:"warning"}).then((function(){window.location.href="/admin/content_list"})).catch((function(){window.location.href=window.location.href}))),e.loading=!1})))}))}},props:["originObj","title","editSite"]},s=a(0),l=Object(s.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("el-row",[a("el-col",{attrs:{xs:24,sm:24,md:20,lg:13,xl:13}},[a("el-card",{attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.title))])]),e._v(" "),a("el-form",{ref:"form",staticStyle:{width:"80%"},attrs:{model:e.article,rules:e.rules,size:"medium","label-position":"top"}},[a("el-form-item",{attrs:{label:"Column Name",prop:"key_name"}},[a("el-input",{model:{value:e.article.key_name,callback:function(t){e.$set(e.article,"key_name",t)},expression:"article.key_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Site"}},[a("el-select",{on:{change:e.getPages},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[a("el-option",{attrs:{label:"Service",value:"Service"}}),e._v(" "),a("el-option",{attrs:{label:"Media",value:"Media"}})],1)],1),e._v(" "),a("el-form-item",{directives:[{name:"loading",rawName:"v-loading",value:e.pagesLoading,expression:"pagesLoading"}],attrs:{label:"Web page name",prop:"page_id"}},[a("el-select",{staticStyle:{"min-width":"250px"},attrs:{clearable:""},model:{value:e.article.page_id,callback:function(t){e.$set(e.article,"page_id",t)},expression:"article.page_id"}},e._l(e.pages,(function(e){return a("el-option",{key:e.page_id,attrs:{label:e.name+"   ("+e.url+")",value:e.page_id}})})),1)],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"}},[a("template",{slot:"label"},[a("span",[e._v(" Column description: ")]),e._v(" "),a("p",[e._v("( WordCount: "),a("b",{staticStyle:{color:"red"}},[e._v(e._s(this.article.word_count))]),e._v(" )")])])],2),e._v(" "),e._l(e.article.key_value,(function(t,i){return a("el-form-item",{key:i,attrs:{prop:"key_value."+i,rules:{required:!0,message:"Required",trigger:"blur"}}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea"},on:{input:e.countWord},model:{value:e.article.key_value[i],callback:function(t){e.$set(e.article.key_value,i,t)},expression:"article.key_value[index]"}})],1),e._v(" "),a("el-col",{attrs:{span:1,offset:1}},[a("el-button",{attrs:{type:"danger",size:"mini",round:"",icon:"el-icon-delete"},on:{click:function(t){return t.preventDefault(),e.removeDesc(i)}}})],1)],1)],1)})),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",size:"small",type:"success"},on:{click:e.addDesc}},[e._v("Add Desc")]),e._v(" "),a("el-input",{attrs:{type:"hidden"},model:{value:e.article.key_id,callback:function(t){e.$set(e.article,"key_id",t)},expression:"article.key_id"}}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){return e.submitForm()}}},[e._v("Submit")])],1)],2)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=l.exports}}]);