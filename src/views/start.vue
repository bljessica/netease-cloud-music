<template>
    <div class="container">
        <div class="title">音楽的力量</div>
        <footer class="footer">
            <span class="logo">
                <!-- <i></i> -->
                <img src="../../static/icon.png" alt="logo">
            </span>
            <span>网易云音乐</span>
        </footer>
    </div>
</template>

<script>
export default {
    created() {
        setTimeout(() => {
            this.$router.push('/find');
        }, 1500);
    }
}
</script>

<style lang="scss" scoped>
    .container {
        color: white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: red;
        .title {
            width: 100%;
            text-align: center;
            margin-top: 150px;
            font-size: 40px;
        }
        .footer {
            width: 120px;
            position: absolute;
            bottom: 30px;
            left: calc(50% - 60px);
            span {
                display: inline-block;
            }
            .logo {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                overflow: hidden;
                background: white;
                position: relative;
                top: 4px;
                img {
                    width: 16px;
                    height: 16px;
                    position: relative;
                    top: 2px;
                }
            }
        }
    }
</style>