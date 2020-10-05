<template>
    <div class="container">
        <main class="main">
            <div class="title">音楽的力量</div>
            <router-link class="login" :to="'/login'">登录</router-link>
            <router-link class="register" :to="'/login'">注册</router-link>
        </main>
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
    mounted() {
        // setTimeout(() => {
        //     this.$router.push('/find');
        // }, 1500);
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
        .main {
            .title {
                width: 100%;
                text-align: center;
                margin-top: 150px;
                font-size: 40px;
            }
            a {
                text-decoration: none;
                color: red;
                font-size: 16px;
                background: rgba(255, 255, 255, 0.9);
                display: inline-block;
                padding: 10px 100px;
                border-radius: 10px;
                &.login {
                    margin-top: 150px;
                }
                &.register {
                    margin-top: 20px;
                }
            }
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