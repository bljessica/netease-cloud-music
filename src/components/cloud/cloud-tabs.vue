<template>
    <div class="container">
        <div class="nav-tab">
            <span class="ground" :class="{active: activeTab === 1}" @click="activeTab = 1">广场</span>
            <span class="follow" :class="{active: activeTab === 2}" @click="activeTab = 2">关注</span>
        </div>
        <div class="ground-wrapper" v-if="activeTab === 1">
            <!-- 云村热评墙 -->
            <div class="hot-comment-wall" @click="$router.push('/hotCommentsWall')">
                <div class="nav">
                    <div class="navToWall">
                        云村热评墙
                        <i class="iconfont icon-you"></i>
                    </div>
                    <div class="word">今日戳心评论，你看过几条？</div>
                </div>
                <div class="date">
                    <div class="month">{{ getMonth }}</div>
                    <div class="day">{{ getDay }}</div>
                </div>
            </div>
            <!-- 广场视频 -->
            <ground></ground>
        </div>
        <div class="follow-wrapper" v-if="activeTab === 2">
            <follow-bar></follow-bar>
        </div>
    </div>
</template>

<script>
import ground from './ground';
import followBar from './follow-bar';

export default {
    components: {
        ground,
        followBar
    },
    data() {
        return {
            activeTab: 1
        }
    },
    computed: {
        getMonth() {
            return new Date().toDateString().split(' ')[1] + '.';
        },
        getDay() {
            let date = new Date().getDate();
            if(date < 10) {
                date = '0' + date.toString();
            }
            return date;
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav-tab {
        background: white;
        height: 30px;
        padding: 0 50px;
        border-bottom: 1px solid #E0E0E0;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        span {
            display: inline-block;
            padding: 5px 15px;
            border-bottom: 2px solid transparent;
            &.active {
                color: red;
                font-weight: bold;
                border-bottom: 2px solid red;
            }
        }
    }
    .ground-wrapper {
        padding: 0 20px;
        margin-top: 10px;
        .hot-comment-wall {
            height: 80px;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.445), rgba(0, 0, 0, 0.932), rgba(0, 0, 0, 0.411));
            border-radius: 10px;
            color: white;
            display: flex;
            justify-content: space-around;
            align-content: center;
            text-align: left;
            .nav {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-content: center;
                .navToWall {
                    font-weight: bold;
                }
                i {
                    font-weight: normal;
                }
                .word {
                    font-size: 14px;
                    color: gainsboro;
                }
            }
            .date {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-content: center;
                padding: 10px 0;
                .month {
                    font-weight: bold;
                    font-size: 20px;;
                }
                .day {
                    font-weight: bold;
                    font-size: 28px;
                }
            }
        }

    }
</style>