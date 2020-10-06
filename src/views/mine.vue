<template>
    <div class="container">
        <!-- 头部导航栏 -->
        <my-header :selected="'mine'"></my-header>
        <!-- 用户信息 -->
        <div class="userinfo">
            <img :src="avatarUrl" alt="头像" class="avatar">
            <span class="nickname">{{ nickname }}</span>
            <div class="buyVIP">
                <i class="iconfont icon-VIP"></i>
                <span>开通</span>
                <i class="iconfont icon-you"></i>
            </div>
            <span class="level">{{ 'Lv.' + level}}</span>
            <i class="iconfont icon-you toUserinfo"></i>
        </div>
        <!-- 功能导航按钮 -->
        <mine-nav-btns></mine-nav-btns>
        <!-- 我喜欢的音乐 -->
        <love-songs></love-songs>
    </div>
</template>

<script>
import myHeader from '../components/common/my-header';
import mineNavBtns from '../components/mine/mine-nav-btns';
import loveSongs from '../components/mine/love-songs';
import { getUserInfo } from '../api/mine';
import { Message } from 'element-ui';

export default {
    components: {
        myHeader,
        mineNavBtns,
        loveSongs
    },
    data() {
        return {
            nickname: '',
            level: 0,
            avatarUrl: ''
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            let that = this;
            getUserInfo({
                uid: that.$store.getters.userID
            }).then(res => {
                console.log(res.data)
                that.level = res.data.level;
                that.nickname = res.data.profile.nickname;
                that.avatarUrl = res.data.profile.avatarUrl;
            }).catch(err => {
                Message({
                    message: err,
                    type: 'warning',
                    duration: 1000
                })
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .userinfo {
        padding: 20px 10px;
        height: 60px;
        margin-left: 10px;
        text-align: left;
        position: relative;
        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
        }
        .nickname {
            font-weight: bold;
            font-size: 18px;
            position: absolute;
            top: 25px;
            left: 80px;
        }
        .buyVIP {
            display: inline-block;
            width: 70px;
            height: 20px;
            position: absolute;
            bottom: 20px;
            left: 78px;
            background: #bebdbd;
            border-radius: 10px;
            color: white;
            i:first-of-type {
                font-size: 30px;
                position: relative;
                top: -7px;
            }
            span {
                font-size: 6px;
                position: absolute;
                top: 2px;
                right: 15px;
            }
            i:last-of-type {
                // color: white;
                font-size: 4px;
                position: absolute;
                top: 3px;
                right: 2px;
            }
        }
        .level {
            display: inline-block;
            font-size: 10px;
            width: 40px;
            height: 20px;
            line-height: 20px;
            position: absolute;
            bottom: 20px;
            left: 160px;
            background: white;
            border-radius: 10px;
            font-style: italic;
            font-weight: bold;
            text-align: center;
        }
        .toUserinfo {
            position: absolute;
            right: 17px;
            line-height: 60px;
        }
    }
</style>