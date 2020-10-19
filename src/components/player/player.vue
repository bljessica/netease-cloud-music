<template>
    <div class="player-container">
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
            // 'lyricNow'
            'lyrics',
            'playingTimer'
        ])
    },
    methods: {
        //开始/继续播放音乐
        startMusic() {
            this.audioKey++;
            // let prevTime = this.currentTime? this.currentTime: 0; //小数
            let player = this.$refs.myPlayer;
            player.currentTime = this.currentTime;
            // player.play();
            // console.log('start:'+player.currentTime)
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
                        // player.currentTime = prevTime;
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
            // player.currentTime = this.currentTime;
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

<style>

</style>