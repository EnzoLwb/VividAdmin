<template>
	<div>
		<el-card shadow="hover" header="">
			<div slot="header" >
				<b>会员信息</b>
				<el-button  @click="historyCard()"
										icon="el-icon-wallet" type="info" size="small" style="float: right">该会员卡记录
				</el-button>
			</div>
			<el-form :inline="true" :class="!searchCollapse?'search-form-inline':''" size="small">
				<el-form-item  label="卡号">
					<el-input  v-model="search_form.card_no" clearable prefix-icon="el-icon-postcard">
					</el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input disabled :value="search_form.name">
					</el-input>
				</el-form-item>
				<el-form-item label="余额">
					<el-input  :value="search_form.balance" prefix-icon="el-icon-wallet" disabled>
					</el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-radio v-model="search_form.gender" v-show="search_form.gender === 1">男</el-radio>
					<el-radio v-model="search_form.gender" :label=2 v-show="search_form.gender === 2">女</el-radio>
				</el-form-item>
				<el-form-item label="身份证号" v-if="searchCollapse" >
					<el-input  :value="search_form.id_number" disabled>
					</el-input>
				</el-form-item>
				<el-form-item label="入会时间:" v-if="searchCollapse" >
					<el-date-picker disabled
							type="date" value-format = "yyyy-MM-dd"
							v-model="search_form.register_date">
					</el-date-picker>
				</el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;font-size: 14px" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 展开 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<!--消费次数-->
		<el-card class="margin_top" shadow="hover">
			<div slot="header" >
				<i>卡内服务项目</i>
				<el-button  @click="ruChang()"
						icon="el-icon-bottom-left" type="warning" size="small" style="float: right;margin-left: 15px">普通入场
					<el-tooltip class="item" effect="dark" content="不消耗次数但也记录" placement="top-start">
						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-button>
				<el-button  @click="historyService()"
										icon="el-icon-money" type="primary" size="small" style="float: right;">消费入场记录
				</el-button>
			</div>
			<el-table :data="tableData" v-loading="loading">
				<el-table-column prop="service" label="项目名称"></el-table-column>
				<el-table-column prop="coach" label="教练"></el-table-column>
				<el-table-column prop="account" label="总金额" sortable></el-table-column>
				<el-table-column prop="expire_start" label="开始日期" sortable></el-table-column>
				<el-table-column prop="expire_end" label="结束日期" sortable></el-table-column>
				<el-table-column prop="sum_number" label="总次数" sortable></el-table-column>
				<el-table-column prop="degree" label="剩余次数" sortable></el-table-column>
				<el-table-column label="操作" width="220px">
					<template slot-scope="scope">
						<div v-if="scope.row.degree >0 && scope.row.expire_end > today">
							<el-button @click="consumeVisible = true" type="danger" size="small">消费</el-button>
							<el-button  size="mini" >取消该项目</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination class="fenye"
					layout="prev, pager, next" :total="20" >
			</el-pagination>

		</el-card>
		<el-dialog :visible.sync="consumeVisible" :close-on-click-modal="false"
							 width="30%" title="消费服务项目" v-if="consumeVisible">
			<el-form label-position="top">
				<el-form-item label="服务名称" prop="name">
					<el-input value="拳击课"></el-input>
				</el-form-item>
				<el-form-item label="剩余次数" >
					<el-input-number value="60" disabled size="mini"></el-input-number>
				</el-form-item>
				<el-form-item label="本次使用次数" >
					<el-input-number value="1" size="mini" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="备注" >
					<el-input value=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="float: right">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!--卡的记录-->
		<el-dialog :visible.sync="cardVisible" :close-on-click-modal="false"
							 width="70%" title="会员卡（56454）的消费记录" v-if="cardVisible">
			<card-history></card-history>
		</el-dialog>
		<!--服务消费入场记录-->
		<el-dialog :visible.sync="personVisible" :close-on-click-modal="false"
							 width="70%" title="王小五的消费入场记录" v-if="personVisible">
			<person-consume-history></person-consume-history>
		</el-dialog>
	</div>
</template>

<script>
	import CardHistory from '../common/CardHistory'
	import PersonConsumeHistory from '../common/PersonConsumeHistory'
		export default {
				components:{CardHistory,PersonConsumeHistory},
				created(){

				},
				data() {
						return {
							today:this.getNowFormatDate(),
							tableData:[
								{
									service: '拳击',
									coach: '甄子丹',
									account:3000,
									expire_start:'2021-04-11',
									expire_end:'2022-04-11',
									sum_number:365,
									degree:30,
								},
								{
									service: '瑜伽',
									coach: '杨丽萍',
									account:10000,
									expire_start:'2021-04-11',
									expire_end:'2022-04-11',
									sum_number:10,
									degree:3,
								},
								{
									service: '营养餐',
									coach: '',
									account:600,
									expire_start:'2020-04-11',
									expire_end:'2022-04-11',
									sum_number:20,
									degree:13,
								},
								{
									service: '营养餐',
									coach: '',
									account:600,
									expire_start:'2020-04-11',
									expire_end:'2021-04-11',
									sum_number:20,
									degree:13,
								},
								{
									service: '营养餐',
									coach: '',
									account:600,
									expire_start:'2020-04-11',
									expire_end:'2022-04-11',
									sum_number:5,
									degree:0,
								},
							],
							searchCollapse:false,//搜索内容是否展开
							search_form:{
								card_no:'54471156765',
								gender:2,
								register_date:'2021-04-11',
								id_number:'1201041994052358x',
								name:'王小五',
								balance:10000,
							},
							loading:false,
							consumeVisible:false,
							cardVisible:false,
							personVisible:false,
						}
				},
				methods: {
					historyCard(){
						this.cardVisible = true
					},
					historyService(){
						this.personVisible = true
					},
					ruChang(){
						this.$confirm('确定 <a href="#"><i>王小五</i> </a> 直接入场?', '提示', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '成功!'
							});
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