<template>
    <div class="container">
        <my-header></my-header>
        <banner :bannersData="bannerImgs" class="banner"></banner>
    </div>
</template>

<script>
import myHeader from '../components/my-header';
import banner from '../components/banner';
import { Message } from 'element-ui';
import { getBanner } from '../api/find';

export default {
    components: {
        myHeader,
        banner
    },
    data() {
        return {
            bannerImgs: []
        }
    },
    mounted() {
        this.getBanner();
    },
    methods: {
        //获取轮播图数据
        getBanner() {
            let that = this;
            getBanner().then(res => {
                console.log(res.data);
                that.bannerImgs = res.data.banners;
            }).catch(err => {
                Message({
                    message: err,
                    type: 'warning',
                    showClose: true
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        position: relative;
        .banner {
            // position: relative;
            // top: 90px;
        }
    }
    
</style>