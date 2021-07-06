<template>
	<div>
		<el-card shadow="hover">
			<el-form :inline="true" size="mini" :class="!searchCollapse?'search-form-inline':''">
				<el-form-item>
					<el-input placeholder="手机号" v-model="search_form.phone"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="姓名" v-model="search_form.name"></el-input>
				</el-form-item>
				<el-form-item label="类型:" style="margin-right: 15px">
					<el-radio v-model="search_form.type" label="private">私教</el-radio>
					<el-radio v-model="search_form.type" label="exercise">团课教练</el-radio>
				</el-form-item>
				<el-form-item label="申请日期:" v-if="searchCollapse">
					<el-date-picker
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format = "yyyy-MM-dd"
							v-model="search_form.created_at">
					</el-date-picker>
				</el-form-item>
				<el-form-item><el-button type="primary" @click="search">查询</el-button></el-form-item>
				<el-form-item><el-button type="info" @click="reset">重置</el-button></el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 展开 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<el-card class="margin_top" shadow="hover">
			<el-table :data="tabledata.data" v-loading="loading" @sort-change="sortChange">
				<el-table-column prop="name" label="姓名" width="100"></el-table-column>
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<el-table-column prop="id_number" label="身份证号"></el-table-column>
				<el-table-column prop="register_date" label="生日"></el-table-column>
				<el-table-column  label="性别" width="50">
					<template slot-scope="scope">{{scope.row.gender === 1 ?'男':'女'}}</template>
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template slot-scope="scope">{{scope.row.type === 'private' ?'私教':'团课教练'}}</template>
				</el-table-column>
				<el-table-column resizable label="凭证" width="100">
					<template slot-scope="scope">
						<el-image class="table-image"
											v-for="(item,index) in scope.row.photos"
											:key="index" :src="item"
											:preview-src-list="scope.row.photos">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="申请时间" width="150"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="handleDelete(scope.$index,scope.row)">删除记录</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pull-right">
				<el-pagination
						style="margin:15px 0"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="tabledata.current_page"
						:total="tabledata.total"
						:page-sizes="this.unils.page_size"
						:page-size="parseInt(tabledata.per_page)"
						layout="total, sizes, prev, pager, next, jumper">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
				data() {
						return {
							dialogTitle:'',
							depositVisible:false,
							customVisible:false,
							current_record_id:'',
							tabledata:{},
							searchCollapse:false,//搜索内容是否展开
							search_form:{
								created_at:'',
								phone:'',
								name:'',
								type:'',
								sort_prop:'',
								sort_order:'',
								page:1,
								per_page:this.unils.per_page,
							},
							loading:false,
							cardVisible:false,
							personVisible:false,
							detail:{},
						}
				},
				methods: {
					sortChange(column) {
						this.search_form.sort_prop = column.prop
						this.search_form.sort_order = column.order === 'descending'? 'desc':'asc';
						this.getData(this.search_form)
					},
					handleDelete(index,row) {
						this.$confirm('确定删除?', 'Confirm', {
							confirmButtonText: 'Yes',
							cancelButtonText: 'No',
							type: 'warning'
						}).then(() => {
							this.loading = true
							axios.delete(window.location.href + '?id=' + row.id)
									.then(res => {
										if (res.data.code != 0 || res.status != 200) {
											this.$notify({
												title: 'Request Failed',
												message: res.data.message,
												type: 'error'
											});
										} else {
											this.$notify({
												title: 'Success',
												message: res.data.message,
												type: 'success'
											});
										}
										this.tabledata.data.splice(index,1)
										this.loading = false
									})
						});
					},
					handleSizeChange(val) {
						this.search_form.per_page = val
						this.handleCurrentChange();
					},
					handleCurrentChange() {
						this.search_form.page = this.tabledata.current_page
						this.getData(this.search_form);
					},
					search(){
						this.getData(this.search_form);
					},
					reset(){
						window.location.href = window.location.href
					},
					getData(data) {
						this.loading = true
						axios.post(window.location.href,data)
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											title: 'Request Failed',
											message: res.data.message,
											type: 'error'
										});
									} else {
										this.tabledata = res.data.data
									}
									this.loading = false
								})
					},
				},
				mounted() {
					this.getData({})
				},
				props:[],
		}
</script>