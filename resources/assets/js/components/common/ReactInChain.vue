<template>
	<div style="display:inline">
		<el-form-item :label="label">
			<el-select  v-model="IsIndex" placeholder="默认全部" :disabled="disabled" @change="selectGhcj($event)" clearable >
				<el-option
								v-for="(item,index) in typelist"
								:key="item.id"
								:label="item.name"
								:value="index">
				</el-option>
			</el-select>
			<el-select  v-model="IsIndex2" :multiple="multiple" clearable  :disabled="disabled" collapse-tags placeholder="请选择" v-show="typelist2.length>0"><!--二级为多选-->
				<el-option
								v-for="item in typelist2"
								:key="item.id"
								:label="item.name"
								:value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
	</div>
</template>

<script>
		export default {
				name: "ReactInChain",
				watch:{
						IsIndex2(){
								if (this.multiple == true){//多选状态下
										if (this.IsIndex2.length == 0 && this.typelist[this.IsIndex].child.length == 0){
												//没有二级菜单的情况
												this.IsIndex2.push(this.typelist[this.IsIndex].id)
										}
								}
								this.$emit('getValue',this.IsIndex2)
						},
						value(val){//这是二级联动的值
								if (val){
										this.IsIndex2 = val
										if (this.typelist!=null){//回显
												for (var i=0;i<this.typelist.length;i++){
														if (this.typelist[i].child.length >0 ){
																for (var j=0;j<this.typelist[i].child.length;j++){
																		if (this.typelist[i].child[j].id == this.IsIndex2 ){
																				this.IsIndex = i
																				this.typelist2 = this.typelist[i].child
																				return;
																		}
																}
														}
												}
										}
								}else{//初始化
										this.typelist2 = ''
										this.IsIndex = ''
										this.IsIndex2 = this.multiple == true ? []:''
								}

						},
				},
				methods:{
						selectGhcj(val)
						{
									//清空 次级联动下拉框
									this.IsIndex2 = this.multiple == true ? []:''
									this.typelist2 = this.typelist[this.IsIndex].child

						},

				},
				data(){
						return {
								IsIndex:'',
								IsIndex2: this.multiple == true ? []:'',
								typelist2:'',
						}
				},
				props:{
						label:String,
						disabled:{
								type: Boolean,
								default: false
						},
						typelist:Array,
						multiple:{
								type: Boolean,
								default: true
						},
						value:{
								type:[Number,String],//已经选值了
								default: 0
						}
				}
		}
</script>
