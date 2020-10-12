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
            <!-- 我的评论 -->
            <div class="comments">
                <div class="comment-title">
                    <span class="title">我的评论<span>（评论展示可在隐私设置修改）</span></span>
                    <span class="more">更多评论</span>
                </div>
                <ul class="contents">
                    <li></li>
                </ul>
            </div>
            <!-- 基本信息 -->
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
            'collectedMenus'
        ]),
        collectedNum() {
            let num = 0;
            this.createdMenus.forEach(item => {
                num += item.subscribedCount;
            })
            return num;
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
    @import '../../styles/collect-and-create-menu-list';
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
            .create-menu, .collect-menu {
                padding: 0;
                .menu-title {
                    color: black;
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        span {
                            color: rgb(185, 183, 183);
                            font-size: 14px;
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
            .comments {
                .comment-title {

                }
                .contents {
                    list-style-type: none;
                }
            }
        }
    }
</style>