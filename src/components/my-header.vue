<template>
    <div class="container">
        <span class="menu li">
            <i class="iconfont icon-caidan"></i>
            <span class="msgNum">9</span>
        </span>
        <span class="mine li" :class="{active: selected == 'mine'}">我的</span>
        <span class="find li" :class="{active: selected == 'find'}">发现</span>
        <span class="cloud li" :class="{active: selected == 'cloud'}">
            云村
            <i class="new li"></i>
        </span>
        <span class="video li" :class="{active: selected == 'video'}">视频</span>
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