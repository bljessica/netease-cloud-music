<template>
    <div class="container" >
        <div class="title-bar">
            <span class="title">人气歌单推荐</span>
            <span class="more" @click="$router.push('/ground')">查看更多</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <ul class="menu" ref="slider">
                <li v-for="item in menu.slice(0, 6)" :key="item.id" @click="toPlaylist(item)">
                    <div class="img" :style="{backgroundImage: 'url(' + item.picUrl + ')'}">
                        <span class="play-amount">
                            <i class="iconfont icon-bofangsanjiaoxing"></i>
                            <span class="num">{{ getPlayNum(item.playCount) }}</span>
                        </span>
                    </div>
                    <p class="name">{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getSuggestHotMenu } from '../../api/find';
import { getPlayNum } from '../../common/js/processData';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            menu: []
        }
    },
    mounted() {
        this.getMenu();
        this.$nextTick(() => {
            this.initSlider();
        });
    },
    methods: {
        //跳转到歌单
        toPlaylist(item) {
            this.$router.push({'name': 'playlist', params: {id: item.id}});
        },
        //计算播放量显示
        getPlayNum: getPlayNum,
        //获取推荐歌单
        getMenu() {
            this.$emit('beforeLoad');
            let that = this;
            getSuggestHotMenu().then(res => {
                that.$emit('onLoad');
                // console.log(res.data.result);
                that.menu = res.data.result;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //初始化推荐歌单滑块
        initSlider() {
            const slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                click: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/styles/playlists';
</style>

<style lang="scss" scoped>
.container {
    padding-bottom: 15px;
}
    .title-bar {
        // width: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-weight: bold;
            font-size: 20px;
        }
        .more {
            border: 1px solid #E0E0E0;
            border-radius: 15px;
            padding: 5px 10px;
            font-size: 12px;
        }
    }
    .wrapper {
        width: 100%;
        overflow: hidden;
    }
</style>