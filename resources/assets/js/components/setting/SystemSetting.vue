<template>
	<div style="margin-top: 60px">
		<el-row>
			<el-col :span="12">
				<el-form ref="form" :model="article" label-width="140px" enctype="multipart/form-data">
					<el-form-item label="登录页提示说明">
						<el-input v-model="article.login_tip"></el-input>
					</el-form-item>
					<el-form-item>
						<template slot="label">
							是否显示广告
							<el-tooltip class="item" effect="dark" content="重新登录才会生效" placement="top-start" >
								<i class="el-icon-question"></i>
							</el-tooltip>
						</template>
						<el-switch
								v-model="article.ads_switch"
								active-color="#13ce66"
								inactive-color="#ff4949">
						</el-switch>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm()" :loading="loading">保存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	export default {

		data: function() {
			return {
				article: this.setting,
				loading: false,
			}
		},
		created () {
		},
		methods: {
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
