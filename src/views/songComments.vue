<template>
    <div class="container">
        <!-- 头部操作导航栏 -->
        <div class="nav">
            <i class="iconfont icon-zuo" @click="$router.push({name: 'playSong', params: {id: playingSong.id, playingList: playingList}})"></i>
            <span class="name">评论（{{ total }}）</span>
            <span class="blank"></span>
            <i class="iconfont icon-fenxiang"></i>
        </div>
        <!-- 云圈 -->
        <!-- 评论区 -->
        <div class="comments-wrapper">
            <div class="title">
                <span>评论区</span>
                <span class="blank"></span>
                <span class="type" :class="{'active': selectedType == 0}">推荐</span>
                <span class="type" :class="{'active': selectedType == 1}">最热</span>
                <span class="type" :class="{'active': selectedType == 2}">最新</span>
            </div>
            <ul class="comments">
                <li v-for="(item, index) in commentsSelected" :key="index">
                    <div class="user-wrapper">
                        <img :src="item.user.avatarUrl" alt="">
                        <div v-if="hugsShow[index]">收到了抱抱</div>
                    </div>
                    <div class="info">
                        <v-touch @swipeleft="swipeleft(index)" @swiperight="swiperight(index)">
                            <div class="user-info">
                                <span>
                                    {{ item.user.nickname }}
                                    <span class="time"><br>{{ getTime(item.time) }}</span>
                                </span>
                                <span class="num">{{ getPlayNum(item.likedCount) }} <i class="iconfont icon-zan1"></i></span>
                            </div>
                            <p class="content">{{ item.content }}</p>
                            <div class="replyNum">{{ }}条回复</div>
                        </v-touch>
                    </div>
                    <img :key="key" class="hug" :class="{'active': hugsShow[index]}" src="../assets/hug.gif" alt="">
                </li>
            </ul>
        </div>
        <play-bar v-if="$store.getters.playingSong.id" style="visibility: hidden"></play-bar>
    </div>
</template>

<script>
import playBar from '../components/common/play-bar';
import { mapGetters, mapMutations} from 'vuex';
import { getSongComments } from '../api/play';

export default {
    components: {
        playBar
    },
    data() {
        return {
            comments: [],
            hotComments: [],
            total: 0,
            selectedType: 0,
            hugsShow: [],
            key: 0
        }
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList'
        ]),
        commentsSelected() {
            if(this.selectedType == 0 || this.selectedType == 1) {
                for(let i = 0; i < this.hotComments.length; i++) {
                    this.hugsShow[i] = false;
                }
                return this.hotComments;
            }
            else {
                for(let i = 0; i < this.comments.length; i++) {
                    this.hugsShow[i] = false;
                }
                return this.comments;
            }
        }
    },
    mounted() {
        this.getSongComments();
    },
    methods: {
        swipeleft(index) {
            this.hugsShow[index] = true;
            this.key++;
        },
        swiperight(index) {
            this.hugsShow[index] = false;
            this.key++;
        },
        getTime(time) {
            let date = new Date(time);
            return date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
        },
        getPlayNum(playCount) {
            if(playCount >= 100000000) {
                return (playCount / 100000000).toFixed(1) + '亿';
            }
            else if(playCount >= 10000) {
                return Math.round(playCount / 10000) + '万';
            }
            else {
                return playCount;
            }
        },
        getSongComments() {
            let that = this;
            getSongComments({
                id: that.$route.params.id
            }).then(res => {
                console.log(res.data);
                that.comments = res.data.comments;
                that.hotComments = res.data.hotComments;
                that.total = res.data.total;
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
    .container {
        padding: 0 20px;
        background: white;
        border-bottom: 1px solid gainsboro;
        .blank {
            flex-grow: 1;
        }
        .nav {
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
                padding-left: 20px;
                text-align: left;
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 20px;
                font-weight: bold;
                div {
                    font-size: 14px;
                    color: rgb(180, 178, 178);
                    width: 250px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                    i {
                        font-size: 12px;
                    }
                }
            }
            i {
                font-size: 24px;
                &.icon-shouyinji-xian {
                    font-size: 30px;
                    padding-right: 15px;
                }
            }
        }
        .comments-wrapper {
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                font-size: 14px;
                font-weight: bold;
                .type {
                    font-weight: normal;
                    color: rgb(165, 165, 165);
                    padding: 0 10px;
                    border-right: 1px solid gainsboro;
                    &.active {
                        font-weight: bold;
                        color: black;
                    }
                    &:last-of-type {
                        border: none;
                    }
                }
            }
            .comments {
                li {
                    display: flex;
                    // height: 200px;
                    padding-top: 10px;
                    position: relative;
                    .user-wrapper {
                        font-size: 10px;
                        img {
                            width: 46px;
                            height: 46px;
                            border-radius: 50%;
                        }
                    }
                    .info {
                        padding-left: 10px;
                        border-bottom: 1px solid gainsboro;
                        padding-bottom: 10px;
                        text-align: left;
                        .user-info {
                            height: 46px;
                            font-size: 12px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .time {
                                font-size: 10px;
                                transform: scale(0.8);
                                -webkit-transform: scale(0.8);
                                color: rgb(180, 180, 180);
                            }
                            .num {
                                color: rgb(180, 180, 180);
                            }
                        }
                        .content {
                            font-size: 14px;
                            line-height: 22px;
                        }
                        .replyNum {
                            color: rgba(41, 41, 190, 0.877);
                            font-size: 10px;
                            line-height: 24px;
                        }
                    }
                    .hug {
                        width: 70px;
                        height: 70px;
                        position: absolute;
                        bottom: 0;
                        right: 20px;
                        transition: opacity 2s;
                        opacity: 0;
                        &.active {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
</style>