<template>
	<div>
		<el-card shadow="hover">
			<el-form :inline="true" size="mini" :class="!searchCollapse?'search-form-inline':''">
				<el-form-item>
					<el-input placeholder="卡号" v-model="search_form.card_no">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="姓名" v-model="search_form.name">
					</el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-select v-model="search_form.gender" placeholder="请选择">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入会时间:" v-if="searchCollapse">
					<el-date-picker
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format = "yyyy-MM-dd"
							v-model="search_form.register_date">
					</el-date-picker>
				</el-form-item>
				<el-form-item><el-button type="primary" @click="getData(search_form)">查询</el-button></el-form-item>
				<el-form-item><el-button type="info"  @click="getData({})">重置</el-button></el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 展开 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<el-card class="margin_top" shadow="hover">
			<div slot="header" >
				<el-button  icon="el-icon-plus" type="primary" size="mini" @click="add()">添加会员</el-button>
				<el-button  icon="el-icon-download" type="warning" size="mini" @click="exportMembers()">导出</el-button>
			</div>
			<el-table :data="tabledata.data" v-loading="loading" :row-key="getRowKeys"
								@selection-change = "handelSelection">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="card_no" label="会员卡号"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<el-table-column prop="id_number" label="身份证号"></el-table-column>
				<el-table-column prop="gender" label="性别" width="70px">
					<template slot-scope="scope">
						<span>{{scope.row.gender === 1 ? '男' : '女'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="register_time" label="入会时间"></el-table-column>
				<el-table-column prop="coach" label="教练"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row.card_no)">编辑</el-button>
						|
<!--						<el-button type="text" @click="edit(scope.row.card_no)">删除</el-button>-->
						<el-button type="text" @click="showCardHistory(scope.row.card_no)">会员卡记录</el-button>
						|
						<el-button type="text" @click="showPersonConsumeHistory(scope.row.card_no)">消费入场记录</el-button>
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
		<!--卡的记录-->
		<el-dialog :visible.sync="cardVisible" :close-on-click-modal="false"
							 width="70%" :title="cardTitle" v-if="cardVisible">
			<card-history :card_no="current_card_no"></card-history>
		</el-dialog>
		<!--服务消费入场记录-->
		<el-dialog :visible.sync="personVisible" :close-on-click-modal="false"
							 width="70%" :title="personTitle" v-if="personVisible">
			<person-consume-history :card_no="current_card_no"></person-consume-history>
		</el-dialog>
	</div>
</template>

<script>
	import CardHistory from '../common/CardHistory'
	import PersonConsumeHistory from '../common/PersonConsumeHistory'
	export default {
		components:{CardHistory,PersonConsumeHistory},
				data() {
						return {
							getRowKeys(row){
								return row.id
							},
							tabledata:{},
							current_card_no:'',
							personTitle:'',
							cardTitle:'',
							searchCollapse:false,//搜索内容是否展开
							search_form:{
								card_no:'',
								gender:'',
								register_date:'',
								name:'',
								page:1,
								per_page:this.unils.per_page,
							},
							loading:false,
							cardVisible:false,
							personVisible:false,
							multipleSelection:[],
						}
				},
				mounted() {
					this.getData({})
				},
				methods: {
					showCardHistory(card_no){
						this.current_card_no = card_no
						this.cardVisible = true
						this.cardTitle = '会员卡 ( '+card_no+' ) 充值/消费记录';
					},
					showPersonConsumeHistory(card_no){
						this.current_card_no = card_no
						this.personVisible = true
						this.personTitle = card_no + ' 的消费入场记录';
					},
					//多选
					handelSelection(val)
					{
						this.multipleSelection = val
					},
					exportMembers()
					{
						if (this.multipleSelection.length == 0){
							this.$message({
								type: 'warning',
								message: '请选择至少一个导出行！'
							});
							return;
						}
						let data = [];
						this.multipleSelection.forEach(item=>{
							data.push(item.id)
						})
						this.loading = true
						axios.post('/admin/membership/export',{data:data})
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											title: '请求失败',
											message: res.data.message,
											type: 'error'
										});
									} else {
										window.open(res.data.data.data,'_blank')
									}
									this.loading = false
								})

					},
					add(){
						window.location.href = '/admin/membership/add'
					},
					edit(card_no){
						window.location.href = '/admin/membership/edit?card_no='+card_no
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
				props:[],
		}
</script>