<template>
    <div class="container" :style="{background: bgColor}">
        <!-- 头部操作导航栏 -->
        <play-header></play-header>
        <!-- 播放棒 -->
        <div class="stick" :class="{playing: playing == true}" v-if="!lyricShow"></div>
        <!-- 音乐封面 -->
        <div class="nav-to-lyric-wrapper" v-if="lyricShow == false" @click="lyricsShow">
            <div class="wrapper"> 
                <img ref="picture" v-if="playingSong.al" :src="playingSong.al.picUrl" alt="" :style="{transform: 'rotate(' + angle + 'deg)'}">
            </div>
        </div>
        <song-lyric :key="songKey" v-if="lyricShow == true" ref="lyrics" @coverShow="coverShow"></song-lyric>
        <!-- 操作栏 --> 
        <div class="actions">
            <div class="actions-up">
                <i class="iconfont" :class="{'icon-icon-test': true, 'icon-aixin': false}"></i>
                <i class="iconfont icon-xiazai"></i>
                <i class="iconfont icon-luyin"></i>
                <i class="iconfont icon-jianyi" @click="$router.push({name: 'songComments', params: {id: playingSong.id}})"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <play-actions ref="actions" :key="songKey" @changeSong="changeSong" @playingListShow="showPlayingList" @changePlaying="changePlaying" @findPrev="findPrev" @angleChange="angleChange"></play-actions>
        </div>
        <playing-list ref="list" class="playing-list" @changeSong="changeSong" v-show="playingListShow"></playing-list>
    </div>
</template> 

<script>
import { getPlaySongDetail, getPlaySongUrl } from '../../api/play';
import { mapGetters, mapMutations} from 'vuex';
import playHeader from '../play/play-header';
import playActions from '../play/play-actions';
import songLyric from '../play/song-lyric';
import playingList from '../common/playing-list';
import ColorThief from 'colorthief';

export default {
    data() {
        return {
            playing: true,
            musicUrl: '',
            angle: 0,
            lyricShow: false,
            playingListShow: false,
            songKey: 0,
            bgColor: ''
        }
    },
    components: {
        playHeader,
        playActions,
        songLyric,
        playingList
    },
    mounted() {
        this.setPlayingList(this.$route.params.playingList);
        console.log('set')
        this.$refs.list.calcOriginY();
        this.getPlaySongDetail();
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList',
            'playingTimer',
            'playingType',
            'player',
            'currentTime'
        ])
    },
    methods: {
        changeSong() { 
            if(this.lyricShow == true) {
                this.$refs.lyrics.refresh();//刷新歌词
            }
            this.getPlaySongDetail(1); //为歌曲添加url
        },
        getBgColor() {
            //背景取色
            let domImg = this.$refs.picture;
            domImg.crossOrigin = '';
            let colorthief = new ColorThief();
            domImg.addEventListener('load', () => {
                let result = colorthief.getColor(domImg);
                this.bgColor = 'linear-gradient(to bottom, ';
                let color = 'rgba('
                for(let i of result) {
                    // color += parseInt(i - 70) +',';
                    color += parseInt(i) +',';
                }
                color = color.slice(0, color.length - 1);
                this.bgColor += color + ',1), ' + color + ',0.7))'
                console.log(this.bgColor, color)
            })
        },
        showPlayingList() {
            this.playingListShow = true;
        },
        changePlaying() {
            this.playing = !this.playing;
        },
        lyricsShow() {
            this.lyricShow = true;
        },
        findPrev() {
            if(this.lyricShow == true) {
                this.$refs.lyrics.findPrevTime();
            }
        },
        angleChange(angle) {
            this.angle = angle;            
        },
        coverShow() {
            this.lyricShow = false;
        },
        goBack() {
            clearInterval(this.playingTimer);
            console.log('leave')
            this.setPlayingTimer(null);
            this.$router.push({name: 'playlist', params: {id: this.playingList.id}})
        },
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingList: 'SET_PLAYING_LIST',
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER'
        }),
        getPlaySongDetail(type=0) { 
            // this.getBgColor();
            //0为正常，1为切歌时获取歌曲url
            if(this.$route.params.id == this.playingSong.id && type == 0) {
                //继续播放
                this.$refs.actions.changeProgress();
                return;
            }
            let id = '';
            if(type === 0) {
                id = this.$route.params.id;
            }
            else if(type === 1) {
                id = this.playingSong.id;
            }
            let that = this;
            getPlaySongDetail({
                ids: id
            }).then(res => {
                console.log(res.data.songs[0]);
                that.setPlayingSong(res.data.songs[0]);
                that.getBgColor();
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
                    let obj = Object.assign(that.playingSong, {
                        musicUrl: res.data.data[0].url
                    })
                    that.setPlayingSong(obj);
                    //开启进度条
                    that.$refs.actions.changeProgress();
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
        // background: linear-gradient(to bottom, rgba(94, 109, 136, 0.822),  rgba(94, 109, 136, 0.993));
        color: gainsboro;
        padding: 0 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .stick {
            background: url('../../assets/stick.png');
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
        .nav-to-lyric-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            top: 70px;
            bottom: 165px;
            .wrapper {
                background: url('../../assets/record.png');
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
        }
    }
</style>