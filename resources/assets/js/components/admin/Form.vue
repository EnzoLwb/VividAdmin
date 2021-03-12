<template>
	<div v-loading="loading">
		<el-form ref="form" :model="articles" :rules="rules" label-width="120px" enctype="multipart/form-data" size="mini">
			<el-form-item label="登录名" prop="username">
				<el-input v-model="articles.username"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input  v-model="articles.mobile"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="real_name">
				<el-input  v-model="articles.real_name" placeholder="请填写真实的姓名"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input  :type="is_add ? 'text': 'password'" v-model="articles.password"  :disabled="Boolean(articles.id)" ></el-input>
			</el-form-item>
			<el-form-item label="工号">
				<el-input  v-model="articles.work_no"></el-input>
			</el-form-item>
			<el-form-item label="权限/角色组" prop="role_id">
				<el-select v-model="articles.role_id"  placeholder="请选择">
					<el-option
									v-for="item in roles"
									:key="item.id"
									:label="item.name"
									:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="状态">
				<el-radio-group v-model="articles.status">
					<el-radio :label="1" >启用</el-radio>
					<el-radio :label="0" >禁用</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="职务">
				<el-radio-group v-model="articles.group" size="mini">
					<el-radio-button  :label="1" >高新区总工会</el-radio-button>
					<el-radio-button  :label="2" >基层工会</el-radio-button>
					<el-radio-button  :label="3" >基层团组织</el-radio-button>
					<el-radio-button  :label="4" >基层妇联</el-radio-button>
					<el-radio-button  :label="5" >网格员</el-radio-button>
				</el-radio-group>
<!--				<p class="desc"><i class="el-icon-question"></i>高新区总工会：可以管理所有企业信息 </p>-->
			</el-form-item>
			<el-form-item style="display: none">
				<el-input type="hidden" name="_token" v-model="token"></el-input>
				<el-input type="hidden" name="id" v-model="articles.id"></el-input>
			</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">提交</el-button>
				</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
		export default {
				data: function() {
					var validatePsd = (rule, value, callback) => {
						if (this.articles.id=='' && value === '') {
							callback(new Error('请输入密码'));
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
									grid_id: '',
									real_name: '',
									work_no: '',
									status: 1,
									mobile: '',
									password: '',
									role_id: '',
									group: 3,
									company_name: '',
									company_id: ''
							},
							defaultProps: {
								children: 'children',
								label: 'label'
							},
							jiceng_arr:[2,3,4,6,7,8,9],
							rules: {
								username: [
									{ required: true, message: '请输入登录名', trigger: 'blur' },
									{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
								],
								password: [
									{ validator: validatePsd,required: true, trigger: 'blur' },
								],
								role_id: [
									{ required: true, message: '请选择角色', trigger: 'blur' },
								],
								real_name: [
									{ required: true, message: '请输入姓名(用于登录展示)', trigger: 'blur' },
									{ min: 2, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
								],
							},
							tree:[],
							grid_name:"",
						}
				},
				created () {
						if(Object.keys(this.articles).length==0){
								this.articles = this.form
						}
						//加载网格树
						axios.post('/admin/wyw/zzgl',{grid_id:this.articles.grid_id}).then(res=> {
							if (res.data.code != 0 || res.status != 200) {
								this.$notify({
									title: '加载组织管理树失败',
									message: '',
									type: 'error'
								});
							} else {
								this.tree = res.data.data.tree
								this.grid_name = res.data.data.grid_name
							}
						});
				},
				methods: {
						//点击网格树
						NodeClick(data) {
							this.articles.grid_id = data.id;
							this.grid_name = data.label;
						},
						querySearchAsync(queryString, cb) {
							if (queryString == '') return;
							var results = [];
							axios.post('/api/common/get_company_list?name=' + queryString).then(function (res) {
								if (res.data.code != 0 || res.status != 200) {
									results = [{
										"value": res.data.message,
									}];
								} else {
									results = res.data.data; // 调用 callback 返回建议列表的数据
								}
								cb(results);
							});
						},
						handleSelect(item) {
							this.articles.company_id = item.id
						},
						submitForm() {
							if (this.jiceng_arr.indexOf(this.articles.group)!=-1 && !this.articles.company_id) {
								this.$notify({
									title: '失败',
									message: '职务为基层工会人员时,需要填写正确公司企业',
									type: 'error'
								});
								return;
							}
							if (this.articles.group == 5 && !this.articles.grid_id) {
								this.$notify({
									title: '失败',
									message: '职务为网格员时,需要选择网格区域',
									type: 'error'
								});
								return;
							}
							this.$refs['form'].validate((valid) => {
										if (valid) {
											this.loading = true
											axios.post('/admin/user/update',this.articles)
													.then(res => {
														if (res.data.code != 0 || res.status != 200) {
															this.$notify({
																title: '失败',
																message: res.data.message,
																type: 'error'
															});
																this.loading = false
														} else {
															this.$notify({
																title: '成功',
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