<template>
	<div>
		<el-tag
						:key="tag"
						v-show="tag!=''"
						v-for="tag in tags"
						closable
						:disable-transitions="false"
						@close="handleClose(tag)">
			{{tag}}
		</el-tag>
		<el-autocomplete
						popper-class="my-autocomplete"
						style="min-width: 200px"
						class="input-new-tag"
						v-model="inputValue"
						v-if="inputVisible"
						ref="saveTagInput"
						:fetch-suggestions="querySearch"
						placeholder="请输入关键字"
						@select="handleSelect"
						:trigger-on-focus="false"
						size="mini"
		>
			<i class="el-icon-search el-input__icon" slot="suffix"></i>
			<template slot-scope="{ item }">
				<div class="name">{{ item.name }}</div>
				<span class="addr">{{ item.desc }}</span>
			</template>
		</el-autocomplete>
		<el-button v-else class="button-new-tag" v-show="show!=1" size="small" @click="showInput">+ 添加标签</el-button>
	</div>
</template>

<script>
		export default {
				name: "SearchTags",
				data: function() {
						return {
								inputVisible: false,
								inputValue: '',
						}
				},
				mounted(){
						if (this.tags.indexOf("")!==-1){//避免 ["",]情况
								this.tags.splice(this.tags.indexOf(""),1)
						}

				},
				methods:{
						//搜索标签
						querySearch(queryString, cb) {
								if (queryString=='') return;
								var results = [];
								axios.post('/admin/tags/search?tag='+queryString)
										.then(res => {
												if (res.data.code != 0 || res.status != 200) {
														results = [{"value":res.data.message}];
												} else {
														results = res.data.data
														// 调用 callback 返回建议列表的数据
												}
												cb(results);
										})
						},
						handleSelect(item) {
								let inputValue = item.name;
								if (inputValue) {
										//判断是否重复
										console.log(this.tags)
										if (this.tags.indexOf(inputValue) > -1) {
												this.$message({
														message: '标签不能重复哦~',
														type: 'warning'
												});
												return
										}
										this.tags.push(inputValue);
								}
								this.inputVisible = false;
								this.inputValue = '';
						},
						handleClose(tag) {
								if (this.show!=1){
										this.tags.splice(this.tags.indexOf(tag), 1);
								}
						},

						showInput() {
								this.inputVisible = true;
								this.$nextTick(_ => {
										this.$refs.saveTagInput.$refs.input.focus();
								});
						},
				},
				props:['tags','show']
		}
</script>
