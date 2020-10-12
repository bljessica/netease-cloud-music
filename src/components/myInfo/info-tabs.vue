<template>
    <div class="tabs-container">
        <!-- 主页、动态 -->
        <!-- tab导航 -->
        <div class="tabs">
            <span class="index" :class="{active: activeTab === 1}" @click="activeTab = 1">主页</span>
            <span class="activity" :class="{active: activeTab === 2}" @click="activeTab = 2">动态</span>
        </div>
        <div class="wrapper">
            <!-- 听歌排行、喜欢的音乐 -->
            <div class="rank-and-like">
                <div class="rank li">
                    <div class="img-wrapper">
                        <i class="iconfont icon-biaoqiankuozhan_paihang-128"></i>
                    </div>
                    <div class="info">
                        <div>听歌排行</div>
                        <div>累计听歌{{ }}首</div>
                    </div>
                </div>
                <div class="like li">
                    <div class="img-wrapper">
                        <i class="iconfont icon-aixin"></i>
                    </div>
                    <div class="info">
                        <div>我喜欢的音乐</div>
                        <div>{{ }}首，播放{{ }}次</div>
                    </div>
                </div>
            </div>
            <!-- 创建的歌单 -->
            <!-- 收藏的歌单 -->
            <!-- 我的评论 -->
            <!-- 基本信息 -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 1
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabs-container {
        position: relative;
        top: -50px;
        background: white;
        border-radius: 20px;
        .tabs {
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid gainsboro;
            span {
                display: inline-block;
                height: 48px;
                line-height: 50px;
                border-bottom: 2px solid transparent;
                &.active {
                    color: red;
                    border-bottom: 2px solid red;
                    font-weight: bold;
                }
            }
        }
        .wrapper {
            padding: 0 15px;
            .rank-and-like {
                .li {
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    .img-wrapper {
                        width: 60px;
                        height: 60px;
                        border-radius: 5px;
                        i {
                            font-size: 36px;
                            line-height: 60px;
                        }
                    }
                    .info {
                        margin-left: 15px;
                        text-align: left;
                        flex-grow: 1;
                        div:nth-of-type(2) {
                            font-size: 12px;
                            color: rgb(194, 189, 189);
                            margin-top: 4px;
                        }
                    }
                }
                .rank {
                    .img-wrapper {
                        background: rgba(255, 0, 0, 0.589);
                        i {
                            color: white;
                        }
                    }
                }
                .like {
                    .img-wrapper {
                        background: rgba(220, 220, 220, 0.527);
                        i {
                            color: rgba(255, 0, 0, 0.589);
                        }
                    }
                }
            }
        }
    }
</style>