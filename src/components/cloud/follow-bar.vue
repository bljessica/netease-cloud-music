<template>
    <div class="container" ref="wrapper">
        <ul class="follows" ref="content">
            <!-- 我的云圈 -->
            <li class="cloud-circle">
                <span>
                    <i class="iconfont icon-yunpan"></i>
                </span>
                <span>我的云圈</span>
            </li>
            <!-- 关注的人 -->
            <li v-for="(item, index) in follows" :key="index" class="follow">
                <img :src="item.avatarUrl" alt="头像" :class="{active: activeImg == index}">
                <span>{{ item.nickname }}</span>
                <!-- <i class="vip" v-if="item.vipType != 0">V</i> -->
            </li>
        </ul>
    </div>
</template>

<script>
import { getFollows } from '../../api/cloud';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            follows: [],
            activeImg: 0
        }
    },
    mounted() {
        this.getFollows();
    },
    methods: {
        getFollows() {
            let that = this;
            getFollows({
                uid: that.$store.getters.userID
            }).then(res => {
                console.log(res.data);
                that.follows = res.data.follow;
                that.initSlider();
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        initSlider() {
            this.$refs.content.style.width = (this.follows.length + 1 ) * 66 + 16 + 'px';
            const slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        overflow: hidden;
        background: white;
        .follows {
            height: 100px;
            border-bottom: 1px solid #E0E0E0;
            padding-left: 8px;
            li {
                margin-top: 14px;
                display: inline-block;
                width: 50px;
                padding: 0 8px;
                &:last-of-type {
                    padding-right: 16px;
                }
                text-align: center;
                font-size: 12px;
                &.cloud-circle span:first-of-type{
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    background: gainsboro;
                    border-radius: 50%;
                    i {
                        font-size: 40px;
                    }
                }
                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    &.active {
                        border: 2px solid red;
                    }
                }
                span {
                    width: 50px;
                    display: inline-block;
                    // margin: 0 auto;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
</style>