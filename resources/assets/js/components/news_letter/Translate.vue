<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>Translate</span>
            </div>
            <p class="translate_desc">Template Name: <span>{{obj.emailName}}</span></p>
            <p class="translate_desc">Subject：<span>{{obj.emailSubject}}</span></p>
            <p class="translate_desc">Function Code：<span>{{obj.funcCode}}</span></p>
            <el-form ref="form" :model="translate" :rules="rules" size="medium" label-position="top">
                <el-form-item label="Column description (English) :">
                    <ckeditor v-model="obj.emailText"  :config="{language:'en',readOnly:true}" id="origin"></ckeditor>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.obj.wordCount}}</b></div>
                <!--译文 ↓ -->
                <el-form-item prop="emailText">
                    <template slot="label">Translated into :
                        <el-select  v-model="translate.locale"  style="width: 120px;margin-left: 20px" size="mini"
                                    prop="locale"
                                    :rules="{required: true, message: 'Required', trigger: 'blur'}"
                                    @change="translateRecord">
                            <el-option
                                    v-for="(item,index) in languageSelect"
                                    :key="index"
                                    :label="index"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                    <ckeditor v-model="translate.emailText" :config="editorConfig" id="translate"></ckeditor>
                </el-form-item>
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
    const current_url = '/admin/news_letter'
    export default {
        data: function() {
            return {
                editorConfig: {
                    language:'en',
                },
                rules: {
                    emailText: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                translate:{
                    emailId:this.obj.emailId,//此字段会不同
                    wordCount:this.obj.wordCount,
                    emailSubject:this.obj.emailSubject,
                    locale:'',
                    translationId:null,
                    emailText:"",//翻译后的内容
                },
                loading: false,
            }
        },
        created () {
            this.obj.emailText = decodeURIComponent(this.obj.emailText.replace(/\+/g,'%20'));
        },
        methods: {
            //根据语言查询是否已有翻译记录
            translateRecord(){
                this.loading = true
                axios.post( '/admin/translate/record',
                    {model:'NewsLetterTranslation',relate_id:'emailId', id:this.translate.emailId, locale:this.translate.locale})
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            if (res.data.data){
                                this.translate.translationId = res.data.data.translationId
                                //url decode
                                this.translate.emailText = decodeURIComponent(res.data.data.emailText.replace(/\+/g,'%20'));
                            }else{
                                this.$notify({
                                    message: "No translation result, default to original content",
                                    type: 'info'
                                });
                                this.translate.translationId = null
                                this.translate.emailText = this.obj.emailText;
                            }
                        }
                        this.loading = false
                    })
            },
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        axios.post( current_url + '/translate',this.translate)
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
        props: ['obj','languageSelect']
    }
</script>
