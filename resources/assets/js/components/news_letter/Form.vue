<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
            </div>
            <el-form ref="form" :model="article" :rules="rules" size="mini" style="width: 80%" label-position="top">
                <el-form-item label="Templete Name" prop="emailName">
                    <el-input v-model="article.emailName"></el-input>
                </el-form-item>
                <el-form-item label="Subject" prop="emailSubject">
                    <el-input v-model="article.emailSubject"></el-input>
                </el-form-item>
                <el-form-item label="From Address" prop="emailFrom">
                    <el-input v-model="article.emailFrom"></el-input>
                </el-form-item>
                <el-form-item label="From Name" prop="fromName">
                    <el-input v-model="article.fromName"></el-input>
                </el-form-item>
                <el-form-item label="Deactive">
                    <el-switch
                            v-model="article.Disabled"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="Site">
                    <el-select v-model="site">
                        <el-option label="Service" value="Service"></el-option>
                        <el-option label="Media" value="Media"></el-option>
                    </el-select>
                </el-form-item>
                <!--editor-->
                <el-form-item label="Column description">

                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.article.word_count}}</b></div>
                <el-input v-model="article.emailId" type="hidden"></el-input>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" :loading="loading">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/javascript">
    const current_url = '/admin/news_letter/'
    export default {
        data: function() {
            return {
                article: this.originObj,
                form: {
                    emailName: '',
                    emailSubject: '',
                    emailFrom: '',
                    emailText: '',
                    fromName: '',
                    Disabled: 0,
                    word_count: 0,
                    emailId: 0,
                },
                rules: {
                    emailName: [{required: true, message: 'Required', trigger: 'blur'}],
                    emailSubject: [{required: true, message: 'Required', trigger: 'blur'}],
                    fromName: [{required: true, message: 'Required', trigger: 'blur'}],
                    emailFrom: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                site:this.editSite,
                pages:[],
                loading: false,
                pagesLoading: false,
            }
        },
        created () {
            if(Object.keys(this.originObj).length==0){
                this.article = this.form
            }
        },
        methods: {
            countWord(){
                let val = this.article.emailText.trim()
                if (!val){
                    this.article.word_count = 0
                }else{
                    this.article.word_count = val.split(" ").length
                }
            },
            submitForm() {
                console.log(this.article)
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        axios.post( current_url + 'save',this.article)
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
        props: ['originObj','title','editSite']
    }
</script>
