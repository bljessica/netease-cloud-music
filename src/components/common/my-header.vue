<template>
    <div class="container">
        <!-- 菜单 -->
        <span class="menu li">
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
            <router-link :to="'/'">云村</router-link>
            <i class="new li"></i>
        </span>
        <!-- 视频 -->
        <span class="video li" :class="{active: selected == 'video'}" >
            <router-link :to="'/'">视频</router-link>
        </span>
        <!-- 搜索 -->
        <i class="iconfont icon-sousuo search li"></i>
    </div>
</template>

<script>
export default {
    props: {
        selected: {
            type: String,
            default: 'find'
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
</style>