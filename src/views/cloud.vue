<template>
    <div class="container" @click="menuShow = false">
        <!-- 头部导航栏 -->
        <my-header :selected="'cloud'" class="header" @menuShow="menuShow = true"></my-header>
        <!-- tabs -->
        <cloud-tabs></cloud-tabs>
        <!-- <my-menu :class="{'menuShowing': menuShow == true}" class="my-menu"></my-menu> -->
    </div>
</template>

<script>
import myHeader from '../components/common/my-header';
import myMenu from '../components/common/my-menu';
import cloudTabs from '../components/cloud/cloud-tabs';

export default {
    components: {
        myHeader,
        cloudTabs,
        myMenu
    },
    data() {
        return {
            menuShow: false
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/my-menu';
</style>

<style scoped>
</style>