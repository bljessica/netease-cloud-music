<template>
    <div class="container">
        <el-tabs class="login-methods" stretch v-model="activeTab" type="border-card" style="{color: red;}">
            <el-tab-pane label="手机登录" name="phone">
                <el-form class="phone-form">
                    <el-form-item label="手机号">
                        <el-input v-model="phone" type="number" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="phone-login login" @click="phoneLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="邮箱登录" name="email">
                <el-form class="email-form">
                    <el-form-item label="邮箱">
                        <el-input v-model="email" type="email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="email-login login" @click="emailLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import '../styles/common.css';
import { Message } from 'element-ui';
import { phoneLogin, emailLogin } from '../api/login';

export default {
    data() {
        return {
            activeTab: 'phone',
            phone: '',
            password: '',
            email: ''
        }
    },
    methods: {
        phoneLogin() {
            let that = this;
            phoneLogin({
                    phone: that.phone,
                    password: that.password
                }).then(res => {
                    console.log(res.data)
                    that.$store.commit('setToken', res.data.token);
                }).catch(err => {
                    Message({
                        message: err,
                        type: 'warning',
                        duration: 2000
                    });
                })
        },
        emailLogin() {

        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    .el-tabs {
        margin: 150px auto 0;
        width: 300px;
        height: 350px;
        .login {
            width: 100%;
            margin-top: 20px;
        }
    }
    
}
</style>