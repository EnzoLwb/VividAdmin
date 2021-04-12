<template>
	<div>
		<el-card shadow="hover">
			<div slot="header" class="clearfix">
				<span>购买服务</span>
			</div>
			<el-row  :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form ref="form" :model="article" label-width="140px" size="small" :rules="rules">
						<el-form-item label="会员卡号" prop="card_no">
							<el-input v-model="article.card_no" placeholder="读卡器读取"></el-input>
						</el-form-item>
						<el-form-item label="会员姓名">
							<el-input :value="article.name" placeholder="读取后显示"></el-input>
						</el-form-item>
						<el-form-item label="服务项目" prop="service">
							<el-select v-model="article.service" placeholder="请选择">
								<el-option
										v-for="item in courses"
										:key="item.id"
										:label="item.name"
										:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="有效期" prop="expire_date">
							<el-date-picker
									v-model="article.expire_date"
									type="daterange"
									align="right"
									unlink-panels
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									:picker-options="this.unils.consumeOptions">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="次数" prop="numbers">
							<el-input-number v-model="article.numbers"  :min="1" ></el-input-number>
						</el-form-item>
						<el-form-item label="类型" prop="type">
							<el-radio v-model="article.type" :label=1>购买(扣除卡内余额)</el-radio>
							<el-radio v-model="article.type" :label=2>赠送(不扣除金额)</el-radio>
						</el-form-item>
						<el-form-item label="消费金额" v-show="article.type === 1"  prop="account">
							<el-input-number v-model="article.account" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item  label="教练">
							<el-select v-model="article.coach" placeholder="请选择">
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
				article: {
					card_no:'',
					service:'',
					expire_date: [],
					numbers:'',
					type :1,
					account :'',
					coach:'',
					remark:'',
				},
				rules: {
					card_no: [{required: true, message: '必填项', trigger: 'blur'}],
					service: [{required: true, message: '必选项', trigger: 'blur'}],
					expire_date: [{required: true, message: '必填项', trigger: 'blur'}],
					numbers: [{required: true, message: '必填项', trigger: 'blur'}],
					type: [{required: true, message: '必填项', trigger: 'blur'}],
					account: [{required: true, message: '必填项', trigger: 'blur'}],
				},
				courses:[
					{
						remark: 'xxxx',
						name: '健身',
						id: 1,
					},{
						remark: 'XXXXX',
						name: '私教',
						id: 12,
					},{
						remark: '备注',
						name: '瑜伽',
						id: 13,
					},{
						remark: '备注',
						name: '美容',
						id: 14,
					},{
						remark: '备注',
						name: '健康餐',
						id: 15,
					},
				],
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
				this.$confirm('扣除 <i>￥4000</i>  元 购买 <a href="#">	拳击课程</a>, 是否继续?', '提示', {
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '成功!'
					});
				});
				this.$refs['form'].validate((valid) => {
					if (valid) {

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
