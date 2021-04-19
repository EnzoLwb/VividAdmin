<template>
	<div>
		<el-card class="margin_top" shadow="hover">
			<div slot="header" >
				<el-button  icon="el-icon-plus" type="primary" size="mini" @click="showForm('add')">添加服务项目</el-button>
			</div>
			<el-table :data="tabledata.data" v-loading="loading">
				<el-table-column prop="id" label="序号"></el-table-column>
				<el-table-column prop="title" label="名称"></el-table-column>
				<el-table-column prop="note" label="备注"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="showForm('edit',scope.row)">编辑</el-button>
						|
						<el-button type="text" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
		<el-dialog :visible.sync="outerVisible" v-loading="form_loading"
							 :close-on-click-modal="false"
							 width="30%" :title="dialogTitle" v-if="outerVisible">
			<el-row style="margin-top: 15px">
				<el-col :span="20">
					<el-form :model="object" ref="form">
						<el-form-item label="名称" prop="name" :rules="[{required: true, message: '必填项', trigger: 'blur'}]">
							<el-input v-model="object.name"></el-input>
						</el-form-item>
						<el-form-item label="备注" >
							<el-input v-model="object.remark"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm">提交</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
		export default {
				data() {
						return {
							object:{
								name:'',
								remark:'',
							},
							tabledata:{},
							loading:false,
							form_loading:false,
							outerVisible:false,
							search_form:{
								page:0,
								per_page:this.unils.per_page,
							},
							dialogTitle:'',
						}
				},
				mounted() {
					this.getData({})
				},
				methods: {
					showForm(operation,data={}){
						this.outerVisible = true
						if (operation === 'add'){
							this.dialogTitle = '添加';
							this.object = {
								name:'',
								id:'',
								remark:'',
							}
						}else{
							this.dialogTitle = '编辑';
							this.object = {
								name:data.title,
								id:data.id,
								remark:data.note,
							}
						}
					},
					submitForm(){
						this.$refs['form'].validate((valid) => {
							if (valid){
								this.form_loading = true
								axios.post(window.location.href,this.object)
										.then(res => {
											if (res.data.code != 0 || res.status != 200) {
												this.$notify({
													title: '添加失败',
													message: res.data.message,
													type: 'error'
												});
											} else {
												this.$notify({
													title: '添加成功',
													message: res.data.message,
													type: 'success'
												});
												window.location.href = window.location.href
											}
											this.form_loading = false

										})
							}else {
								return false
							}
						})
					},
					handleSizeChange(val) {
						this.search_form.per_page = val
						this.handleCurrentChange();
					},
					handleCurrentChange() {
						this.search_form.page = this.tabledata.current_page
						this.getData(this.search_form);
					},
					getData(data) {
						this.loading = true
						axios.post('/admin/setting/service/list',data)
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
				},
				props:[],
		}
</script>