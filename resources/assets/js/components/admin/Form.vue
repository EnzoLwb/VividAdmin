<template>
	<div v-loading="loading">
		<el-form ref="form" :model="articles" :rules="rules" label-width="120px" enctype="multipart/form-data" size="mini">
			<el-form-item label="UserName" prop="username">
				<el-input v-model="articles.username"></el-input>
			</el-form-item>
			<el-form-item label="Mobile">
				<el-input  v-model="articles.mobile"></el-input>
			</el-form-item>
			<el-form-item label="RealName" prop="real_name">
				<el-input  v-model="articles.real_name"></el-input>
			</el-form-item>
			<el-form-item label="Password" prop="password">
				<el-input  :type="is_add ? 'text': 'password'" v-model="articles.password"  :disabled="Boolean(articles.id)" ></el-input>
			</el-form-item>
			<el-form-item label="WorkNo">
				<el-input  v-model="articles.work_no"></el-input>
			</el-form-item>
			<el-form-item label="Role" prop="role_id">
				<el-select v-model="articles.role_id" >
					<el-option
									v-for="item in roles"
									:key="item.id"
									:label="item.name"
									:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="State">
				<el-radio-group v-model="articles.status">
					<el-radio :label="1" >Enable</el-radio>
					<el-radio :label="0" >Disable</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="Job">
				<el-radio-group v-model="articles.group" size="mini">
					<el-radio-button  :label="1" >Admin</el-radio-button>
					<el-radio-button  :label="2" >Marketing Manager</el-radio-button>
					<el-radio-button  :label="3" >Translator</el-radio-button>
				</el-radio-group>
				<p class="desc"><i class="el-icon-question"></i>Admin：All permissions </p>
				<p class="desc"><i class="el-icon-question"></i>Marketing Manager：Basic language editing </p>
				<p class="desc"><i class="el-icon-question"></i>Translator：Do translation only </p>
			</el-form-item>
			<el-form-item style="display: none">
				<el-input type="hidden" name="_token" v-model="token"></el-input>
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
					var validatePsd = (rule, value, callback) => {
						if (this.articles.id=='' && value === '') {
							callback(new Error('Required'));
						} else {
							callback();
						}
					};
						return {
							article: this.articles,
							loading:false,
							token: document.head.querySelector('meta[name="csrf-token"]').content,
							form: {
									username: '',
									id: '',
									real_name: '',
									work_no: '',
									status: 1,
									mobile: '',
									password: '',
									role_id: '',
									group: 3,
							},
							rules: {
								username: [
									{ required: true, message: 'Required', trigger: 'blur' },
									{ min: 3, max: 25, message: '3~25 characters', trigger: 'blur' }
								],
								password: [
									{ validator: validatePsd,required: true, trigger: 'blur' },
								],
								role_id: [
									{ required: true, message: 'Required', trigger: 'blur' },
								],
								real_name: [
									{ required: true, message: 'Required', trigger: 'blur' },
									{ min: 3, max: 25, message: '3~25 characters', trigger: 'blur' }
								],
							},
						}
				},
				created () {
						if(Object.keys(this.articles).length==0){
								this.articles = this.form
						}
				},
				methods: {
						submitForm() {
							this.$refs['form'].validate((valid) => {
										if (valid) {
											this.loading = true
											axios.post('/admin/user/update',this.articles)
													.then(res => {
														if (res.data.code != 0 || res.status != 200) {
															this.$notify({
																title: 'Failed',
																message: res.data.message,
																type: 'error'
															});
																this.loading = false
														} else {
															this.$notify({
																title: 'Success',
																message: res.data.message,
																type: 'success'
															});
																this.loading = false
															setTimeout(function () {
																window.location.href = '/admin/user/list';
															}, 1000)

														}
													})

										} else {
											return false
										}
							});

						},

				},
				props: {
					articles: {
						type: Object,
						default: {}
					},
					roles:{
						type: Array,
						default: []
					},
					is_add:{
						type: Boolean,
						default: false
					},
				},
		}
</script>
<style>
	.desc {
		color: gray;
		font-size:10px;
		margin:0;
	}
</style>