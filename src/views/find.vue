<template>
    <div class="container">
        <my-header></my-header>
        <!-- 轮播图 -->
        <banner :bannersData="bannerImgs" class="banner"></banner>
        <!-- 导航按钮栏 -->
        <nav-btns></nav-btns>
        <!-- 人气歌单推荐 -->
        <hot-song-menu></hot-song-menu>
    </div>
</template>

<script>
import myHeader from '../components/common/my-header';
import banner from '../components/common/banner';
import navBtns from '../components/find/nav-btns';
import hotSongMenu from '../components/find/hot-song-menu';
import { getBanner } from '../api/find';

export default {
    components: {
        myHeader,
        banner,
        navBtns,
        hotSongMenu
    },
    data() {
        return {
            bannerImgs: []
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
    
</style>