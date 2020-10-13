<template>
    <div class="player-container">
        <img src="" alt="">
        <div class="song">
            <div>{{ }}</div>
            <div>{{ }}</div>
        </div>
        <div class="action">
            <span class="play-btn">
                <i class="iconfont icon-bofangsanjiaoxing"></i>
            </span>
            <i class="iconfont icon-bofangliebiao"></i>
        </div>
    </div>
</template>

<script>
import { getPlayRecord } from '../../api/play';

export default {
    mounted() {
        this.getPlayRecord();
    },
    methods: {
        getPlayRecord() {
            let that = this;
            getPlayRecord({
                uid: this.$store.getters.userID,
                type: 1 //周记录
            }).then(res => {
                console.log(res.data);
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .player-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2000;
        height: 50px;
        background: white;
        border-top: 1px solid gainsboro;
        img {

        }
        .song {

        }
        .action {

        }
    }
</style>