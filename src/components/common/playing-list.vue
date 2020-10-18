<template>
<div class="playinglist-wrapper">
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
</template>

<script>
import { getPlaySongUrl } from '../../api/play';
import { mapGetters, mapMutations} from 'vuex';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            songs: [],
            originY: 0
        }
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'playingType',
            // 'player',
            'playingList'
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
        // this.songs = this.playingList.tracks;
        // console.log('get'+this.playingList)
        let that = this;
        this.$nextTick(() => {
            that.initSlider();
            // that.calcOriginY();
        })
    },
    methods: { 
        changeSong(index) {
            this.setPlayingSong(this.songs[index]);
            this.setLyricNow('');
            this.setCurrentTime(0);
            this.getPlaySongUrl();
            this.$emit('changeSong');
        },
        getPlaySongUrl() {
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
                let musicUrl = res.data.data[0].url;
                let obj = Object.assign(that.playingSong, {
                    musicUrl: res.data.data[0].url
                })
                that.setPlayingSong(obj);
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        calcOriginY() {
            this.songs = this.playingList.tracks;
            console.log(this.songs)
            console.log('get')
            //播放歌曲在歌单中的位置
            let index = 0;
            for(let i = 0; i < (this.songs).length; i++) {
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
                console.log(1)
                this.originY = 4 * 80 - height;
            }
            else {
                console.log(2)
                this.originY = -(index - 3) * 40;
            }
            // console.log(this.songs, index, maxIndex, -(index - 3), this.originY)
        },
        initSlider() {
            let slider = new BScroll(this.$refs.wrapper, {
                click: true,
                bounce: false
            });
        },
        getArtists(arArr) {
            let res = '';
            arArr.forEach(item => {
                res += item.name + '/';
            })
            return res.substring(0, res.length - 1);
        },
        ...mapMutations({
            setPlayingSong: 'SET_PLAYING_SONG',
            setPlayingType: 'SET_PLAYING_TYPE',
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER',
            setCurrentTime: 'SET_CURRENT_TIME',
            setLyricNow: 'SET_LYRIC_NOW'
        })
    }
}
</script>

<style lang="scss" scoped>
.playinglist-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 5000;
    .playinglist-container {
        background: white;
        position: absolute;
        left: 20px;
        right: 20px;
        bottom: 20px;
        border-radius: 20px;
        z-index: 5001;
        text-align: left;
        color: black;
        padding: 15px 10px 0 15px;
        .blank {
            flex-grow: 1;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            height: 30px;
            line-height: 30px;
            span {
                color: gray;
                font-size: 14px;
            }
        }
        .playinglist-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            margin-bottom: 10px;;
            font-size: 14px;
            .collect {
                padding-right: 15px;
            }
            i {
                color: rgba(128, 128, 128, 0.76);
            }
            &>i:first-of-type, .collect i {
                padding-right: 5px;
            }
            &>i:last-of-type {
                padding-left: 15px;
                display: inline-block;
                border-left: 1px solid gainsboro;
            }
        }
        .slider-wrapper {
            height: 320px;
            overflow: hidden;
            .songs {
                list-style-type: none;
                li {
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    &.active {
                        color: red;
                    }
                    i {
                        font-size: 18px;
                        padding: 0 5px;
                        &.icon-cuo {
                            font-size: 20px;
                            color: rgba(128, 128, 128, 0.76);
                        }
                    }
                    .name {
                        width: 200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .artist {
                            color: rgba(128, 128, 128, 0.76);
                            font-size: 12px;;
                        }
                    }
                }
            }
        }
    }
}
</style>