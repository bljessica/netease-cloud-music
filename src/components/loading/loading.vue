<template>
    <div class="loading-container">
        <div>
            <img src="../../assets/loading.gif" alt="">
            loading...
        </div>
    </div>
</template>

<script>
export default {
    
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
            top: 220px;
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