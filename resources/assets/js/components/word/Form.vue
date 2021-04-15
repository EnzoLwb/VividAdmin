<template>
    <div v-loading="loading">
        <el-row>
            <el-col :xs="24" :sm="24" :md="20" :lg="13" :xl="13">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>{{title}}</span>
                    </div>
                    <el-form ref="form" :model="article" :rules="rules" size="small" style="width: 80%" label-position="top">
                        <el-form-item label="Word" prop="word">
                            <el-input v-model="article.word"></el-input>
                        </el-form-item>
                        <el-form-item label="Site">
                            <el-select v-model="site" @change="getPages">
                                <el-option label="Service" value="Service"></el-option>
                                <el-option label="Media" value="Media"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Web page name" prop="page_ids" v-loading="pagesLoading">
                            <el-select  v-model="article.page_ids" multiple clearable
                                        collapse-tags style="min-width: 350px;">
                                <el-option
                                        v-for="item in pages"
                                        :key="item.page_id"
                                        :label="item.name + '   ('+ item.url +')'"
                                        :value="item.page_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-input v-model="article.word_id" type="hidden"></el-input>
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
    const current_url = '/admin/db_terms'
    export default {
        data: function() {
            let validateRepeatWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Required'));
                }
                axios.post('/admin/repeat_word',
                    {
                        model:'DbTerm',key:'word',
                        value:this.article.word,
                        current_id:this.article.word_id,
                        primary_key:'word_id',
                    }).then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                title: 'Request Failed',
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            if (res.data.data.exist){
                                callback(new Error('This word already exists, please do not add it repeatedly'));
                            }
                            callback()
                        }
                    })
            };
            return {
                article: this.originObj,
                form: {
                    word:'',
                    word_id:'',
                    page_ids:[],
                },
                rules: {
                    word: [
                        {required: true, message: 'Required', trigger: 'blur'},
                        { validator: validateRepeatWord, trigger: 'blur' }
                        ],
                    page_ids: [{required: true, message: 'Required', trigger: 'blur'}],
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
            }

        },
        methods: {
            getPages(){
                this.pagesLoading = true
                this.article.page_ids = [] //默认change会清空选择
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
        props: ['originObj','title','editSite']
    }
</script>
