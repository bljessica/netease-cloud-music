<template>
    <div class="container">
        <!-- 头部操作导航栏 -->
        <play-header></play-header>
        <!-- 播放棒 -->
        <div class="stick" :class="{playing: playing == true}"></div>
        <!-- 音乐封面 -->
        <div class="wrapper">
            <img v-if="playingSong.al" :src="playingSong.al.picUrl" alt="" :style="{transform: 'rotate(' + angle + 'deg)'}">
        </div>
        <audio ref="player" :src="musicUrl" autoplay="" id="player" loop>
            您的浏览器不支持 audio 标签
        </audio>
        <!-- 操作栏 -->
        <div class="actions">
            <div class="actions-up">
                <i class="iconfont" :class="{'icon-icon-test': true, 'icon-aixin': false}"></i>
                <i class="iconfont icon-xiazai"></i>
                <i class="iconfont icon-luyin"></i>
                <i class="iconfont icon-jianyi"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <!-- 播放进度 -->
            <div class="playing-progress">
                <span class="now">{{ getCurrentTime(current) }}</span>
                <span class="line" ref="line" @click="jumpToprogress()">
                    <span class="dot" ref="dot" id="dot" :style="{left: dotLeft + 'px'}"></span>
                    <span class="line-left"  :style="{width: dotLeft + 'px'}"></span>
                </span>
                <span class="total">{{ getCurrentTime(duration) }}</span>
            </div>
            <div class="actions-down">
                <i class="iconfont" @click="setPlayingType" :class="{'icon-xunhuan': playingType == 0, 'icon-icon--': playingType == 1, 'icon-danquxunhuan': playingType == 2}"></i>
                <i class="iconfont icon-047caozuo_shangyishou"></i>
                <i class="iconfont" @click="changePlay" :class="{'icon-zanting_huaban': playing == true, 'icon-bofang2': playing == false}"></i>
                <i class="iconfont icon-048caozuo_xiayishou"></i>
                <i class="iconfont icon-bofangliebiao"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { getPlaySongDetail, getPlaySongUrl } from '../api/play';
import { mapGetters, mapMutations} from 'vuex';
import playHeader from '../components/play/play-header';

export default {
    data() {
        return {
            playing: true,
            musicUrl: '',
            current: 0,
            duration: 0,
            dotLeft: 0,
            angle: 0
        }
    },
    components: {
        playHeader
    },
    mounted() {
        this.setPlayingList(this.$route.params.playlist);
        this.getPlaySongDetail();
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList',
            'playingTimer',
            'playingType'
        ])
    },
    methods: {
        // 拖拽小圆点
        // moveDot() {
        //     let e = event || window.event;
        //     console.log(e.offsetX);
        //     let dot = document.getElementById('dot');
        //     dot.onmousedown = (e) => {
        //         let x = e.offsetX;
        //         this.dotLeft = x;
        //         player.currentTime = player.duration * this.dotLeft / width;
        //         this.current = Math.floor(player.currentTime);
        //         dot.onmouseup = (e) => {
        //             // let x = e.offsetX;
        //             // this.dotLeft = x;
        //             // player.currentTime = player.duration * this.dotLeft / width;
        //             // this.current = Math.floor(player.currentTime);
        //         }
        //     }
        // },
        jumpToprogress() {
            let e = event || window.event;
            let width = this.$refs.line.offsetWidth;
            let player = this.$refs.player;
            // console.log(e.offsetX)
            this.dotLeft = e.offsetX;
            player.currentTime = player.duration * this.dotLeft / width;
            this.current = Math.floor(player.currentTime);
        },
        getCurrentTime(current) {
            //超过一分钟
            if(current > 60) {
                //超过十分钟
                if(current / 60 >= 10) {
                    if((current % 60) < 10) {
                        return Math.floor(current / 60) + ':0' + (current % 60);
                    }
                    return Math.floor(current / 60) + ':' + (current % 60);
                }
                else {
                    if((current % 60) < 10) {
                        return '0' + Math.floor(current / 60) + ':0' + (current % 60);
                    }
                    return '0' + Math.floor(current / 60) + ':' + (current % 60);
                }
            }
            else {
                if(current < 10) {
                    return '00:0' + current;
                }
                return '00:' + current;
            }
        },
        changeProgress() {
            let player = this.$refs.player;
            let width = this.$refs.line.offsetWidth;
            let that = this;
            clearInterval(this.playingTimer);
            this.setPlayingTimer(setInterval(() => {
                that.current = Math.floor(player.currentTime);
                that.duration = Math.floor(player.duration);
                that.dotLeft = width * (player.currentTime / player.duration);
                if(that.playing) {
                    that.angle += 0.2;
                }
                if(that.angle > 360) {
                    that.angle %= 360;
                }
            }, 15));
        },
        changePlay() {
            this.playing = !this.playing;
            if(this.playing) {
                this.$refs.player.play();
            }
            else {
                this.$refs.player.pause();
            }
            // this.playMusic();
        },
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingList: 'SET_PLAYING_LIST',
            setPlayingType: 'SET_PLAYING_TYPE',
            setPlayingTimer: 'SET_PLAYING_TIMER'
        }),
        getPlaySongDetail() {
            let that = this;
            getPlaySongDetail({
                ids: that.$route.params.id
            }).then(res => {
                console.log(res.data.songs[0]);
                that.setPlayingSong(res.data.songs[0]);
                getPlaySongUrl({
                    id: that.playingSong.id
                }).then(res => {
                    console.log(res.data);
                    if(!res.data.data[0].url) {
                        that.Message({
                            message: '暂无资源',
                            type: 'warning',
                            duration: 2000
                        });
                        setTimeout(this.goBack(), 1000);
                        return;
                    }
                    that.musicUrl = res.data.data[0].url;
                    //开启进度条
                    that.changeProgress();
                })
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
        background: linear-gradient(to bottom, rgba(94, 109, 136, 0.822),  rgba(94, 109, 136, 0.993));
        color: gainsboro;
        padding: 0 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        // .nav {
        //     height: 70px;
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     color: white;
        //     .name {
        //         display: flex;
        //         flex-direction: column;
        //         justify-content: space-between;
        //         align-items: flex-start;
        //         padding-left: 20px;
        //         text-align: left;
        //         span {
        //             width: 250px;
        //             overflow: hidden;
        //             text-overflow: ellipsis;
        //             white-space: nowrap;
        //             font-size: 20px;
        //             font-weight: bold;
        //         }
        //         div {
        //             font-size: 14px;
        //             color: rgb(180, 178, 178);
        //             width: 250px;
        //             overflow: hidden;
        //             text-overflow: ellipsis;
        //             white-space: nowrap;
        //             text-align: left;
        //             i {
        //                 font-size: 12px;
        //             }
        //         }
        //     }
        //     i {
        //         font-size: 24px;
        //         &.icon-shouyinji-xian {
        //             font-size: 30px;
        //             padding-right: 15px;
        //         }
        //     }
        //     .blank {
        //         flex-grow: 1;
        //     }
        // }
        .stick {
            background: url('../assets/stick.png');
            // background-size: 100% 100%;
            height: 100px;
            width: 135px;
            position: absolute;
            left: calc(50% - 10px);
            z-index: 1000;
            transform-origin: 11px 11px;
            transform: rotate(0);
            transition: .5s;
            &.playing {
                transform: rotate(25deg);
                transition: .5s;
            }
        }
        .wrapper {
            background: url('../assets/record.png');
            background-size: 100% 100%;
            height: 250px;
            width: 250px;
            position: relative;
            margin: 70px auto 0;
            border: 5px solid rgb(135, 142, 156);
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 170px;
                height: 170px;
                border-radius: 50%;
                position: absolute;
                top: 40px;
                left: 40px;
                transition: 0;
                display: block;
            }
        }
        .actions {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .actions-up, .actions-down {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 70px;
                padding: 0 15px;
                i {
                    font-size: 26px;
                }
            }
            .playing-progress {
                font-size: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                -webkit-transform: scale(0.9);
                .line {
                    flex-grow: 1;
                    background: gainsboro;
                    margin: 0 10px;
                    height: 1px;
                    // padding: 5px 0;
                    position: relative;
                    .dot {
                        position: absolute;
                        top: -3px;
                        left: 0;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: white;
                    }
                    .line-left {
                        position: absolute;
                        left: 0;
                        height: 1px;
                        background: white;
                    }
                }
            }
            .actions-down {
                margin-bottom: 10px;
                i {
                    &.icon-ziyuan1, &.icon-bofang2 {
                        font-size: 44px;
                    }
                    &.icon-zanting_huaban {
                        font-size: 44px;
                    }
                }
                i:nth-of-type(3) {
                    // font-size: 44px;
                }
            }
        }
    }
</style>