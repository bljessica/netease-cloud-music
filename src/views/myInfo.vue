<template>
    <div class="container">
        <!-- 个人信息 -->
        <div class="info-container">
            <div class="nav">
                <i class="iconfont icon-zuo"></i>
                <i class="iconfont icon-fenxiang"></i>
            </div>
            <img src="" alt="" class="avatar">
            <div class="info">
                <div class="nickname"></div>
                <div class="follow-info">
                    <span class="follows"></span>
                    <span class="followed"></span>
                </div>
                <div class="other-info">
                    <span class="gender">
                        <i class="iconfont"></i>
                    </span>
                    <span class="level">
                        <i class="iconfont">Lv.</i>
                    </span>
                    <span class="edit">编辑</span>
                    <span class="change-background">更换背景</span>
                </div>
            </div>
        </div>
        <!-- 主页、动态 -->
    </div>
</template>

<script>
import {} from '../api/mine';

export default {
    data() {
        return {
            
        }
    },
    mounted() {

    },  
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .info-container {
        .nav {

        }
        .avatar {

        }
        .info {
            .nickname {

            }
            .follow-info {

            }
            .other-info {

            }
        }
    }
</style>