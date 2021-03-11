<template>
	<div>
		<el-upload
						class="upload-demo"
						ref="upload"
						:drag = "!verify"
						:action="this.unils.upload_excel_path"
						:data="data"
						:on-success="successUpload"
						:before-upload="beforeUpload"
						:on-preview="handlePreview"
						:before-remove="handleBeforeRemove"
						:on-remove="handleRemove"
						:on-exceed="handleExceed"
						:file-list="detailList"
						multiple
		>
			<i class="el-icon-upload" v-show="!verify"></i>
			<div class="el-upload__text" v-show="!verify">将文件拖到此处，或<em>点击上传</em></div>
			<div slot="tip" class="el-upload__tip" v-show="!verify && tip">{{tip}}</div>
		</el-upload>
	</div>
</template>

<script>
		export default {
				name: "uploadFile",
				data(){
						return {
								fileListName:[],
						};
				},
				methods:{
						handleExceed(files, fileList) {//出发上传限制
								this.$message.warning(`只允许上传 ${this.limit} 个文件`);
						},
						successUpload(response, file, fileList) {//上传成功后
								let fileObject = {
										id:response.data.upload_id,
										name:file.name,
								}
								this.detailList.push(fileObject)
								this.$emit('success',JSON.stringify( this.detailList))
						},
						handleBeforeRemove(file, fileList) {//删除前
								if (this.verify){
										this.$message.error('审核状态下 不能删除数据!');
										return false
								}
								return this.$confirm(`确定移除 ${ file.name }？`);
						},
						handleRemove(file, fileList) {//删除
								this.detailList.forEach((item,index)=>{
										if (item.id === file.id) {
												this.$delete(this.detailList,index);
										}
								})
								this.$emit('success',JSON.stringify( this.detailList))
						},
						beforeUpload(file) {
								if (this.verify){
										this.$message.error('审核状态下 不能修改数据!');
										return false
								}
								if (this.fileListName.indexOf(file.name) !== -1) {
										this.$message.error('已上传该文件!');
										return false
								}
								this.fileListName.push(file.name)
								// const isJPG = file.type === 'image/jpeg';
								const isLt2M = file.size / 1024 / 1024 < 10;
								if (!isLt2M) {
										this.$message.error('上传文件大小不能超过 10MB!');
								}
								return isLt2M;
						},
						handlePreview(file) {
								if (this.verify){
										//审核状态下才能下载
										axios.get('/admin/common/downloadfile/file/type/'+file.id)
												.then(response => {
														var blob = new Blob([],{type:'application/zip;charset=utf-8'})
														var downloadElement = document.createElement('a')
														var href = window.URL.createObjectURL(blob) //创建下载链接
														downloadElement.href = response.data.data.path// 此处可以通过拼接字符串的方式传递参数
														downloadElement.download = file.name// 重命名名称
														document.body.appendChild(downloadElement)
														downloadElement.click() // 点击下载
														document.body.removeChild(downloadElement) // 下载完成之后移除元素
														window.URL.revokeObjectURL(href) // 释放掉blob对象

												})
								}
						}
				},
				computed:{
						detailList:{
								get(){
										if (this.fileList === undefined || this.fileList === null) return [];
										return JSON.parse(this.fileList)
								},
								set(){
										console.log('set')
								},
						},
				},
				props:{
						data:{
								type: Object,
								default: ()=>{}
						},
						verify:{//是否是审核状态 若为审核状态则不会提供上传功能 只展示文件列表
								type: Boolean,
								default: false
						},
						tip:{//父组件的回调方法
								type: String,
								default: ()=>""
						},
						limit:{
								type:Number,
								default: 6
						},
						fileList:{
								type: [String,Object],
						},
				}
		}
</script>
