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
        <mine-nav-btns></mine-nav-btns>
        <!-- 我喜欢的音乐 -->
        <love-songs></love-songs>
        <!-- 歌单导航栏 -->
        <menu-tabs></menu-tabs>
        <!-- <my-menu :class="{'menuShowing': menuShow == true}" class="my-menu"></my-menu> -->
        <play-bar ref="bar" v-if="$store.getters.playingSong.id" @playingListShow="playingListShow = true" ></play-bar>
        <playing-list class="playing-list" v-show="playingListShow" @changeSong="changeSong"></playing-list>
    </div>
</template>

<script>
import myHeader from '../common/my-header';
import mineNavBtns from '../mine/mine-nav-btns';
import loveSongs from '../mine/love-songs';
import myMenu from '../common/my-menu';
import menuTabs from '../mine/menu-tabs';
import playBar from '../common/play-bar';
import { getUserInfo } from '../../api/mine';
import { mapGetters, mapMutations } from 'vuex';
import playingList from '../common/playing-list';


export default {
    components: {
        myHeader,
        mineNavBtns,
        loveSongs,
        menuTabs,
        myMenu,
        playBar,
        playingList
    },
    data() {
        return {
            menuShow: false,
            playingListShow: false,
        }
    },
    computed: {
        ...mapGetters([
            'nickname',
            'avatarUrl',
            'level'
        ])
    },
    mounted() {
        //没有获取过等级信息
        if(this.$store.getters.level.length == 0) {
            this.getUserInfo();
        }
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
        changeSong() {
            this.$refs.bar.refresh();
        },
        toMyInfo() {
            console.log(1)
            // if(!this.menuShow) { 
            // console.log(2)
                this.$router.push({name: 'myInfo'});
            // }
        },
        ...mapMutations({
            setLevel: 'SET_LEVEL',
            setListenSongs: 'SET_LISTEN_SONGS'
        }),
        getUserInfo() {
            let that = this;
            getUserInfo({
                uid: that.$store.getters.userID
            }).then(res => {
                console.log(res.data)
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
</style>

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
            bottom: 24px;
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
</style>