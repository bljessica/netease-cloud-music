<template>
    <div class="actions-container">
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
        <!-- 音乐播放器 -->
        <audio ref="player" :src="playingSong.musicUrl" autoplay="" loop>
            您的浏览器不支持 audio 标签
        </audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';

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
    mounted() {
        this.setPlayer(this.$refs.player);
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingTimer',
            'playingType',
            'player'
        ])
    },
    methods: {
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingType: 'SET_PLAYING_TYPE',
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER'
        }),
        jumpToprogress() { 
            let e = event || window.event;
            let width = this.$refs.line.offsetWidth;
            this.dotLeft = e.offsetX;
            this.player.currentTime = this.player.duration * this.dotLeft / width;
            this.current = Math.floor(this.player.currentTime);
            this.$emit('findPrev');
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
            let width = this.$refs.line.offsetWidth;
            let that = this;
            clearInterval(this.playingTimer);
            this.setPlayingTimer(setInterval(() => {
                that.current = Math.floor(that.player.currentTime);
                that.duration = Math.floor(that.player.duration);
                that.dotLeft = width * (that.player.currentTime / that.player.duration);
                if(that.playing) {
                    that.angle += 0.2;
                }
                if(that.angle > 360) {
                    that.angle %= 360;
                }
                that.$emit('angleChange', that.angle);
            }, 15));
        },
        changePlay() {
            this.playing = !this.playing;
            this.$emit('changePlaying');
            if(this.playing) {
                this.player.play();
            }
            else {
                this.player.pause();
            }
            // this.playMusic();
        },
    }
}
</script>

<style lang="scss" scoped>
    .actions-down {
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
</style>