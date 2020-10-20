<template>
    <div class="container" :key="key">
        <search-bar :word="searchingWord" class="search-bar"></search-bar>
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
        <div class="result-box" id="result-box">
            <!-- 综合 -->
            <div class="all-list" v-if="activeIndex === 0"  ref="allWrapper">
                <div class="playlist list">
                    <div class="song-title list-title">
                        <span>单曲</span>
                        <span><i class="iconfont icon-bofang2"></i>播放全部</span>
                    </div>
                    <ul class="songs" v-if="song">
                        <li v-for="(item, index) in song.songs" class="item" :key="index" @click="selectSong(item)" :style="{height: item.alia? (item.alia.length > 0 ? '80px': '60px'): '60px'}">
                            <div class="song" v-if="item.alia">
                                <span>{{ item.name }}<span v-if="item.alia.length > 0">({{ item.alia[0] }})</span></span>
                                <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.ar[0].name }} - {{ item.al.name}}</div>
                                <div class="alia" v-if="item.alia.length > 0">{{ item.alia[0] }}</div>
                            </div>
                            <i class="iconfont icon-ziyuan1"></i>
                            <i class="iconfont icon-gengduo1"></i>
                        </li>
                    </ul>
                    <div class="list-moretext">{{ song.moreText }}<i class="iconfont icon-you"></i></div>
                </div>
            </div>
            <!-- 某类型 -->
            <div class="type-list" ref="typeWrapper">
                <!-- 单曲 -->
                <div class="songs-list playlist list" v-if="activeIndex === 1">
                    <div class="title">
                        <i class="iconfont icon-bofang2 left"></i>
                        <span class="left">播放全部</span>
                        <span class="blank"></span>
                        <i class="iconfont icon-bofangliebiao right"></i>
                        <span class="right">多选</span>
                    </div>
                    <ul class="songs" v-if="song">
                        <li v-for="(item, index) in song.songs" class="item" :key="index" @click="selectSong(item)" :style="{height: item.alias? (item.alias.length > 0 ? '80px': '60px'): '60px'}">
                            <div class="song" v-if="item.alias">
                                <span>{{ item.name }}<span v-if="item.alias.length > 0">({{ item.alias[0] }})</span></span>
                                <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.artists[0].name }} - {{ item.album.name}}</div>
                                <div class="alia" v-if="item.alias.length > 0">{{ item.alias[0] }}</div>
                            </div>
                            <i class="iconfont icon-ziyuan1"></i>
                            <i class="iconfont icon-gengduo1"></i>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- 云村 -->
            <!-- 视频 -->
            <!-- 歌手 -->
            <!-- 专辑 -->
            <!-- 歌单 -->
            <!-- 主播电台 -->
            <!-- 用户 -->
        </div>
    </div>
</template>

<script> 
import searchBar from '../search/search-bar';
import { SEARCH_KINDS } from '../../consts/const';
import BScroll from '@better-scroll/core';
import { search } from '../../api/search';
import { mapGetters, mapMutations } from 'vuex';

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
            typeSlider: null, //分类内容滑块
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
                default: break;
            }
        }
    },
    methods: {
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingList: 'SET_PLAYING_LIST',
        }),
        //选择一首歌，播放，插入当前歌单
        selectSong(song) {
            this.setPlayingSong(song);
            let newList = [];
            if(this.playingList) {
                newList = this.playingList.tracks;
                if(!this.selectSongInPlayingList(song)) {
                    newList.push(song);
                }
            }
            else {
                newList.push(song);
            }
            this.setPlayingList({
                name: '临时歌单',
                tracks: newList
            });
            this.$emit('selectSong');
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
            let typeSlider = new BScroll(this.$refs.typeWrapper, {
                scrollX: false,
                scrollY: true,
                click: true
            });
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
        search(type=1018) {
            this.$emit('beforeLoad');
            let that = this;
            search({
                keywords: that.searchingWord,
                type: type
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
                    default: break;
                }
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
                margin-top: 10px;
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
        .all-list, .type-list {
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
        
    }
</style>