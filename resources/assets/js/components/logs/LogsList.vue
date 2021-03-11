<template>
	<div v-loading="loading">
		<el-row style="margin-top: 20px">
			<el-col :span="24">
				<el-form :inline="true"  class="demo-form-inline" size="small" style="margin: 15px 0 0 0">
					<el-row>
						<el-col :span="20">
							<el-form-item>
								<el-input
										placeholder="请输入操作人"
										prefix-icon="el-icon-search"
										v-model="queryConfig.causer_id"
								>
								</el-input>
							</el-form-item>
							<el-form-item>
								<el-form-item label="模块">
									<el-select v-model="queryConfig.model" multiple placeholder="请选择">
										<el-option
												v-for="item in modelOptions"
												:key="item.label"
												:label="item.label"
												:value="item.label">
										</el-option>
									</el-select>
								</el-form-item>
							</el-form-item>
							<el-form-item>
								<el-form-item label="动作">
									<el-select v-model="queryConfig.action" multiple placeholder="请选择">
										<el-option
												v-for="item in actionOptions"
												:key="item.label"
												:label="item.label"
												:value="item.label">
										</el-option>
									</el-select>
								</el-form-item>
							</el-form-item>
							<el-form-item label="日期">
								<el-date-picker
										type="daterange"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										value-format = "yyyy-MM-dd"
										v-model="queryConfig.date"
								>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item>
								<el-button type="primary"  @click="search" >查询</el-button>
							</el-form-item>
							<el-form-item>
								<el-button type="info" @click="reset()">重置</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-table
								:data="tabledata.data"
								border
								style="width: 100%">
					<el-table-column
									prop="id"
									label="ID"
									width="70px"
					></el-table-column>
					<el-table-column
									prop="created_at"
									label="日期"
					>
					</el-table-column>
					<el-table-column
									prop="log_name"
									label="模块"
					>
					</el-table-column>
					<el-table-column
									prop="description"
									label="动作"
					>
					</el-table-column>
					<el-table-column
									prop="content"
									label="内容"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.content!=''"> {{scope.row.content}}</span>
							<el-collapse v-if="scope.row.content=='' && scope.row.subject_type" v-model="activeNames" @change="handleChange(scope.$index,scope.row)">
								<el-collapse-item title="详情">
									<div>{{scope.row.properties instanceof Object ? '' : scope.row.properties}}</div>
								</el-collapse-item>
							</el-collapse>
						</template>
					</el-table-column>
					<el-table-column
									label="操作人"
									prop="real_name"
					>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-popconfirm
											title="此条记录确定永久删除吗？"
											@confirm = "handleDelete(scope.$index,scope.row.id)"
							>
							<el-button
											slot="reference"
											size="medium"
											type="text"
							>删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<basic-paginator :tabledata="tabledata"></basic-paginator>
			</el-col>

		</el-row>

	</div>
</template>

<script>
		export default {
				data() {
						return {
								activeNames:[],
								loading:false,
								queryConfig:this.searchQuery,//后台返回的搜索表单
						}
				},
				created(){

				},
				methods: {
						reset(){
								window.location.href = this.tabledata.path
						},
						search(){
								var query = this.unils.setQueryConfig(this.queryConfig);
								if (!query) return;
								window.location.href = this.tabledata.path + '?' + query
						},
						handleChange(index, row) {
								if (row.properties instanceof Object){
										axios.post('/admin/logs/get_model_name_by_id',{id:row.id})
												.then(res => {
														if (res.data.code !== 0 || res.status !== 200) {
																this.$notify({
																		title: '详情已被删除',
																		message: res.data.message,
																		type: 'error'
																});
																this.tabledata.data[index].properties = '';
														} else {
																this.tabledata.data[index].properties = '名称：'+res.data.data.name;
														}
												})
								}//否则就已经请求过了

						},
						handleDelete(index, row) {
								this.loading = true
								axios.post('/admin/logs/delete/'+row)
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
						},
						filterTag(value, row) {
								return row.real_name === value;
						},
				},
				props:['tabledata','searchQuery','modelOptions','actionOptions'],
		}
</script>