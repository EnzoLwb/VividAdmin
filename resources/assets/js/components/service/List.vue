<template>
	<div>
		<el-card class="margin_top" shadow="hover">
			<div slot="header" >
				<el-button  icon="el-icon-plus" type="primary" size="mini" @click="outerVisible=true">添加服务项目</el-button>
			</div>
			<el-table :data="tableData" v-loading="loading">
				<el-table-column prop="id" label="序号"></el-table-column>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text">编辑</el-button>
						|
						<el-button type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="fenye" layout="prev, pager, next" :total="20" >
			</el-pagination>
		</el-card>
		<el-dialog :visible.sync="outerVisible"
							 :close-on-click-modal="false"
							 width="30%" title="添加服务项目" v-if="outerVisible">
			<el-row style="margin-top: 15px">
				<el-col :span="20">
					<el-form :model="object" :rules="rules">
						<el-form-item label="名称" prop="name">
							<el-input v-model="object.name"></el-input>
						</el-form-item>
						<el-form-item label="备注" >
							<el-input v-model="object.remark"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">提交</el-button>
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
							rules: {
								name: [{required: true, message: '必填项', trigger: 'blur'}],
							},
							tableData:[
								{
									remark: 'xxxx',
									name: '健身',
									id: 1,
								},{
									remark: 'XXXXX',
									name: '私教',
									id: 12,
								},{
									remark: '备注',
									name: '瑜伽',
									id: 13,
								},{
									remark: '备注',
									name: '美容',
									id: 14,
								},{
									remark: '备注',
									name: '健康餐',
									id: 15,
								},
							],
							loading:false,
							outerVisible:false,
						}
				},
				methods: {

				},
				props:[],
		}
</script>