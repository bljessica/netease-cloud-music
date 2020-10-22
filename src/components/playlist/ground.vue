<template>
    <div class="container">
        <div class="header-wrapper">
            <div class="header">
                <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
                歌单广场
            </div>
            <div class="types-container">
                <div class="slider-wrapper">
                    <ul class="types">
                        <li></li>
                    </ul>
                </div>
                <i class="iconfont icon-caidan"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { getCatlist } from '../../api/playlist';
export default {
    mounted() {
        this.getCatlist();
    },
    methods: {
        getCatlist() {
            this.$emit('beforeLoad');
            let that = this;
            getCatlist().then(res => {
                that.$emit('onLoad');
                console.log(res.data);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        padding: 0 15px;
        .header-wrapper {
            .header {
                height: 70px;
                line-height: 70px;
                text-align: left;
                font-size: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                i {
                    font-size: 24px;
                    padding-right: 10px;
                }
            }
            
        }
    }
</style>