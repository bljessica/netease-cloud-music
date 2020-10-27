<template>
    <div class="container">
        <!-- 个人信息 --> 
        <div class="info-container" :style="{backgroundImage: 'url(' + backgroundUrl + ')'}">
            <div class="info-wrapper">
                <div class="nav">
                    <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
                    <i class="iconfont icon-fenxiang"></i>
                </div>
                <img v-if="avatarUrl" :src="avatarUrl" alt="" class="avatar">
                <img v-else src="../assets/person.png" alt="头像" class="avatar">
                <div class="info">
                    <div class="nickname">{{ nickname }}</div>
                    <div class="follow-info">
                        <span class="follows">关注 {{ follows }}</span>
                        <span class="followeds">粉丝 {{ followeds }}</span>
                    </div>
                    <div class="other-info">
                        <span class="gender">
                            <i class="iconfont" :class="{'icon-nv': gender == 2, 'icon-nan': gender === 1}"></i>
                            {{ birthYear }}后
                        </span>
                        <span class="level">
                            <i class="iconfont"></i>
                            Lv.{{ level }}
                        </span>
                        <span class="blank"></span>
                        <span class="edit">编辑</span>
                        <span class="change-background">更换背景</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主页、动态 -->
        <div class="tabs-container">
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUserInfo, getLikeList, getPlayLists } from '../api/mine';

export default {
    data() {
        return {
            activeTab: 1,
        }
    },
    computed: {
        ...mapGetters([
            'backgroundUrl',
            'follows',
            'followeds',
            'birthday',
            'level',
            'avatarUrl',
            'nickname',
            'gender',
            'playlist',
            'listenSongs',
            'createdMenus',
            'collectedMenus',
            'createTime',
            'birthday',
            'province',
            'city'
        ]),
        //“几几”后
        birthYear() {
            let date = new Date(this.birthday);
            return Math.floor(date.getYear() / 10) + '' + (date.getYear() % 10 >= 5? '5': '0');
        },
        //收藏歌单个数
        collectedNum() {
            let num = 0;
            this.createdMenus.forEach(item => {
                num += item.subscribedCount;
            })
            return num;
        },
        //注册时间
        getCreateTime() {
            let date = new Date(this.createTime);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
        },
        //村龄
        yearsFromNow() {
            return Math.floor((new Date().getTime() - new Date(this.createTime).getTime()) / 1000 / 60 / 60 / 24 / 365);
        },
        //星座
        constellation() { 
            let date = new Date(this.birthday);
            let month = date.getMonth() + 1, day = date.getDate();
            let s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
            let arr=[20,19,21,21,21,22,23,23,23,23,22,22];
            return s.substr(month * 2 - (day < arr[month-1]? 2: 0), 2);
        }
    },
    methods: {
        //切歌
        changeSong() {
            this.$refs.bar.refresh();
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../common/styles/collect-and-create-menu-list';
</style>

<style lang="scss" scoped>
.container {
    background: white;
    .info-container {
        height: 320px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .info-wrapper {
        height: 270px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
        .nav {
            display: flex;
            height: 40px;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            i {
                font-size: 24px;
                &:first-of-type {
                    font-size: 28px;
                }
            }
        }
        .avatar {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-left: 20px;
        }
        .info {
            text-align: left;
            text-indent: 20px;
            height: 100px;
            .nickname {
                font-size: 18px;
                font-weight: bold;
                line-height: 36px;
            }
            .follow-info {
                font-size: 14px;
                color: gainsboro;
                .follows {
                    padding-right: 10px;
                    border-right: 1px solid gainsboro;
                }
                .followeds {
                    padding-left: 10px;
                }
            }
            .other-info {
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                height: 40px;
                &>span {
                    text-indent: 0;
                    padding: 0 10px;
                    background: rgba(201, 199, 199, 0.5);
                    border-radius: 10px;
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    i {
                        font-size: 10px;
                    }
                }
                .blank {
                    background: transparent;
                    flex-grow: 1;
                }
                .gender {
                    background: rgba(228, 113, 132, 0.7);
                }
                .level {
                    font-style: italic;
                    margin-left: 10px;
                    font-weight: bold;
                }
                .edit {
                    margin-right: 10px;
                }
                .edit, .change-background {
                    padding: 5px 10px;
                    border-radius: 20px;
                }
            }
        }
    }
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
}
</style>