<template>
    <div class="player-container">
        <!-- 下方小的播放器 -->
        <div class="play-bar-container" @click="$router.push({name: 'playing'})">
            <img v-if="playingSong.al" :src="playingSong.al.picUrl" alt="">
            <div class="song">
                <div>{{ playingSong.name }}</div>
                <div class="lyric">{{ lyricNow.length > 0? lyricNow: '左右滑动可以切换歌曲哦~' }}</div>
            </div>
            <div class="action">
                <span class="play-btn">
                    <i class="iconfont" @click.stop="changePlay" :class="{'icon-zanting_huaban': isPlaying === true, 'icon-bofang2': isPlaying === false}"></i>
                </span>
                <i class="iconfont icon-bofangliebiao"></i>
            </div>
        </div>
        <!-- 音乐播放器 -->
        <audio ref="myPlayer" :key="audioKey" v-if="playingSong" :src="playingSong.musicUrl" autoplay="" loop>
            您的浏览器不支持 audio 标签
        </audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { secondsToStr } from '../../common/js/processData';


export default {
    data() {
        return {
            audioKey: 0
        }
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'currentTime',
            // 'playingList',
            // 'player',
            'isPlaying',
            'lyricNow',
            'lyrics',
            'playingTimer'
        ])
    },
    methods: {
        //播放/暂停
        changePlay() {
            if(this.isPlaying) {
                this.stopMusic()
            }
            else {
                this.startMusic();
            }
        },
        //开始/继续播放音乐
        startMusic() {
            this.audioKey++;
            let player = this.$refs.myPlayer;
            player.currentTime = this.currentTime;
            let that = this;
            let flag = false;//是否设置了总时长和开始时间
            this.setIsPlaying(true);
            clearInterval(this.playingTimer);
            //开启定时器
            this.setPlayingTimer(setInterval(() => {
                let player = that.$refs.myPlayer;
                if(player) {
                    if(!flag) {
                        player.currentTime = that.currentTime;
                        console.log('set:' + player.currentTime)
                        flag = true;
                        that.setPlayer(player);
                    }
                    that.setDuraion(player.duration); //XX:XX
                    let current = player.currentTime; //XX:XX
                    that.setCurrentTime(current); //XX:XX
                    //更新歌词
                    let lyricNow = that.findLyricNow(secondsToStr(Math.floor(current)));
                    if(lyricNow) {
                        that.setLyricNow(lyricNow);
                    }
                }
            }, 500));
        },
        //暂停音乐
        stopMusic() {
            let player = this.$refs.myPlayer;
            player.pause();
            clearInterval(this.playingTimer);
            console.log('stop', this.currentTime)
            this.setIsPlaying(false);
        },
        //找到现在的时间对应的歌词
        findLyricNow(timeStr) {
            for(let i = 0; i < this.lyrics.length; i++) {
                if(this.lyrics[i].time === timeStr) {
                    return this.lyrics[i].content;
                }
            }
            return null;
        },
        ...mapMutations({
            // setPlayingSong: 'SET_PLAYING_SONG',
            // setPlayingList: 'SET_PLAYING_LIST',
            setLyricNow: 'SET_LYRIC_NOW',
            setIsPlaying: 'SET_IS_PLAYING',
            // setLyrics: 'SET_LYRICS',
            setCurrentTime: 'SET_CURRENT_TIME',
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER',
            setDuraion: 'SET_DURATION'
        }),
    }
}
</script>

<style lang="scss" scoped>
    .play-bar-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 10px;
        z-index: 2000;
        height: 60px;
        background: white;
        border-top: 1px solid gainsboro;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            width: 46px;
            height: 46px;
            border-radius: 50%;
        }
        .song {
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 40px;
            div {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-left: 10px;
                &.lyric {
                    font-size: 14px;
                    color: rgb(155, 155, 155);
                }
            }
        }
        .action {
            i {
                font-size: 30px;
                &:last-of-type {
                    margin-left: 10px;
                }
            }
        }
    }
</style>