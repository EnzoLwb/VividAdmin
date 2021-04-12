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
				<el-form-item><el-button type="primary"   >查询</el-button></el-form-item>
				<el-form-item><el-button type="info">重置</el-button></el-form-item>
				<button class="el-button el-button--text el-button--small" type="button" style="margin-left: 8px;" @click="searchCollapse=!searchCollapse">
					<span v-if="searchCollapse"> 收起 <i class="el-icon-arrow-up"></i></span>
					<span v-else> 展开 <i class="el-icon-arrow-down"></i></span>
				</button>
			</el-form>
		</el-card>
		<el-card class="margin_top" shadow="hover">
			<el-table :data="tableData" v-loading="loading" size="small">
				<el-table-column prop="id" label="序号" width="70px"></el-table-column>
				<el-table-column prop="created_at" label="日期"></el-table-column>
				<el-table-column prop="log_name" label="模块"></el-table-column>
				<el-table-column prop="description" label="动作"></el-table-column>
				<el-table-column label="操作人" prop="real_name"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button slot="reference" size="small" type="text">编辑</el-button>
						|
						<el-button slot="reference" size="small" type="text">删除</el-button>
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
							tableData:[],
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