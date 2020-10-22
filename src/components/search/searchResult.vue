<template>
    <div class="container" :key="key">
        <search-bar :word="searchingWord" class="search-bar" @wordChange="wordChange"></search-bar>
        <!-- 搜索结果分类滑块 -->
        <div class="slider-container">
            <div class="search-bar-container" ref="wrapper">
                <ul class="kinds">
                    <li v-for="(item, index) in searchKinds" :key="index" @click.stop="activeIndex = index" :class="{active: index == activeIndex}">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <!-- 搜索结果 -->
        <div class="result-box" id="result-box" :key="resultKey">
            <!-- 综合 -->
            <div class="all-list" ref="allWrapper">
                <div class="playlist list" v-if="activeIndex === 0">
                    <div class="song-title list-title">
                        <span>单曲</span>
                        <span><i class="iconfont icon-bofang2"></i>播放全部</span>
                    </div>
                    <ul class="songs" v-if="song">
                        <li v-for="(item, index) in song.songs" class="item" :key="index" @click.stop="selectSong(item)" :style="{height: item.alia? (item.alia.length > 0 ? '80px': '60px'): '60px'}">
                            <div class="song" v-if="item.alia">
                                <span>{{ item.name }}<span v-if="item.alia.length > 0">({{ item.alia[0] }})</span></span>
                                <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.ar[0].name }} - {{ item.al.name}}</div>
                                <div class="alia" v-if="item.alia.length > 0">{{ item.alia[0] }}</div>
                            </div>
                            <i class="iconfont icon-ziyuan1"></i>
                            <i class="iconfont icon-gengduo1"></i>
                        </li>
                    </ul>
                    <div class="list-moretext" v-if="song.more">{{ song.moreText }}<i class="iconfont icon-you"></i></div>
                </div>
            </div>
            <!-- 某类型，下拉刷新 -->
            <div class="type-list" ref="typeWrapper" v-show="activeIndex !== 0">
                <!-- 单曲 -->
                <div ref="songsWrapper" class="songs-wrapper" v-show="activeIndex === 1">
                    <div class="songs-list playlist list" v-show="activeIndex === 1" :style="{transform: 'translateY(' + typeTop + 'px)'}">
                        <div class="title">
                            <i class="iconfont icon-bofang2 left"></i>
                            <span class="left">播放全部</span>
                            <span class="blank"></span>
                            <i class="iconfont icon-bofangliebiao right"></i>
                            <span class="right">多选</span>
                        </div>
                        <ul class="songs" v-if="song">
                            <li v-for="(item, index) in song.songs" class="item" :key="index" @click.stop="selectSong(item)" :style="{height: item.alias? (item.alias.length > 0 ? '80px': '60px'): '60px'}">
                                <div class="song" v-if="item.alias">
                                    <span>{{ item.name }}<span v-if="item.alias.length > 0">({{ item.alias[0] }})</span></span>
                                    <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.artists[0].name }} - {{ item.album.name}}</div>
                                    <div class="alia" v-if="item.alias.length > 0">{{ item.alias[0] }}</div>
                                </div>
                                <i class="iconfont icon-ziyuan1"></i>
                                <i class="iconfont icon-gengduo1"></i>
                            </li>
                        </ul>
                        <!-- <div class="refresh">下拉刷新</div> -->
                    </div>
                </div>
                <!-- 云村mlog -->
                <div ref="mlogsWrapper" class="mlogs-wrapper" v-show="activeIndex === 1">
                    <div class="cloud-list list" v-show="activeIndex === 2">
                        <!-- <div class="title">Mlog</div>
                        <ul class="mlogs">
                            <li v-for="(item, index) in cloud.mlogs" :key="index">

                            </li>
                        </ul> -->
                    </div>
                </div>
                <!-- 视频 -->
                <div ref="videosWrapper" class="videos-wrapper" v-show="activeIndex === 3">
                    <div class="videos-list list" v-show="activeIndex === 3">
                        <ul class="videos" v-if="video">
                            <li v-for="(item, index) in video.videos" :key="index">
                                <div class="cover" :style="{backgroundImage: 'url(' + item.coverUrl + ')'}">
                                    <span><i class="iconfont icon-bofangsanjiaoxing"></i>{{ getPlayNum(item.playTime) }}</span>
                                </div>
                                <div class="info">
                                    <div class="title">{{ item.title }}</div>
                                    <div>{{ durationToTimeStr(item.durationms) }} by {{ getCreator(item.creator)}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 歌手 -->
                <div ref="artistsWrapper" class="artists-wrapper" v-show="activeIndex === 4">
                    <div class="artists-list list" v-show="activeIndex === 4">
                        <ul class="artists" v-if="artist">
                            <li v-for="(item, index) in artist.artists" :key="index">
                                <img v-if="item.picUrl" :src="item.picUrl" alt="">
                                <img v-else src="../../assets/person.png" alt="">
                                <span class="name">{{ item.name }}</span>
                                <span><i class="iconfont icon-tianchongxing-"></i>已入驻</span>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <!-- 专辑 -->
                <div ref="albumsWrapper" class="albums-wrapper" v-show="activeIndex === 5">
                    <div class="albums-list list" v-show="activeIndex === 5">
                        <ul class="albums" v-if="album">
                            <li v-for="(item, index) in album.albums" :key="index">
                                <div class="img">
                                    <img src="../../assets/record.png" alt="">
                                    <img :src="item.blurPicUrl" alt="">
                                </div>
                                <div class="info">
                                    <span class="name">{{ item.name }}</span>
                                    <div>{{ getArtist(item.artists) }} {{ getDate(item.publishTime) }}</div>
                                </div>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <!-- 歌单 -->
                <div ref="playlistsWrapper" class="playlists-wrapper" v-show="activeIndex === 6">
                    <div class="playlists-list list" v-show="activeIndex === 6">
                        <ul class="playlists" v-if="playlist">
                            <li v-for="(item, index) in playlist.playlists" :key="index">
                                <div class="img">
                                    <img :src="item.coverImgUrl" alt="">
                                </div>
                                <div class="info">
                                    <span class="name">{{ item.name }}</span>
                                    <div>{{ item.trackCount }}首 by {{ item.creator.nickname }}，播放{{ item.playCount }}次</div>
                                </div>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <!-- 主播电台 -->
                <div ref="djRadiosWrapper" class="djRadios-wrapper" v-show="activeIndex === 7">
                    <div class="djRadios-list list" v-show="activeIndex === 7">
                        <ul class="djRadios" v-if="djRadio">
                            <li v-for="(item, index) in djRadio.djRadios" :key="index">
                                <div class="img">
                                    <img :src="item.picUrl" alt="">
                                </div>
                                <div class="info">
                                    <span class="name">{{ item.name }}</span>
                                    <div>{{ item.rcmdText }}</div>
                                </div>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <!-- 用户 -->
                <div ref="usersWrapper" class="users-wrapper" v-show="activeIndex === 8">
                    <div class="users-list list" v-show="activeIndex === 8">
                        <ul class="users" v-if="user">
                            <li v-for="(item, index) in user.userprofiles" :key="index">
                                <img v-if="item.avatarUrl" :src="item.avatarUrl" alt="">
                                <img v-else src="../../assets/person.png" alt="">
                                <div class="info">
                                    <span class="name">{{ item.nickname }}</span>
                                    <div>{{ item.signature }}</div>
                                </div>
                                <span><i class="iconfont icon-jia"></i>关注</span>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
import searchBar from '../search/search-bar';
import { SEARCH_KINDS } from '../../consts/const';
import BScroll from '@better-scroll/core';
import { search } from '../../api/search';
import { mapGetters, mapMutations } from 'vuex';
import { getPlaySongDetail } from '../../api/play';
import Pullup from '@better-scroll/pull-up';
import { secondsToStr, getPlayNum } from '../../common/js/processData';

BScroll.use(Pullup);

export default {
    data() {
        return {
            searchKinds: SEARCH_KINDS,
            activeIndex: 0, //默认显示“综合”
            song: [], //单曲
            cloud: [], //云村(mlog)
            video: [], //视频
            artist: [], //歌手
            album: [], //专辑
            playlist: [], //歌单
            djRadio: [], //主播电台
            user: [], //用户
            key: 0,
            typeSlider: new Array(9), //分类内容滑块
            resultKey: 0, //刷新结果
            offsets: new Array(9).fill(0), //查询偏移值（索引0-8）
            typeTop: 0, //分类内容滑块translateY
        }
    },
    components: {
        searchBar,
    },
    computed: {
        ...mapGetters([
            'searchingWord',
            'playingList',
        ])
    },
    mounted() {
        this.initSlider();
        this.search(); //综合
    },
    watch: {
        activeIndex(newVal, oldVal) {
            switch(newVal) {
                case 0: {
                    this.search(); //综合
                    break;
                }
                case 1: {
                    this.search(1); //单曲
                    break;
                }
                case 2: {
                    this.search(); //mlog
                    break;
                }
                case 3: {
                    this.search(1014); //视频
                    break;
                }
                case 4: {
                    this.search(100); //歌手
                    break;
                }
                case 5: {
                    this.search(10); //专辑
                    break;
                }
                case 6: {
                    this.search(1000); //歌单
                    break;
                }
                case 7: {
                    this.search(1009); //主播电台
                    break;
                }
                case 8: {
                    this.search(1002); //用户
                    break;
                }
                default: break;
            }
        }
    },
    methods: {
        //歌曲播放量
        getPlayNum: getPlayNum,
        //秒数->字符串
        durationToTimeStr(ms) {
            let seconds = Math.floor(ms / 1000);
            return secondsToStr(seconds);
        },
        // 视频作者
        getCreator(creator) {
            let res = '';
            for(let i of creator) {
                res += i.userName + '，';
            }
            res = res.substring(0, res.length - 1);
            return res;
        },
        // 专辑作者
        getArtist(creator) {
            let res = '';
            for(let i of creator) {
                res += i.name + '，';
            }
            res = res.substring(0, res.length - 1);
            return res;
        },
        //专辑发布时间
        getDate(time) {
            let date = new Date(time);
            return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
        },
        //搜索词改变
        wordChange() {
            this.activeIndex = 0;
            this.search(); //综合
        },
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingList: 'SET_PLAYING_LIST',
        }),
        //选择一首歌，播放，插入当前歌单
        selectSong(song) {
            this.$emit('beforeLoad');
            let that = this;
            //获取专辑封面url
            getPlaySongDetail({
                ids: song.id
            }).then(res => {
                that.$emit('onLoad');
                // console.log(res.data);
                song.al = {};
                song.al.picUrl = res.data.songs[0].al.picUrl;
                that.setPlayingSong(song);
                let newList = [];
                if(that.playingList) {
                    newList = that.playingList.tracks;
                    if(!that.selectSongInPlayingList(song)) {
                        newList.push(song);
                    }
                }
                else {
                    newList.push(song);
                }
                that.setPlayingList({
                    name: '临时歌单',
                    tracks: newList
                });
                that.$emit('selectSong');
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //当前歌单是否有这首歌
        selectSongInPlayingList(song) {
            let tracks = this.playingList.tracks;
            for(let i = 0; i < tracks.length; i++) {
                if(tracks[i].id === song.id) {
                    return true;
                }
            }
            return false;
        },
        //替换关键词颜色
        changeSearchingWordColor() {
            let box = document.getElementById('result-box');
            let nodes = box.getElementsByTagName('li');
            var re = new RegExp(this.searchingWord, "gi");
            for(let i = 0; i < nodes.length; i++) {
                let content = nodes[i].innerHTML;
                nodes[i].innerHTML = content.replace(re,
                 '<span style="color: rgba(20, 105, 184, 0.89)">' + this.searchingWord + '</span>');
            }
        },
        //初始化搜索结果分类滑块
        initSlider() {
            const slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                click: true
            });
        },
        //初始化分类获取的内容滑块
        initTypeSlider() {
            if(this.activeIndex === 1) {
                let slider1 = new BScroll(this.$refs.songsWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            // else if(this.activeIndex === 2) {
            //     let slider2 = new BScroll(this.$refs.videosWrapper, {
            //         scrollX: false,
            //         scrollY: true,
            //         click: true,
            //         mouseWheel: true,//开启鼠标滚轮
            //         pullUpLoad: {
            //             threshold: 300
            //         }
            //     });
            // }
            else if(this.activeIndex === 3) {
                let slider3 = new BScroll(this.$refs.videosWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            else if(this.activeIndex === 4) {
                let slider4 = new BScroll(this.$refs.artistsWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            else if(this.activeIndex === 5) {
                let slider5 = new BScroll(this.$refs.albumsWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            else if(this.activeIndex === 6) {
                let slider6 = new BScroll(this.$refs.playlistsWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            else if(this.activeIndex === 7) {
                let slider7 = new BScroll(this.$refs.djRadiosWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            else if(this.activeIndex === 8) {
                let slider8 = new BScroll(this.$refs.usersWrapper, {
                    scrollX: false,
                    scrollY: true,
                    click: true,
                    mouseWheel: true,//开启鼠标滚轮
                    pullUpLoad: {
                        threshold: 300
                    }
                });
            }
            // if(!this.typeSlider[this.activeIndex]) {
            //     this.typeSlider[this.activeIndex] = new BScroll(this.$refs.typeWrapper, {
            //         scrollX: false,
            //         scrollY: true,
            //         click: true,
            //         mouseWheel: true,//开启鼠标滚轮
            //         pullUpLoad: {
            //             threshold: 300
            //         }
            //     });
            // }
            // else {
            //     this.typeSlider[this.activeIndex].refresh();
            // }
            // typeSlider.on('pullingUp', () => {
            //     switch(this.activeIndex) {
            //         case 1: {
            //             this.offsets[1]++;
            //             this.search(1, this.offsets[1]);
                        // let box = document.getElementsByClassName('type-list')[0];
                        // let ul = document.getElementsByClassName('songs-list')[0];
                        // let height = ul.offsetHeight - box.offsetHeight;
                        // this.typeTop = -height;
                        // console.log('up', this.offsets[1], this.song.songs.length, height, ul.offsetTop)
                        // break;
                    // }
            //         default: break;
            //     }
                
            // })
        },
        //初始化综合内容滑块
        initAllSlider() {
            let allSlider = new BScroll(this.$refs.allWrapper, {
                scrollX: false,
                scrollY: true,
                click: true
            });
        },
        //搜索(综合),替换关键词颜色
        search(type=1018, offset=0) {
            this.$emit('beforeLoad');
            let that = this;
            search({
                keywords: that.searchingWord,
                type: type,
                offset: offset
            }).then(res => {
                that.$emit('onLoad');
                console.log(type, res.data);
                switch(type) {
                    case 1018: {
                        that.song = res.data.result.song; //单曲
                        that.cloud = res.data.result.mlog; //云村(mlog)
                        that.video = res.data.result.video; //视频
                        that.artist = res.data.result.artist; //歌手
                        that.album = res.data.result.album; //专辑
                        that.playlist = res.data.result.playList; //歌单
                        that.djRadio = res.data.result.djRadio; //主播电台
                        that.user = res.data.result.user; //用户
                        break;
                    }
                    case 1: {
                        that.song = res.data.result; //单曲
                        break;
                    }
                    case 1014: {
                        that.video = res.data.result;
                    }
                    case 100: {
                        that.artist = res.data.result;
                    }
                    case 10: {
                        that.album = res.data.result; //专辑
                        break;
                    }
                    case 1000: {
                        that.playlist = res.data.result; //歌单
                        break;
                    }
                    case 1009: {
                        that.djRadio = res.data.result; //主播电台
                        break;
                    }
                    case 1002: {
                        that.user = res.data.result; //用户
                        break;
                    }
                    default: break;
                }
                that.resultKey++;
                that.$nextTick(() => {
                    that.changeSearchingWordColor();
                    that.$nextTick(() => {
                        if(type === 1018) {
                            that.initAllSlider()
                        }
                        else {
                            that.initTypeSlider();
                        }
                    });
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
    @import '../../common/styles/playlist';
</style>

<style lang="scss" scoped>
    .container {
        background: white;
        .blank {
            flex-grow: 1;
        }
        .list {
            .list-title {
                display: flex;
                height: 30px;
                justify-content: space-between;
                span:first-of-type {
                    font-size: 18px;
                    font-weight: bold;
                }
            }
            .list-moretext {
                padding: 10px 0 20px 0;
                font-size: 12px;
                color: rgb(158, 156, 156);
                i {
                    font-size: 12px;
                }
            }
        }
        .search-bar {
            padding: 0 20px;
        }
        .slider-container {
            position: fixed;
            top: 50px;
            height: 40px;
            left: 0;
            right: 0;
            z-index: -1;
            .search-bar-container {
                overflow: hidden;
                position: absolute;
                left: 0;
                right: 0;
                .kinds {
                    height: 40px;
                    width: 720px;
                    border-bottom: 1px solid gainsboro;
                    li {
                        height: 38px;
                        width: 80px;
                        border-bottom: 2px solid transparent;
                        display: inline-block;
                        line-height: 40px;
                        &.active {
                            color: red;
                            border-bottom: 2px solid red;
                        }
                    }
                }
            }
        }
        .all-list, .songs-wrapper, .videos-wrapper, .artists-wrapper, .albums-wrapper, .playlists-wrapper, .djRadios-wrapper, .users-wrapper {
            position: absolute;
            top: 91px;
            left: 0;
            right: 0;
            bottom: 61px;
            overflow: hidden;
            z-index: -1;
            .playlist {
                top: 1px;
                .song-title {
                    span:last-of-type {
                        font-size: 12px;
                        display: inline-block;
                        height: 20px;
                        padding: 0 10px;
                        line-height: 20px;
                        border: 1px solid gainsboro;
                        border-radius: 15px;
                        text-align: center;
                        i {
                            padding-right: 5px;
                            font-size: 14px;
                        }
                    }
                }
                .title {
                    justify-content: space-between;
                    i.left {
                        margin-right: 10px;
                    }
                    .right {
                        font-size: 14px;;
                    }
                    span.right {
                        margin-left: 5px;
                    }
                }
                .song {
                    width: 80%;
                    margin-right: 5%;
                }
            }
        }
        .type-list {
            .refresh {
                color: rgb(158, 156, 156);
                font-size: 12px;
                padding: 10px 0;
            }
            .videos-list, .artists-list, .albums-list, .playlists-list, .djRadios-list, .users-list {
                padding: 0 15px;
            }
            .videos, .artists, .albums, .playlists, .djRadios {
                list-style-type: none;
            }
            .videos-list {
                padding: 0 15px;
                .videos {
                    list-style-type: none;
                    li {
                        // margin: 10px 0;
                        padding: 8px 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 74px;
                        .cover {
                            // width: 120px;
                            //直接设置宽度不生效
                            flex: 0 0 120px;
                            height: 74px;
                            color: white;
                            position: relative;
                            border-radius: 5px;
                            background-size: cover;
                            span {
                                position: absolute;
                                right: 5px;
                                top: 2px;
                                font-size: 12px;
                                i {
                                    font-size: 12px;
                                }
                            }
                        }
                        .info {
                            flex-grow: 1;
                            // padding-left: 10px;
                            margin-left: 10px;
                            text-align: left;
                            .title {
                                font-size: 14px;
                            }
                            div:last-of-type {
                                font-size: 12px;
                                color: rgb(158, 156, 156);
                                margin-top: 5px;
                            }
                        }
                    }
                }
                
            }
            .artists {
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    .name {
                        padding: 0 10px;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        flex-grow: 1;
                        text-align: left;
                    }
                    &>span:last-of-type {
                        font-size: 12px;
                        color: rgb(158, 156, 156);
                        i {
                            color: rgba(255, 0, 0, 0.63);
                            padding: 0 5px;
                            position: relative;
                            top: 1px;
                        }
                    }
                }
            }
            .albums, .playlists, .djRadios {
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 6px 0;
                    overflow: hidden;
                    .img {
                        flex: 0 0 57px;
                        // width: 65px;
                        height: 50px;
                        position: relative;
                        img {
                            width: 50px;
                            height: 50px;
                            border-radius: 5px;
                            position: absolute;
                            &:first-of-type {
                                right: 0;
                            }
                            &:last-of-type {
                                left: 0;
                            }
                        }
                    }
                    .info {
                        padding-left: 10px;
                        width: calc(100% - 60px);
                        text-align: left;
                        .name, div {
                            width: 100%;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        .name {
                            display: inline-block;
                            // font-size: 14px;
                        }
                        div {
                            // margin-top: 3px;
                            font-size: 12px;
                            color: rgb(158, 156, 156);
                        }
                    }
                }
            }
            .playlists li, .djRadios li {
                .img {
                    flex: 0 0 50px;
                }
            }
            .users {
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;

                    }
                    .info {
                        margin-left: 10px;
                        width: calc(100% - 140px);
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        // color: rgb(15, 78, 138);
                        div {
                            color: rgb(158, 156, 156);
                            font-size: 12px;
                            margin-top: 5px;
                        }
                        span, div {
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            display: inline-block;
                        }
                    }
                    &>span {
                        color: red;
                        border: 1px solid red;
                        border-radius: 15px;
                        font-size: 12px;
                        padding: 5px 10px;
                        i {
                            padding: 0 5px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>