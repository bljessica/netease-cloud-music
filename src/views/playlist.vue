<template>
    <div class="playlist-container" :style="{background: 'url(' + playlist.coverImgUrl + ') center center'}">
        <div class="up-wrapper" :style="{backgroundImage: 'url(' + playlist.coverImgUrl + ')', zIndex: 1002}">
            <!-- 头部操作导航栏 -->
            <div class="nav">
                <i class="iconfont icon-zuo" @click="$router.push('/find')"></i>
                <span>歌单<i>&reg;</i></span>
                <span class="blank"></span>
                <i class="iconfont icon-sousuo"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <!-- 歌单信息 -->
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
        <div class="playlist">
            <div class="title">
                <i class="iconfont icon-ziyuan1"></i>
                <span>播放全部</span>
                <span>（共{{ songs.length }}首）</span>
            </div>
            <ul class="songs">
                <li v-for="(item, index) in songs" :key="index" @click="$router.push({name: 'playSong', params: {id: item.id, playlist: playlist}})">
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
            playlistActions: PLAYLIST_ACTIONS,
            actionsShow: true
        }
    },
    mounted() {
        this.getPlaylistDetail();
        window.addEventListener('scroll', () => {
            let that = this;
            //浏览器兼容
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop >= 230) {
                that.actionsShow = false;
            }
            else {
                that.actionsShow = true;
            }
        })
    },
    methods: {
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
        background-position: center center;
        .blank {
            flex-grow: 1;
        }
        .up-wrapper {
            // background-position: center center;
            color: white;
            position: relative;
            padding-top: 70px;
            position: sticky;
            position: -webkit-sticky;
            top: -230px;
            .nav {
                position: fixed;
                z-index: 1003;
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
                        color: gainsboro;
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
                    color: rgb(173, 173, 173);
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
                        color: rgb(173, 173, 173);
                        font-size: 14px;
                    }
                }
            }
        }
        .playlist {
            padding: 15px;
            border-radius: 20px;
            position: relative;
            // top: -15px;
            z-index: 1000;
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