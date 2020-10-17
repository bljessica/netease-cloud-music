<template>
    <div class="find-container" @click.stop="menuShow = false">
        <my-header :selected="'find'" @menuShow="menuShow = true"></my-header>
        <!-- 轮播图 -->
        <banner :bannersData="bannerImgs" class="banner"></banner>
        <!-- 导航按钮栏 -->
        <nav-btns></nav-btns>
        <!-- 人气歌单推荐 -->
        <hot-song-menu></hot-song-menu>
        <!-- <my-menu :class="{'menuShowing': menuShow == true}" class="my-menu"></my-menu> -->
        <play-bar v-if="$store.getters.playingSong"></play-bar>
    </div>
</template>

<script>
import myHeader from '../components/common/my-header';
import banner from '../components/common/banner';
import myMenu from '../components/common/my-menu';
import navBtns from '../components/find/nav-btns';
import playBar from '../components/common/play-bar';
import hotSongMenu from '../components/find/hot-song-menu';
import { getBanner } from '../api/find';

export default {
    components: {
        myHeader,
        banner,
        navBtns,
        hotSongMenu,
        myMenu,
        playBar
    },
    data() {
        return {
            bannerImgs: [],
            menuShow: false
        }
    },
    mounted() {
        this.getBanner();
    },
    methods: {
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