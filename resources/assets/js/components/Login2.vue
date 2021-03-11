<template>
<div class="login-container">
    <el-alert
            :title="tips"
            type="success"
            :closable="true"
            v-show="tips"
            style="position: fixed"></el-alert>
    <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
            <div style="color: transparent">Enzo</div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form
                    ref="loginForm" :model="loginForm" :rules="loginRules"
                    class="login-form"
                    label-position="left">
                <div class="title">你好 !</div>
                <div class="title-tips">欢迎来到{{ title }}！</div>
                <el-form-item style="margin-top: 40px" prop="username" key="username">
                    <span class="svg-container">
                      <i class="el-icon-user-solid gray"></i>
                    </span>
                    <el-input
                            ref="username"
                            v-model="loginForm.username"
                            placeholder="用户名"
                            name="username"
                            type="text"
                            tabindex="1"
                            auto-complete="on"
                    />
                </el-form-item>
                <el-form-item prop="password" key="password">
                    <span class="svg-container">
                      <i class="el-icon-lock gray"></i>
                    </span>
                    <el-input
                            :key="passwordType"
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="密码"
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            @keyup.enter.native="handleLogin"
                    />
                    <span class="show-password" @click="showPwd"><i class="el-icon-view"></i></span>
                </el-form-item>
                <el-form-item prop="code" key="code">
                    <el-row :span="24">
                        <el-col :span="2">
                         <span class="svg-container">
                          <i class="el-icon-s-claim gray"></i>
                        </span>
                        </el-col>
                        <el-col :span="14" >
                            <el-input v-model="loginForm.code" name="code" ref="code" tabindex="3" placeholder="请输入验证码" @keyup.enter.native="handleLogin" />
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <div class="login-code" @click="refreshCode">
                                <!--验证码组件-->
                                <s-identify :identifyCode="identifyCode" :contentHeight="47"></s-identify>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-button
                        :loading="loading"
                        class="login-btn"
                        type="primary"
                        @click.stop="handleLogin">登录</el-button>
            </el-form>

        </el-col>
    </el-row>

</div>
</template>

<script>
    import SIdentify from './captcha/SIdentify'
    export default {
        name: 'Login',
        components: { SIdentify },
        data() {
            const validateUsername = (rule, value, callback) => {
                if (value) {
                    callback()
                } else {
                    callback(new Error('请输入正确的用户名'))
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 4) {
                    callback(new Error('密码不能少于4个字符'))
                } else {
                    callback()
                }
            }
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入验证码'))
                }else if (value !== this.identifyCode) {
                    this.refreshCode()
                    callback(new Error('验证码错误~请重新输入'))
                } else {
                    callback()
                }
            }
            const validateusername = (rule, value, callback) => {
                if ('' == value) {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            }
            const validatePwd = (rule, value, callback) => {
                if (value.length <= 4) {
                    callback(new Error('密码不能少于4位'))
                } else {
                    callback()
                }
            }
            const validateMail = (rule, value, callback) => {
                if (!this.isEmail(value)) {
                    callback(new Error('请输入正确的邮箱地址'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: '',
                    password: '',
                    code: '',
                },
                activeName: 'ATTEND_POLICY',
                action:'login',
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                    code: [{ required: true, trigger: 'blur', validator: validateCode }]
                },
                loading: false,
                upload_disabled: true,
                passwordType: 'password',
                identifyCode: '',
                identifyCodes: 'abcdedfghijkmnpqrstuvwxyz23456789',
                redirect: undefined,
                /*注册的*/
                limit: 1,
                fileList: [],
                uploadData:{
                    type:"attend_gh",
                },
                form: {},
                registerRules: {
                    register_username: [
                        { required: true, trigger: 'blur', message: '请输入用户名' },
                        { max: 20, trigger: 'blur', message: '最多不能超过20个字' },
                        { min: 4, trigger: 'blur', message: '最少不小于4个字' },
                        { validator: validateusername, trigger: 'blur' },
                    ],
                    corpname: [
                        { required: true, trigger: 'blur', message: '请输入企业名称' },
                        { max: 40, trigger: 'blur', message: '最多不能超过40个字' },
                    ],
                    mail: [
                        { required: true, trigger: 'blur', message: '请输入邮箱' },
                        { validator: validateMail, trigger: 'blur' },
                    ],
                    register_password: [
                        { required: true, trigger: 'blur', message: '请输入密码' },
                        { validator: validatePwd, trigger: 'blur' },
                    ],
                },
            }
        },
        created: function(){
            this.makeCode(this.identifyCodes, 4)
            //判断是否是手机端访问
            var phone = this.unils.browserAgent();
            if(phone.mobile||phone.android||phone.ios||phone.wx){
                this.$message({
                    message: '本网站不建议使用手机访问',
                    type: 'warning',
                    duration:0,
                    center:true
                });
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleChange(file, fileList){
                this.fileList = fileList
                if (fileList.length > 0 ) this.upload_disabled = false
            },
            handleRemove(file, fileList) {
                this.form.file = null;
                this.fileList = fileList
                this.upload_disabled = true;
            },
            handleSuccess(response, file, fileList) {
                this.form.file = response.data.val
                this.fileList = fileList
                this.$notify({
                    title: '成功',
                    message: '已添加文件',
                    type: 'success',
                });
            },
            handleExceed(file, fileList) {
                this.$alert("只允许上传一个文件！请先删除之前文件~");
            },
            isEmail(str) {
                const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                return reg.test(str)
            },
            handleReister() {
                this.$refs['registerForm'].validate(async (valid) => {
                    if (valid) {
                        if (!this.fileList.length){
                            this.$alert("请选取文件进行上传！");
                            return;
                        }
                        //验证上传文件是否选择了上传
                        if (this.fileList.length > 0  && null == this.form.file){
                            this.$alert("请将选择的文件 进行上传！");
                            return;
                        }
                        this.loading = true;
                        axios.post('/attend_gh', this.form)
                            .then((res) => {
                                if (res.data.code == 0) {
                                    this.$notify({
                                        title: '成功',
                                        message: '申请成功，静候佳音',
                                        type: 'success'
                                    });
                                    setTimeout(function () {
                                        location.href = location.href
                                    }, 3000);

                                } else {
                                    this.$alert(res.data.message);
                                    this.loading = false;
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    }else{
                        return false;
                    }
                })
            },
            onSubmit(){
                return false;
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        window.sessionStorage.clear()
                        this.loading = true;
                        axios.post('/login', this.loginForm)
                            .then((res) => {
                                if (res.data.code == 0) {
                                    this.$notify({
                                        title: '成功',
                                        message: '登录成功',
                                        type: 'success'
                                    });
                                    location.href = res.data.data.redirectTo;
                                } else {
                                    this.refreshCode()
                                    this.$alert(res.data.message);
                                    this.loading = false;
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            randomNum (min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            refreshCode () {
                this.identifyCode = ''
                this.makeCode(this.identifyCodes, 4)
            },
            makeCode (o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                            this.randomNum(0, this.identifyCodes.length)
                            ]
                }
            }
        },
        props: ['title','tips']
    }
</script>
<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg:#283443;
    $light_gray:#fff;
    $cursor: #fff;

    body, html, body div#app {
        height: 100%;
    }

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

</style>

<style lang="scss" scoped>

    //框架默认主题色
    $base-color-default: #1890ff;
    //默认层级
    $base-z-index: 999;
    //横向布局纵向布局时菜单背景色
    $base-menu-background: rgb(40, 44, 52);
    //菜单文字颜色
    $base-menu-color: hsla(0, 0%, 100%, 0.95);
    //菜单选中文字颜色
    $base-menu-color-active: hsla(0, 0%, 100%, 0.95);
    //菜单选中背景色
    $base-menu-background-active: $base-color-default;
    //标题颜色
    $base-title-color: #fff;
    //字体大小配置
    $base-font-size-small: 12px;
    $base-font-size-default: 14px;
    $base-font-size-big: 16px;
    $base-font-size-bigger: 18px;
    $base-font-size-max: 22px;
    $base-font-color: #606266;
    $base-color-blue: $base-color-default;
    $base-color-white: #fff;
    $base-color-black: #000;
    $base-color-red: #ff4d4f;
    $base-color-gray: rgba(0, 0, 0, 0.65);
    $base-main-width: 1279px;
    $base-border-radius: 2px;
    $base-border-color: #dcdfe6;
    //输入框高度
    $base-input-height: 32px;
    //默认paddiing
    $base-padding: 20px;
    //默认阴影
    $base-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .login-container {
        min-height: 100%;
        width: 100%;
        background: url('/images/background.jpg') center center fixed
        no-repeat;
        background-size: cover;
        .title {
            font-size: 36px;
            font-weight: 500;
            color: rgba(14, 18, 26, 1);
        }
        .no-notify{
            padding: 2em 3.2em;font-size:1.5em
        }
        .title-tips {
            margin-top: 29px;
            font-size: 26px;
            font-weight: 1;
            color: rgba(14, 18, 26, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow:hidden;
        }

        .login-btn {
            display: inherit;
            width: 220px;
            height: 50px;
            margin-top: 5px;
            font-weight: bold;
            font-size: 16px;
            border: 0;
            &:hover {
                opacity: 0.9;
            }
        }

        .login-form {
            position: relative;
            max-width: 100%;
            margin: calc((100vh - 425px) / 2) 10% 10%;
            overflow: hidden;

            .forget-password {
                width: 100%;
                margin-top: 40px;
                text-align: left;

                .forget-pass {
                    width: 129px;
                    height: 19px;
                    font-size: 20px;
                    font-weight: 400;
                    color: rgba(92, 102, 240, 1);
                }
            }
        }

        .tips {
            margin-bottom: 10px;
            font-size: $base-font-size-default;
            color: $base-color-white;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .title-container {
            position: relative;

            .title {
                margin: 0 auto 40px auto;
                font-size: 34px;
                font-weight: bold;
                color: $base-color-blue;
                text-align: center;
            }
        }

        .svg-container {
            position: absolute;
            top: 14px;
            left: 15px;
            z-index: $base-z-index;
            font-size: 16px;
            color: #d7dee3;
            cursor: pointer;
            user-select: none;
        }

        .show-password {
            position: absolute;
            top: 14px;
            right: 25px;
            font-size: 16px;
            color: #d7dee3;
            cursor: pointer;
            user-select: none;
        }

        ::v-deep {
            .el-form-item {
                padding-right: 0;
                margin: 30px 0;
                color: #454545;
                background: transparent;
                border: 1px solid transparent;
                border-radius: 2px;

                &__content {
                    min-height: $base-input-height;
                    line-height: $base-input-height;
                }

                &__error {
                    position: absolute;
                    top: 100%;
                    left: 18px;
                    font-size: $base-font-size-small;
                    line-height: 18px;
                    color: $base-color-red;
                }
            }

            .el-input {
                box-sizing: border-box;

                input {
                    height: 58px;
                    padding-left: 45px;
                    font-size: $base-font-size-default;
                    line-height: 58px;
                    color: $base-font-color;
                    background: #f6f4fc;
                    border: 0;
                    caret-color: $base-font-color;
                }
            }
        }
    }

</style>


