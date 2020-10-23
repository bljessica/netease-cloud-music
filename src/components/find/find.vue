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
        <div class="nav-btns-container" ref="wrapper">
            <ul class="btns" ref="content">
                <li v-for="item in navBtns" :key="item.id" @click.stop="navTo(item.navTo)">
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
        <!-- 歌曲推荐 -->
        <!-- 音乐日历 -->
        <div class="calender" v-if="calendarEvents.length > 0">
            <div class="title">
                <i class="iconfont icon-rili"></i>音乐日历
            </div>
            <div class="content">
                <div class="left">
                    <span class="time">{{ getDateOfCalender }}</span>
                    <p class="name">{{ calendarEvents[eventIndex].title }}</p>
                </div>
                <img :src="calendarEvents[eventIndex].imgUrl" alt="" class="pic">
            </div>
        </div>
    </div>
</template>

<script> 
import myHeader from '../header/my-header';
import hotSongMenu from '../find/hot-song-menu';
import { getBanner, getCalendar } from '../../api/find';
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
            date: 0, //日期
            calendarEvents: [], //音乐日历
            calendarTimer: null,
            eventIndex: 0, //显示的日历事件索引
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
        this.getCalendar();
        this.$nextTick(() => {
            this.initNavBtnsSlider();
        })
    },
    computed: {
        getDate() {
            let date = new Date();
            return date.getDate();
        },
        // 音乐日历日期
        getDateOfCalender() {
            let date = new Date(this.calendarEvents[this.eventIndex].onlineTime);
            let dateNow = new Date();
            if(date.getMonth() === dateNow.getMonth() && date.getDate() === dateNow.getDate()) {
                return '今天';
            }
            return (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    beforeDestroy() {
        clearInterval(this.calendarTimer);
    },
    methods: {
        //获取音乐日历
        getCalendar() {
            this.$emit('beforeLoad');
            let that = this;
            getCalendar().then(res => {
                that.$emit('onLoad');
                // console.log(res.data);
                that.calendarEvents = res.data.data.calendarEvents;
                clearInterval(that.calendarTimer);
                that.calendarTimer = setInterval(() => {
                    that.eventIndex ++;
                    if(that.eventIndex >= that.calendarEvents.length) {
                        that.eventIndex -= that.calendarEvents.length;
                    }
                }, 5000);
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                })
            })
        },
        //点击导航栏跳转
        navTo(path) {
            this.$router.push(path);
        },
        //初始化导航按钮滑块
        initNavBtnsSlider() {
            const slideBtns = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                click: true
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
            this.$emit('beforeLoad');
            let that = this;
            getBanner().then(res => {
                that.$emit('onLoad');
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
        background: white;
        padding-bottom: 60px;
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
                            color: rgba(231, 34, 34, 0.726);
                            font-weight: bold;
                            // color: white;
                            position: absolute;
                            left: 0;
                            top: 2px;
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
        .calender {
            width: 85%;
            height: 99px;
            margin: 10px auto;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 2px 1px 10px gainsboro, -2px 1px 10px gainsboro;
            text-align: left;
            font-size: 14px;
            .title {
                color: rgba(255, 0, 0, 0.678);
                font-size: 18px;
                font-weight: bold;
                i {
                    margin-right: 5px;
                }
            }
            .content {
                height: 65px;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    line-height: 20px;
                    .time {
                        font-weight: bold;
                        position: relative;
                        left: 2px;
                    }
                    .name {
                        margin-top: 5px;
                        color: gray;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        height: 40px;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                .pic {
                    width: 56px;
                    height: 56px;
                    border-radius: 5px;
                }
            }
        }
    }
</style>