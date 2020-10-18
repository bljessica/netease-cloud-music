<template>
    <div class="find-container">
        <my-header :selected="'find'" @menuShow="menuShow = true"></my-header>
        <!-- 轮播图 --> 
        <!-- <banner :bannersData="bannerImgs" class="banner"></banner> -->
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
// import banner from '../common/banner';
import myMenu from '../common/my-menu';
import navBtns from '../find/nav-btns';
import playBar from '../common/play-bar';
import playingList from '../common/playing-list';
import hotSongMenu from '../find/hot-song-menu';
import { getBanner } from '../../api/find';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';

BScroll.use(Slide);

export default {
    components: {
        myHeader,
        // banner,
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
            slide: null,
            curIndex: 0,
            playTimer: null
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
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
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
                clearTimeout(this.playTimer);
            });
            this.slide.on('touchEnd', () => {
                this.autoGoNext();
            });
            this.slide.on('slideWillChange', (page) => {
                this.curIndex = page.pageX;
            })
        },
        nextPage() {
            this.slide.next();
        },
        autoGoNext() {
            clearTimeout(this.playTimer);
            this.playTimer = setTimeout(() => {
                this.nextPage();
            }, 2000);
        },
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
        .banner-wrapper {
            width: 350px;
            margin: 0 auto;
            height: 150px;
            border-radius: 10px;
            overflow: hidden;
            white-space: nowrap;
            .content {
                height: 150px;
                list-style-type: none;
                li {
                    height: 150px;
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
    }
</style>