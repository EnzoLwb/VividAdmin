<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="12" :xl="12">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>Translate</span>
            </div>
            <p class="translate_desc">Column name: {{obj.key_name}}</p>
            <p class="translate_desc">Site URL：{{obj.website}}</p>
            <p class="translate_desc">Constant types: {{obj.constant_type}}</p>
            <el-form ref="form" :model="translate" :rules="rules" size="medium" label-position="top">
                <el-form-item label="Column description (English) :">
                    <el-input v-model="obj.key_value" disabled type="textarea" :autosize="autosize"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.obj.word_count}}</b></div>
                <!--译文 ↓ -->
                <el-form-item prop="key_value">
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
                    <el-input v-model="translate.key_value" type="textarea" :autosize="autosize"></el-input>
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
    const current_url = '/admin/constant_list'
    export default {
        data: function() {
            return {
                rules: {
                    key_value: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                translate:{
                    key_id:this.obj.key_id,//此字段会不同
                    word_count:this.obj.word_count,
                    locale:'',
                    translation_id:null,
                    key_value:"",//翻译后的内容
                },
                loading: false,
                autosize: {minRows: 6,},
            }
        },
        created () {

        },
        methods: {
            //根据语言查询是否已有翻译记录
            translateRecord(){
                this.loading = true
                axios.post( '/admin/translate/record',
                    {model:'ConstantListTranslation',relate_id:'key_id', id:this.translate.key_id, locale:this.translate.locale})
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            if (res.data.data){
                                this.translate.translation_id = res.data.data.translation_id
                                this.translate.key_value = res.data.data.key_value
                            }else{
                                this.translate.translation_id = null
                                this.translate.key_value = ''
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
