(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{211:function(e,t,i){"use strict";i.r(t);var a={data:function(){return{article:this.originObj,form:{title:"",page_id:"",video_id:"",video:"",word_count:0,descriptions:""},rules:{page_id:[{required:!0,message:"Required",trigger:"blur"}],video:[{required:!0,message:"Video Required",trigger:"blur"}],title:[{required:!0,message:"Required",trigger:"blur"}]},site:this.editSite,pages:[],loading:!1,pagesLoading:!1}},created:function(){var e=this;if(0==Object.keys(this.originObj).length)this.article=this.form;else{var t=this.originObj.page_id;this.pagesLoading=!0,this.article.page_id=null,axios.post("/admin/pages_by_site",{site:this.site}).then((function(i){0!=i.data.code||200!=i.status?e.$notify({title:"Request Failed",message:i.data.message,type:"error"}):(e.pages=i.data.data,e.article.page_id=t),e.pagesLoading=!1}))}},methods:{countWord:function(){var e=this.article.descriptions.trim();this.article.word_count=e?e.split(" ").length:0},successUpload:function(e,t,i){console.log(e.data),this.article.video=e.data.path},getPages:function(){var e=this;this.pagesLoading=!0,this.article.page_id=null,axios.post("/admin/pages_by_site",{site:this.site}).then((function(t){0!=t.data.code||200!=t.status?e.$notify({title:"Request Failed",message:t.data.message,type:"error"}):e.pages=t.data.data,e.pagesLoading=!1}))},submitForm:function(){var e=this;this.$refs.form.validate((function(t){t&&(e.loading=!0,axios.post("/admin/video_list/save",e.article).then((function(t){0!=t.data.code||200!=t.status?e.$notify({message:t.data.message,type:"error"}):(e.$notify({message:t.data.message,type:"success"}),e.$confirm("Do you want to jump to the list?","Confirm",{confirmButtonText:"Yes",cancelButtonText:"No",type:"warning"}).then((function(){window.location.href="/admin/video_list/"})).catch((function(){window.location.href=window.location.href}))),e.loading=!1})))}))}},props:["originObj","title","editSite","typeSelect"]},s=i(0),o=Object(s.a)(a,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[i("el-row",[i("el-col",{attrs:{xs:24,sm:24,md:20,lg:13,xl:13}},[i("el-card",{attrs:{shadow:"hover"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v(e._s(e.title))])]),e._v(" "),i("el-form",{ref:"form",staticStyle:{width:"80%"},attrs:{model:e.article,rules:e.rules,size:"small","label-position":"top"}},[i("el-form-item",{attrs:{label:"Title",prop:"title"}},[i("el-input",{attrs:{placeholder:"Enter the title"},model:{value:e.article.title,callback:function(t){e.$set(e.article,"title",t)},expression:"article.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"Site"}},[i("el-select",{on:{change:e.getPages},model:{value:e.site,callback:function(t){e.site=t},expression:"site"}},[i("el-option",{attrs:{label:"Service",value:"Service"}}),e._v(" "),i("el-option",{attrs:{label:"Media",value:"Media"}})],1)],1),e._v(" "),i("el-form-item",{directives:[{name:"loading",rawName:"v-loading",value:e.pagesLoading,expression:"pagesLoading"}],attrs:{label:"Web page name",prop:"page_id"}},[i("el-select",{staticStyle:{"min-width":"250px"},attrs:{clearable:""},model:{value:e.article.page_id,callback:function(t){e.$set(e.article,"page_id",t)},expression:"article.page_id"}},e._l(e.pages,(function(e){return i("el-option",{key:e.page_id,attrs:{label:e.name+"   ("+e.url+")",value:e.page_id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"Description",prop:"descriptions"}},[i("el-input",{attrs:{type:"textarea"},on:{input:e.countWord},model:{value:e.article.descriptions,callback:function(t){e.$set(e.article,"descriptions",t)},expression:"article.descriptions"}})],1),e._v(" "),i("div",{staticClass:"word-count"},[e._v("WordCount: "),i("b",[e._v(e._s(this.article.word_count))])]),e._v(" "),i("el-form-item",{attrs:{label:"Upload video",prop:"video"}},[i("el-upload",{staticClass:"upload-demo",attrs:{action:this.unils.upload_video_path,"on-success":e.successUpload,"show-file-list":!1}},[e.article.video?i("video",{staticClass:"avatar",attrs:{src:e.article.video,controls:"controls"}}):e._e(),e._v(" "),i("el-button",{attrs:{size:"small",type:"info"}},[e._v("Browse")])],1)],1),e._v(" "),i("el-input",{attrs:{type:"hidden"},model:{value:e.article.video_id,callback:function(t){e.$set(e.article,"video_id",t)},expression:"article.video_id"}}),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){return e.submitForm()}}},[e._v("Submit")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);