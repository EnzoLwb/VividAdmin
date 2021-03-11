<template>
	<div>
		<el-dialog
						title="重新上传文件"
						:visible.sync="importVisible"
						v-if="importVisible"
						:close-on-click-modal="false"
						width="30%">
			<el-upload
							style="margin: 20px 0;"
							class="upload-demo"
							ref="upload"
							:action=this.unils.upload_excel_path
							:data=this.upload_data
							:on-success="successUpload"
							:on-exceed="handleExceed"
							:on-remove="handleRemove"
							:file-list="fileList"
			>
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
			<span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="close()" :disabled="button_disabled">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
		export default {
				name: "uploadFile",
				data(){
						return {
								fileList:[],
								button_disabled:true,
								import_path:'',
						};
				},
				methods:{
						handleExceed(files, fileList) {
								this.$message.warning(`只允许上传 1 个文件`);
						},
						handleRemove(file, fileList) {//删除
								this.fileList = [];
								this.import_path = '';
						},
						close(){
								this.$emit('closeDialog',this.import_path)
						},
						successUpload(response, file, fileList) {
								this.fileList.push({name:file.name,url:''})
								this.import_path = response.data.path
								this.button_disabled = false
						},
				},
				props:{
						importVisible:{
								type: Boolean,
								default: false
						},
						value:{
								type:[Number,String],//已经选值了
								default: 0
						},
						upload_data:{
								type:Object,
								default: {}
						}
				}
		}
</script>
