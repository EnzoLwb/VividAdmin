<template>
    <div class="login-container" style="background:url('/images/bg.jpg') no-repeat">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules"
                 class="login-form"
                 auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">{{title}}</h3>
            </div>
            <el-form-item prop="username">
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

            <el-form-item prop="password">
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
                <span class="show-pwd" @click="showPwd"><i class="el-icon-view"></i></span>
            </el-form-item>

            <el-form-item prop="code">
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

            <el-button :loading="loading" type="primary"  style="width:100%;"  @click.stop="handleLogin">登录</el-button>
        </el-form>
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
            return {
                loginForm: {
                    username: '',
                    password: '',
                    code: '',
                },
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                    code: [{ required: true, trigger: 'blur', validator: validateCode }]
                },
                loading: false,
                passwordType: 'password',
                identifyCode: '',
                identifyCodes: 'abcdedfghijkmnpqrstuvwxyz23456789',
                redirect: undefined
            }
        },
        mounted: function(){

        },
        created: function(){
            this.makeCode(this.identifyCodes, 4)
        },
        methods: {
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
                                    location.href = res.data.data.redirectTo;
                                } else {
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
        props: ['title']
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

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg:#2d3a4b;
    $dark_gray:#889aa4;
    $light_gray:#eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
          position: relative;
          width: 36em;
          max-width: 100%;
          padding: 3em;
          margin: 16em auto;
          overflow: hidden;
          opacity: 0.9;
          background-color: darkslateblue;
          border-radius: 5%;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
