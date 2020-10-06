<template>
    <div class="container">
        <div class="tab-nav">
            <a href="#create">
                <span class="create" :class="{active: activeTab === 1}" @click="activeTab = 1">创建歌单</span>
            </a>
            <a href="#collect">
                <span class="collect" :class="{active: activeTab === 2}" @click="activeTab = 2">收藏歌单</span>
            </a>
            <span class="helper" :class="{active: activeTab === 3}" @click="activeTab = 3">歌单助手</span>
        </div>
        <!-- 创建歌单 -->
        <div class="create-menu" id="create">
            <div class="menu-title">
                <span class="title">创建歌单({{ createdMenuNum }}个)</span>
                <i class="iconfont icon-jia"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <ul class="created-menus">
                <li v-for="(item, index) in createdMenus" :key="index">
                    <img :src="item.coverImgUrl" alt="" class="img">
                    <div class="info">
                        <div class="name">{{ item.name }}</div>
                        <div class="num">{{ item.trackCount }}首</div>
                    </div>
                    <i class="iconfont icon-gengduo1"></i>
                </li>
                <li>
                    <div class="img">
                        <i class="iconfont icon-gedan"></i>
                    </div>
                    <div class="info">
                        <div class="name">导入外部歌单</div>
                    </div>
                    <i class="iconfont icon-gengduo1" style="opacity: 0; visibility: hidden;"></i>
                </li>
            </ul>
        </div>
        <!-- 收藏歌单 -->
        <div class="collect-menu" id="collect">
            <div class="menu-title">
                <span class="title">收藏歌单({{ collectedMenuNum }}个)</span>
                <i class="iconfont icon-jia" style="opacity: 0; visibility: hidden;"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <ul class="collected-menus">
                <li v-for="(item, index) in collectedMenus" :key="index">
                    <img :src="item.coverImgUrl" alt="" class="img">
                    <div class="info">
                        <div class="name">{{ item.name }}</div>
                        <div class="num">{{ item.trackCount }}首</div>
                    </div>
                    <i class="iconfont icon-gengduo1"></i>
                </li>
            </ul>
        </div>
        <!-- 歌单助手 -->
    </div>
</template>

<script>
import { getPlayLists } from '../../api/mine';
export default {
    data() {
        return {
            createdMenuNum: 0,
            collectedMenuNum: 0,
            createdMenus: [],
            activeTab: 1,
            collectedMenus: []
        }
    },
    mounted() {
        this.getPlayLists();
    },
    methods: {
        getPlayLists() {
            let that = this;
            getPlayLists({
                uid: that.$store.getters.userID
            }).then(res => {
                console.log(res.data);
                that.createdMenus = res.data.playlist.filter(item => {
                    return item.subscribed === false;
                }).slice(1);
                that.collectedMenus = res.data.playlist.filter(item => {
                    return item.subscribed === true;
                });
                that.createdMenuNum = that.createdMenus.length;
                that.collectedMenuNum = that.collectedMenus.length;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        padding: 0 15px;
        .tab-nav {
            position: sticky;
            top: 70px;
            background: #faf6f6;
            height: 30px;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            a {
                text-decoration: none;
                color: black;
            }
            span {
                display: inline-block;
                padding-bottom: 3px;
                border-bottom: 2px solid transparent;
            }
            .active {
                border-bottom: 2px solid rgba(255, 0, 0, 0.719);
                font-weight: bold;
            }
        }
        .create-menu, .collect-menu {
            margin-top: 10px;
            background: white;
            border-radius: 10px;
            padding: 0 15px;
            .menu-title {
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: #b8b6b6;
                i:first-of-type {
                    display: inline-block;
                    flex-grow: 1;
                    text-align: right;
                    margin-right: 15px;
                }
            }
            .created-menus, .collected-menus {
                padding-bottom: 10px;
                li {
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                    .img {
                        width: 50px;
                        height: 50px;
                        border-radius: 10px;
                    }
                    div.img {
                        background: rgba(220, 220, 220, 0.699);
                        i {
                            font-size: 26px;
                            line-height: 50px;
                        }
                    }
                    .info {
                        width: 200px;
                        text-align: left;
                        flex-grow: 1;
                        padding: 0 10px;
                        .name {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .num {
                            font-size: 12px;
                            color: #b8b6b6;
                        }
                    }
                    &>i {
                        color: #b8b6b6;
                    }
                }
            }
        }
    }
</style>