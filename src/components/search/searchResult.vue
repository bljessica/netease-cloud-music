<template>
    <div class="container">
        <search-bar :word="searchingWord" class="search-bar"></search-bar>
        <!-- 搜索结果分类滑块 -->
        <div class="slider-container">
            <div class="search-bar-container" ref="wrapper">
                <ul class="kinds">
                    <li v-for="(item, index) in searchKinds" :key="index" @click="activeIndex = index" :class="{active: index == activeIndex}">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <!-- 搜索结果 -->
        <div class="result-box">
            <!-- 单曲 -->
            <div class="songs-container playlist" v-show="activeIndex == 0 || activeIndex == 1">
                <div class="song-title item-title" v-show="activeIndex == 0">
                    <span>单曲</span>
                    <span><i class="iconfont icon-bofang2"></i>播放全部</span>
                </div>
                <div class="title" v-show="activeIndex == 1">
                    <i class="iconfont icon-bofang2 left"></i>
                    <span class="left">播放全部</span>
                    <span class="blank"></span>
                    <i class="iconfont icon-bofangliebiao right"></i>
                    <span class="right">多选</span>
                </div>
                <ul class="songs">
                    <li v-for="(item, index) in song.songs" :key="index" @click="selectSong(index)" :style="{height: (item.alia.length != 0)? '80px': '60px'}">
                        <div class="song">
                            <span>{{ item.name }}<span v-if="item.alia.length != 0">({{ item.alia[0] }})</span></span>
                            <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.ar[0].name }} - {{ item.al.name}}</div>
                            <div class="alia" v-if="item.alia.length != 0">{{ item.alia[0] }}</div>
                        </div>
                        <i class="iconfont icon-ziyuan1"></i>
                        <i class="iconfont icon-gengduo1"></i>
                    </li>
                </ul>
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
import { mapGetters } from 'vuex';

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
            user: [] //用户
        }
    },
    components: {
        searchBar,
    },
    computed: {
        ...mapGetters([
            'searchingWord'
        ])
    },
    mounted() {
        this.initSlider();
        this.search();
    },
    methods: {
        //初始化搜索结果类型滑块
        initSlider() {
            const slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                click: true
            });
        },
        //搜索(综合)
        search(type=1018) {
            let that = this;
            search({
                keywords: that.searchingWord,
                type: type
            }).then(res => {
                console.log(res.data);
                that.song = res.data.result.song; //单曲
                that.cloud = res.data.result.mlog; //云村(mlog)
                that.video = res.data.result.video; //视频
                that.artist = res.data.result.artist; //歌手
                that.album = res.data.result.album; //专辑
                that.playlist = res.data.result.playList; //歌单
                that.djRadio = res.data.result.djRadio; //主播电台
                that.user = res.data.result.user; //用户
                // that.songs = res.data.result.song.songs, //单曲
                // that.clouds = res.data.result.mlog.mlogs, //云村(mlog)
                // that.videos = res.data.result.video.videos, //视频
                // that.artists = res.data.result.artist.artists, //歌手
                // that.albums = res.data.result.album.albums, //专辑
                // that.playlists = res.data.result.playList.playLists, //歌单
                // that.djRadios = res.data.result.djRadio.djRadios, //主播电台
                // that.users = res.data.result.user.users //用户
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
        .item-title {
            display: flex;
            height: 30px;
            justify-content: space-between;
            span:first-of-type {
                font-size: 18px;
                font-weight: bold;
            }
        }
        .search-bar {
            padding: 0 20px;
        }
        .slider-container {
            height: 40px;
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
        .songs-container.playlist {
            top: 0;
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
</style>