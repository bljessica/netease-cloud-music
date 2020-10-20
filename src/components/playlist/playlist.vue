<template>
    <div class="playlist-container">
        <div class="up-wrapper" :style="{background: 'linear-gradient(to bottom, '+ bgColor + ',1), ' + bgColorBottom+',1))', zIndex: headerZIndex}">
            <!-- 头部操作导航栏 -->
            <div class="nav">
                <i class="iconfont icon-zuo" @click="$router.push('/find')"></i>
                <span>歌单<i>&reg;</i></span>
                <span class="blank"></span>
                <i class="iconfont icon-sousuo"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <!-- 歌单信息 -->
            <img class="colorImg" :src="playlist.coverImgUrl" alt="" ref="picture">
            <div class="info">
                <div class="picture" :style="{backgroundImage: 'url(' + playlist.coverImgUrl + ')'}">
                    <span><i class="iconfont icon-bofangsanjiaoxing"></i>{{ getPlayNum(playlist.playCount) }}</span>
                </div>
                <div class="name">
                    <span class="title">{{ playlist.name }}</span>
                    <div v-if="playlist.creator" class="creator">
                        <img :src="playlist.creator.avatarUrl" alt="">
                        <span>{{ playlist.creator.nickname }}</span>
                        <i class="iconfont icon-you"></i>
                    </div>
                    <div class="blank"></div>
                    <div class="edit">编辑信息<i class="iconfont icon-you"></i></div>
                </div>
            </div>
            <!-- 操作 -->
            <ul class="actions" :style="{opacity: actionsShow == false? 0: 1}">
                <li v-for="(item, index) in playlistActions" :key="index">
                    <i class="iconfont" :class="item.icon"></i>
                    <div>{{ item.name }}</div>
                </li>
            </ul>
        </div>
        <!-- 歌曲信息 -->
        <div class="playlist" :style="{position: playlistPosition, top: playlistTop}">
            <div class="title">
                <i class="iconfont icon-ziyuan1"></i>
                <span>播放全部</span>
                <span>（共{{ songs.length }}首）</span>
            </div>
            <ul class="songs">
                <li v-for="(item, index) in songs" :key="index" @click="selectSong(index)">
                    <span class="no">{{ index + 1 }}</span>
                    <div class="song">
                        <span>{{ item.name }}<span v-if="item.alia.length != 0">({{ item.alia[0] }})</span></span>
                        <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.ar[0].name }} - {{ item.al.name}}</div>
                    </div>
                    <i class="iconfont icon-ziyuan1"></i>
                    <i class="iconfont icon-gengduo1"></i>
                </li>
            </ul>
        </div>
        <!-- <play-bar ref="bar" v-if="$store.getters.playingSong.id" @playingListShow="playingListShow = true" ></play-bar>
        <playing-list class="playing-list" v-if="playingListShow" @changeSong="changeSong"></playing-list> -->
    </div>
</template>

<script>
import { getPlaylistDetail, getLyrics, getPlaySongUrl } from '../../api/play';
import BScroll from '@better-scroll/core';
import { PLAYLIST_ACTIONS } from '../../consts/const';
import ColorThief from 'colorthief';
import { mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            playlist: {},
            songs: [],
            playlistActions: PLAYLIST_ACTIONS,
            actionsShow: true,
            playingListShow: false,
            bgColor: '',
            bgColorBottom: '',
            headerZIndex: 1000,
            playlistPosition: 'relative',
            playlistTop: '-20px',
        }
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList',
            'player',
            // 'lyricNow'
        ])
    },
    mounted() {
        if(this.$route.params.id) {
            this.getPlaylistDetail();
        }
        else {
            this.playlist = this.playingList;
            this.songs = this.playingList.tracks;
            this.getBgColor();
        }
        //歌单导航栏吸顶
        window.addEventListener('scroll', () => {
            let that = this;
            //浏览器兼容
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop >= 250) {
                that.headerZIndex = 2000;
                that.actionsShow = false;
            }
            else {
                that.headerZIndex = 1000;
                that.actionsShow = true;
                that.playlistPosition = 'relative';
                that.playlistTop = '-20px';
            }
        });
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingList: 'SET_PLAYING_LIST',
            setLyricNow: 'SET_LYRIC_NOW',
            setLyrics: 'SET_LYRICS',
            setCurrentTime: 'SET_CURRENT_TIME',
            // setPlayingTimer: 'SET_PLAYING_TIMER',
            // setPlayer: 'SET_PLAYER'
        }),
        //选择一首歌播放
        selectSong(index) { 
            this.setPlayingSong(this.songs[index]);
            this.setPlayingList(this.playlist);
            console.log("select", this.playingList.name)
            this.$emit('selectSong', index);
        },
        //背景取色
        getBgColor() {
            let domImg = this.$refs.picture;
            domImg.crossOrigin = '';
            let colorthief = new ColorThief();
            let that = this;
            domImg.addEventListener('load', () => {
                let result = colorthief.getColor(domImg);
                that.bgColor = 'linear-gradient(to bottom, ';
                let color = 'rgba(', colorBottom = 'rgba(';
                for(let i of result) {
                    if(i > 90) {
                        i -= 90;
                    }
                    color += i +',';
                    colorBottom += (i + 70) + ','
                }
                color = color.slice(0, color.length - 1);
                colorBottom = colorBottom.slice(0, colorBottom.length - 1);
                that.bgColor = color;
                that.bgColorBottom = colorBottom;
            })
        },
        //歌曲播放量
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
        //获取歌单详情，背景取色
        getPlaylistDetail() {
            let that = this;
            getPlaylistDetail({
                id: that.$route.params.id
            }).then(res => {
                // console.log(res.data);
                that.playlist = res.data.playlist;
                that.songs = res.data.playlist.tracks;
                //背景取色
                that.getBgColor();
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
    .playlist-container {
        background: white;
        background-position: center center;
        .blank {
            flex-grow: 1;
        }
        .colorImg {
            width: 20px;
            height: 20px;
            display: none;
        }
        .up-wrapper {
            color: white;
            padding-top: 70px;
            padding-bottom: 20px;
            position: sticky;
            position: -webkit-sticky;
            top: -250px;
            .nav {
                position: fixed;
                background: transparent;
                z-index: 2000;
                top: 0;
                left: 0;
                right: 0;
                padding: 0 20px;
                height: 70px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                i {
                    font-size: 24px;
                }
                span:first-of-type {
                    padding-left: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    i {
                        font-weight: normal;
                        font-size: 14px;
                        color: rgb(231, 230, 230);
                        position: relative;
                        bottom: 10px;
                    }
                }
                i:nth-of-type(2) {
                    font-size: 22px;
                    padding-right: 20px;
                }
            }
            .info {
                // margin-top: 70px;
                display: flex;
                height: 130px;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                .picture {
                    width: 130px;
                    height: 130px;
                    background-size: cover;
                    // background-size: 100% 100%;
                    border-radius: 10px;
                    position: relative;
                    font-size: 12px;
                    span {
                        position: absolute;
                        right: 10px;
                        top: 3px;
                        i {
                            font-size: 12px;
                        }
                    }
                }
                .name {
                    display: flex;
                    flex-direction: column;
                    height: 130px;
                    align-items: flex-start;
                    color: rgb(231, 230, 230);
                    padding-left: 20px;
                    .title {
                        color: white;
                        font-size: 18px;
                        font-weight: bold;
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 200px;
                    }
                    .creator {
                        margin-top: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        font-size: 14px;
                        img {
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                        }
                        span {
                            padding: 0 5px 0 10px;
                        }
                        i {
                            font-size: 12px;
                            position: relative;
                            top: 1px;
                        }
                    }
                    .edit {
                        font-size: 12px;
                    }
                }
            }
            .actions {
                height: 100px;
                position: relative;
                top: -5px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                list-style-type: none;
                li {
                    i {
                        font-size: 26px;
                    }
                    div {
                        margin-top: 5px;
                        color: rgb(231, 230, 230);
                        font-size: 14px;
                    }
                }
            }
        }
        .playlist {
            padding: 15px;
            padding-bottom: 0;
            border-radius: 20px 20px 0 0;
            position: relative;
            top: -20px;
            z-index: 1003;
            background: white;
            .title {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 40px;
                i {
                    font-size: 24px;
                }
                span:first-of-type {
                    margin-left: 15px;
                }
                span:last-of-type {
                    color: rgb(158, 156, 156);                    font-size: 14px;
                }
            }
            .songs {
                list-style-type: none;
                // margin-top: 5px;
                li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 60px;
                    .no {
                        color: rgb(150, 146, 146);
                        // display: inline-block;
                        width: 20px;
                        text-align: center;
                    }
                    .song {
                        padding-left: 15px;
                        text-align: left;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-start;
                        width: 75%;
                        &>span {
                            width: 100%;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            span {
                                color: rgb(158, 156, 156);
                            }
                        }
                        div {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 12px;
                            color: rgb(158, 156, 156);
                            margin-top: 5px;
                            span {
                                display: inline-block;
                                color: red;
                                font-size: 10px;
                                -webkit-transform:scale(0.8);
                                border: 1px solid red;

                            }
                        }
                    }
                    &>i {
                        font-size: 20px;
                        color: rgb(158, 156, 156);
                        &:last-of-type {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
</style>