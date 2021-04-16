<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="13" :xl="13">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
            </div>
            <el-form ref="form" :model="article" :rules="rules" size="small" style="width: 80%" label-position="top">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="article.title" placeholder="Enter the title"></el-input>
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
                <el-form-item label="Description" prop="descriptions">
                    <el-input v-model="article.descriptions" type="textarea" @input="countWord"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.article.word_count}}</b></div>
                <el-form-item label="Upload video" prop="video">
                    <el-upload
                            class="upload-demo"
                            :action = this.unils.upload_video_path
                            :on-success="successUpload"
                            :show-file-list="false">
                        <video v-if="article.video" :src="article.video" class="avatar" controls="controls"></video>
                        <el-button size="small" type="info">Browse</el-button>
                    </el-upload>
                </el-form-item>
                <el-input v-model="article.video_id" type="hidden"></el-input>
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
    const current_url = '/admin/video_list'
    export default {
        data: function() {
            let validateRepeatWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Required'));
                }
                axios.post('/admin/repeat_word',
                    {
                        model:'VideoList',key:'title',
                        value:this.article.title,
                        current_id:this.article.video_id,
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
                    title: '',
                    page_id: '',
                    video_id: '',
                    video: '',
                    word_count: 0,
                    descriptions: '',
                },
                rules: {
                    page_id: [{required: true, message: 'Required', trigger: 'blur'}],
                    video: [{required: true, message: 'Video Required', trigger: 'blur'}],
                    title: [{required: true, message: 'Required', trigger: 'blur'},{ validator: validateRepeatWord, trigger: 'blur' }],
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
                let val = this.article.descriptions.trim()
                if (!val){
                    this.article.word_count = 0
                }else{
                    this.article.word_count = val.split(" ").length
                }
            },
            successUpload(response, file, fileList) {
                console.log(response.data)
                this.article.video = response.data.path
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
        props: ['originObj','title','editSite','typeSelect']
    }
</script>
