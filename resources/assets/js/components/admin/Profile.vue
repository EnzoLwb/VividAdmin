<template>
	<div v-loading="loading">
		<el-row>
			<el-col :span="12" :offset="1">
				<el-form ref="form" :model="articles" label-width="120px" label-position="top"
								 style="margin: 40px 0" size="medium">
					<el-form-item label="登录名" prop="username">
						<el-input v-model="articles.username" disabled></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input  v-model="articles.mobile" disabled></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="real_name">
						<el-input  v-model="articles.real_name" placeholder="请填写真实的姓名" disabled></el-input>
					</el-form-item>
					<el-form-item label="工号">
						<el-input  v-model="articles.work_no" disabled></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio-group v-model="articles.status" disabled>
							<el-radio :label="1" >启用</el-radio>
							<el-radio :label="0" >禁用</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="职务">
						<el-radio-group v-model="articles.group" size="medium" disabled>
							<el-radio-button  :label="1" >高新区总工会 </el-radio-button>
							<el-radio-button  :label="2" >基层工会</el-radio-button>
							<el-radio-button  :label="3" >基层团组织</el-radio-button>
							<el-radio-button  :label="4" >基层妇联</el-radio-button>
							<el-radio-button  :label="5" >网格员</el-radio-button>
							<el-radio-button  :label="6" >基层工会、团组织</el-radio-button>
							<el-radio-button  :label="7" >基层工会、妇联</el-radio-button>
							<el-radio-button  :label="8" >基层团组织、妇联</el-radio-button>
							<el-radio-button  :label="9" >基层工会、团组织、妇联</el-radio-button>
						</el-radio-group>
						<p class="desc" v-if="this.jiceng_arr.indexOf(this.articles.group)!=-1"><i class="el-icon-question"></i>
							基层工青妇领导：能操作本企业的信息</p>
						<p class="desc" v-show="articles.group==5"><i class="el-icon-question"></i>
							网格员：可以看到所有企业信息，但只能操作所属网格内的企业</p>
					</el-form-item>
					<el-form-item v-if="this.jiceng_arr.indexOf(this.articles.group)!=-1" label="所属企业">
						<el-input  v-model="articles.company_name" disabled></el-input>
					</el-form-item>
					<el-form-item v-if="articles.group==5" label="负责的网格">
						<el-tree class="filter-tree" :data="tree" :props="defaultProps" :highlight-current="true"
										 :expand-on-click-node="false" :default-expand-all="false"
										 :default-expanded-keys="[articles.grid_id]"
										 node-key="id" :current-node-key="articles.grid_id"
										 style="font-size:14px" ref="tree">
					<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>
								<img src="/images/floder2.png" alt="">
								{{ data.label }}
							</span>
					</span>
						</el-tree>
						<el-input  v-model="grid_name" disabled style="width:80%" placeholder="上方选择组织管理"></el-input>
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

							tree:[],
							grid_name:"",
						}
				},
				created () {
						if(Object.keys(this.articles).length==0){
								this.articles = this.form
						}
						//加载网格树 网格员的情况下
					if (this.articles.group==5){
						axios.post('/admin/wyw/zzgl_profile',{grid_id:this.articles.grid_id}).then(res=> {
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
					}

				},
				methods: {

				},
				props: ['articles']
		}
</script>
<style>
	.desc {
		color: gray;
		font-size:13px;
		margin:0;
	}
</style>