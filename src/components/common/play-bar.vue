<template>
    <div class="player-container" @click="$router.push({name: 'playSong', params: {id: playingSong.id, playingList: playingList}})">
        <img :src="playingSong.al.picUrl" alt="">
        <div class="song">
            <div>{{ playingSong.name }}</div>
            <div class="lyric">{{ lyricNow.length > 0? lyricNow: '左右滑动可以切换歌曲哦~' }}</div>
        </div>
        <div class="action">
            <span class="play-btn">
                <i class="iconfont" @click.stop="changePlay" :class="{'icon-zanting_huaban': playing == true, 'icon-bofang2': playing == false}"></i>
            </span>
            <i class="iconfont icon-bofangliebiao" @click.stop="playingListShow"></i>
        </div>
        <!-- 音乐播放器 -->
        <audio ref="player" :src="playingSong.musicUrl" autoplay="" loop>
            您的浏览器不支持 audio 标签
        </audio>
    </div>
</template>

<script>
import { getLyrics, getPlaySongUrl } from '../../api/play';
import { mapGetters, mapMutations} from 'vuex';
import { getCurrentTime } from '../../common/js/processData';


export default {
    data() {
        return {
            playing: true,
            lyric: '',
            prevTime: '00:00',
            tracks: []
            // timer: null
        }
    },
    mounted() {
        console.log(this.playingList)
        // this.tracks = this.this.playingList.tracks;
        this.getProgress();
        this.getLyrics();
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList',
            'playingTimer',
            'playingType',
            'player',
            'lyricNow',
            'currentTime',
            'lyrics'
        ])
    },
    beforeDestroy() {
        clearInterval(this.playingTimer);
    },
    methods: { 
        refresh() {
            // this.getProgress();
            this.player.currentTime = this.currentTime;
            this.getLyrics();
        },
        playingListShow() {
            this.$emit('playingListShow');
        },
        getProgress() {
            this.setPlayer(this.$refs.player);
            this.player.currentTime = this.currentTime;
        },
        getPlaySongUrl() {
            let that = this;
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
                    return;
                }
                let musicUrl = res.data.data[0].url;
                let obj = Object.assign(that.playingSong, {
                    musicUrl: res.data.data[0].url
                })
                that.setPlayingSong(obj);
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        changeSong(index) {
            this.setPlayingSong(this.tracks[index]);
            this.setLyricNow('');
            this.setCurrentTime(0);
            this.getPlaySongUrl();
            this.getLyrics();
        },
        findThisInList() {
            this.tracks = this.playingList.tracks;
            for(let i in this.tracks) {
                if(this.tracks[i].name == this.playingSong.name) {
                    console.log(i);
                    return i;
                }
            }
        },
        findLyricAutomatically() {
            let that = this;
            clearInterval(this.playingTimer); 
            this.setPlayingTimer(setInterval(() => {
                let current = getCurrentTime(Math.floor(that.player.currentTime));
                that.setCurrentTime(Math.floor(that.player.currentTime));
                if(Math.floor(that.player.currentTime) + 1 === Math.floor(that.player.duration)) {
                    //列表循环
                    if(that.playingType === 0) {
                        clearInterval(that.playingTimer);
                        // that.nextSong();
                        let index = that.findThisInList();
                        index++;
                        if(index >= that.tracks.length) {
                            index %= that.tracks.length;
                        }
                        that.changeSong(index);
                        return;
                    }
                    //随机
                    else if(this.playingType == 1) {
                        clearInterval(that.playingTimer);
                        that.tracks = that.playingList.tracks;
                        let index = Math.floor(Math.random() * that.tracks.length);
                        that.changeSong(index);
                        return;
                    }
                }
                // console.log(current);
                for(let item of that.lyrics) {
                    if(item.time == current) {
                        that.prevTime = current;
                        that.setLyricNow(item.content);
                        // console.log(that.lyricNow)
                    }
                }
            }, 1000));
        },
        getLyricsArr() {
            let tmpArr = this.lyric.split('[');
            let lyrics = [];
            for(let i = 0; i < tmpArr.length; i++) {
                let tmp = tmpArr[i];
                let content = tmp.split(']')[1];
                if(content && content.length > 0 && content != '\n') {
                    lyrics.push({
                        content: content,
                        time: (tmp.split(']')[0]).slice(0, 5)
                    });
                }
            }
            this.setLyrics(lyrics);
            // console.log(this.lyrics);
            this.findLyricAutomatically();
        },
        getLyrics() {
            let that = this;
            getLyrics({
                id: that.playingSong.id
            }).then(res => {
                console.log(res.data);
                if(res.data.nolyric) {
                    that.lyric = '暂无歌词';
                    that.lyrics = [{
                        content: '暂无歌词',
                        time: ''
                    }];
                    that.setLyricNow('暂无歌词');                }
                else {
                    that.lyric = res.data.lrc.lyric;
                    that.getLyricsArr();
                }
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        changePlay() {
            this.playing = !this.playing;
            if(this.playing) {
                this.player.play();
            }
            else {
                this.player.pause();
            }
        },
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingType: 'SET_PLAYING_TYPE',
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER',
            setLyrics: 'SET_LYRICS',
            setCurrentTime: 'SET_CURRENT_TIME',
            setLyricNow: 'SET_LYRIC_NOW'
        })
    }
}
</script>

<style lang="scss" scoped>
    .player-container {
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