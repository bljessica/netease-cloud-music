<template>
    <div class="wrapper">
        <!-- 头部 -->
        <div class="container" :style="{background: selected == 'mine'? '#faf6f6': 'white'}">
            <!-- 菜单 -->
            <span class="menu li" @click.stop="menuShow = true">
                <i class="iconfont icon-caidan"></i>
                <span class="msgNum">9</span>
            </span>
            <!-- 我的 -->
            <span class="mine li" :class="{active: selected == 'mine'}">
                <router-link :to="'/mine'">我的</router-link>
            </span>
            <!-- 发现 -->
            <span class="find li" :class="{active: selected == 'find'}">
                <router-link :to="'/find'">发现</router-link>
            </span>
            <!-- 云村 -->
            <span class="cloud li" :class="{active: selected == 'cloud'}" >
                <router-link :to="'/cloud'">云村</router-link>
                <i class="new li" v-if="selected != 'cloud'"></i>
            </span>
            <!-- 视频 -->
            <span class="video li" :class="{active: selected == 'video'}" >
                <router-link :to="'/'">视频</router-link>
            </span>
            <!-- 搜索 -->
            <i class="iconfont icon-sousuo search li" @click="$router.push('/search')"></i>
        </div>
        <!-- 侧边栏菜单 -->
        <div class="my-menu-wrapper" ref="wrapper" :class="{'menu-showing': menuShow}">
            <div class="my-menu-container" :class="{'menu-showing': menuShow}">
                <!-- 开通VIP -->
                <div class="vip"> 
                    <div class="title">
                        <span>开通黑胶VIP</span>
                        <span>会员中心</span>
                    </div>
                    <p>加入黑胶VIP，立享超17项专属特权</p>
                    <div>
                        <span>黑胶VIP首月仅5元，赢万元苹果礼包</span>
                        <i class="iconfont icon-jia1"></i>
                    </div>
                </div>
                <!-- 消息中心 -->
                <div class="msgs">
                    <div class="yunbei li"> 
                        <div class="wrapper">
                            <i class="iconfont icon-yun"></i>
                        </div>
                        <div class="content">
                            <span>云贝中心</span>
                            <div class="sign">签到<i class="iconfont icon-you"></i></div>
                        </div>
                    </div>
                    <div class="msg li">
                        <div class="wrapper">
                            <i class="iconfont icon-xinxi"></i>
                        </div>
                        <div class="content">
                            <span>消息中心&nbsp;<span class="num">9</span></span>
                            <div class="sign">有人私信了你</div>
                        </div>
                    </div>
                </div>
                <!-- 创作者中心 -->
                <div class="creater">
                    <span class="icon-wrapper">
                        <i class="iconfont icon-2"></i>
                    </span>
                    <span class="name">创作者中心</span>
                    <i class="iconfont icon-you"></i>
                </div>
                <!-- 音乐服务 -->
                <div class="service items-wrapper">
                    <div class="title">音乐服务</div>
                    <my-menu-items :items="serviceItems" class="items"></my-menu-items>
                </div>
                <!-- 其他 -->
                <div class="others items-wrapper">
                    <div class="title">音乐服务</div>
                    <my-menu-items :items="otherItems" class="items"></my-menu-items>
                </div>
                <!-- 关于 -->
                <div class="about items-wrapper">
                    <my-menu-items :items="mineSettingItems" class="items"></my-menu-items>
                </div>
                <!-- 底部导航栏 -->
                <footer class="footer">
                    <span class="night">
                        <i class="iconfont icon-yewan"></i>
                        夜间模式
                    </span>
                    <span class="setting">
                        <i class="iconfont icon-shezhi"></i>
                        设置
                    </span>
                    <span class="exit">
                        <i class="iconfont icon-guanji"></i>
                        退出
                    </span>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import myMenuItems from './my-menu-items';
import { SERVICE_ITEMS, OTHER_ITEMS, MINE_SETTING_ITEMS } from '../../consts/const';
import BScroll from '@better-scroll/core';

export default {
    components: {
        myMenuItems
    },
    data() {
        return {
            serviceItems: SERVICE_ITEMS,
            otherItems: OTHER_ITEMS,
            mineSettingItems: MINE_SETTING_ITEMS,
            menuShow: false,
            slider: null
        }
    },
    props: {
        selected: {
            type: String,
            default: 'find'
        }
    },
    mounted() {
        let that = this;
        this.$nextTick(() => {
            that.initSlider();
        })
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.menuShow === true && className !== 'my-menu-container') {
                this.menuShow = false;
            }
        })
    },
    watch: {
        menuShow() {
            this.slider.refresh();
        }
    },
    methods: {
        initSlider() {
            this.slider = new BScroll(this.$refs.wrapper, {
                scrollX: false,
                scrollY: true,
                bounce: false,
                click: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 70px;
    .container {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 1000;
        background: #faf6f6;
        a {
            text-decoration: none;
            color: black;
        }
        .li {
            flex: 1 1 100px;
            &.active {
                font-weight: bold;
                font-size: 18px;
            }
        }
        i {
            font-size: 20px;
        }
        .menu, .search {
            flex: 1 1 80px;
        }
        .menu {
            position: relative;
            .msgNum {
                position: absolute;
                right: 4px;
                top: -8px;
                display: inline-block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: red;
                color: white;
                font-size: 13px;
                line-height: 14px;
                text-align: center;
            }
        }
        .cloud {
            position: relative;
            i {
                width: 8px;
                height: 8px;
                background: red;
                border-radius: 50%;
                position: absolute;
                right: 8px;
                top: -5px;
            }
        }
    }
    .my-menu-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: -2000px;
        right: 0;
        z-index: -1;
        overflow: hidden;
        transition: .1s;
        &.menu-showing {
            left: 0;
            right: 0;
            z-index: 5000;
            background: rgba(0, 0, 0, 0.4);
            transition: .1s;
        }
        .my-menu-container {
            position: absolute;
            top: 0;
            left: -330px;
            width: 300px;
            z-index: 5001;
            padding: 0 15px;
            background: #faf6f6;
            border-right: 1px solid #E0E0E0;
            transition: .5s;
            &.menu-showing {
                left: 0;
                transition: .5s;
            }
            .vip {
                position: relative;
                margin-top: 15px;
                height: 80px;
                background: linear-gradient(to right, rgba(0, 0, 0, 0.445), rgba(0, 0, 0, 0.24));
                border-radius: 15px;
                color: white;
                padding: 15px 20px;
                .title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span:first-of-type {
                        font-weight: bold;
                        font-size: 18px;
                    }
                    span:last-of-type {
                        padding: 3px 10px;
                        border-radius: 15px;
                        border: 1px solid #E0E0E0;
                        font-size: 14px;
                    }
                }
                p {
                    margin-top: 5px;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 12px;
                    text-align: left;
                }
                div:last-of-type {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    bottom: 0;
                    left: 20px;
                    right: 20px;
                    height: 40px;
                    border-top: 1px solid #E0E0E0;
                    span {
                        color: rgba(255, 255, 255, 0.5);
                        font-size: 14px;
                    }
                }
            }
            .msgs {
                display: flex;
                padding: 5px 20px;
                justify-content: space-between;
                align-items: center;
                background: white;
                margin-top: 15px;
                border-radius: 10px;
                height: 70px;
                .li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 50%;
                    .wrapper {
                        width: 35px;
                        height: 35px;
                        background: rgba(220, 220, 220, 0.637);
                        border-radius: 50%;
                        i {
                            font-size: 20px;
                            line-height: 35px;
                        }
                    }
                    .content {
                        position: relative;
                        left: 10px;
                        text-align: left;
                        span {
                            font-weight: bold;
                            .num {
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                border-radius: 50%;
                                background: red;
                                color: white;
                                font-size: 10px;
                                line-height: 18px;
                                text-align: center;
                            }
                            
                        }
                        .sign {
                            font-size: 10px;
                            color: grey;
                            margin-top: 3px;
                        }
                    }
                }
                .yunbei {
                    border-right: 1px solid #E0E0E0;
                    .content .sign {
                        width: 36px;
                        color: red;
                        border: 1px solid red;
                        padding: 2px 10px;
                        border-radius: 15px;
                        i {
                            color: red;
                            font-size: 10px;
                        }
                    }
                }
                .msg {
                    margin-left: 15px;
                    .wrapper i {
                        font-size: 14px;
                    }
                }
            }
            .creater {
                height: 60px;
                background: white;
                border-radius: 10px;
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                .icon-wrapper {
                    width: 35px;
                    height: 35px;
                    background: rgba(220, 220, 220, 0.637);
                    border-radius: 50%;
                    i {
                        font-size: 20px;
                        line-height: 35px;
                    }
                }
                .name {
                    flex-grow: 1;
                    text-align: left;
                    margin-left: 10px;
                    font-weight: bold;
                }
                &>i {

                }
            }
            .items-wrapper {
                background: white;
                border-radius: 10px;
                margin-top: 15px;
                font-size: 14px;
                .title {
                    height: 30px;
                    font-size: 12px;
                    color: rgba(128, 128, 128, 0.712);
                    text-align: left;
                    padding-left: 20px;
                    line-height: 30px;;
                    border-bottom: 1px solid #E0E0E0;
                }
            }
            .about {
                margin-bottom: 65px;
            }
            .footer {
                // position: fixed;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 330px;
                // right: 30px;
                height: 50px;
                background: white;
                font-size: 14px;
                line-height: 50px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-right: 1px solid #E0E0E0;
                border-top: 1px solid #E0E0E0;
                span{
                    &:nth-of-type(2) i{
                        font-size: 18px;
                        position: relative;
                        top: 2px;
                    }
                    &:nth-of-type(3) i{
                        font-size: 24px;
                        position: relative;
                        top: 2px;
                    }
                }

            }
        }
    }
}

</style>