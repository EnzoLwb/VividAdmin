<template>
    <div v-loading="loading">
        <el-row >
            <el-col :span="24">
                <el-form ref="form" :model="article" label-position="top" label-width="140px" size="medium"
                         :rules="rules">
                    <el-form-item label="卡片来源" prop="source">
                        <el-select v-model="article.source" placeholder="请选择来源">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="兑换码" prop="code">
                        <el-input v-model="article.code" @input="controlBtn" prefix-icon="el-icon-bank-card"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="bottom_div">
            <el-button class="exchange_btn" round :disabled="btn_enable" type="primary" @click="submitForm()" :loading="btnLoading">兑换</el-button>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data: function() {
            return {
                loading: false,
                btnLoading: false,
                article: {
                    source:'',
                    code:'',
                },
                btn_enable:true,
                rules: {
                    source: [{required: true, message: '必填项', trigger: 'blur'}],
                    code: [{required: true, message: '必选项', trigger: 'blur'}],
                },
                options: [{
                    value: 'dzdp',
                    label: '大众点评'
                }, {
                    value: 'meituan',
                    label: '美团'
                }],
            }
        },
        created () {

        },
        methods: {
            controlBtn(){
                if (this.article.source && this.article.code) {
                    this.btn_enable = false
                }else {
                    this.btn_enable = true
                }
            },
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.btn_enable = true
                        axios.post('/api/redeem-code/exchange',this.article)
                            .then(res => {
                                if (res.data.code != 0 || res.status != 200) {
                                    this.$notify({
                                        title: '提交失败',
                                        message: res.data.message,
                                        type: 'error'
                                    });
                                } else {
                                    this.$notify({
                                        title: '成功',
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                    setTimeout(function () {
                                        window.location.href = window.location.href
                                    }, 1000);
                                }
                                this.loading = false
                                this.btn_enable = false
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
        },
        props: []
    }
</script>

<style lang="scss" scoped>
.bottom_div{
    position: fixed;
    bottom: 2rem;
    margin: 0 auto;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    .exchange_btn{
        width: 300px;
        font-size: 16px;
        height: 50px;
    }
}

</style>