<template>
	<div>
		<el-table :data="tabledata.data" style="width: 100%" border>
			<el-table-column prop="created_at" label="日期" width="180" sortable></el-table-column>
			<el-table-column prop="type" label="业务类型">
				<template slot-scope="scope">
					<span v-html="scope.row.type"></span>
				</template>
			</el-table-column>
			<el-table-column prop="account" label="金额"></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
			<el-table-column prop="operator" label="操作人"></el-table-column>
		</el-table>
		<div>
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
	</div>
</template>

<script>
	export default {
			data() {
					return {
						tabledata:{},
						table_form:{
							page:1,
							per_page:this.unils.per_page,
						},
						loading:false,
					}
			},
			watch:{
				card_no: {
					handler:function (val, old) {
						this.getData(this.table_form)
					},
					immediate: true}
			},
			methods: {
				handleSizeChange(val) {
					this.table_form.per_page = val
					this.handleCurrentChange();
				},
				handleCurrentChange() {
					this.table_form.page = this.tabledata.current_page
					this.getData(this.table_form);
				},
				getData(data) {
					data.card_no = this.card_no
					this.loading = true
					axios.post('/admin/membership/card_record',data)
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
			props:['card_no'],
	}
</script>