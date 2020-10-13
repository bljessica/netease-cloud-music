<template>
    <div class="playlist-container">
        <!-- 头部操作导航栏 -->
        <div class="nav">
            <i class="iconfont icon-zuo"></i>
            <span>歌单&reg;</span>
            <i class="iconfont icon-sousuo"></i>
            <i class="iconfont icon-gengduo1"></i>
        </div>
        <!-- 歌单信息 -->
        <div class="info">
            <div class="picture" :style="{backgroundImage: 'url(' + playlist.coverImgUrl + ')'}">
                <i class="iconfont icon-bofangsanjiaoxing"></i>
                <span>{{ playlist.playCount }}</span>
            </div>
            <div class="name">
                <span>{{ playlist.name }}</span>
                <div v-if="playlist.creator">
                    <img :src="playlist.creator.avatarUrl" alt="">
                    <span>{{ playlist.creator.nickname }}</span>
                    <i class="iconfont icon-you"></i>
                </div>
                <div class="blank"></div>
                <div>编辑信息<i class="iconfont icon-you"></i></div>
            </div>
        </div>
        <!-- 操作 -->
        <ul class="actions">
            <li v-for="(item, index) in playlistActions" :key="index">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </li>
        </ul>
        <!-- 歌曲信息 -->
        <div class="playlist">
            <div class="title">
                <i class="iconfont icon-ziyuan1"></i>
                <span>播放全部</span>
                <span>共{{ songs.length }}首</span>
            </div>
            <ul class="songs">
                <li v-for="(item, index) in songs" :key="index">
                    <span>{{ item.no }}</span>
                    <div class="song">
                        <span>{{ item.name }}<span v-if="item.alia.length != 0">({{ item.alia[0] }})</span></span>
                        <span>{{ item.ar[0].name }}-{{ item.al.name}}</span>
                    </div>
                    <i class="iconfont icon-ziyuan1"></i>
                    <i class="iconfont icon-gengduo1"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getPlaylistDetail } from '../api/play';
import { PLAYLIST_ACTIONS } from '../consts/const';

export default {
    data() {
        return {
            playlist: {},
            songs: [],
            playlistActions: PLAYLIST_ACTIONS
        }
    },
    mounted() {
        this.getPlaylistDetail();
    },
    methods: {
        getPlaylistDetail() {
            let that = this;
            getPlaylistDetail({
                id: that.$route.params.id
            }).then(res => {
                console.log(res.data);
                that.playlist = res.data.playlist;
                that.songs = res.data.playlist.tracks;
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
        .nav {
            padding: 20px;
            
        }
    }
</style>