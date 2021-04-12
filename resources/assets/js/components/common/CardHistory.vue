<template>
	<div>
		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="date" label="日期" width="180" sortable></el-table-column>
			<el-table-column prop="type" label="业务类型"></el-table-column>
			<el-table-column prop="account" label="金额" sortable></el-table-column>
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
								remark: '充值8000赠2000',
								date: '2021-03-04',
								type: '充值',
								account: '+10000',
								operator: '小王',
							},{
								remark: '十节课送一节',
								date: '2021-04-04',
								type: '购买 - 瑜伽',
								account: '-3000',
								operator: '小王',
							},{
								remark: '',
								date: '2021-04-04',
								type: '购买 - 营养餐',
								account: '-300',
								operator: '小李',
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