<template>
    <div class="container">
        <div class="tab-nav">
            <span class="create" :class="{active: activeTab === 1}" @click="activeTab = 1">创建歌单</span>
            <span class="collect" :class="{active: activeTab === 2}" @click="activeTab = 2">收藏歌单</span>
            <span class="helper" :class="{active: activeTab === 3}" @click="activeTab = 3">歌单助手</span>
        </div>
        <div class="create-menu">
            <div class="menu-title">
                <span class="title">创建歌单({{ menuNum }}个)</span>
                <i class="iconfont icon-jia"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <ul class="createdMenus">
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
    </div>
</template>

<script>
import { getPlayLists } from '../../api/mine';
export default {
    data() {
        return {
            menuNum: 0,
            createdMenus: [],
            activeTab: 1
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
                that.menuNum = that.createdMenus.length;
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
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
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
        .create-menu {
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
            .createdMenus {
                li {
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
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