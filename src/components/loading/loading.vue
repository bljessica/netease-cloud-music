<template>
    <div class="loading-container">
        <div>
            <img src="../../assets/circle.png" alt="" :style="{transform: 'rotate(' + angle + 'deg)'}">
            loading...
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            angle: 0
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        init() {
            this.timer = setInterval(() => {
                this.angle += 6;
                if(this.angle >= 360) {
                    this.angle %= 360;
                }
            }, 20);
        }
    }
}
</script>

<style lang="scss" scoped>
    .loading-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 6000;
        background: rgba(250, 246, 246, 0.6);
        div {
            position: absolute;
            top: 200px;
            width: 100%;
            height: 20px;
            line-height: 20px;
            text-align: center;
            img {
                display: inline-block;
                width: 20px;
                height: 20px;
                transition: 0;
                position: relative;
                top: 5px;
            }
        }
    }
</style>