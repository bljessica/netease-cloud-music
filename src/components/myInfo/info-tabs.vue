<template>
    <div class="tabs-container">
        <!-- 主页、动态 -->
        <!-- tab导航 -->
        <div class="tabs">
            <span class="index" :class="{active: activeTab === 1}" @click="activeTab = 1">主页</span>
            <span class="activity" :class="{active: activeTab === 2}" @click="activeTab = 2">动态</span>
        </div>
        <div class="wrapper">
            <!-- 听歌排行、喜欢的音乐 -->
            <div class="rank-and-like">
                <div class="rank li">
                    <div class="img-wrapper">
                        <i class="iconfont icon-biaoqiankuozhan_paihang-128"></i>
                    </div>
                    <div class="info">
                        <div>听歌排行</div>
                        <div>累计听歌{{ listenSongs }}首</div>
                    </div>
                </div>
                <div class="like li">
                    <div class="img-wrapper">
                        <i class="iconfont icon-aixin"></i>
                    </div>
                    <div class="info">
                        <div>我喜欢的音乐</div>
                        <div>{{ playlist[0].trackCount }}首，播放{{ playlist[0].playCount }}次</div>
                    </div>
                </div>
            </div>
            <!-- 创建的歌单 -->
            <div class="create-menu">
                <div class="menu-title">
                    <span class="title">创建的歌单<span>（{{ createdMenus.length }}个，被收藏{{ collectedNum }}次）</span></span>
                    <span class="more">更多歌单</span>
                </div>
                <ul class="created-menus">
                    <li v-for="(item, index) in createdMenus.slice(0, 7)" :key="index">
                        <img :src="item.coverImgUrl" alt="" class="img">
                        <div class="info">
                            <div class="name">{{ item.name }}</div>
                            <div class="num">{{ item.trackCount }}首</div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 收藏的歌单 -->
            <div class="collect-menu">
                <div class="menu-title">
                    <span class="title">收藏的歌单<span>（{{ collectedMenus.length }}个）</span></span>
                    <span class="more">更多歌单</span>
                </div>
                <ul class="collected-menus">
                    <li v-for="(item, index) in collectedMenus.slice(0, 7)" :key="index">
                        <img :src="item.coverImgUrl" alt="" class="img">
                        <div class="info">
                            <div class="name">{{ item.name }}</div>
                            <div class="num">{{ item.trackCount }}首</div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 基本信息 -->
            <div class="infos">
                <div class="menu-title">
                    <span class="title">基本信息<span>（信息展示可在隐私设置修改）</span></span>
                </div>
                <div class="contents">
                    <span>村龄：{{ yearsFromNow }}年（{{ getCreateTime }}注册）</span>
                    <span>年龄：{{ birthYear }}后 {{ constellation }}座</span>
                    <span>地区：{{ province }}省 {{ city }}市</span>
                </div>
            </div>
            <!-- 我的评论 -->
            <div class="comments">
                <div class="menu-title">
                    <span class="title">我的评论<span>（评论展示可在隐私设置修改）</span></span>
                    <span class="more">更多评论</span>
                </div>
                <ul class="contents">
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import { getSubCount } from '../../api/mine';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            activeTab: 1
        }
    },
    mounted() {
    },
    computed: {
        ...mapGetters([
            'playlist',
            'listenSongs',
            'createdMenus',
            'collectedMenus',
            'createTime',
            'birthday',
            'province',
            'city'
        ]),
        collectedNum() {
            let num = 0;
            this.createdMenus.forEach(item => {
                num += item.subscribedCount;
            })
            return num;
        },
        getCreateTime() {
            let date = new Date(this.createTime);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
        },
        yearsFromNow() {
            return Math.floor((new Date().getTime() - new Date(this.createTime).getTime()) / 1000 / 60 / 60 / 24 / 365);
        },
        birthYear() {
            let date = new Date(this.birthday);
            return Math.floor(date.getYear() / 10) + '' + (date.getYear() % 10 >= 5? '5': '0');
        },
        constellation() { //星座
            let date = new Date(this.birthday);
            let month = date.getMonth() + 1, day = date.getDate();
            let s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
            let arr=[20,19,21,21,21,22,23,23,23,23,22,22];
            return s.substr(month * 2 - (day < arr[month-1]? 2: 0), 2);
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
    @import '../../common/styles/collect-and-create-menu-list';
</style>

<style lang="scss" scoped>
    .tabs-container {
        position: relative;
        top: -50px;
        background: white;
        border-radius: 20px;
        .tabs {
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid gainsboro;
            span {
                display: inline-block;
                height: 48px;
                line-height: 50px;
                border-bottom: 2px solid transparent;
                &.active {
                    color: red;
                    border-bottom: 2px solid red;
                    font-weight: bold;
                }
            }
        }
        .wrapper {
            padding: 0 15px;
            .rank-and-like {
                .li {
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    .img-wrapper {
                        width: 55px;
                        height: 55px;
                        border-radius: 5px;
                        i {
                            font-size: 36px;
                            line-height: 60px;
                        }
                    }
                    .info {
                        margin-left: 15px;
                        text-align: left;
                        flex-grow: 1;
                        div:nth-of-type(2) {
                            font-size: 12px;
                            color: rgb(194, 189, 189);
                            margin-top: 4px;
                        }
                    }
                }
                .rank {
                    .img-wrapper {
                        background: rgba(255, 0, 0, 0.589);
                        i {
                            color: white;
                        }
                    }
                }
                .like {
                    .img-wrapper {
                        background: rgba(220, 220, 220, 0.527);
                        i {
                            color: rgba(255, 0, 0, 0.589);
                        }
                    }
                }
            }
            .create-menu, .collect-menu, .comments, .infos {
                padding: 0;
                .menu-title {
                    color: black;
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        span {
                            color: rgb(185, 183, 183);
                            font-size: 12px;
                            font-weight: normal;
                        }
                    }
                    .more {
                        font-size: 14px;
                        border: 1px solid gainsboro;
                        border-radius: 10px;
                        padding: 4px 10px;
                    }
                }
            }
            .comments, .infos {
                margin-top: 10px;
                .menu-title {
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .contents {
                    list-style-type: none;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    height: 70px;
                    font-size: 14px;
                    color: rgb(170, 168, 168);
                }
            }
        }
    }
</style>