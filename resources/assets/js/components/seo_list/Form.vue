<template>
<div>
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
                    <el-select v-model="site">
                        <el-option label="Service" value="Service"></el-option>
                        <el-option label="Media" value="Media"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Web page name" prop="page_id">
                    <el-select  v-model="article.page_id" clearable style="width: 150px;">
                        <el-option
                                v-for="item in pages"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Column description" prop="key_value">
                    <el-input v-model="article.key_value" type="textarea"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>4</b></div>
                <el-input v-model="article.meta_id" type="hidden"></el-input>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()" :loading="loading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/javascript">
    const current_url = '/admin/seo_list/'
    export default {
        data: function() {
            return {
                article: this.originObj,
                form: {
                    key_name: '',
                    key_value: '',
                    page_id: '',
                    meta_id: '',
                },
                rules: {
                    page_id: [{required: true, message: 'Required', trigger: 'blur'}],
                    key_name: [{required: true, message: 'Required', trigger: 'blur'}],
                    key_value: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                pages:[],
                site:'',
                loading: false,
            }
        },
        created () {
            if(Object.keys(this.originObj).length==0){
                this.article = this.form
            }
        },
        methods: {
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
        props: ['moduleSelect','originObj','title']
    }
</script>
