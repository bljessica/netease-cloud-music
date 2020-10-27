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
                <i class="iconfont icon-leimupinleifenleileibie"></i>
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
        <!-- 精品 -->
        <div class="other-playlists" v-if="activeType === 2">
            <div class="filter-box">
                <span class="type">{{ highType }}</span>
                <span class="filter" @click.stop="highCatlistShow = true">
                    <i class="iconfont icon-funnel"></i>
                    <span>筛选</span>
                </span>
            </div>
            <ul class="playlists menu hign-quality">
                <li v-for="(item, index) in playlists" :key="index" @click.stop="$router.push({name: 'playlist', params: {id: item.id}})">
                    <div class="img" :style="{backgroundImage: 'url(' + item.coverImgUrl + ')'}">
                        <span class="top"><i class="iconfont icon-huangguan"></i></span>
                        <span class="play-amount">
                            <i class="iconfont icon-bofangsanjiaoxing"></i>
                            <span class="num">{{ getPlayNum(item.playCount) }}</span>
                        </span>
                    </div>
                    <p class="name">{{ item.name }}</p>
                </li>
            </ul>
            <div class="choose-type-wrapper" :class="{active: highCatlistShow === true}" @click.stop="highCatlistShow = false">
                <div class="choose-type" @click.stop="highCatlistShow = true">
                    <div>请选择你喜欢的分类</div>
                    <div class="tag" :class="{active: highType === '全部'}" @click.stop="chooseHighType('全部')">全部歌单</div>
                    <ul class="tags">
                        <li v-for="(item, index) in highCatlist" class="tag" :key="index" :class="{active: highType === item.name}"
                            @click.stop="chooseHighType(item.name)">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
        <!-- 其他分类 -->
        <div class="other-playlists" v-if="activeType !== 0 && activeType !== 2">
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
import { getCatlist, getHignQualityCatlist, getRecommendPlaylists, getHighQualityPlaylists, getPlaylists } from '../api/playlist';
import { getPlayNum } from '../common/js/processData';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            recommend: '', //推荐歌单
            playlists: '', //显示的歌单
            activeIndex: 1, //最大的图
            activeType: 0,//选择的类型
            catlist: [],//歌单分类
            highCatlist: [], //精品歌单分类
            highType: '全部', //精品中的分类
            highCatlistShow: false,//是否显示精品tag分类
            types: ['推荐', '轻音乐', '精品', '华语', '古风', '流行', '影视原声', '摇滚']
        }
    },
    mounted() {
        let that = this;
        // this.getCatlist();
        this.getHignQualityCatlist()
        this.getRecommendPlaylists();
        this.$nextTick(() => {
            that.initTypesSlider();
        })
    },
    watch: {
        activeType() {
            if(this.activeType !== 0) {
                if(this.activeType === 2) { //精品
                    this.getHighQualityPlaylists(this.highType);
                }
                else {
                    this.getPlaylists(this.types[this.activeType]);
                }
            }
        }
    },
    methods: {
        //选择精品歌单tag
        chooseHighType(name) {
            this.highType = name;
            this.highCatlistShow = false;
            this.getHighQualityPlaylists(this.highType);
        },
        //获取精品歌单分类
        getHignQualityCatlist() {
            this.$emit('beforeLoad');
            let that = this;
            getHignQualityCatlist().then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.highCatlist = res.data.tags;
            }).catch(err => {
                console.log(err);;
            })
        },
        // 分类获取歌单
        getPlaylists(tag) {
            this.$emit('beforeLoad');
            let that = this;
            getPlaylists({
                cat: tag
            }).then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.playlists = res.data.playlists;
            }).catch(err => {
                console.log(err);;
            })
        },
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
                console.log(err);;
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
                console.log(err);;
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
                console.log(err);;
            })
        },
        //计算播放量显示
        getPlayNum: getPlayNum,
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
    @import '../common/styles/playlists';
</style>

<style lang="scss" scoped>
    .container {
        // background: #faf6f6;
        background: white;
        padding-top: 111px;
        .header-wrapper {
            width: 100%;
            .header {
                // background: #faf6f6;
                background: white;
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
                background: white;
                // background: #faf6f6;
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
            .filter-box {
                height: 40px;
                width: 335px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .type {
                    font-weight: bold;
                    font-size: 18px;
                }
                .filter {
                    border: 1px solid gainsboro;
                    border-radius: 15px;
                    display: flex;
                    height: 20px;
                    padding: 3px 13px 2px;
                    font-size: 12px;
                }
            }
            .playlists {
                margin: 0 auto;
                width: 335px;
                padding: 0;
                height: auto;
                margin-bottom: 60px;
                &.hign-quality {
                    li {
                        .img .top {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 25px;
                            height: 25px;
                            border-radius: 0 0 25px 0;
                            background: rgb(243, 195, 106);
                            i {
                                font-size: 14px;
                                color: white;
                                display: inline-block;
                                transform: rotate(-45deg);
                                position: relative;
                                top: 2px;
                                left: 2px;
                            }
                        }
                    }
                }
                li {
                    margin-bottom: 15px;
                }
                li:nth-child(3n + 3) {
                    margin-right: 0;
                }
            }
            .choose-type-wrapper {
                position: fixed;
                top: 2000px;
                bottom: 2500px;
                left: 0;
                right: 0;
                z-index: 1000;
                transition-property: top, bottom;
                transition: .5s;
                &.active {
                    top: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    transition-property: top, bottom;
                    transition: .5s;
                }
                .choose-type {
                    position: absolute;
                    bottom: 0;
                    top: 40px;
                    left: 0;
                    right: 0;
                    border-radius: 20px 20px 0 0;
                    padding: 20px;
                    background: white;
                    div:first-of-type {
                        font-size: 18px;
                        text-align: left;
                    }
                    div:nth-of-type(2) {
                        width: 100%;
                    }
                    .tags {
                        list-style-type: none;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }
                    .tag {
                        background: #f1f1f1;
                        margin-top: 15px;
                        height: 34px;
                        width: 70px;
                        border-radius: 20px;
                        font-size: 14px;
                        line-height: 34px;
                        overflow: hidden;
                    }
                    .active {
                        background: rgba(255, 0, 0, 0.658);
                        color: white;
                    }
                }
            }
            
        }
    }
</style>