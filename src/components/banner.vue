<template>
    <div class="wrapper" ref="slider">
        <ul class="content" ref="content">
            <li v-for="(item, index) in bannersData" :key="index" style="width: 350px;"
                :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
            </li>
        </ul>
        <div class="dots-wrapper">
            <span v-for="i in bannersData.length" :key="i" :class="{active: i - 1 === curIndex}"></span>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';

BScroll.use(Slide);
export default {
    props: {
        bannersData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            slide: null,
            curIndex: 0,
            playTimer: null
        }
    },
    watch: {
        bannersData() {
            //获取数据并渲染后再开始轮播
            setTimeout(() => {
                this.initBanner();
            }, 20);
        }
    },
    methods: {
        initBanner() {
            let num = this.bannersData.length;
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
            }, 1000);
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 350px;
        margin: 0 auto;
        height: 150px;
        border-radius: 10px;
        overflow: hidden;
        white-space: nowrap;
        .content {
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
</style>