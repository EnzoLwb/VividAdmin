<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>Translate</span>
            </div>
            <p class="translate_desc">Column name: {{obj.key_name}}</p>
            <p class="translate_desc">Site URL：{{obj.website}}</p>
            <p class="translate_desc">Web Page name: {{obj.page_name}}（<a href="#">{{obj.url}}</a> ）</p>
            <el-form ref="form" :model="translate" :rules="rules"  size="medium" label-position="top" :inline="true">
                <el-form-item label="Column description :" style="width: 45%">
                    <el-input :value="item" v-for="(item,index) in obj.key_value" :key="index" style="margin-bottom: 10px"
                              disabled type="textarea" :autosize="autosize"></el-input>
                </el-form-item>

                <!--译文 ↓ -->
                <el-form-item prop="locale"  style="width: 45%">
                    <template slot="label">Translated into :
                        <el-select  v-model="translate.locale"  style="width: 120px;margin-left: 20px" size="mini" @change="translateRecord">
                            <el-option
                                    v-for="(item,index) in languageSelect"
                                    :key="index"
                                    :label="index"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                    <el-input v-model="translate.key_value[index]" v-for="(item,index) in translate.key_value"
                              :key="index" style="margin-bottom: 10px"
                              :disabled="!translate.locale"
                              :placeholder="translate.locale ? '':'Please Select Language'"
                              type="textarea" :autosize="autosize"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.obj.word_count}}</b></div>
                <el-form-item  style="width: 100%">
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
            return {
                rules: {
                    locale: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                translate:{
                    key_id:this.obj.key_id,//此字段会不同
                    word_count:this.obj.word_count,
                    locale:'',
                    translation_id:null,
                    key_value:[],//翻译后的内容
                },
                loading: false,
                autosize: {minRows: 3,},
            }
        },
        created () {
            //根据原文的个数 push 多个译文textarea
            this.obj.key_value.forEach(item=>{
                this.translate.key_value.push("")
            })
        },
        methods: {
            //根据语言查询是否已有翻译记录
            translateRecord(){
                this.loading = true
                axios.post( '/admin/translate/record',
                    {model:'ContentListTranslation',relate_id:'key_id', id:this.translate.key_id, locale:this.translate.locale})
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            if (res.data.data){
                                this.translate.translation_id = res.data.data.translation_id
                                this.translate.key_value = JSON.parse(res.data.data.key_value) //此字段会不同
                            }else{
                                this.translate.translation_id = null
                                this.translate.key_value = []
                                this.obj.key_value.forEach(item=>{
                                    this.translate.key_value.push("")
                                })
                            }

                        }
                        this.loading = false
                    })
            },
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 处理翻译内容不填或为空情况
                        var trim = false
                        this.translate.key_value.forEach(item => {
                            if (!item.trim()) {
                                trim = true;
                                return ;
                            }
                        })
                        if (trim){
                            this.$notify({
                                message: 'translate content required',
                                type: 'error'
                            });
                            return;
                        }
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
