<template>
    <div class="lyric-container" @click.stop="coverShow">
        <div class="volumn-bar">
            <i class="iconfont icon-yinyue"></i>
            <span class="volumn-line">
                <span class="dot"></span>
            </span>
        </div>
        <div class="line-through" id="line-through" :style="{opacity: autoSlide == true? 0: 1}"></div>
        <!-- <v-touch @swipeup="swipeup" @swipedown="swipedown"> -->

        <div class="lyric-wrapper" ref="lyricWrapper">
             <!-- <ul class="lyric-content" :style="{top: topNow + 'px'}" id="lyrics"> -->
             <ul class="lyric-content" :style="{'transform': 'translateY(' + topNow + 'px)'}" id="lyrics">
                <!-- <br><br><br><br> -->
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li v-for="(item, index) in lyrics" :id="getLyricTime(item.time)" :key="index" 
                    :class="{'active': (currentTime == getLyricTime(item.time) || prevTime == getLyricTime(item.time))? true: false, 'select': select == index, 'lyric-line': true}">
                    <span class="lyric">{{ item.content }}</span>
                    <div class="tlyric" v-if="tlyric.length > 0 && index >= calcBetween">{{ tlyrics[index - calcBetween].content }}</div>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <!-- </v-touch> -->

    </div>
</template>

<script>
import { getLyrics } from '../../api/play';
import { mapGetters, mapMutations} from 'vuex';
import { getCurrentTime, getLyricTime } from '../../utils/processData';
import BScroll from '@better-scroll/core';

export default {
    data() {
        return {
            lyric: '',
            tlyric: '',
            lyrics: [],
            tlyrics: [],
            topNow: 0,
            timer: null,
            currentTime: '00:00',
            prevTime: '00:00',
            autoSlide: true,
            select: -1
        }
    },
    computed: {
        ...mapGetters([
            'playingSong',
            'player',
            'lyricNow'
        ]),
        calcBetween() {
            return this.lyrics.length - this.tlyrics.length;
        }
    },
    mounted() {
        // console.log('mount')
        this.getLyrics();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        refresh() {
            clearInterval(this.timer);
            this.getLyrics();
        },
        ...mapMutations({
            setLyricNow: 'SET_LYRIC_NOW',
            setCurrentTime: 'SET_CURRENT_TIME',
            setLyricNow: 'SET_LYRIC_NOW',
            setLyrics: 'SET_LYRICS'
        }),
        initSlider() {
            // console.log(this.$refs.lyricWrapper)
            let that = this;
            this.$nextTick(() => {
                let slider = new BScroll(that.$refs.lyricWrapper, {
                    scrollX: false,
                    scrollY: true,
                    // click: true,
                    bounce: false,
                    probeType: 3 // 默认不会调用scroll回调，3不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
                });
                slider.on('scroll', () => {
                    that.autoSlide = false;
                    let y = slider.y;
                    that.topNow = y;
                    //滑动到的歌词要亮一些
                    //获取ul
                    let lyricNode = document.getElementById('lyrics');
                    let totalY = lyricNode.offsetHeight;
                    let lyricsNum = that.lyrics.length;
                    //进度(应该active的li的索引)
                    let process = that.findSelectLi(y);
                    let node = document.getElementById(that.lyrics[process].time);
                    that.select = process;
                });
                slider.on('scrollEnd', () => {
                    that.select = -1;
                    let y = slider.y;
                    //获取ul
                    let lyricNode = document.getElementById('lyrics');
                    let totalY = lyricNode.offsetHeight;
                    let lyricsNum = that.lyrics.length;
                    //进度(应该active的li的索引)
                    let process = that.findSelectLi(y);
                    let node = document.getElementById(that.lyrics[process].time);
                    that.prevTime = (that.lyrics[process]).time;
                    that.setCurrentTime(that.timeToSeconds(that.prevTime));
                    that.setLyricNow((that.lyrics[process]).content);
                    // console.log(that.lyricNow)
                    that.player.currentTime = that.timeToSeconds(that.prevTime);
                    that.autoSlide = true;
                });
            })
            
        },
        findSelectLi(parentTop) {
            parentTop += 30;
            let line = document.getElementById('line-through');
            let nodes = document.getElementsByClassName('lyric-line');
            let top = line.offsetTop;
            for(let i = 0; i < nodes.length; i++) {
                if(nodes[i].offsetTop + parentTop <= top && nodes[i].offsetTop + parentTop + nodes[i].offsetHeight >= top) {
                    return i;
                }
            }
            return 0;
        },
        timeToSeconds(time) {
            let times = time.split(':');
            let minutes = Number(times[0]), seconds = Number(times[1]);
            return minutes * 60 + seconds;
        },
        findPrevTime() {
            let time = '00:00';
            for(let item of this.lyrics) {
                if(getCurrentTime(Math.floor(this.player.currentTime)) > item.time) {
                    time = item.time;
                }
                else {
                    this.prevTime = time;
                    this.$nextTick(() => {
                        let node = document.getElementById(this.prevTime);
                        this.topNow = 180 - node.offsetTop;
                        return;
                    })
                }
            }
        },
        startSlide() {
            let that = this;
            this.timer = setInterval(() => {
                that.currentTime = getCurrentTime(Math.floor(this.player.currentTime));
                let node = document.getElementById(that.currentTime)
                if(node) {
                    that.prevTime = that.currentTime;
                    that.setLyricNow(node.children[0].innerHTML);
                }
                if(node && that.autoSlide) {
                    that.topNow = 180 - node.offsetTop;
                }
            }, 1000);
        },
        getLyricTime: getLyricTime,
        getLyricsArr() {
            let tmpArr = this.lyric.split('[');
            this.lyrics = [];
            for(let i = 0; i < tmpArr.length; i++) {
                let tmp = tmpArr[i];
                let content = tmp.split(']')[1];
                if(content && content.length > 0 && content != '\n') {
                    this.lyrics.push({
                        content: content,
                        time: (tmp.split(']')[0]).slice(0, 5)
                    });
                }
            }
            // this.setLyrics(this.lyrics);
            if(this.tlyric.length > 0) {
                tmpArr = this.tlyric.split('[');
                this.tlyrics = [];
                for(let i = 0; i < tmpArr.length; i++) {
                    let tmp = tmpArr[i];
                    let content = tmp.split(']')[1];
                    if(content && content.length > 0 && content != '\n') {
                        this.tlyrics.push({
                            content: content,
                            time: (tmp.split(']')[0]).slice(0, 5)
                        });
                    }
                }
                // console.log(this.lyrics,this.tlyrics, this.calcBetween)
            }
        },
        coverShow() {
            this.$emit('coverShow');
        },
        getLyrics() {
            let that = this;
            getLyrics({
                id: that.playingSong.id
            }).then(res => {
                console.log(res.data);
                if(res.data.nolyric) {
                    that.lyric = '暂无歌词';
                    that.lyrics = [{
                        content: '暂无歌词',
                        time: ''
                    }];
                    that.setLyricNow('暂无歌词');
                }
                else {
                    that.lyric = res.data.lrc.lyric;
                    if(res.data.tlyric.lyric) {
                        that.tlyric = res.data.tlyric.lyric;
                    }
                    that.getLyricsArr();
                    that.startSlide();
                    that.findPrevTime();
                    that.initSlider();
                }
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
    .lyric-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 70px;
        bottom: 165px;
        overflow: hidden;
        .volumn-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            padding: 0 30px;
            i {
                font-size: 14px;
            }
            .volumn-line {
                height: 1px;
                background: rgba(220, 220, 220, 0.425);
                flex-grow: 1;
                margin: 0 10px;
                position: relative;
                .dot {
                    position: absolute;
                    top: -3px;
                    left: 0;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: white;
                }
            }
        }
        .line-through {
            height: 1px;
            background: rgba(220, 220, 220, 0.185);
            position: absolute;
            top: 220px;
            left: 50px;
            right: 50px;
            z-index: 1000;

        }
        .lyric-wrapper {
            position: absolute;
            // left: 0;
            // right: 0;
            width: 100%;
            top: 30px;
            bottom: 0;
            overflow: hidden;
            .lyric-content {
                position: absolute;
                // top: 200px;
                // transition: 0s;
                // left: 0;
                width: 100%;
                // right: 0;
                // line-height: 40px;
                color: rgba(220, 220, 220, 0.719);
                li {
                    margin-bottom: 15px;
                    &.active {
                        color: white;
                    }
                    &.select {
                        color: rgba(220, 220, 220, 0.226);
                    }
                }
            }
        }
    }
</style>