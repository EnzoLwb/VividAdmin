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
                <el-form-item style="margin-bottom:0">
                    <template slot="label">
                        <span> Column description: </span>
                        <p>( WordCount: <b style="color: red">{{this.article.word_count}}</b> )</p>
                    </template>
                </el-form-item>
                <el-form-item
                        v-for="(val, index) in article.key_value"
                        :key="index"
                        :prop="'key_value.' + index "
                        :rules="{required: true, message: 'Required', trigger: 'blur'}">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="article.key_value[index]" @input="countWord" type="textarea"></el-input>
                        </el-col>
                        <el-col :span="1" :offset="1">
                            <el-button @click.prevent="removeDesc(index)" type="danger" size="mini" round icon="el-icon-delete"></el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-button @click="addDesc" icon="el-icon-plus" size="small" type="success">Add Desc</el-button>
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
    const current_url = '/admin/content_list'
    export default {
        data: function() {
            let validateRepeatWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Required'));
                }
                axios.post('/admin/repeat_word',
                    {
                        model:'ContentList',key:'key_name',
                        value:this.article.key_name,
                        current_id:this.article.key_id,
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
                    key_name: '',
                    key_value: ["",],
                    page_id: '',
                    key_id: '',
                    word_count: 0,
                },
                rules: {
                    page_id: [{required: true, message: 'Required', trigger: 'blur'}],
                    key_name: [{required: true, message: 'Required', trigger: 'blur'},{ validator: validateRepeatWord, trigger: 'blur' }],
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
                var page_id = this.originObj.page_id
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
            /*动态添加*/
            removeDesc(index) {
                this.article.key_value.splice(index, 1)
            },
            addDesc() {
                this.article.key_value.push('');
            },
            countWord(){
                //计算每个desc 的 countword
                var count = 0;
                this.article.key_value.forEach(item=>{
                    var val = item.trim()
                    if (val){
                        count += val.split(" ").length
                    }
                })
                this.article.word_count = count
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
                console.log(this.article)
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
