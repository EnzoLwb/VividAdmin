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
				<el-form-item><el-button type="primary" >查询</el-button></el-form-item>
				<el-form-item><el-button type="info">重置</el-button></el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 展开 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<el-card class="margin_top" shadow="hover">
			<div slot="header" >
				<el-button  icon="el-icon-user" type="primary" size="mini">添加会员</el-button>
				<el-button  icon="el-icon-download" type="warning" size="mini">导出</el-button>
			</div>
			<el-table :data="tableData" v-loading="loading">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="card_no" label="会员卡号"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="id_number" label="身份证号"></el-table-column>
				<el-table-column prop="gender" label="性别" width="70px">
					<template slot-scope="scope">
						<span>{{scope.row.gender === 1 ? '男' : '女'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="register_date" label="入会时间"></el-table-column>
				<el-table-column prop="coach" label="教练"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text">编辑</el-button>
						|
						<el-button type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
		export default {
				data() {
						return {
							tableData:[
								{
									card_no: '2324877',
									name: '王小虎',
									gender: 1,
									id_number: '120104199405237979',
									coach:'张三 李四 王五',
									register_date:'2021-04-11',
									phone:'17602658233',
								}, {
									card_no: '2324877',
									name: '王小虎2',
									gender: 1,
									id_number: '120104199405237979',
									coach:'张三',
									register_date:'2021-04-11',
									phone:'17602658233',
								},{
									card_no: '2324877',
									name: '王大虎',
									gender: 1,
									id_number: '120104199405237979',
									coach:'铁柱',
									register_date:'2021-04-11',
									phone:'17602658233',
								},{
									card_no: '2324877',
									name: '王小虎4',
									gender: 1,
									id_number: '120104199405237979',
									coach:'张三 李四 王五',
									register_date:'2021-04-11',
									phone:'17602658234',
								}
							],
							searchCollapse:false,//搜索内容是否展开
							search_form:{
								card_no:'',
								gender:'',
								register_date:'',
								name:'',
								page:0,
								per_page:this.unils.per_page,
							},
							loading:false,
						}
				},
				methods: {

				},
				props:[],
		}
</script>