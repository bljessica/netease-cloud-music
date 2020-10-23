<template>
    <div class="container">
        <div class="header">
            <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
            <span>排行榜</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .container {
        .header {
            height: 70px;
            display: flex;
            padding: 0 15px;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            i {
                font-size: 24px;
                font-weight: normal;
                padding-right: 20px;
            }
        }
    }
</style>