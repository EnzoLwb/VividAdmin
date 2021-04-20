<template>
	<div>
		<el-card shadow="hover" header="">
			<div slot="header" >
				<b>会员信息</b>
				<el-button  @click="historyCard()" v-show="this.search_form.name"
										icon="el-icon-wallet" type="info" size="small" style="float: right">该会员卡记录
				</el-button>
			</div>
			<el-form :inline="true" :class="!searchCollapse?'search-form-inline':''" size="small">
				<el-form-item  label="卡号">
					<el-input  v-model="search_form.card_no" placeholder="刷卡后自动显示数据"
										 clearable prefix-icon="el-icon-postcard" @input="loadMember()"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input disabled :value="search_form.name" v-loading="member_loading"></el-input>
				</el-form-item>
				<el-form-item label="余额">
					<el-input  :value="search_form.wallet" prefix-icon="el-icon-wallet" disabled></el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-radio v-model="search_form.gender" v-show="search_form.gender === 1" :label=1>男</el-radio>
					<el-radio v-model="search_form.gender" :label=2 v-show="search_form.gender === 2">女</el-radio>
				</el-form-item>
				<el-form-item label="身份证号" v-if="searchCollapse" >
					<el-input  :value="search_form.id_number" disabled></el-input>
				</el-form-item>
				<el-form-item label="入会时间:" v-if="searchCollapse" >
					<el-date-picker disabled
							type="date" value-format = "yyyy-MM-dd"
							v-model="search_form.register_time">
					</el-date-picker>
				</el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;font-size: 14px" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 更多信息 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<!--消费次数-->
		<el-card class="margin_top" shadow="hover">
			<div slot="header" >
				<i>卡内服务项目</i>
				<el-button  @click="ruChang()"  v-show="this.search_form.name"
						icon="el-icon-bottom-left" type="warning" size="small" style="float: right;margin-left: 15px">普通入场
					<el-tooltip class="item" effect="dark" content="不消耗次数但也记录" placement="top-start">
						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-button>
				<el-button  @click="historyService()" v-show="this.search_form.name"
										icon="el-icon-money" type="primary" size="small" style="float: right;">消费入场记录
				</el-button>
			</div>
			<el-table :data="tabledata.data" v-loading="loading">
				<el-table-column prop="title" label="项目名称"></el-table-column>
				<el-table-column prop="coach" label="教练"></el-table-column>
				<el-table-column prop="fee" label="总金额" sortable></el-table-column>
				<el-table-column prop="enable_date" label="开始日期" sortable></el-table-column>
				<el-table-column prop="disable_date" label="结束日期" sortable></el-table-column>
				<el-table-column prop="numbers" label="总次数" sortable></el-table-column>
				<el-table-column prop="degree" label="剩余次数" sortable></el-table-column>
				<el-table-column label="操作" width="220px">
					<template slot-scope="scope">
						<div v-if="scope.row.degree >0 && scope.row.disable_date > today && scope.row.enable_date < today " >
							<el-button @click="customEnter(scope.row)" type="danger" size="small">消费</el-button>
							<el-button  size="mini" @click="cancelProject(scope.$index,scope.row)">取消该项目</el-button>
						</div>
						<div v-else-if="scope.row.degree === 0">次数不足</div>
						<div v-else-if="scope.row.disable_date > today">已过期</div>
						<div v-else-if="scope.row.enable_date < today">未生效</div>
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
		<!--消费-->
		<el-dialog :visible.sync="consumeVisible" :close-on-click-modal="false"
							 width="30%" title="消费服务项目" v-if="consumeVisible">
			<el-form label-position="top" v-loading="customEnterLoading">
				<el-form-item label="服务名称">
					<el-input :value="custom_detail.title" disabled></el-input>
				</el-form-item>
				<el-form-item label="剩余次数" >
					<el-input-number :value="custom_detail.degree" disabled size="mini"></el-input-number>
				</el-form-item>
				<el-form-item label="本次使用次数" >
					<el-input-number v-model="custom_detail.decrease_number" size="mini" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="备注" >
					<el-input v-model="custom_detail.note"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="float: right" @click="customEnterSubmit">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!--卡的记录-->
		<el-dialog :visible.sync="cardVisible" :close-on-click-modal="false"
							 width="60%" :title="cardTitle" v-if="cardVisible">
			<card-history :card_no="search_form.card_no"></card-history>
		</el-dialog>
		<!--服务消费入场记录-->
		<el-dialog :visible.sync="personVisible" :close-on-click-modal="false"
							 width="60%" :title="personTitle" v-if="personVisible">
			<person-consume-history :card_no="search_form.card_no"></person-consume-history>
		</el-dialog>
	</div>
</template>

<script>
	import CardHistory from '../common/CardHistory'
	import PersonConsumeHistory from '../common/PersonConsumeHistory'
		export default {
				components:{CardHistory,PersonConsumeHistory},
				created(){},
				data() {
						return {
							today:this.getNowFormatDate(),
							tabledata:{},
							searchCollapse:false,//搜索内容是否展开
							search_form:{
								card_no:'',
								gender:0,
								register_time:'',
								id_number:'',
								name:'',
								wallet:0,
							},
							table_form:{
								page:1,
								card_no:'',
								per_page:this.unils.per_page,
							},
							custom_detail:{
								title:'',
								degree:'',
								note:'',
								decrease_number:1,
							},
							loading:false,
							consumeVisible:false,
							cardVisible:false,
							personVisible:false,
							member_loading:false,
							customEnterLoading:false,//确认消费次数入场
							cardTitle:'',
							personTitle:'',
						}
				},
				methods: {
					//取消入场
					cancelProject(index,data){
						this.$confirm('确定将<a href="#"><i>'+data.title+'</i> </a> 从会员卡中删除吗?', '提示', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let newData = {};
							newData.card_no = this.search_form.card_no
							newData.id = data.id
							axios.post('/admin/card/project',newData)
									.then(res => {
										if (res.data.code != 0 || res.status != 200) {
											this.$notify({
												title: 'Request Failed',
												message: res.data.message,
												type: 'error'
											});
										} else {
											this.$message({
												type: 'success',
												message: '成功!'
											});
											this.tabledata.data.splice(index,1)
										}
										this.loading = false
									})

						});
					},
					//消费入场显示
					customEnter(data){
						this.custom_detail = {
							id:data.id,
							title:data.title,
							degree:data.degree,
							note:'',
							decrease_number:1,
						}
						this.consumeVisible = true
					},
					customEnterSubmit(){
						this.customEnterLoading = true
						let data = this.custom_detail
						data.card_no = this.search_form.card_no
						axios.post('/admin/enter/custom',data)
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											title: '消费入场失败',
											message: res.data.message,
											type: 'error'
										});
									} else {
										this.$notify({
											title: '消费入场成功',
											message: res.data.message,
											type: 'success'
										});
                      this.getData(this.table_form)
									}
									this.customEnterLoading = false
									this.consumeVisible = false
								})
					},
					loadMember(){
						if (!this.search_form.card_no) return
						this.member_loading = true
						axios.post('/admin/membership/by_card_no',{card_no:this.search_form.card_no,balance:1})
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											title: '获取会员信息失败',
											message: res.data.message,
											type: 'error'
										});
									} else {
										if (res.data.data) {
										    //初始化
                        this.table_form = {
                            page:1,
                            card_no:this.search_form.card_no,
                            per_page:this.unils.per_page,
                        }
											res.data.data.wallet = res.data.data.balance.balance_fee
											this.search_form = res.data.data
											this.getData(this.table_form)
										}
									}
									this.member_loading = false
								})
					},
					handleSizeChange(val) {
						this.table_form.per_page = val
						this.handleCurrentChange();
					},
					handleCurrentChange() {
						this.table_form.page = this.tabledata.current_page
						this.getData(this.search_form);
					},
					getData(data) {
						data.card_no = this.search_form.card_no
						this.loading = true
						axios.post('/admin/card/projects',data)
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
					historyCard(){
						this.cardTitle = '会员卡( '+this.search_form.card_no+' ) 充值/消费记录';
						this.cardVisible = true
					},
					historyService(){
						this.personTitle = this.search_form.name + '的消费入场记录';
						this.personVisible = true
					},
					ruChang(){
						this.$confirm('确定 <a href="#"><i>'+this.search_form.name+'</i> </a> 直接入场?', '提示', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.loading = true
							axios.post('/admin/enter/normal',{card_no:this.search_form.card_no})
									.then(res => {
										if (res.data.code != 0 || res.status != 200) {
											this.$notify({
												title: '普通入场失败',
												message: res.data.message,
												type: 'error'
											});
										} else {
											this.$notify({
												title: '普通入场成功',
												message: res.data.message,
												type: 'success'
											});
										}
										this.loading = false
									})
						});
					},
					getNowFormatDate() {
						var date = new Date();
						var seperator1 = "-";
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						var strDate = date.getDate();
						if (month >= 1 && month <= 9) {
							month = "0" + month;
						}
						if (strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
						}
						var currentdate = year + seperator1 + month + seperator1 + strDate;
						return currentdate;
					}
				},
				props:[],
		}
</script>