<template>
	<div>
		<el-row style="margin-top: 20px">
			<el-col :span="20">
				<el-row style="margin-top: 20px">
					<el-col :span="4">
						<el-button  icon="el-icon-plus" size="mini" @click="showForm('add')">新增</el-button>
					</el-col>
					<el-col :span="16">
						<el-form :inline="true"  class="search-form-inline" size="mini">
							<el-form-item>
								<el-input
												placeholder="请输入创建人"
												prefix-icon="el-icon-search"
												v-model="queryConfig.real_name"
								>
								</el-input>
							</el-form-item>
							<el-form-item>
								<el-input
												placeholder="请输入标签名称"
												prefix-icon="el-icon-search"
												v-model="queryConfig.name"
								>
								</el-input>
							</el-form-item>
							<div style="float:right">
								<el-form-item>
									<el-button type="primary" @click="search" >查询</el-button>
								</el-form-item>
								<el-form-item>
									<el-button type="info"  @click="reset()">重置</el-button>
								</el-form-item>
							</div>
						</el-form>
					</el-col>
				</el-row>
				<el-table
								:data="tabledata.data"
								border
								style="width: 100%">
					<el-table-column
									prop="created_at"
									label="创建日期"
					>
					</el-table-column>
					<el-table-column

									label="标签"
					>
					<template slot-scope="scope">
						<el-tag>{{scope.row.name}}</el-tag>
					</template>
					</el-table-column>
					<el-table-column
									prop="desc"
									label="描述"
					>
					</el-table-column>
					<el-table-column
									prop="real_name"
									label="创建人"
					>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
											size="mini"
											type="text"
											@click="showForm('edit',scope.row)"
							>编辑</el-button>

							<el-button
											slot="reference"
											size="mini" @click="handleDelete(scope.$index,scope.row.id)"
											type="text"
							>删除</el-button>

						</template>
					</el-table-column>
				</el-table>
				<basic-paginator :tabledata="tabledata"></basic-paginator>
			</el-col>

		</el-row>
		<el-dialog :visible.sync="outerVisible"
							 v-if="outerVisible"
							 :close-on-click-modal="false"
							 width="40%" :title="dialog_title">
			<!--表格详情-->
			<el-row>
				<el-col :span="18">
					<el-form ref="form" :model="tag" :rules="rules" label-width="100px" enctype="multipart/form-data" size="medium">
						<el-form-item label="名称" prop="name">
							<el-input  v-model="tag.name" clearable></el-input>
						</el-form-item>
						<el-form-item label="描述">
							<el-input  v-model="tag.desc" type="textarea" clearable></el-input>
						</el-form-item>

						<!--<el-form-item label="颜色" prop="type"  v-if="tag.name">
							<el-radio-group v-model="tag.type">
								<el-radio label="info" >
									<el-tag  type="info">{{tag.name}}</el-tag>
								</el-radio>
								<el-radio label="danger" ><el-tag  type="danger">{{tag.name}}</el-tag></el-radio>
								<el-radio label="primary" ><el-tag  type="primary">{{tag.name}}</el-tag></el-radio>
								<el-radio label="success" ><el-tag  type="success">{{tag.name}}</el-tag></el-radio>
								<el-radio label="warning" ><el-tag  type="warning">{{tag.name}}</el-tag></el-radio>
							</el-radio-group>
						</el-form-item>-->
						<el-form-item >
							<el-input type="hidden" name="id" v-model="tag.id"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save()">提交</el-button>
				<el-button @click="outerVisible = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
		export default {
				data() {
						return {
								tag : {
										name:'',
										type:'',
										desc:'',
								},
								dialog_title:'',
								queryConfig:this.searchQuery,//后台返回的搜索表单
								rules: {
										name: [
												{ required: true, message: '请输入标签名称', trigger: 'blur' },
												{ min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
										],
										type: [
												{ required: true, message: '请选择标签颜色', trigger: 'blur' },
										],

								},
								outerVisible:false,
						}
				},
				methods: {
						showForm(action,param={}){
								this.outerVisible = true
								if (action != 'add'){
										//编辑
										this.dialog_title = '编辑'
										this.tag = param
								}else{
										this.dialog_title = '新增'
										this.tag = {
												name:'',
												type:'',
												desc:'',
										}
								}
						},
						reset(){
								window.location.href = this.tabledata.path
						},
						search(){
								var query = this.unils.setQueryConfig(this.queryConfig);
								if (!query) return;
								window.location.href = this.tabledata.path + '?' + query
						},
						save(){
								this.$refs['form'].validate((valid) => {
										if (valid) {
												axios.post('/admin/tags/update',this.tag)
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
																		setTimeout(function () {
																				window.location.href = '/admin/tags/list';
																		}, 1000)

																}
														})
										} else {
												return false
										}
								});
						},
						handleDelete(index, row) {
							this.$confirm('此操作将删除该标签, 是否继续?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.loading = true
								axios.post('/admin/tags/delete/'+row)
										.then(res => {
												if (res.data.code != 0 || res.status != 200) {
														this.$notify({
																title: '删除失败',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: '删除成功',
																message: '',
																type: 'success'
														});
														this.tabledata.data.splice(index,1);
												}
										})
								this.loading = false
							})
						},

				},
				props:['tabledata','searchQuery'],
		}
</script>