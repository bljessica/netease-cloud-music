<template>
    <div class="find-container">
        <my-header :selected="'find'" @menuShow="menuShow = true"></my-header>
        <!-- 轮播图 --> 
        <div class="banner-wrapper" ref="slider"> 
            <ul class="content" ref="content">
                <li v-for="(item, index) in bannerImgs" :key="index" style="width: 350px;"
                    :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
                </li>
            </ul>
            <div class="dots-wrapper">
                <span v-for="i in bannerImgs.length" :key="i" :class="{active: i - 1 === curIndex}"></span>
            </div>
        </div>
        <!-- 导航按钮栏 -->
        <!-- <nav-btns></nav-btns> -->
        <div class="nav-btns-container" ref="wrapper">
            <ul class="btns" ref="content">
                <li v-for="item in navBtns" :key="item.id">
                    <span class="icon-wrapper">
                        <i class="iconfont" :class="item.icon"></i>
                        <span class="copy" v-if="item.name == '歌单'">&reg;</span>
                        <span class="date" v-if="item.name == '每日推荐'">{{ getDate }}</span>
                    </span>
                    <span class="name">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <!-- 人气歌单推荐 -->
        <hot-song-menu></hot-song-menu>
        <!-- <my-menu :class="{'menu-showing': menuShow == true}" class="my-menu"></my-menu> -->
    </div>
</template>

<script> 
import myHeader from '../common/my-header';
import hotSongMenu from '../find/hot-song-menu';
import { getBanner } from '../../api/find';
import { FIND_PAGE_NAV_BTNS } from '../../consts/const';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';

BScroll.use(Slide);

export default {
    components: {
        myHeader,
        hotSongMenu,
    },
    data() {
        return {
            bannerImgs: [],
            slide: null, //轮播图
            curIndex: 0, //轮播图当前索引
            bannerTimer: null, //轮播图滚动定时器
            navBtns: FIND_PAGE_NAV_BTNS,
            date: 0 //日期
        }
    },
    watch: {
        bannerImgs() {
            //获取数据并渲染后再开始轮播
            setTimeout(() => {
                this.initBanner();
            }, 20);
        }
    },
    mounted() {
        this.getBanner();
        this.$nextTick(() => {
            this.initNavBtnsSlider();
        })
    },
    computed: {
        getDate() {
            let date = new Date();
            return date.getDate();
        }
    },
    methods: {
        //初始化导航按钮滑块
        initNavBtnsSlider() {
            const slideBtns = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false
            })
        },
        //初始化轮播图
        initBanner() {
            let num = this.bannerImgs.length;
            this.$nextTick(() => {
                let width = this.$refs.content.children[0].style.width;
                this.$refs.content.style.width = parseInt(width) * num + 'px';
                // this.initBanner();
            });
            this.slide = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                slide: {
                    loop: true,
                    threshold: 100
                },
                // eventPassthrough: 'vertival',
                useTransition: true,
                momentum: false, //避免惯性动画带来的快速滚动时的闪烁问题
                bounce: false, //避免循环衔接时闪烁
                stopPropagation: true,
                probeType: 2 //需要监听slideWillChange事件
            });
            //自动轮播
            this.autoGoNext();
            //监听事件
            this.slide.on('scrollEnd', () => {
                //如果滚动
                this.autoGoNext();
            })
            this.slide.on('beforeScrollStart', () => {
                clearTimeout(this.bannerTimer);
            });
            this.slide.on('touchEnd', () => {
                this.autoGoNext();
            });
            this.slide.on('slideWillChange', (page) => {
                this.curIndex = page.pageX;
            })
        },
        //轮播图切下一张
        nextPage() {
            this.slide.next();
        },
        //设置轮播图自动切换
        autoGoNext() {
            clearTimeout(this.bannerTimer);
            this.bannerTimer = setTimeout(() => {
                this.nextPage();
            }, 2000);
        },
        //切歌
        changeSong() {
            this.$refs.bar.refresh();
        },
        //获取轮播图数据
        getBanner() {
            let that = this;
            getBanner().then(res => {
                // console.log(res.data);
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
            &.menu-showing {
                left: 0;
                transition: .5s;
            }
        }
        .banner-wrapper {
            width: 350px;
            margin: 0 auto;
            height: 130px;
            border-radius: 10px;
            overflow: hidden;
            white-space: nowrap;
            .content {
                height: 130px;
                list-style-type: none;
                li {
                    height: 130px;
                    display: inline-block;
                    background-size: 100% 100%;
                    //设置 useTransition = true时，可能在 iphone 某些系统上出现闪烁
                    transform: translate3d(0,0,0);
                    backface-visibility: hidden;
                }
            }
            .dots-wrapper {
                width: 40%;
                margin-left: 30%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: relative;
                bottom: 18px;
                span {
                    width: 6px;
                    height: 6px;
                    background: #E0E0E0;
                    border-radius: 50%;
                }
                span.active {
                    background: red;
                }
            }
        }
        .nav-btns-container {
            width: 100%;
            overflow: hidden;
            .btns {
                margin-top: 15px;
                width: 630px;
                height: 90px;
                list-style-type: none;
                li {
                    display: inline-block;
                    width: 70px;
                    .icon-wrapper {
                        display: inline-block;
                        width: 46px;
                        height: 46px;
                        border-radius: 50%;
                        position: relative;
                        background: linear-gradient(to right, rgba(231, 34, 34, 0.507), red);
                        i {
                            font-size: 30px;
                            color: white;
                            line-height: 50px;
                            position: relative;
                            bottom: 3px;
                            &.icon-rili, &.icon-ziyuan {
                                font-size: 22px;
                            }
                        }
                        .copy {
                            position: absolute;
                            color: #cac7c7;
                            font-size: 10px;
                            right: 2px;
                            bottom: -14px;
                        }
                        .date {
                            // color: rgba(231, 34, 34, 0.507);
                            color: white;
                            position: absolute;
                            left: 0;
                            top: 0;
                            display: inline-block;
                            width: 46px;
                            height: 46px;
                            line-height: 46px;
                            text-align: center;
                        }
                    }
                    .name {
                        margin-top: 5px;
                        display: inline-block;
                        width: 70px;
                        text-align: center;
                        font-size: 10px;
                    }
                }
            }
        }
    }
</style>