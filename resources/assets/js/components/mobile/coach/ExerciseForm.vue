<template>
    <div v-loading="loading">
        <el-row >
            <el-col :span="24">
                <el-form ref="form" :model="article" label-position="top" label-width="140px" size="mini"
                         :rules="rules">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="article.name" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="id_number">
                        <el-input v-model="article.id_number" @blur="getBirthDate" prefix-icon="el-icon-s-check"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio v-model="article.gender" :label=1>男</el-radio>
                        <el-radio v-model="article.gender" :label=2>女</el-radio>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="article.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" prop="register_date">
                        <el-date-picker
                                v-model="article.register_date"
                                value-format = "yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="个人照片/资质证明" prop="screenshots">
                        <el-upload
                                class="avatar-uploader avatar"
                                :action = this.unils.upload_img_path
                                :on-success="successUpload"
                                :before-upload="this.unils.beforeUploadImg"
                                list-type="picture-card"
                                :limit="6"
                                :on-remove="handleRemove" :file-list="article.screenshots">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()" :loading="btnLoading">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!--Preview Img-->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    export default {
        data: function() {
            const validatePhone = (rule, value, callback) => {
                if (!this.isPhone(value)) {
                    callback(new Error('请输入正确的手机号'))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                btnLoading: false,
                article: {
                    gender:'',
                    type:this.type,
                    name:'',
                    id_number:'',
                    register_date:'',
                    phone:'',
                    screenshots:[]
                },
                rules: {
                    phone: [{required: true, message: '手机号必填项', trigger: 'blur'},
                        { validator: validatePhone, trigger: 'blur' },],
                    gender: [{required: true, message: '必选项', trigger: 'blur'}],
                    name: [{required: true, message: '必填项', trigger: 'blur'}],
                    id_number: [{required: true, message: '必填项', trigger: 'blur'}],
                    register_date: [{required: true, message: '必填项', trigger: 'blur'}],
                    screenshots: [{required: true, message: '请上传相关证明进行审核', trigger: 'blur'}],
                },
                dialogImageUrl: '',
                dialogVisible: false,
            }
        },
        created () {
            console.log(this.type)
        },
        methods: {
            getBirthDate(){
                if (this.article.id_number.length> 16){
                    let date = this.article.id_number.slice(6,14)
                    console.log(date)
                    date = date.slice(0,4) + '-' + date.slice(4,6)+ '-' + date.slice(6,8)
                    console.log(date)
                    this.article.register_date = date
                }
            },
            isPhone(str) {
                const reg = /^[1]([3-9])[0-9]{9}$/
                return reg.test(str)
            },
            handleRemove(file, fileList) {
                this.article.screenshots = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            successUpload(response) {
                this.loading = false
                this.article.screenshots.push(response.data.path)
            },
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        axios.post('/api/coach/settled',this.article)
                            .then(res => {
                                if (res.data.code != 0 || res.status != 200) {
                                    this.$notify({
                                        title: '提交失败',
                                        message: res.data.message,
                                        type: 'error'
                                    });
                                } else {
                                    this.$notify({
                                        title: '提交成功',
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    setTimeout(function () {
                                        window.location.href = '/coach/recruit'
                                    }, 1000);
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
        },
        props: ['type']
    }
</script>

<style scoped>

</style>