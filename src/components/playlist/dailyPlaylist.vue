<template>
    <div class="container">
        <div class="header-wrapper">
            <!-- 头部 -->
            <div class="header">
                <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
                <i class="iconfont icon-iconfontlipinduihuanbangzhu"></i>
            </div>
            <!-- 信息 -->
            <div class="name">
                <div class="num">{{ }} / {{ }}</div>
                <div class="info">
                    <span>历史日推<i class="iconfont icon-VIP"></i></span>
                    <span class="blank"></span>
                    <ul class="avatars">
                        <li></li>
                        <i class="iconfont icon-you"></i>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 歌单 -->
        <div class="playlist">
            <div class="title">
                <i class="iconfont icon-bofang2 left"></i>
                <span class="left">播放全部</span>
                <span class="blank"></span>
                <i class="iconfont icon-bofangliebiao right"></i>
                <span class="right">多选</span>
            </div>
            <ul class="songs">
                <li v-for="(item, index) in playlist.dailySongs" :key="index" @click="selectSong(index)">
                    <img :src="item.al.picUrl" alt="">
                    <div class="song">
                        <span>{{ item.name }}<span v-if="item.alia.length != 0">({{ item.alia[0] }})</span></span>
                        <div><span class="only">独家</span><span class="SQ">SQ</span>{{ item.ar[0].name }} - {{ item.al.name}}</div>
                    </div>
                    <i class="iconfont icon-ziyuan1"></i>
                    <i class="iconfont icon-gengduo1"></i>
                </li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getDailySuggestPlaylist } from '../../api/find';
import { mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            playlist: ''
        }
    },
    mounted() {
        this.getDailySuggestPlaylist();
    },
    computed: {
        ...mapGetters([
            // 'playingSong',
            // 'playingList',
        ])
    },
    methods: {
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingList: 'SET_PLAYING_LIST',
        }),
        //选择一首歌播放
        selectSong(index) {   
            this.setPlayingSong(this.playlist.dailySongs[index]);
            this.setPlayingList({
                name: '今日推荐',
                tracks: this.playlist.dailySongs
            });
            this.$emit('selectSong');
        },
        // 歌曲作者
        getArtist(arArr) {
            let res = '';
            for(let i of arArr) {
                res += i.name + '，';
            }
            res = res.substring(0, res.length - 1);
            return res;
        },
        //获取日推歌单
        getDailySuggestPlaylist() {
            this.$emit('beforeLoad');
            let that = this;
            getDailySuggestPlaylist().then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.playlist = res.data.data;
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
        overflow: hidden;
        .blank {
            flex-grow: 1;
        }
        .header-wrappe {
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        .playlist {
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
            .songs {
                li {
                    img {
                        width: 44px;
                        flex: 0 0 44px;
                        height: 44px;
                        border-radius: 5px;
                    }
                    .song {
                        margin-left: 10px;
                        width: 70%;
                    }
                }
            }
        }
    }
</style>