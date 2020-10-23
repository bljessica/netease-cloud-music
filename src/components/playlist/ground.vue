<template>
    <div class="container">
        <!-- 头部 -->
        <div class="header-wrapper">
            <div class="header">
                <i class="iconfont icon-zuo" @click.stop="$router.go(-1)"></i>
                歌单广场
            </div>
            <!-- 分类 -->
            <div class="types-container">
                <div class="slider-wrapper" ref="wrapper">
                    <ul class="types">
                        <li v-for="(item, index) in types" :key="index" @click.stop="activeType = index"
                            :class="{active: activeType === index}">
                            {{ item }}
                        </li>
                    </ul>
                </div>
                <i class="iconfont icon-caidan"></i>
            </div>
        </div>
        <!-- 推荐 -->
        <!-- 较大的歌单 -->
        <div class="big-playlists" v-if="activeType === 0">
            <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight">
                <ul class="playlists menu">
                    <li v-for="(item, index) in recommend.slice(0, 3)" :key="index" 
                        :class="{active: activeIndex === index, left: activeIndex === (index + 1) % 3, right: (activeIndex + 1) % 3 === index}"
                         @click.stop="$router.push({name: 'playlist', params: {id: item.id}})">
                        <div class="img" :style="{backgroundImage: 'url(' + item.picUrl + ')'}">
                            <span class="play-amount">
                                <i class="iconfont icon-bofangsanjiaoxing"></i>
                                <span class="num">{{ getPlayNum(item.playcount) }}</span>
                            </span>
                            <i class="iconfont icon-ziyuan1 play"></i>
                        </div>
                        <p class="name">{{ item.name }}</p>
                    </li>
                </ul>
            </v-touch>
        </div>
        <!-- 其他歌单 -->
        <div class="other-playlists" v-if="activeType === 0">
            <ul class="playlists menu">
                <li v-for="(item, index) in recommend.slice(3)" :key="index" @click.stop="$router.push({name: 'playlist', params: {id: item.id}})">
                    <div class="img" :style="{backgroundImage: 'url(' + item.picUrl + ')'}">
                        <span class="play-amount">
                            <i class="iconfont icon-bofangsanjiaoxing"></i>
                            <span class="num">{{ getPlayNum(item.playcount) }}</span>
                        </span>
                    </div>
                    <p class="name">{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <!-- 其他分类 -->
        <div class="other-playlists" v-if="activeType !== 0">
            <ul class="playlists menu">
                <li v-for="(item, index) in playlists" :key="index" @click.stop="$router.push({name: 'playlist', params: {id: item.id}})">
                    <div class="img" :style="{backgroundImage: 'url(' + item.coverImgUrl + ')'}">
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
import { getCatlist, getRecommendPlaylists, getHighQualityPlaylists } from '../../api/playlist';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            recommend: '', //推荐歌单
            playlists: '', //显示的歌单
            activeIndex: 1, //最大的图
            activeType: 0,//选择的类型
            catlist: '',//歌单分类
            types: ['推荐', '轻音乐', '精品', '华语', '古风', '流行', '影视原声', '摇滚']
        }
    },
    mounted() {
        let that = this;
        this.getCatlist();
        this.getRecommendPlaylists();
        this.$nextTick(() => {
            that.initTypesSlider();
        })
    },
    watch: {
        activeType() {
            if(this.activeType !== 0) {
                if(this.activeType === 2) {
                    this.getHighQualityPlaylists();
                }
                else {
                    this.getHighQualityPlaylists(this.types[this.activeType]);
                }
            }
        }
    },
    methods: {
        //获取精品歌单
        getHighQualityPlaylists(tag='全部') {
            this.$emit('beforeLoad');
            let that = this;
            getHighQualityPlaylists({
                cat: tag
            }).then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.playlists = res.data.playlists;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //左滑切换大歌单
        swipeleft() {
            this.activeIndex++;
            if(this.activeIndex > 2) {
                this.activeIndex -= 3;
            }
        },
        //右滑切换大歌单
        swiperight() {
            this.activeIndex--;
            if(this.activeIndex < 0) {
                this.activeIndex += 3;
            }
        },
        //获取歌单分类
        getCatlist() {
            this.$emit('beforeLoad');
            let that = this;
            getCatlist().then(res => {
                that.$emit('onLoad');
                // console.log(res.data);
                that.catlist = res.data.categories.sub;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        // 获取每日推荐歌单
        getRecommendPlaylists() {
            this.$emit('beforeLoad');
            let that = this;
            getRecommendPlaylists().then(res => {
                that.$emit('onLoad');
                // console.log(res.data);
                that.recommend = res.data.recommend;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //计算播放量显示
        getPlayNum(playcount) {
            if(playcount >= 100000000) {
                return (playcount / 100000000).toFixed(1) + '亿';
            }
            else if(playcount >= 10000) {
                return Math.round(playcount / 10000) + '万';
            }
            else {
                return playcount;
            }
        },
        //初始化分类滑块
        initTypesSlider() {
            let slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                click: true,
                bounce: false
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/styles/playlists';
</style>

<style lang="scss" scoped>
    .container {
        background: #faf6f6;
        padding-top: 111px;
        .header-wrapper {
            width: 100%;
            .header {
                background: #faf6f6;
                z-index: 100;
                position: fixed;
                top: 0;
                left: 15px;
                right: 15px;
                height: 70px;
                line-height: 70px;
                text-align: left;
                font-size: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                i {
                    font-size: 24px;
                    padding-right: 10px;
                }
            }
            .types-container {
                background: #faf6f6;
                z-index: 100;
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                height: 40px;
                border-bottom: 1px solid gainsboro;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .slider-wrapper {
                    flex-grow: 1;
                    overflow: hidden;
                    .types {
                        list-style-type: none;
                        width: 720px;
                        height: 40px;
                        li {
                            text-align: center;
                            display: inline-block;
                            line-height: 40px;
                            height: 38px;
                            width: 90px;
                            font-size: 14px;
                            color: gray;
                            border-bottom: 1px solid transparent;
                            &.active {
                                color: red;
                                border-bottom: 2px solid red;
                            }
                        }
                    }
                }
                i {
                    position: relative;
                    top: -2px;
                    font-size: 20px;
                    padding: 0 15px;
                }
            }
        }
        .big-playlists {
            .playlists {
                margin: 20px auto 0;
                width: 335px;
                padding: 0;
                height: 235px;
                overflow: hidden;
                position: relative;
                li {
                    background: white;
                    width: 150px;
                    height: 205px;
                    border-radius: 5px;
                    overflow: hidden;
                    position: absolute;
                    top: 15px;
                    opacity: 0.5;
                    box-shadow: 2px 2px 5px gainsboro, -2px 2px 5px gainsboro;
                    transition-property: left, right, opacity, z-index;
                    transition-duration: .5s;
                    .img {
                        width: 150px;
                        height: 155px;
                        border-radius: 5px 5px 0 0;
                        .play {
                            color: white;
                            font-size: 30px;
                            position: absolute;
                            right: 10px;
                            bottom: 10px;
                        }
                    }
                    .name {
                        margin: 0;
                        padding: 5px 10px;
                        width: 130px;
                        line-height: 20px;
                        height: 40px;
                    }
                    &.left {
                        left: 0;
                    }
                    &.right {
                        right: 0;
                    }
                    &.active  {
                        width: 180px;
                        height: 235px;
                        top: 0;
                        left: 77px;
                        z-index: 1;
                        opacity: 1;
                        .img {
                            width: 180px;
                            height: 185px;
                            .play {
                                font-size: 36px;
                            }
                        }
                        .name {
                            font-size: 14px;
                            width: 160px;
                        }
                    }
                    
                }
            }
        }
        .other-playlists {
            margin-top: 20px;
            .playlists {
                margin: 0 auto;
                width: 335px;
                padding: 0;
                height: auto;
                margin-bottom: 60px;
                li {
                    margin-bottom: 15px;
                }
                li:nth-child(3n + 3) {
                    margin-right: 0;
                }
            }
        }
    }
</style>