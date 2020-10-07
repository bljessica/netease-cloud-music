<template>
    <div class="container">
        <!-- 开通VIP -->
        <div class="vip"> 
            <div class="title">
                <span>开通黑胶VIP</span>
                <span>会员中心</span>
            </div>
            <p>加入黑胶VIP，立享超17项专属特权</p>
            <div>
                <span>黑胶VIP首月仅5元，赢万元苹果礼包</span>
                <i class="iconfont icon-jia1"></i>
            </div>
        </div>
        <!-- 消息中心 -->
        <div class="msgs">
            <div class="yunbei li"> 
                <div class="wrapper">
                    <i class="iconfont icon-yunpan"></i>
                </div>
                <div>
                    <span>云贝中心</span>
                    <div class="sign">签到<i class="iconfont icon-you"></i></div>
                </div>
            </div>
            <div class="msg li">
                <div class="wrapper">
                    <i class="iconfont icon-yunpan"></i>
                </div>
                <div>
                    <span>消息中心<span class="num">9</span></span>
                    <div class="sign">有人私信了你</div>
                </div>
            </div>
        </div>
        <!-- 创作者中心 -->
        <div class="creater">

        </div>
        <!-- 音乐服务 -->
        <div class="service">

        </div>
        <!-- 其他 -->
        <div class="others">

        </div>
        <!-- 关于 -->
        <div class="about">

        </div>
        <!-- 底部导航栏 -->
        <footer class="foot">

        </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 30px;
        z-index: 5001;
        padding: 0 15px;
        background: #faf6f6;
        border-right: 1px solid #E0E0E0;
        .vip {
            position: relative;
            margin-top: 15px;
            height: 80px;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.445), rgba(0, 0, 0, 0.24));
            border-radius: 15px;
            color: white;
            padding: 15px 20px;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                span:first-of-type {
                    font-weight: bold;
                    font-size: 18px;
                }
                span:last-of-type {
                    padding: 3px 10px;
                    border-radius: 15px;
                    border: 1px solid #E0E0E0;
                    font-size: 14px;
                }
            }
            p {
                margin-top: 5px;
                color: rgba(255, 255, 255, 0.5);
                font-size: 12px;
                text-align: left;
            }
            div:last-of-type {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 20px;
                right: 20px;
                height: 40px;
                border-top: 1px solid #E0E0E0;
                span {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 14px;
                }
            }
        }
        .msgs {
            display: flex;
            padding: 10px;
            justify-content: space-around;
            align-items: center;
            background: white;
            margin-top: 15px;
            border-radius: 15px;
            height: 70px;
            .li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                .wrapper {
                    width: 35px;
                    height: 35px;
                    background: rgba(220, 220, 220, 0.637);
                    border-radius: 50%;
                }
            }
            .yunbei {
                border-right: 1px solid #E0E0E0;
            }
            .msg {

            }
        }
        .creater {

        }
        .service {

        }
        .others {

        }
        .about {

        }
        .footer {

        }
    }
</style>