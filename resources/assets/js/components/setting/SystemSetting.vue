<template>
	<div>
		<el-card shadow="hover">
			<div slot="header" class="clearfix">
				<span>基础信息</span>
			</div>
			<el-row  :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form ref="form" :model="article" label-width="140px" size="small" label-position="top">
						<el-form-item label="登录页提示说明">
							<el-input v-model="article.login_tip"></el-input>
						</el-form-item>
						<el-form-item>
							<template slot="label">
								是否需要验证码
								<el-tooltip class="item" effect="dark" content="登录页的验证码" placement="top-start" >
									<i class="el-icon-question"></i>
								</el-tooltip>
							</template>
							<el-switch
									v-model="article.login_code"
									active-color="#13ce66"
									inactive-color="#ff4949">
							</el-switch>
						</el-form-item>
						<el-form-item label="是否需要定时删除操作日志">
							<el-switch v-model="article.crontab_logs">
							</el-switch>
						</el-form-item>
						<el-form-item label="定时删除日期" v-show="article.crontab_logs">
							<el-radio-group v-model="article.crontab_log_date">
								<el-radio label="01">每月1号</el-radio>
								<el-radio label="15">每月15号</el-radio>
								<el-radio label="jidu">每季度</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm()" :loading="loading">保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
		<el-card shadow="hover" class="margin_top">
			<div slot="header" class="clearfix">
				<span>登录页封面图</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-upload
							class="upload-demo" drag
							:action = this.unils.upload_img_path
							:on-success="successUpload"
							:before-upload="this.unils.beforeUploadImg"
							:show-file-list="false">  <i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5000kb</div>
					</el-upload>
				</el-col>
				<el-col :span="12" v-show="loginCover">
					<img  :src="loginCover" class="login_cover">
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script type="text/javascript">
	export default {

		data: function() {
			return {
				article: this.setting,
				loginCover: "/images/background.jpg",
				loading: false,
			}
		},
		created () {
		},
		methods: {
			successUpload(response, file, fileList) {
				this.loading = false
				this.loginCover = response.data.path
			},
			submitForm() {
				this.loading = true
				axios.post('/admin/setting/home',this.article)
						.then(res => {
							if (res.data.code != 0 || res.status != 200) {
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
							}
							this.loading = false
						})
						.catch(err => {
							console.log(err);
						});
			},
		},
		props: ['setting']
	}
</script>
<style>
	.login_cover{

		height: 178px;
		display: block;
		margin-bottom: 30px;

	}
</style>