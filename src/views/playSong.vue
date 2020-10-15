<template>
    <div class="container">
        <!-- 头部操作导航栏 -->
        <div class="nav">
            <i class="iconfont icon-zuo" @click="goBack"></i>
            <div class="name">
                <span>{{ playingSong.name }}</span>
                <div>{{ getArtists }}<i class="iconfont icon-you"></i></div>
            </div>
            <span class="blank"></span>
            <!-- <i class="iconfont icon-shouyinji-xian"></i> -->
            <i class="iconfont icon-fenxiang"></i>
        </div>
        <!-- 播放棒 -->
        <div class="stick" :class="{playing: playing == true}"></div>
        <!-- 音乐封面 -->
        <div class="wrapper">
            <img v-if="playingSong.al" :src="playingSong.al.picUrl" alt="">
        </div>
        <audio ref="player" :src="musicUrl" autoplay="" id="player">
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
                <span class="line" ref="line">
                    <span class="dot" ref="dot" :style="{left: dotLeft + 'px'}"></span>
                </span>
                <span class="total">{{ getCurrentTime(duration) }}</span>
            </div>
            <div class="actions-down">
                <i class="iconfont icon-danquxunhuan"></i>
                <i class="iconfont icon-047caozuo_shangyishou"></i>
                <i class="iconfont icon-ziyuan1" @click="changePlay"></i>
                <i class="iconfont icon-048caozuo_xiayishou"></i>
                <i class="iconfont icon-bofangliebiao"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { getPlaySongDetail, getPlaySongUrl } from '../api/play';
import { mapGetters, mapMutations} from 'vuex';

export default {
    data() {
        return {
            playing: true,
            musicUrl: '',
            timer: null,
            current: 0,
            duration: 0,
            dotLeft: 0
        }
    },
    mounted() {
        this.setPlayingList(this.$route.params.playlist);
        this.getPlaySongDetail();
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList'
        ]),
        getArtists() {
            let res = '';
            if(this.playingSong) {
                this.playingSong.ar.forEach(item => {
                    res += item.name + '/';
                })
                return res.substring(0, res.length - 1);
            }
            
        },
        // getDuration() {
        //     if(this.duration > 60) {

        //     }
        // },
        // getCurrentTime() {
        //     //超过一分钟
        //     if(this.current > 60) {
        //         //超过十分钟
        //         if(this.current / 60 >= 10) {
        //             if((this.current % 60) < 10) {
        //                 return this.current / 60 + ':0' + this.current;
        //             }
        //             return this.current / 60 + ':' + this.current;
        //         }
        //         else {
        //             if((this.current % 60) < 10) {
        //                 return '0' + this.current / 60 + ':0' + this.current;
        //             }
        //             return '0' + this.current / 60 + ':' + this.current;
        //         }
        //     }
        //     else {
        //         if(this.current < 10) {
        //             return '00:0' + this.current;
        //         }
        //         return '00:' + this.current;
        //     }
        // }
    },
    methods: {
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
        goBack() {
            clearInterval(this.timer);
            this.timer = null;
            this.$router.push({name: 'playlist', params: {id: this.playingList.id}})
        },
        changeProgress() {
            let player = this.$refs.player;
            let width = this.$refs.line.offsetWidth;
            let that = this;
            this.timer = setInterval(() => {
                that.current = Math.floor(player.currentTime);
                that.duration = Math.floor(player.duration);
                console.log(that.current, that.duration)
                that.dotLeft = width * (player.currentTime / player.duration);
                console.log(that.dotLeft)
            }, 1000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
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
            setPlayingList: 'SET_PLAYING_LIST'
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
        .nav {
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            .name {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                padding-left: 20px;
                span {
                    font-size: 20px;
                    font-weight: bold;
                }
                div {
                    font-size: 14px;
                    color: rgb(180, 178, 178);
                    width: 200px;
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
            .blank {
                flex-grow: 1;
            }
        }
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
                    position: relative;
                    .dot {
                        position: absolute;
                        top: -4px;
                        left: 0;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: white;
                    }
                }
            }
            .actions-down {
                margin-bottom: 10px;
                i:nth-of-type(3) {
                    font-size: 44px;
                }
            }
        }
    }
</style>