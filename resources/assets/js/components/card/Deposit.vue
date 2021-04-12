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
							<el-input v-model="article.card_no" placeholder="读卡器读取"></el-input>
						</el-form-item>
						<el-form-item label="会员姓名">
							<el-input value="" placeholder="读取后自动显示"></el-input>
						</el-form-item>
						<el-form-item label="原充值金额" prop="origin_account">
							<el-input-number v-model="article.origin_account" :step="100" :min="1" controls-position="right"></el-input-number>
						</el-form-item>
						<el-form-item label="赠送金额">
							<el-input-number v-model="article.gift_account" :step="100"  controls-position="right"></el-input-number>
						</el-form-item>
						<el-form-item label="总金额" >
							<el-input-number v-model="sumAccount" :step="100" :min="1" controls-position="right"></el-input-number>
						</el-form-item>
						<el-form-item  label="销售">
							<el-select v-model="article.saleperson"  placeholder="请选择">
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
									class="upload-demo" drag
									:action = this.unils.upload_img_path
									:on-success="successUpload"
									:before-upload="this.unils.beforeUploadImg"
									:show-file-list="false">  <i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5000kb</div>
								<img :src="article.receipt" alt="照片" v-if="article.receipt">
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
				article: {
					card_no:'',
					remark:'',
					name:'',
					account:'',
					gift_account:'',
					origin_account:'',
					saleperson:'',
					receipt:'',
				},
				rules: {
					card_no: [{required: true, message: '必填项', trigger: 'blur'}],
					account: [{required: true, message: '必选项', trigger: 'blur'}],
					origin_account: [{required: true, message: '必填项', trigger: 'blur'}],
				},
				options: [{
					label: '拳击教练',
					options: [{
						value: 3,
						label: '张三'
					}, {
						value: 4,
						label: '李四'
					}]
				}, {
					label: '瑜伽教练',
					options: [{
						value: 5,
						label: '王五'
					}, {
						value: 6,
						label: '赵六'
					}, {
						value: 7,
						label: '田七'
					}]
				}],
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
				console.log(this.article)
			},
		},
		props: []
	}
</script>
