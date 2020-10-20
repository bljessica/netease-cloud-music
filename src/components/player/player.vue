<template>
    <div class="player-container" v-if="playingSong.id">
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
                <i class="iconfont icon-bofangliebiao" @click.stop="showList"></i>
            </div>
        </div> 
        <!-- 播放列表 -->
        <div class="playinglist-wrapper" ref="playinglist" v-show="playingListShow">
            <div class="playinglist-container">
                <div class="title">当前播放<span>（{{ songs? songs.length: 0 }}）</span></div>
                <div class="playinglist-actions">
                    <i class="iconfont" @click="setPlayingType" :class="{'icon-xunhuan': playingType == 0, 'icon-icon--': playingType == 1, 'icon-danquxunhuan': playingType == 2}"></i>
                    <span>{{ typeName }}</span>
                    <span class="blank"></span>
                    <span class="collect"><i class="iconfont icon-xing"></i>收藏全部</span>
                    <i class="iconfont icon-zuo"></i>
                </div>
                <div class="slider-wrapper" ref="wrapper">
                    <ul class="songs" id="songs" :style="{transform: 'translateY(' + originY + 'px)'}">
                        <li v-for="(item, index) in songs" :key="index" @click.stop="changeSong(index)"
                            :class="{active: (item.name) == (playingSong.name)? true: false}">
                            <i class="iconfont icon-icon-test1 active-icon" v-if="item.name == playingSong.name"></i>
                            <span class="name">
                                {{ item.name }}
                                <span class="artist">- {{ getArtists(item.ar) }}</span>
                            </span>
                            <span class="blank"></span>
                            <i class="iconfont icon-cuo"></i>
                        </li>
                    </ul>
                </div>
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
import BScroll from '@better-scroll/core';
import { getLyrics, getPlaySongUrl } from '../../api/play';

export default {
    data() {
        return {
            audioKey: 0,
            playingListShow: false, //是否显示播放列表
            songs: [], //播放列表
            originY: 0, //初始播放列表滑块位置
            slider: null,
        }
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'currentTime',
            'playingType',
            'playingList',
            'isPlaying',
            'lyricNow',
            'lyrics',
            'playingTimer'
        ]),
        typeName() {
            if(this.playingType == 0) {
                return '列表循环';
            }
            else if(this.playingType == 1) {
                return '随机播放';
            }
            else {
                return '单曲循环';
            }
        }
    },
    mounted() {
        let that = this;
        this.songs = this.playingList.tracks;
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow === true && className !== 'playinglist-container') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
        //显示播放列表
        showList() {
            this.playingListShow = true;
        },
        //播放列表自由切歌
        changeSong(index) {
            this.setPlayingSong(this.songs[index]);
            //获取音乐url，歌词，启动播放
            this.getMusicUrl();
        },
        //从歌单选择歌曲(歌单可能变化)
        selectSong(index) {
            //获取音乐url，歌词，启动播放
            this.getMusicUrl(true);
        },
        //上一首
        prevSong() {
            let index = this.findPlayingSongIndex() - 1;
           if(index < 0) {
               index += this.songs.length;
           }
            this.setPlayingSong(this.songs[index]);
            //获取音乐url，歌词，启动播放
            this.getMusicUrl();
        },
        //下一首
        nextSong() {
            let index = this.findPlayingSongIndex();
            index++;
            if(index >= this.songs.length) {
                index %= this.songs.length;
            }
            this.setPlayingSong(this.songs[index]);
            //获取音乐url，歌词，启动播放
            this.getMusicUrl();
        },
        //随机下一首
        randomNextSong() {
            let curIndex = this.findPlayingSongIndex();
            let index = Math.floor(Math.random() * this.songs.length);
            while(index === curIndex) {
                index = Math.floor(Math.random() * this.songs.length);
            }
            console.log(curIndex, index)
            this.setPlayingSong(this.songs[index]);
            //获取音乐url，歌词，启动播放
            this.getMusicUrl();
        },
        //获取要播放的歌曲的url，调整播放列表显示，(->获取歌词)
        getMusicUrl(go=false) {
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
                let obj = Object.assign(that.playingSong, {
                    musicUrl: res.data.data[0].url
                })
                that.setPlayingSong(obj);
                that.songs = that.playingList.tracks;
                that.calcOriginY();
                that.getLyrics();
                if(go) {
                    that.$router.push('/playing');
                }
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //获取歌词(处理为数组),设置currentTime,播放
        getLyrics() {
            let that = this;
            getLyrics({
                id: that.playingSong.id
            }).then(res => {
                console.log(res.data);
                if(res.data.nolyric) {
                    that.setLyricNow('暂无歌词');
                    that.setLyrics([{
                        content: '暂无歌词',
                        time: ''
                    }]);
                }
                else {
                    if(res.data.tlyric.lyric) {
                        that.setLyricsArr(res.data.lrc.lyric, res.data.tlyric.lyric);
                    }
                    else {
                        that.setLyricsArr(res.data.lrc.lyric)
                    }
                }
                that.setCurrentTime(0);
                that.$nextTick(() => {
                    that.initSlider();
                });
                that.startMusic();
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //处理歌词为数组(时间格式XX:XX)
        setLyricsArr(lyric, tlyric='') {
            let tlyrics = [], hasTlyrics = false;
            if(tlyric.length > 0) {
                hasTlyrics = true;
                let tmpArr = tlyric.split('[');
                for(let i = 0; i < tmpArr.length; i++) {
                    let tmp = tmpArr[i];
                    let content = tmp.split(']')[1];
                    if(content && content.length > 0 && content != '\n') {
                        tlyrics.push({
                            content: content,
                            time: (tmp.split(']')[0]).slice(0, 5)
                        });
                    }
                }
            }
            let tmpArr = lyric.split('[');
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
            //有翻译
            if(hasTlyrics) {
                let between = lyrics.length - tlyrics.length;
                for(let i = 0; i < lyrics.length; i++) {
                    if(i >= between) {
                        lyrics[i]['tcontent'] = tlyrics[i - between].content;
                    }
                }
            }
            this.setLyrics(lyrics);
        },
        //计算播放歌曲在歌单中的位置，设置滑块初始位移
        calcOriginY() {
            let index = 0;
            for(let i = 0; i < this.songs.length; i++) {
                if(this.songs[i].name == this.playingSong.name) {
                    index = i;
                    
                    break;
                }
            }
            console.log(this.playingSong.name, index)
            let maxIndex = this.songs.length - 1;
            if(index < 4) {
                this.originY = 0;
                return;
            }
            let list = document.getElementById("songs");
            let height = list.offsetHeight;
            if(index >= maxIndex - 4) {
                this.originY = 4 * 80 - height;
            }
            else {
                this.originY = -(index - 3) * 40;
            }
        },
        //初始化播放列表滑块
        initSlider() {
            if(!this.slider) {
                this.slider = new BScroll(this.$refs.wrapper, {
                    click: true,
                    bounce: false
                });
            }
        },
        //拼接歌手字符串
        getArtists(arArr) {
            let res = '';
            arArr.forEach(item => {
                res += item.name + '/';
            })
            return res.substring(0, res.length - 1);
        },
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
            let player = this.$refs.myPlayer;
            player.currentTime = this.currentTime;
            let that = this;
            let flag = false;//是否设置了总时长和开始时间
            this.setIsPlaying(true);
            clearInterval(this.playingTimer);
            this.audioKey++;
            //开启定时器
            this.setPlayingTimer(setInterval(() => {
                that.slider.refresh();
                let player = that.$refs.myPlayer;
                if(player) {
                    //刚开启
                    if(!flag) {
                        player.currentTime = that.currentTime;
                        console.log('set:' + player.currentTime)
                        flag = true;
                        that.setPlayer(player);
                    }
                    let current = player.currentTime; //小数
                    let duration = player.duration;
                    that.setDuraion(duration); //小数
                    that.setCurrentTime(current); //小数
                    //更新歌词
                    let lyricNow = that.findLyricNow(secondsToStr(Math.floor(current)));
                    if(lyricNow) {
                        that.setLyricNow(lyricNow);
                    }
                    //这首歌放完了
                    if(Math.floor(current) === Math.floor(duration) - 1) {
                        console.log('end',that.playingType);
                        //列表循环
                        if(that.playingType === 0) {
                            clearInterval(that.playingTimer);
                            console.log('next')
                            that.nextSong();
                            return;
                        }
                        //随机播放
                        else if (that.playingType === 1) {
                            clearInterval(that.playingTimer);
                            console.log('random')
                            that.randomNextSong();
                            return;
                        }
                        //否则单曲循环
                    }
                }
            }, 500));
        },
        //找到当前播放歌曲在歌单中的索引
        findPlayingSongIndex() {
            for(let i in this.songs) {
                if(this.songs[i].name == this.playingSong.name) {
                    console.log(i);
                    return i;
                }
            }
            return 0;
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
            setPlayingSong: 'SET_PLAYING_SONG',
            setLyricNow: 'SET_LYRIC_NOW',
            setIsPlaying: 'SET_IS_PLAYING',
            setPlayingType: 'SET_PLAYING_TYPE',
            setLyrics: 'SET_LYRICS',
            setCurrentTime: 'SET_CURRENT_TIME',
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER',
            setDuraion: 'SET_DURATION'
        }),
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/styles/playing-list';
</style>

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