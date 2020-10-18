<template>
    <div class="container" ref="wrapper">
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
</template>

<script>
import { FIND_PAGE_NAV_BTNS } from '../../consts/const';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            navBtns: FIND_PAGE_NAV_BTNS,
            date: 0
        }
    },
    computed: {
        getDate() {
            let date = new Date();
            return date.getDate();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initSlider();
        })
    },
    methods: {
        initSlider() {
            const slide = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
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
</style>