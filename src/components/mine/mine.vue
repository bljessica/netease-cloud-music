<template>
    <div class="container" ref="container">
        <!-- 头部导航栏 -->
        <my-header :selected="'mine'" class="header" @menuShow="menuShow = true"></my-header>
        <!-- 用户信息 -->
        <div class="userinfo" @click="toMyInfo">
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
        <div class="mine-nav-btns-container">
            <ul class="nav-btns">
                <li v-for="item in navBtns" :key="item.id">
                    <i class="iconfont" :class="item.icon"></i>
                    <span class="name">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <!-- 我喜欢的音乐 -->
        <div class="love-song-container" @click.stop="toLoveSongList">
            <div class="wrapper">
                <div class="pic">
                    <i class="iconfont icon-aixin"></i>
                </div>
                <div class="songs">
                    <div class="name">我喜欢的音乐</div>
                    <div class="num">
                        <i class="iconfont icon-check"></i>
                    {{ total }}首，已下载{{ downLoadNum }}首
                    </div>
                </div>
                <span class="btn">
                    <i class="iconfont icon-B"></i>
                    心动模式
                </span>
            </div>
        </div>
        <!-- 歌单导航栏 -->
        <div class="tab-container">
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
            <!-- 暗锚 -->
            <a name="create" style="position: relative;top: -90px;"></a>
            <div class="create-menu">
                <div class="menu-title">
                    <span class="title">创建歌单({{ createdMenus.length }}个)</span>
                    <i class="iconfont icon-jia"></i>
                    <i class="iconfont icon-gengduo1"></i>
                </div>
                <ul class="created-menus">
                    <li v-for="(item, index) in createdMenus" :key="index" @click="toPlaylist(item)">
                        <img :src="item.coverImgUrl" alt="" class="img">
                        <div class="info">
                            <div class="name">{{ item.name }}</div>
                            <div class="num">{{ item.trackCount }}首</div>
                        </div>
                        <i class="iconfont icon-gengduo1"></i>
                    </li>
                    <li>
                        <div class="img">
                            <i class="iconfont icon-daoru"></i>
                        </div>
                        <div class="info">
                            <div class="name">导入外部歌单</div>
                        </div>
                        <i class="iconfont icon-gengduo1" style="opacity: 0; visibility: hidden;"></i>
                    </li>
                </ul>
            </div>
            <!-- 收藏歌单 -->
            <!-- 暗锚 -->
            <a name="collect" style="position: relative;top: -90px;"></a>
            <div class="collect-menu">
                <div class="menu-title">
                    <span class="title">收藏歌单({{ collectedMenus.length }}个)</span>
                    <i class="iconfont icon-jia" style="opacity: 0; visibility: hidden;"></i>
                    <i class="iconfont icon-gengduo1"></i>
                </div>
                <ul class="collected-menus">
                    <li v-for="(item, index) in collectedMenus" :key="index" @click="toPlaylist(item)">
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
    </div>
</template>

<script>
import myHeader from '../header/my-header';
import { getUserInfo, getLikeList, getPlayLists } from '../../api/mine';
import { mapGetters, mapMutations } from 'vuex';
import { MINE_PAGE_NAV_BTNS } from '../../consts/const';

export default {
    components: {
        myHeader,
    },
    data() {
        return {
            navBtns: MINE_PAGE_NAV_BTNS,
            downLoadNum: 0, //我喜欢的歌曲中已下载的数量,
            activeTab: 1,
        }
    },
    computed: {
        ...mapGetters([
            'nickname',
            'avatarUrl',
            'level',
            'likelist',
            'createdMenus',
            'collectedMenus'
        ]),
        total() {
            return this.likelist.trackCount;
        }
    },
    mounted() {
        //没有获取过信息则获取
        if(this.$store.getters.level.length == 0) {
            this.getUserInfo();
        }
        if(this.$store.getters.likelist.length == 0) {
            this.getLikeList();
        }
        if(this.$store.getters.playlist.length == 0) {
            this.getPlayLists();
        }
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
        //转到喜欢的音乐歌单
        toLoveSongList() {
            // console.log(this.likelist);
            this.$router.push({name: 'playlist', params: {id: this.likelist.id}});
        },
        //切歌
        changeSong() {
            this.$refs.bar.refresh();
        },
        //跳转到“歌单”
        toPlaylist(item) {
            this.$router.push({name: 'playlist', params: {id: item.id}})
        },
        ...mapMutations({
            setPlaylist: 'SET_PLATLIST',
            setCollectedMenus: 'SET_COLLECTED_MENUS',
            setCreatedMenus: 'SET_CREATED_MENUS'
        }),
        //获取歌单
        getPlayLists() {
            let that = this;
            this.$emit('beforeLoad');
            getPlayLists({
                uid: that.$store.getters.userID
            }).then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.setPlaylist(res.data.playlist);
                that.setCollectedMenus(res.data.playlist.filter(item => {
                    return item.subscribed === true;
                }));
                //喜欢的列表
                that.setLikelist(res.data.playlist.filter(item => {
                    return item.subscribed === false;
                })[0]);
                that.setCreatedMenus(res.data.playlist.filter(item => {
                    return item.subscribed === false;
                }).slice(1));
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //跳转到“个人信息”页面
        toMyInfo() {
            console.log(1)
            // if(!this.menuShow) { 
            // console.log(2)
                this.$router.push({name: 'myInfo'});
            // }
        },
        ...mapMutations({
            setLevel: 'SET_LEVEL',
            setListenSongs: 'SET_LISTEN_SONGS',
            setLikelist: 'SET_LIKELIST'
        }),
        //获取喜欢的音乐列表
        getLikeList() {
            this.$emit('beforeLoad');
            let that = this;
            getLikeList({
                uid: that.$store.getters.userID
            }).then(res => {
                that.$emit('onLoad');
                // console.log(res.data);
                // that.total = res.data.ids.length;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                })
            })
        },
        //获取用户信息
        getUserInfo() {
            this.$emit('beforeLoad');
            let that = this;
            getUserInfo({
                uid: that.$store.getters.userID
            }).then(res => {
                that.$emit('onLoad');
                // console.log(res.data)
                that.setLevel(res.data.level);
                that.setListenSongs(res.data.listenSongs);
            }).catch(err => {
                that.Message({
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
    @import '../../common/styles/my-menu';
    @import '../../common/styles/collect-and-create-menu-list';
</style>

<style lang="scss" scoped>
.container {
    background: #faf6f6;
}
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
            display: flex;
            width: 70px;
            height: 20px;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            bottom: 24px;
            left: 78px;
            background: #bebdbd;
            border-radius: 10px;
            color: white;
            i:first-of-type {
                font-size: 30px;
                position: relative;
                top: -1px;
                left: 2px;
            }
            span {
                font-size: 10px;
                -webkit-transform: scale(0.8);
                position: absolute;
                top: 2px;
                left: 30px;
            }
            i:last-of-type {
                font-size: 10px;
                -webkit-transform: scale(0.8);
                position: absolute;
                left: 52px;
            }
        }
        .level {
            display: inline-block;
            font-size: 10px;
            width: 40px;
            height: 20px;
            line-height: 20px;
            position: absolute;
            bottom: 24px;
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
    .mine-nav-btns-container {
        padding: 0 15px;
        .nav-btns {
            padding: 10px 0;
            height: 140px;
            background: white;
            border-radius: 10px;
            display: flex;
            list-style-type: none;
            flex-wrap: wrap;
            li {
                width: 25%;
                height: 70px;
                display: flex;
                flex-direction: column;
                text-align: center;
                i {
                    font-size: 36px;
                    color: rgba(255, 0, 0, 0.705);
                }
                .name {
                    font-size: 12px;
                }
                &:last-of-type {
                    i {
                        color: rgb(190, 186, 186);
                    }
                }
            }
        }
    }
    .love-song-container {
        padding: 0 15px;
        height: 115px;
        .wrapper {
            margin: 15px auto 0;
            height: 100px;
            background: white;
            border-radius: 10px;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pic {
                background: rgba(255, 0, 0, 0.199);
                border: 8px solid rgba(194, 134, 134, 0.397);
                border-radius: 5px;
                width: 36px;
                height: 36px;
                i {
                    color: rgba(255, 0, 0, 0.486);
                    font-size: 24px;
                    line-height: 36px;
                }
            }
            .songs {
                text-align: left;
                flex-grow: 1;
                padding: 0 10px;
                .num {
                    font-size: 12px;
                    color: #b8b6b6;
                    i {
                        color: rgba(10, 158, 243, 0.877);
                    }
                }
            }
            
            .btn {
                padding: 3px 10px;
                border-radius: 15px;
                border: 1px solid #c9c3c3;
                display: inline-block;
                font-size: 14px;
                i {
                    color: rgba(255, 0, 0, 0.507);
                }
            }
        }
    }
    .tab-container {
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
    }
</style>