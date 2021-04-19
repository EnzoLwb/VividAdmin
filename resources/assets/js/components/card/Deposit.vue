<template>
	<div>
		<el-card shadow="hover">
			<div slot="header" class="clearfix">
				<span>充值</span>
			</div>
			<el-row  :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form ref="form" :model="article" label-width="140px" :rules="rules">
						<el-form-item label="会员卡号" prop="card_no">
							<el-input v-model="article.card_no" placeholder="读卡器读取" @input="loadMember()"></el-input>
						</el-form-item>
						<el-form-item label="会员姓名">
							<el-input :value="article.name" v-loading="member_loading" placeholder="读取后自动显示" disabled prefix-icon="el-icon-user"></el-input>
						</el-form-item>
						<el-form-item label="原充值金额" prop="origin_account">
							<el-input-number v-model="article.origin_account" :step="100" :min="100" controls-position="right"></el-input-number>
						</el-form-item>
						<el-form-item label="赠送金额">
							<el-input-number v-model="article.gift_account" :step="100" :min="0" controls-position="right"></el-input-number>
						</el-form-item>
						<el-form-item label="总金额" >
							<el-input-number v-model="sumAccount" :step="100" :min="100" controls-position="right"></el-input-number>
						</el-form-item>
						<el-form-item  label="销售">
							<el-select v-model="article.seller"  placeholder="请选择">
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
						<el-form-item label="备注">
							<el-input v-model="article.remark"></el-input>
						</el-form-item>
						<el-form-item label="上传凭证">
							<el-upload
									class="avatar-uploader"
									:action = this.unils.upload_img_path
									:show-file-list="false"
									:on-success="successUpload"
									:before-upload="this.unils.beforeUploadImg">
								<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5000kb</div>
								<img :src="article.receipt_path" alt="照片" v-if="article.receipt_id" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
		computed: {
			// 计算属性的 getter
			sumAccount:{
				get: function () {
					return this.article.gift_account + this.article.origin_account
				},
				// setter set时触发
				set: function (newValue) {
					this.article.account = newValue
				}
			}
		},
		data: function() {
			return {
				loading: false,
				member_loading: false,
				article: {
					card_no:'',
					remark:'',
					name:'',
					account:'',
					gift_account:'',
					origin_account:'',
					seller:'',
					receipt_path:'',
					receipt_id:'',
				},
				rules: {
					card_no: [{required: true, message: '必填项', trigger: 'blur'}],
					account: [{required: true, message: '必选项', trigger: 'blur'}],
					origin_account: [{required: true, message: '必填项', trigger: 'blur'}],
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
			loadMember(){
				if (!this.article.card_no) return
				this.member_loading = true
				axios.post('/admin/membership/by_card_no',{card_no:this.article.card_no})
						.then(res => {
							if (res.data.code != 0 || res.status != 200) {
								this.$notify({
									title: '获取人员失败',
									message: res.data.message,
									type: 'error'
								});
							} else {
								if (res.data.data) this.article.name = res.data.data.name
							}
							this.member_loading = false
						})
			},
			successUpload(response, file, fileList) {
				this.article.receipt_id = response.data.id
				this.article.receipt_path = response.data.path
			},
			submitForm() {
				console.log(this.article)
				this.$refs['form'].validate((valid) => {
					if (valid) {
						axios.post(window.location.href,this.article)
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											title: '充值失败',
											message: res.data.message,
											type: 'error'
										});
									} else {
										this.$notify({
											title: '充值成功',
											message: res.data.message,
											type: 'success'
										});
										setTimeout(function () {
											//跳转到卡消费
											window.location.href = '/admin/card/consume'
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
