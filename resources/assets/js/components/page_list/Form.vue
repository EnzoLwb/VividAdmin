<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
            </div>
            <el-form ref="form" :model="article" :rules="rules" size="medium" style="width: 80%" label-position="top">
                <el-form-item label="Page Name" prop="name">
                    <el-input v-model="article.name"></el-input>
                </el-form-item>
                <el-form-item label="Page URL" prop="url">
                    <el-input v-model="article.url"></el-input>
                </el-form-item>
                <el-form-item label="Site" prop="website">
                    <el-select v-model="article.website">
                        <el-option label="Service" value="Service"></el-option>
                        <el-option label="Media" value="Media"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Site Module" prop="module_id">
                    <el-select  v-model="article.module_id" clearable style="width: 150px;">
                        <el-option
                                v-for="item in moduleSelect"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Note" prop="note">
                    <el-input v-model="article.note" type="textarea"></el-input>
                </el-form-item>
                <el-form-item prop="screenshots">
                    <template slot="label">
                        Page ScreenShots
                        <el-tooltip class="item" effect="dark" content="More than 1 screenshot can be added to display various page status" placement="top-start" >
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </template>
                    <el-upload
                            :action = this.unils.upload_img_path
                            :on-success="successUpload"
                            :before-upload="this.unils.beforeUploadImg"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove" :file-list="article.screenshots">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-input v-model="article.page_id" type="hidden"></el-input>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" :loading="loading">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        </el-col>
    </el-row>
    <!--Preview Img-->
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</div>
</template>

<script type="text/javascript">
    const current_url = '/admin/page_list'
    export default {
        data: function() {
            return {
                article: this.originObj,
                form: {
                    website: '',
                    module_id: '',
                    name: '',
                    url: '',
                    note: '',
                    page_id: '',
                    screenshots:[]
                },
                rules: {
                    name: [{required: true, message: 'Required', trigger: 'blur'}],
                    website: [{required: true, message: 'Required', trigger: 'blur'}],
                    module_id: [{required: true, message: 'Required', trigger: 'blur'}],
                    note: [{required: true, message: 'Required', trigger: 'blur'}],
                    screenshots: [{required: true, message: 'Required', trigger: 'blur'}],
                    url: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                dialogImageUrl: '',
                dialogVisible: false,
                loading: false,
            }
        },
        created () {
            if(Object.keys(this.originObj).length==0){
                this.article = this.form
            }
        },
        methods: {
            handleRemove(file, fileList) {
                this.article.screenshots = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            successUpload(response) {
                this.loading = false
                this.article.screenshots.push(response.data)
            },
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        axios.post( current_url + '/save',this.article)
                            .then(res => {
                                if (res.data.code != 0 || res.status != 200) {
                                    this.$notify({
                                        message: res.data.message,
                                        type: 'error'
                                    });
                                } else {
                                    this.$notify({
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    this.$confirm('Do you want to jump to the list?', 'Confirm', {
                                        confirmButtonText: 'Yes',
                                        cancelButtonText: 'No',
                                        type: 'warning'
                                    }).then(() => {
                                        window.location.href = current_url
                                    }).catch(() => {
                                        window.location.href = window.location.href
                                    });
                                }
                                this.loading = false
                            })
                    }
                });

            },
        },
        props: ['moduleSelect','originObj','title']
    }
</script>
