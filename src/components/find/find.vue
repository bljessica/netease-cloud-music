<template>
    <div class="find-container">
        <my-header :selected="'find'" @menuShow="menuShow = true"></my-header>
        <!-- 轮播图 -->
        <banner :bannersData="bannerImgs" class="banner"></banner>
        <!-- 导航按钮栏 -->
        <nav-btns></nav-btns>
        <!-- 人气歌单推荐 -->
        <hot-song-menu></hot-song-menu>
        <!-- <my-menu :class="{'menuShowing': menuShow == true}" class="my-menu"></my-menu> -->
        <play-bar ref="bar" v-if="$store.getters.playingSong.id" @playingListShow="playingListShow = true" ></play-bar>
        <playing-list class="playing-list" v-if="playingListShow" @changeSong="changeSong"></playing-list>
    </div>
</template>

<script> 
import myHeader from '../common/my-header';
import banner from '../common/banner';
import myMenu from '../common/my-menu';
import navBtns from '../find/nav-btns';
import playBar from '../common/play-bar';
import playingList from '../common/playing-list';
import hotSongMenu from '../find/hot-song-menu';
import { getBanner } from '../../api/find';

export default {
    components: {
        myHeader,
        banner,
        navBtns,
        hotSongMenu,
        myMenu,
        playBar,
        playingList
    },
    data() {
        return {
            bannerImgs: [],
            menuShow: false,
            playingListShow: false,
        }
    },
    mounted() {
        this.getBanner();
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
        //获取轮播图数据
        getBanner() {
            let that = this;
            getBanner().then(res => {
                console.log(res.data);
                that.bannerImgs = res.data.banners;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    //权重较低，不生效
    // @import '../styles/my-menu';
</style>

<style lang="scss" scoped>
    .find-container {
        .my-menu {
            position: absolute;
            left: -330px;
            top: 0;
            transition: .5s;
            &.menuShowing {
                left: 0;
                transition: .5s;
            }
        }
    }
</style>