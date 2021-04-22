<template>
	<div>
		<el-card shadow="hover">
			<div slot="header" class="clearfix">
				<h4>购买服务</h4>
			</div>
			<el-row  :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form ref="form" :model="article" label-width="140px" size="small" :rules="rules">
						<el-form-item label="会员卡号" prop="card_no">
							<el-input v-model="article.card_no" placeholder="读卡器读取" @input="loadMember()"></el-input>
						</el-form-item>
						<el-form-item label="会员姓名">
							<el-input :value="article.name" disabled placeholder="读取后显示" v-loading="member_loading" prefix-icon="el-icon-user"></el-input>
						</el-form-item>
						<el-form-item label="卡内余额">
							<el-input :value="article.balance" disabled placeholder="读取后显示" v-loading="member_loading" prefix-icon="el-icon-coin"></el-input>
						</el-form-item>
						<el-form-item label="服务项目" prop="service">
							<el-select v-model="article.service" placeholder="请选择">
								<el-option
										v-for="item in courses"
										:key="item.id"
										:label="item.title"
										:value="item.id">
									<span style="float: left">{{ item.title }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.note }}</span>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="有效期" prop="expire_date">
							<el-date-picker
									v-model="article.expire_date" type="daterange" value-format = "yyyy-MM-dd"
									align="right" unlink-panels range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期"
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
							<el-input-number v-model="article.account" :min="100" :step="100"></el-input-number>
						</el-form-item>
						<el-form-item  label="教练">
							<el-select v-model="article.coach" clearable placeholder="请选择">
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
				member_loading: false,
				article: {
					card_no:'',
					service:'',
					expire_date: [],
					numbers:'',
					type :'',
					account :'',
					coach:'',
					remark:'',
					balance:'',
				},
				rules: {
					card_no: [{required: true, message: '必填项', trigger: 'blur'}],
					service: [{required: true, message: '必选项', trigger: 'blur'}],
					expire_date: [{required: true, message: '必填项', trigger: 'blur'}],
					numbers: [{required: true, message: '必填项', trigger: 'blur'}],
					type: [{required: true, message: '必填项', trigger: 'blur'}],
					account: [{required: true, message: '必填项', trigger: 'blur'}],
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
				axios.post('/admin/membership/by_card_no',{card_no:this.article.card_no,balance:true})
						.then(res => {
							if (res.data.code != 0 || res.status != 200) {
								this.$notify({
									title: '获取人员失败',
									message: res.data.message,
									type: 'error'
								});
							} else {
								if (res.data.data) {
									this.article.name = res.data.data.name
									this.article.balance = res.data.data.balance.balance_fee
								}
							}
							this.member_loading = false
						})
			},
			submitForm() {
				let course = '';
				this.courses.forEach(item=>{
					if (item.id === this.article.service) course = item.title
				})
				console.log(course)
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let tips = ''
						if(this.article.type === 1){
							tips = '扣除 <i>￥'+ this.article.account +'</i>  元 购买 <a href="#">	'+ course +' </a>项目, 是否继续?';
						}else{
							tips = '<b>直接赠送</b> <a href="#">	'+ course +' </a>项目, 是否继续?';
						}
						this.$confirm(tips, '提示', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.loading = true
							axios.post(window.location.href,this.article)
									.then(res => {
										if (res.data.code != 0 || res.status != 200) {
											this.$notify({
												title: '消费失败',
												message: res.data.message,
												type: 'error'
											});
										} else {
											this.$notify({
												title: '消费成功',
												message: res.data.message,
												type: 'success'
											});
											setTimeout(function () {
												window.location.href = window.location.href
											},1000)
										}
										this.loading = false
									})
						});

					} else {
						return false;
					}
				});
			},
		},
		props: ['courses']
	}
</script>
