<template>
	<div style=" width:80%">
		<el-form ref="form"  label-width="120px" size="small">
			<el-form-item label="会员卡号" >
				<el-input v-model="article.card_no" disabled></el-input>
			</el-form-item>
			<el-form-item label="会员姓名">
				<el-input :value="article.name"  prefix-icon="el-icon-user" disabled></el-input>
			</el-form-item>
			<el-form-item label="原充值金额" prop="origin_account">
				<el-input-number v-model="article.deposit_account" disabled></el-input-number>
			</el-form-item>
			<el-form-item label="赠送金额">
				<el-input-number v-model="article.give_account" disabled></el-input-number>
			</el-form-item>
			<el-form-item label="总金额" >
				<el-input-number v-model="article.account" disabled></el-input-number>
			</el-form-item>
			<el-form-item  label="销售">
				<el-input v-model="article.seller" disabled></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="article.remark" disabled></el-input>
			</el-form-item>
			<el-form-item label="上传凭证">
				<el-image
						style="width: 150px;" alt="照片"
						:src="article.pic_path" v-if="article.pic_path"
						:preview-src-list=[article.pic_path]>
				</el-image>
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