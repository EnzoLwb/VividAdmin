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
                <el-form-item label="Url" prop="url">
                    <el-input v-model="article.url" placeholder="Enter the Open page link"></el-input>
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
                <el-form-item label="Category" prop="pic_type">
                    <el-select  v-model="article.pic_type" clearable style="width: 150px;">
                        <el-option
                                v-for="item in typeSelect"
                                :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Description 1" >
                    <el-input v-model="article.descriptions[0]" type="textarea" @input="countWord"></el-input>
                </el-form-item>
                <el-form-item label="Description 2" >
                    <el-input v-model="article.descriptions[1]" type="textarea" @input="countWord"></el-input>
                </el-form-item>
                <el-form-item label="Description 3" >
                    <el-input v-model="article.descriptions[2]" type="textarea" @input="countWord"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.article.word_count}}</b></div>
                <el-form-item label="Upload image" prop="pic">
                    <el-upload
                            class="upload-demo"
                            :action = this.unils.upload_img_path
                            :before-upload="this.unils.beforeUploadImg"
                            :on-success="successUpload"
                            :show-file-list="false">
                        <img v-if="article.pic" :src="article.pic" class="avatar">
                        <el-button size="small" type="info">Browse</el-button>
                    </el-upload>
                </el-form-item>
                <el-input v-model="article.pic_id" type="hidden"></el-input>
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
    const current_url = '/admin/img_list/'
    export default {
        data: function() {
            return {
                article: this.originObj,
                form: {
                    title: '',
                    url: '',
                    page_id: '',
                    pic_id: '',
                    pic_type: '',
                    pic: '',
                    word_count: 0,
                    descriptions: ["","",""],
                },
                rules: {
                    page_id: [{required: true, message: 'Required', trigger: 'blur'}],
                    pic: [{required: true, message: 'Pic Required', trigger: 'blur'}],
                    pic_type: [{required: true, message: 'Required', trigger: 'blur'}],
                    title: [{required: true, message: 'Required', trigger: 'blur'}],
                    url: [{required: true, message: 'Required', trigger: 'blur'}],
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
                let count = 0;
                this.article.descriptions.forEach(item=>{
                    let val = item.trim()
                    if (val){
                        count += val.split(" ").length
                    }
                })
                this.article.word_count = count
            },
            successUpload(response, file, fileList) {
                console.log(response.data)
                this.article.pic = response.data.path
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
