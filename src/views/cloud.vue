<template>
    <div class="container" @click="menuShow = false">
        <!-- 头部导航栏 -->
        <my-header :selected="'cloud'" class="header" @menuShow="menuShowAction"></my-header>
        <!-- tabs -->
        <cloud-tabs></cloud-tabs>
        <my-menu v-if="menuShow"></my-menu>
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
    },
    methods: {
        menuShowAction() {
            this.menuShow = true;
        }
    }
}
</script>

<style>

</style>