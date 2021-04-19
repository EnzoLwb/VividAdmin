<template>
	<div>
		<el-card shadow="hover">
			<el-form :inline="true" size="mini" :class="!searchCollapse?'search-form-inline':''">
				<el-form-item>
					<el-input placeholder="卡号" v-model="search_form.card_no"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="姓名" v-model="search_form.name"></el-input>
				</el-form-item>
				<el-form-item label="类型:" style="margin-right: 15px">
					<el-radio v-model="search_form.type" :label="1">充值</el-radio>
					<el-radio v-model="search_form.type" :label="2">消费服务</el-radio>
				</el-form-item>
				<el-form-item label="变动金额:"  v-if="searchCollapse">
					<el-input-number  v-model="search_form.min_account" style="width: 120px"></el-input-number>
					<span style="margin: 0 10px">至</span>
					<el-input-number  v-model="search_form.max_account" style="width: 120px"></el-input-number>
				</el-form-item>
				<el-form-item label="时间:" v-if="searchCollapse">
					<el-date-picker
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format = "yyyy-MM-dd"
							v-model="search_form.register_date">
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
				<el-table-column prop="card_no" label="会员卡号"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column label="变动金额" sortable="custom" prop="account">
					<template slot-scope="scope">{{scope.row.type === 1 ? '+':'-'}} {{scope.row.account}}</template>
				</el-table-column>
				<el-table-column label="实际金额" sortable="custom" prop="deposit_account">
					<template slot-scope="scope">{{scope.row.type === 1 ? '+':'-'}} {{scope.row.deposit_account}}</template>
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template slot-scope="scope">{{scope.row.type === 1 ?'充值':'消费服务'}}</template>
				</el-table-column>
				<el-table-column prop="created_at" label="时间" sortable="custom"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="showDetail(scope.row)">查看详情</el-button>
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
		<!--记录详情-->
		<el-dialog :visible.sync="depositVisible"
							 :close-on-click-modal="false"
							 width="50%" title="充值记录详情" v-if="depositVisible">
			<deposit-record-detail :record_id="current_record_id"></deposit-record-detail>
		</el-dialog>
		<el-dialog :visible.sync="customVisible"
							 :close-on-click-modal="false"
							 width="50%" title="购买服务记录详情" v-if="customVisible">
			<custom-record-detail :record_id="current_record_id"></custom-record-detail>
		</el-dialog>
	</div>
</template>

<script>
	import DepositRecordDetail from '../common/DepositRecordDetail'
	import CustomRecordDetail from '../common/CustomRecordDetail'
	export default {
		components:{DepositRecordDetail,CustomRecordDetail},
				data() {
						return {
							dialogTitle:'',
							depositVisible:false,
							customVisible:false,
							current_record_id:'',
							tabledata:{},
							searchCollapse:false,//搜索内容是否展开
							search_form:{
								min_account:'',
								max_account:'',
								card_no:'',
								gender:'',
								register_date:'',
								name:'',
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
					showDetail(data){
						if (data.type === 1){
							this.depositVisible = true
							this.current_record_id = data.id
						}else{
							this.customVisible = true
							this.current_record_id = data.id
						}
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