<template>
	<div style="margin-top: 60px" v-loading="loading">
		<el-row>
			<el-col :span="20">
				<el-form ref="form" :model="articles"  :rules="rules" label-width="100px" enctype="multipart/form-data">
					<el-row>
						<el-col :span="12">
							<el-form-item label="文章标题" prop="title">
								<el-input v-model="articles.title"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="类型" v-show="type!='law'" prop="type">
						<el-radio-group v-model="articles.type" size="mini">
							<el-radio-button label="zzyl" >政治引领</el-radio-button>
							<el-radio-button label="jjjf" >家教家风</el-radio-button>
							<el-radio-button label="hdzs" >活动展示</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-row>
						<el-col :span="8">
							<el-form-item label="权重">
								<el-input type="number" v-model="articles.weight"  placeholder="1000"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="是否发布">
						<el-switch style="margin-top:5px "
											 v-model="articles.status"
											 active-color="#13ce66"
											 inactive-color="#ff4949">
						</el-switch>
					</el-form-item>
					<el-form-item label="标签(选填)">
						<search-tags :tags="articles.tags" :show="show"></search-tags>
					</el-form-item>
					<el-form-item label="封面" prop="cover">
						<el-upload
										class="upload-demo"
										:action = this.unils.upload_img_path
										:on-success="successUpload"
										:before-upload="this.unils.beforeUploadImg"
										:show-file-list="false"
						>
							<img v-if="articles.cover" :src="articles.cover" class="avatar">
							<el-button v-if="show!=1" size="small" type="primary">点击上传</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="内容" prop="content">
						<quill-editor  ref="text" v-model="articles.content" class="myQuillEditor ql-editor"
													 :options="editorOption" style="height:400px;margin-bottom: 70px"/>
					</el-form-item>
					<div v-if="show!=1">
						<el-row>
							<el-col :span="10">
								<el-form-item>
									<el-button type="primary" @click="submitForm()">提交</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<el-form-item >
						<el-input type="hidden" name="_token" v-model="token"></el-input>
						<el-input type="hidden" name="id" v-model="articles.id"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<!--上传视频控件-->
		<div :visible.sync="videoUploadTag">
			<el-dialog
					width="50%"
					id="video_upload"
					style="margin-top: 1px"
					title="视频上传"
					:visible.sync="videoUploadTag" :close-on-click-modal="false"
					append-to-body>
				<el-tabs v-model="activeName" @tab-click="handleClick" value="0">
					<el-tab-pane label="添加视频链接" name="first">
						<el-input v-model="videoLink" placeholder="请输入视频链接" clearable></el-input>
						<el-button type="primary" size="small" style="margin: 20px 0px 0px 0px " @click="addVideoLink()">添加
						</el-button>
					</el-tab-pane>
					<el-tab-pane label="素材库" name="second">
						<el-upload
								class="upload-demo"
								:action = this.unils.upload_video_path
								:on-success="successUploadVideo"
								:before-upload="this.unils.beforeUploadVideo"
								:show-file-list="false"
								drag
								>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过20M</div>
						</el-upload>
					</el-tab-pane>

				</el-tabs>
			</el-dialog>
		</div>
	</div>
</template>

<script type="text/javascript">
		import { quillEditor } from 'vue-quill-editor'
		import {quillRedefine} from 'vue-quill-editor-upload'
		import 'quill/dist/quill.snow.css'
		export default {
				components: {
						quillEditor
				},
				data: function() {
						return {
								loading: false,
								article: this.articles,
								token: document.head.querySelector('meta[name="csrf-token"]').content,
								form: {
										title: '',
										id: '',
										weight: 1000,
										status: true,
										tags: [],
										content: '',
										type:'',
										cover: "",
								},
								rules:{
									title: [
											{ required: true, message: '请输入标题', trigger: 'blur' },
											{ min: 3, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
										],
									type: [
										{ required: true, message: '请选择类型', trigger: 'blur' }
									],
									content: [
										{ required: true, message: '请填写内容', trigger: 'blur' }
									],
									cover: [
										{ required: true, message: '请上传封面', trigger: 'blur' }
									],
								},
								//显示插入视频链接弹框的标识
								videoUploadTag: false,
								//弹框插入的视频链接
								videoLink:"",
								//弹框插入的视频文件地址
								videoFile:"",
								activeName:"first",
								editorOption: {}  // 必须初始化为对象 init  to Object
						}
				},
				created () {
						if(Object.keys(this.articles).length==0){
								this.articles = this.form
						}
						console.log(this.type)
						var self = this
						this.editorOption = quillRedefine(
								{
										// 图片上传的设置
										uploadConfig: {
												action:  this.unils.upload_img_path,  // 必填参数 图片上传地址
												methods: 'POST',  // 可选参数 图片上传方式  默认为post
												token: document.head.querySelector('meta[name="csrf-token"]').content,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
												name: 'file',  // 可选参数 文件的参数名 默认为img
												size: 10240,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
												accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
												res: (response) => {
														self.loading = true
														return response.data.path  // 这里切记要return回你的图片地址
												},
												success: () => {
													self.loading = false
												}
										},
										toolOptions:[
												['bold', 'italic', 'underline', 'strike'],
												['blockquote'],
												[{ 'header': 1 }, { 'header': 2 }],
												[{ 'list': 'ordered' }, { 'list': 'bullet' }],
												[{ 'size': ['small', false, 'large', 'huge'] }],
												[{ 'color': [] }, { 'background': [] }],  [{ 'align': [] }],
												['video', 'image']
										],
										placeholder: '输入文章内容吧~',  // 可选参数 富文本框内的提示语
										handlers: {
											'video': function(value) {
												//视频回调
												self.videoUploadTag = true;
											},
										}
								}
						)
				},
				methods: {
						beforeRemove(file, fileList) {
								return this.$confirm(`确定移除 ${ file.name }？`);
						},
						successUpload(response, file, fileList) {
								this.articles.cover = response.data.path
						},
						handleClick(tab, event) {
								console.log(tab, event);
						},
						//视频上传
						addVideoLink() {
								if (this.videoLink.length == 0) {
									alert('请输入视频链接');
								}
							this.insertVideo(this.videoLink)
						},
						successUploadVideo(response, file, fileList) {
							this.videoFile = response.data.path
							this.insertVideo(this.videoFile)
						},
						insertVideo(url){
							var length = this.$refs.text.quill.getSelection(true).index;
							console.log(length)
							this.$refs.text.quill.insertEmbed(length, 'video', url);
							this.$refs.text.quill.setSelection(length + 1);
							//隐藏弹框
							this.videoUploadTag = false;
						},
						//提交
						submitForm() {
								this.loading = true;
								axios.post('/admin/news/save',this.articles)
										.then(res => {
												if (res.data.code !== 0 || res.status !== 200) {
														this.$notify({
																title: '失败',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: '成功',
																message: res.data.message,
																type: 'success'
														});
														console.log(res.data.data)
														this.articles = res.data.data
														//选择去列表页 还是本页
														this.open()
												}
												this.loading = false;
										})
										.catch(err => {
												console.log(err);
										});
						},
						open() {
							this.$confirm('是否跳转到列表页?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '留在本页',
								type: 'warning'
							}).then(() => {
								window.location.href = "/admin/news/oa/federation/" +this.articles.type
							}).catch(() => {
								window.location.href = window.location.href
							});
						},

				},
				props: ['articles','show','type']
		}
</script>
