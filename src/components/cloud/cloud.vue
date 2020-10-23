<template>
    <div class="container">
        <!-- 头部导航栏 --> 
        <my-header :selected="'cloud'" class="header" @menuShow="menuShow = true"></my-header>
        <!-- tabs -->
        <div class="tabs-container"> 
            <div class="nav-tab">
                <span class="ground" :class="{active: activeTab === 1}" @click="activeTab = 1">广场</span>
                <span class="follow" :class="{active: activeTab === 2}" @click="activeTab = 2">关注</span>
            </div>
            <!-- 广场 -->
            <div class="ground-wrapper" v-if="activeTab === 1">
                <!-- 云村热评墙 -->
                <div class="hot-comment-wall" @click="$router.push('/hotCommentsWall')">
                    <div class="nav">
                        <div class="navToWall">
                            云村热评墙
                            <i class="iconfont icon-you"></i>
                        </div>
                        <div class="word">今日戳心评论，你看过几条？</div>
                    </div>
                    <div class="date">
                        <div class="month">{{ getMonth }}</div>
                        <div class="day">{{ getDay }}</div>
                    </div>
                </div>
                <!-- 广场视频 -->
                <!-- <ground></ground> -->
            </div>
            <!-- 关注 -->
            <div class="follow-wrapper" v-if="activeTab === 2">
                <div class="follow-container" ref="wrapper">
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
                            <img :src="item.avatarUrl" alt="头像" :class="{active: activeImgIndex == index}">
                            <span>{{ item.nickname }}</span>
                            <!-- <i class="vip" v-if="item.vipType != 0">V</i> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myHeader from '../header/my-header';
import { getFollows } from '../../common/js/api/cloud';
import BScroll from '@better-scroll/core';

export default {
    components: {
        myHeader,
    },
    data() {
        return {
            activeTab: 1, 
            follows: [], //关注的人
            activeImgIndex: 0 //选中的人的索引
        }
    },
    //切换tab
    watch: {
        activeTab(newVal, oldVal) {
            if(newVal == 2) {
                this.getFollows();
            }
        }
    },
    computed: {
        getMonth() {
            return new Date().toDateString().split(' ')[1] + '.';
        },
        getDay() {
            let date = new Date().getDate();
            if(date < 10) {
                date = '0' + date.toString();
            }
            return date;
        }
    },
    mounted() {
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
        //切歌
        changeSong() {
            this.$refs.bar.refresh();
        },
        //获取关注的人
        getFollows() {
            this.$emit('beforeLoad');
            let that = this;
            getFollows({
                uid: that.$store.getters.userID
            }).then(res => {
                that.$emit('onLoad');
                // console.log(res.data);
                that.follows = res.data.follow;
                that.initSlider();
            }).catch(err => {
                console.log(err);
            })
        },
        //初始化关注人滑块
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
    @import '../../common/styles/my-menu';
</style>

<style lang="scss" scoped>
    .tabs-container {
        .nav-tab {
            background: white;
            height: 30px;
            padding: 0 50px;
            border-bottom: 1px solid #E0E0E0;
            display: flex;
            justify-content: space-evenly;
            align-items: flex-end;
            span {
                display: inline-block;
                padding: 5px 15px;
                border-bottom: 2px solid transparent;
                &.active {
                    color: red;
                    font-weight: bold;
                    border-bottom: 2px solid red;
                }
            }
        }
        .ground-wrapper {
            padding: 0 20px;
            margin-top: 10px;
            .hot-comment-wall {
                height: 80px;
                background: linear-gradient(to right, rgba(0, 0, 0, 0.445), rgba(0, 0, 0, 0.932), rgba(0, 0, 0, 0.411));
                border-radius: 10px;
                color: white;
                display: flex;
                justify-content: space-around;
                align-content: center;
                text-align: left;
                .nav {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-content: center;
                    .navToWall {
                        font-weight: bold;
                    }
                    i {
                        font-weight: normal;
                    }
                    .word {
                        font-size: 14px;
                        color: gainsboro;
                    }
                }
                .date {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-content: center;
                    padding: 10px 0;
                    .month {
                        font-weight: bold;
                        font-size: 20px;;
                    }
                    .day {
                        font-weight: bold;
                        font-size: 28px;
                    }
                }
            }

        }
        .follow-container {
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
    }
</style>