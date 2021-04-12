<template>
	<div>
		<el-card shadow="hover">
			<div slot="header" class="clearfix">
				<span>注册信息</span>
			</div>
			<el-row  :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form ref="form" :model="article" label-width="140px" size="small" label-position="top">
						<el-form-item label="会员卡号">
							<el-input v-model="article.card_no"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="article.name"></el-input>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="article.id_number"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="article.gender" placeholder="请选择">
								<el-option label="男" :value="1"></el-option>
								<el-option label="女" :value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="article.phone"></el-input>
						</el-form-item>
						<el-form-item label="照片">
							<el-upload
									class="upload-demo" drag
									:action = this.unils.upload_img_path
									:on-success="successUpload"
									:before-upload="this.unils.beforeUploadImg"
									:show-file-list="false">  <i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5000kb</div>
								<img :src="article.pic" alt="照片" v-if="article.pic">
							</el-upload>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm()" :loading="loading">保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script type="text/javascript">
	export default {
		data: function() {
			return {
				loading: false,
				article: {},
				form: {
					card_no:'',
					gender:'',
					name:'',
					id_number:'',
					phone:'',
				},
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

			},
		},
		props: []
	}
</script>
