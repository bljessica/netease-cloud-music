<template>
    <div class="container" >
        <div class="title-bar">
            <span class="title">人气歌单推荐</span>
            <span class="more">查看更多</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <ul class="menu" ref="slider">
                <li v-for="item in menu.slice(0, 6)" :key="item.id">
                    <div class="img" :style="{backgroundImage: 'url(' + item.picUrl + ')'}">
                        <span class="play-amount">
                            <i class="iconfont icon-bofang1"></i>
                            <span class="num">{{ getPlayNum(item) }}</span>
                        </span>
                    </div>
                    <p class="name">{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import { getSuggestHotMenu } from '../../api/find';
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
        getPlayNum(item) {
            if(item.playCount >= 10000) {
                return Math.round(item.playCount / 10000) + '万';
            }
            else {
                return item.playCount;
            }
        },
        getMenu() {
            let that = this;
            getSuggestHotMenu().then(res => {
                console.log(res.data.result);
                that.menu = res.data.result;
            }).catch(err => {
                Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        initSlider() {
            const slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
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
            font-size: 14px;
        }
    }
    .wrapper {
        width: 100%;
        overflow: hidden;
        .menu {
            width: 690px;
            padding-left: 10px;
            margin-top: 15px;
            height: 150px;
            text-align: left;
            li {
                width: 105px;
                display: inline-block;
                margin-right: 10px;
                .img {
                    width: 105px;
                    height: 105px;
                    background-size: 100% 100%;
                    border-radius: 10px;
                    position: relative;
                    .play-amount {
                        position: absolute;
                        right: 5px;
                        top: 3px;
                        color: white;
                        font-size: 14px;
                        i {
                            font-size: 12px;
                        }
                    }
                }
                .name {
                    margin-top: 5px;
                    width: 105px;
                    font-size: 14px;
                    line-height: 20px;
                    //文本超出两行显示省略号
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
</style>