<template>
	<div>
		<el-card shadow="hover">
			<el-form :inline="true"  :class="!searchCollapse?'search-form-inline':''" size="mini">
				<el-form-item label="操作人:">
					<el-input placeholder="请输入" v-model="queryConfig.causer_id">
					</el-input>
				</el-form-item>
				<el-form-item label="模块:">
					<el-select v-model="queryConfig.model" multiple placeholder="请选择">
						<el-option
								v-for="item in modelOptions"
								:key="item.label"
								:label="item.label"
								:value="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="动作:">
					<el-select v-model="queryConfig.action" multiple placeholder="请选择">
						<el-option
								v-for="item in actionOptions"
								:key="item.label"
								:label="item.label"
								:value="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期:" v-if="searchCollapse">
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
				<el-form-item><el-button type="primary"  @click="search" >查询</el-button></el-form-item>
				<el-form-item><el-button type="info" @click="reset()">重置</el-button></el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 展开 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<el-card class="margin_top" shadow="hover">
			<el-table :data="tabledata.data" v-loading="loading" size="small">
				<el-table-column prop="id" label="序号" width="70px"></el-table-column>
				<el-table-column prop="created_at" label="日期"></el-table-column>
				<el-table-column prop="log_name" label="模块"></el-table-column>
				<el-table-column prop="description" label="动作"></el-table-column>
				<el-table-column prop="content" label="内容">
					<template slot-scope="scope">
						<div v-show="scope.row.subject_type">
							<button class="el-button el-button--text el-button--small"
											@click="handleChange(scope.$index,scope.row)"
											v-if="scope.row.properties instanceof Object">
								<span> 查看详情 <i class="el-icon-arrow-down"></i></span>
							</button>
							<div v-else>{{scope.row.properties}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作人" prop="real_name"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-popconfirm
								title="此条记录确定永久删除吗？"
								@confirm = "handleDelete(scope.$index,scope.row.id)"
						>
							<el-button
									slot="reference"
									size="small"
									type="text"
							>删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
<!--			<basic-paginator :tabledata="tabledata"></basic-paginator>-->
		</el-card>
	</div>
</template>

<script>
		export default {
				data() {
						return {
								activeNames:[],
								loading:false,
								searchCollapse:false,//搜索内容是否展开
								queryConfig:this.searchQuery,//后台返回的搜索表单
						}
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
								if (row.properties instanceof Object) {
									this.loading = true
									axios.post('/admin/logs/get_model_name_by_id', {id: row.id})
											.then(res => {
												if (res.data.code !== 0 || res.status !== 200) {
													this.$notify({
														title: '详情已被删除',
														message: res.data.message,
														type: 'error'
													});
													this.tabledata.data[index].properties = '';
												} else {
													this.tabledata.data[index].properties = '名称：' + res.data.data.name;
												}
												this.loading = false
											})
								}
						},
						handleDelete(index, row) {
								this.loading = true
								axios.post('/admin/logs/delete/'+row)
										.then(res => {
												if (res.data.code != 0 || res.status != 200) {
														this.$notify({
																title: 'Failed',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: 'Success',
																message: '',
																type: 'success'
														});
														this.tabledata.data.splice(index,1);
												}
												this.loading = false
										})

						},
						filterTag(value, row) {
								return row.real_name === value;
						},
				},
				props:['tabledata','searchQuery','modelOptions','actionOptions'],
		}
</script>