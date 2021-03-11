<template>
	<div v-loading="loading">
		<el-form ref="form" :model="article" label-width="100px" enctype="multipart/form-data">
			<el-form-item label="角色名称">
				<el-input v-model="articles.name"></el-input>
			</el-form-item>
			<el-form-item label="权限">
				<el-tree
								:data="roles"
								show-checkbox
								node-key="uri"
								ref="tree"
								highlight-current
								:default-checked-keys="policy_uri"
								:props="defaultProps">
				</el-tree>
			</el-form-item>
			<el-form-item style="display: none">
				<el-input type="hidden" name="_token" v-model="token"></el-input>
				<el-input type="hidden" name="id" v-model="articles.id"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
		export default {
				data: function() {
						return {
								article: this.articles,
								token: document.head.querySelector('meta[name="csrf-token"]').content,
								form: {
										name: '',
										policy_uri:["/admin/wyw/zzjs"],
										id: '',
								},
								defaultProps: {
										children: 'children',
										label: 'label'
								},
								roles:'',
								loading:false,
						}
				},
				created () {
						if(Object.keys(this.articles).length==0){
								this.articles = this.form
							  this.policy_uri = ["/admin/wyw/zzjs"]
						}

				},
				mounted(){
					this.loading = true
					axios.post('/admin/role/get_menu')
							.then(res => {
								if (res.data.code !== 0 || res.status !== 200) {
									this.$notify({
										title: '获取角色菜单失败',
										message: res.data.message,
										type: 'error'
									});
								} else {
									this.roles = res.data.data;
									this.loading = false
								}
							})
				},
				methods: {
						submitForm() {
							this.articles.policy_uri = this.$refs.tree.getCheckedKeys()
								axios.post('/admin/role/save',this.articles)
										.then(res => {
												if (res.data.code !== 0 || res.status !== 200) {
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
													this.$emit('closeDialog',false);
												}
										})
						},

				},
				props: ['articles','policy_uri']
		}
</script>
<style>
	.el-tree {
		font-size:16px;
	}
</style>