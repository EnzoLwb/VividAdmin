<template>
	<div v-loading="loading">
		<el-form ref="form" :model="article" label-width="100px" size="small">
			<el-form-item label="Title">
				<el-input v-model="articles.name"></el-input>
			</el-form-item>
			<el-form-item label="Site Auth" >
				<el-radio v-model="articles.resources" label="service"  :disabled="edit" @change="changeMenu">Service</el-radio>
				<el-radio v-model="articles.resources" label="media"  :disabled="edit"  @change="changeMenu">Media</el-radio>
			</el-form-item>
			<el-form-item label="Role">
				<el-tree
								:data="roles"
								show-checkbox
								node-key="url"
								ref="tree"
								:check-strictly="true"
								highlight-current
								empty-text = "Please select site first"
								:default-checked-keys="policy_uri"
								:props="defaultProps">
				</el-tree>
			</el-form-item>
			<el-form-item style="display: none">
				<el-input type="hidden" name="id" v-model="articles.id"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()">Submit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
		export default {
				data: function() {
						return {
								article: this.articles,
								form: {
										name: '',
										// policy_uri:["/admin/wyw/zzjs"],
										policy_uri:[],
										resources:'',
										id: '',
								},
								defaultProps: {
										children: 'submenus',
										label: 'name'
								},
								roles:'',
								loading:false,
								edit:false,
						}
				},
				created () {
						if(Object.keys(this.articles).length==0){
								this.articles = this.form
							  // this.policy_uri = ["/admin/wyw/zzjs"]
						}else{
							//site_auth 不可更改
							this.edit = true
						}

				},
				mounted(){
					if (this.articles.resources){
						this.getMenu()
					}

				},
				methods: {
						getMenu(){
							this.loading = true
							axios.post('/admin/role/get_menu',{site:this.articles.resources})
									.then(res => {
										if (res.data.code !== 0 || res.status !== 200) {
											this.$notify({
												title: 'Failed',
												message: res.data.message,
												type: 'error'
											});
										} else {
											this.roles = res.data.data;
											this.loading = false
										}
									})
						},
						changeMenu(){
							//清空
							this.$refs.tree.setCheckedKeys([]);
							this.getMenu()
						},
						submitForm() {
							this.articles.policy_uri = this.$refs.tree.getCheckedKeys()
								axios.post('/admin/role/save',this.articles)
										.then(res => {
												if (res.data.code !== 0 || res.status !== 200) {
														this.$notify({
																title: 'Failed',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: 'Success',
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