<template>
	<div style=" width:80%">
		<el-form ref="form"  label-width="120px" size="small">
			<el-form-item label="会员卡号" >
				<el-input v-model="article.card_no" disabled></el-input>
			</el-form-item>
			<el-form-item label="会员姓名">
				<el-input :value="article.name"  prefix-icon="el-icon-user" disabled></el-input>
			</el-form-item>
			<el-form-item label="服务项目" >
				<el-input :value="article.service"  disabled></el-input>
			</el-form-item>
			<el-form-item label="有效期">
				<el-date-picker disabled
						v-model="article.expire_date" type="daterange" value-format = "yyyy-MM-dd"
						align="right" unlink-panels range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期"
						:picker-options="this.unils.consumeOptions">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="次数" >
				<el-input-number v-model="article.numbers"  disabled ></el-input-number>
			</el-form-item>
			<el-form-item label="类型" prop="type">
				<el-radio v-model="article.type" :label=1>购买</el-radio>
				<el-radio v-model="article.type" :label=2>赠送</el-radio>
			</el-form-item>
			<el-form-item label="消费金额" v-show="article.type === 1"  prop="account">
				<el-input-number v-model="article.fee" disabled></el-input-number>
			</el-form-item>
			<el-form-item  label="教练">
				<el-input :value="article.coach"  disabled></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="article.note" disabled></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				article:{}
			}
		},
		mounted(){
			//获取数据
			this.loading = true
			axios.post('/admin/record/detail',{record_id:this.record_id})
					.then(res => {
						if (res.data.code != 0 || res.status != 200) {
							this.$notify({
								title: '请求失败',
								message: res.data.message,
								type: 'error'
							});
						} else {
							this.article = res.data.data
						}
						this.loading = false
					})
		},
		methods: {

		},
		props:['record_id'],
	}
</script>