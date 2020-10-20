<template>
    <div class="container">
        <el-tabs class="login-methods" stretch v-model="activeTab" type="border-card" style="{color: red;}"
            @tab-click="tabClick">
            <el-tab-pane label="手机登录" name="phone">
                <el-form class="phone-form">
                    <el-form-item label="手机号">
                        <el-input v-model="phone" type="number" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="password" type="password" placeholder="请输入密码" show-password></el-input>
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
                        <el-input v-model="password" type="password" placeholder="请输入密码" show-password></el-input>
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
import '../../common/styles/common.css';
import { mapMutations } from 'vuex';
import { phoneLogin, emailLogin } from '../../api/login';
import { verifyEmail, verifyLoginPassword, verifyPhone} from '../../common/js/verifyInput';

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
        tabClick() {
            this.phone = '';
            this.password = '';
            this.email = '';
        },
        phoneLogin() {
            let veriPhone = verifyPhone(this.phone);
            let veriPwd = verifyLoginPassword(this.password);
            if(veriPhone.error) {
                this.Message({
                    message: veriPhone.msg,
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            if(veriPwd.error) {
                this.Message({
                    message: veriPwd.msg,
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            let that = this;
            phoneLogin({
                phone: that.phone,
                password: that.password
            }).then(res => {
                // console.log(res.data)
                if(res.data.code !== 200) {
                    that.Message({
                        message: res.data.msg,
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                that.setUserInfos(res.data);
                that.phone = '';
                that.password = '';
                that.$router.push('/find');
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        emailLogin() {
            let veriEmail = verifyEmail(this.email);
            let veriPwd = verifyLoginPassword(this.password);
            if(veriEmail.error) {
                that.Message({
                    message: veriEmail.msg,
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            if(veriPwd.error) {
                that.Message({
                    message: veriPwd.msg,
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            let that = this;
            emailLogin({
                email: that.email,
                password: that.password
            }).then(res => {
                console.log(res.data)
                if(res.data.code !== 200) {
                    that.Message({
                        message: res.data.msg,
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                that.setUserInfos(res.data);
                that.email = '';
                that.password = '';
                that.$router.push('/find');
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        setUserInfos(data) {
            // this.setUsername(data.account.username);
            this.setUserID(data.account.id);
            this.setToken(data.token);
            this.setIsLogin(true);
            this.setCreateTime(data.account.createTime);
            if(data.profile) {
                this.setAvartarUrl(data.profile.avatarUrl);
                this.setBirthday(data.profile.birthday);
                this.setCity(data.profile.city);
                this.setFolloweds(data.profile.followeds);
                this.setFollows(data.profile.follows);
                this.setGender(data.profile.gender);
                this.setNickname(data.profile.nickname);
                this.setBackgroundUrl(data.profile.backgroundUrl);
            //     this.setPlayListCount(data.profile.playListCount);
                this.setProvince(data.profile.province);
            }
        },
        ...mapMutations({
            // setPhone: 'SET_PHONE',
            // setEmail: 'SET_EMAIL',
            setAvartarUrl: 'SET_AVATAR_URL',
            setBirthday: 'SET_BIRTHDAY',
            setUserID: 'SET_USER_ID',
            setCreateTime: 'SET_CREATE_TIME',
            // setUsername: 'SET_USERNAME',
            setCity: 'SET_CITY',
            setFolloweds: 'SET_FOLLOWEDS',
            setFollows: 'SET_FOLLOWS',
            setGender: 'SET_GENDER',
            setNickname: 'SET_NICKNAME',
            // setPlayListCount: 'SET_PLAY_LIST_COUNT',
            setProvince: 'SET_PROVINCE',
            setIsLogin: 'SET_IS_LOGIN',
            setToken: 'SET_TOKEN',
            setBackgroundUrl: 'SET_BACKGROUND_URL'
        })
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