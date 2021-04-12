<template>
	<div>
		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="date" label="日期" width="180" sortable></el-table-column>
			<el-table-column prop="type" label="业务类型"></el-table-column>
			<el-table-column prop="numbers" label="消耗次数" sortable></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
			<el-table-column prop="operator" label="操作人"></el-table-column>
		</el-table>
		<el-pagination
				class="fenye"
				:total="50"
				:page-sizes="this.unils.page_size"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData:[
					{
						remark: '',
						date: '2021-03-04',
						type: '拳击课',
						numbers: 1,
						operator: '小王',
					},{
						remark: '',
						date: '2021-04-04',
						type: '营养餐',
						numbers: 1,
						operator: '小王',
					},{
						remark: '体验一次',
						date: '2021-05-01',
						type: '拳击课',
						numbers: 0,
						operator: '王三',
					},{
						remark: '',
						date: '2021-11-04',
						type: '普通入场',
						numbers: 0,
						operator: '小王',
					},
				],
				loading:false,

			}
		},
		methods: {

		},
		props:[],
	}
</script>