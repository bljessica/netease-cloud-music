<template>
    <div class="container">
        <div class="header-wrapper" :style="{backgroundImage: 'url(' + bgPicture + ')'}">
            <!-- 头部 -->
            <div class="header">
                <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
                <i class="iconfont icon-iconfontlipinduihuanbangzhu"></i>
            </div>
            <!-- 信息 -->
            <div class="name">
                <div class="num">
                    <span class="date">{{ getDate }}</span> / 
                    <span class="month">{{ getMonth }}</span>
                </div>
                <div class="info">
                    <div class="history">历史日推
                        <i class="iconfont icon-VIP"></i>
                    </div>
                    <span class="blank"></span>
                    <!-- <ul class="avatars">
                        <li></li>
                        <i class="iconfont icon-you"></i>
                    </ul> -->
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
                    <img class="cover" :src="item.al.picUrl" alt="">
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
import ColorThief from 'colorthief';

export default {
    data() {
        return {
            playlist: '',
            bgColor: '',
            bgPicture: ''
        }
    },
    mounted() {
        this.getDailySuggestPlaylist();
    },
    computed: {
        ...mapGetters([
            // 'playingSong',
            // 'playingList',
        ]),
        getDate() {
            return (new Date()).getDate();
        },
        getMonth() {
            return (new Date()).getMonth() + 1;
        }
    },
    methods: {
        getBgPicture() {
            let songs = this.playlist.dailySongs;
            let index = Math.floor(Math.random() * songs.length);
            this.bgPicture = songs[index].al.picUrl;
        },
        //背景取色(没用到)
        getBgColor() {
            let imgs = document.getElementsByClassName('cover');
            //随机选一张封面
            let domImg = imgs[Math.floor(Math.random() * imgs.length)];
            domImg.crossOrigin = '';
            let colorthief = new ColorThief();
            domImg.addEventListener('load', () => {
                let result = colorthief.getColor(domImg);
                this.bgColor = 'linear-gradient(to bottom, ';
                let color = 'rgba(';
                let flag = true;//是否r,g,b都大于70
                for(let i of result) {
                    if(i < 90) {
                        flag = false;
                    }
                }
                for(let i of result) {
                    if(flag) {
                        i -= 90;
                    }
                    color += parseInt(i) +',';
                }
                color = color.slice(0, color.length - 1);
                this.bgColor += color + ',1), ' + color + ',0.7))';
                console.log(this.bgColor);
            })
        },
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
                that.$nextTick(() => {
                    that.getBgPicture();
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
        overflow: hidden;
        .blank {
            flex-grow: 1;
        }
        .header-wrapper {
            // background: rgba(255, 0, 0, 0.774);
            background-size: cover;
            height: 180px;
            position: relative;
            .header {
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                i {
                    font-size: 24px;
                    color: white;
                }
            }
            .name {
                .num {
                    position: absolute;
                    left: 15px;
                    height: 30px;
                    bottom: 74px;
                    color: white;
                    .date {
                        font-size: 34px;;
                    }
                    .month {
                        font-size: 18px;
                    }
                }
                .info {
                    height: 55px;
                    position: absolute;
                    bottom: 20px;
                    left: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .history {
                        height: 20px;
                        padding: 2px 8px 5px;
                        background: gainsboro;
                        border-radius: 15px;
                        line-height: 20px;
                        font-size: 12px;
                        i {
                            font-size: 20px;
                            position: relative;
                            top: 2px;
                        }
                    }
                }
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