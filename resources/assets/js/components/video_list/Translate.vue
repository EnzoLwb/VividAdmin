<template>
<div v-loading="loading">
    <el-row>
        <el-col :xs="24" :sm="24" :md="20" :lg="12" :xl="12">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>Translate</span>
            </div>
            <p class="translate_desc">Title: {{obj.title}}</p>
            <p class="translate_desc">Site ：{{obj.website}}</p>
            <video v-if="obj.video" :src="obj.video" controls="controls" width="200" ></video>
            <el-form ref="form" :model="translate" :rules="rules" size="medium" label-position="top">
                <el-form-item label="Description (English) :">
                    <el-input v-model="obj.descriptions" disabled type="textarea" :autosize="autosize"></el-input>
                </el-form-item>
                <div class="word-count">WordCount: <b>{{this.obj.word_count}}</b></div>
                <!--译文 ↓ -->
                <el-form-item prop="descriptions">
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
                    <el-input v-model="translate.descriptions"
                              :disabled="!translate.locale"
                              :placeholder="translate.locale ? '':'Please Select Language'" type="textarea" :autosize="autosize"></el-input>
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
    const current_url = '/admin/video_list'
    export default {
        data: function() {
            return {
                rules: {
                    descriptions: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                translate:{
                    video_id:this.obj.video_id,//此字段会不同
                    word_count:this.obj.word_count,
                    locale:'',
                    translation_id:null,
                    descriptions:"",
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
                    {model:'VideoListTranslation',relate_id:'video_id', id:this.translate.video_id, locale:this.translate.locale})
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            if (res.data.data){
                                this.translate.translation_id = res.data.data.translation_id
                                this.translate.descriptions = res.data.data.descriptions
                            }else{
                                this.translate.translation_id = null
                                this.translate.descriptions = ''
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
