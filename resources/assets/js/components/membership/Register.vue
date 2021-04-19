<template>
	<div v-loading="loading">
		<el-card shadow="hover">
			<div slot="header" class="clearfix">
				<span>注册信息</span>
			</div>
			<el-row  :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form ref="form" :model="article" label-width="140px" size="small" :rules="rules">
						<el-form-item label="会员卡号" prop="card_no">
							<el-input v-model="article.card_no" placeholder="读卡器读取"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="article.name" prefix-icon="el-icon-user"></el-input>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="article.id_number"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="gender">
							<el-radio v-model="article.gender" label="1">男</el-radio>
							<el-radio v-model="article.gender" label="2">女</el-radio>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="article.phone"></el-input>
						</el-form-item>
						<el-form-item label="入会时间" prop="register_date">
							<el-date-picker
									v-model="article.register_date"
									align="right"
									value-format = "yyyy-MM-dd"
									type="date"
									placeholder="选择日期"
									:picker-options="this.unils.pickerOptions">
							</el-date-picker>
						</el-form-item>
						<el-form-item  label="教练">
							<el-select v-model="article.coach" multiple placeholder="请选择">
								<el-option-group
										v-for="group in options"
										:key="group.label"
										:label="group.label">
									<el-option
											v-for="item in group.options"
											:key="item.value"
											:label="item.label"
											:value="item.value">
									</el-option>
								</el-option-group>
							</el-select>
						</el-form-item>
						<el-form-item label="照片">
							<el-upload
									class="avatar-uploader"
									:action = this.unils.upload_img_path
									:show-file-list="false"
									:on-success="successUpload"
									:before-upload="this.unils.beforeUploadImg">
								<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5000kb</div>
								<img :src="article.pic_path" alt="照片" v-if="article.pic_id" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm()" :loading="btnLoading">保存</el-button>
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
				btnLoading: false,
				article: {
					card_no:'',
					gender:'',
					name:'',
					id_number:'',
					coach:[],
					register_date:'',
					phone:'',
					pic_path:'',
					pic_id:'',
				},
				rules: {
					card_no: [{required: true, message: '必填项', trigger: 'blur'}],
					gender: [{required: true, message: '必选项', trigger: 'blur'}],
					name: [{required: true, message: '必填项', trigger: 'blur'}],
					register_date: [{required: true, message: '必填项', trigger: 'blur'}],
				},
				options: [],
			}
		},
		created () {
			//获取全部人员
			this.loading = true
			axios.post('/admin/user_post')
					.then(res => {
						if (res.data.code != 0 || res.status != 200) {
							this.$notify({
								title: '获取人员失败',
								message: res.data.message,
								type: 'error'
							});
						} else {
							this.options = res.data.data
						}
						this.loading = false
					})
		},
		methods: {
			successUpload(response, file, fileList) {
				this.article.pic_id = response.data.id
				this.article.pic_path = response.data.path
			},
			submitForm() {
				console.log(this.article)
				this.$refs['form'].validate((valid) => {
					if (valid) {
						axios.post('/admin/membership/save',this.article)
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											title: '注册失败',
											message: res.data.message,
											type: 'error'
										});
									} else {
										this.$notify({
											title: '注册成功',
											message: res.data.message,
											type: 'success'
										});
										setTimeout(function () {
											//跳转到卡充值
											window.location.href = '/admin/card/deposit'
										}, 1000);
									}
								})
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
		},
		props: []
	}
</script>
