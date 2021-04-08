<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="13" :xl="13">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
            </div>
            <el-form ref="form" :model="article" :rules="rules" size="medium" style="width: 80%" label-position="top">
                <el-form-item label="Column Name" prop="key_name">
                    <el-input v-model="article.key_name"></el-input>
                </el-form-item>
                <el-form-item label="Constant type" prop="constant_type">
                    <el-select  v-model="article.constant_type" clearable style="width: 150px;">
                        <el-option
                                v-for="item in typeSelect"
                                :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Site">
                    <el-select v-model="site" @change="getPages">
                        <el-option label="Service" value="Service"></el-option>
                        <el-option label="Media" value="Media"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Web page name" prop="page_id" v-loading="pagesLoading">
                    <el-select  v-model="article.page_id" clearable style="min-width: 250px;">
                        <el-option
                                v-for="item in pages"
                                :key="item.page_id"
                                :label="item.name + '   ('+ item.url +')'"
                                :value="item.page_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Column description" prop="key_value">
                    <el-input v-model="article.key_value" type="textarea" @input="countWord"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.article.word_count}}</b></div>
                <el-input v-model="article.key_id" type="hidden"></el-input>
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
    const current_url = '/admin/constant_list/'
    export default {
        data: function() {
            return {
                article: this.originObj,
                form: {
                    key_name: '',
                    key_value: '',
                    page_id: '',
                    key_id: '',
                    constant_type: '',
                    word_count: 0,
                },
                rules: {
                    page_id: [{required: true, message: 'Required', trigger: 'blur'}],
                    constant_type: [{required: true, message: 'Required', trigger: 'blur'}],
                    key_name: [{required: true, message: 'Required', trigger: 'blur'}],
                    key_value: [{required: true, message: 'Required', trigger: 'blur'}],
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
            }else{
                //加载pages 和 默认选中的内容
                let page_id = this.originObj.page_id
                this.pagesLoading = true
                this.article.page_id = null
                axios.post('/admin/pages_by_site',{site:this.site})
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                title: 'Request Failed',
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            this.pages = res.data.data
                            this.article.page_id = page_id
                        }
                        this.pagesLoading = false
                    })
            }
        },
        methods: {
            countWord(){
                let val = this.article.key_value.trim()
                if (!val){
                    this.article.word_count = 0
                }else{
                    this.article.word_count = val.split(" ").length
                }
            },
            getPages(){
                this.pagesLoading = true
                this.article.page_id = null //默认change会清空选择
                axios.post('/admin/pages_by_site',{site:this.site})
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                title: 'Request Failed',
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            this.pages = res.data.data
                        }
                        this.pagesLoading = false
                    })
            },
            submitForm() {
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
        props: ['originObj','title','editSite','typeSelect']
    }
</script>
