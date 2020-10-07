<template>
    <div class="container">
        <!-- 头部导航栏 -->
        <my-header :selected="'cloud'" class="header"></my-header>
        <cloud-tabs></cloud-tabs>
    </div>
</template>

<script>
import myHeader from '../components/common/my-header';
import cloudTabs from '../components/cloud/cloud-tabs';

export default {
    components: {
        myHeader,
        cloudTabs
    }
}
</script>

<style>

</style>