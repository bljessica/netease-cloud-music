<template>
    <div class="container" :style="{background: bgColor}">
        <!-- 头部操作导航栏 -->
        <play-header></play-header>
        <!-- 播放棒 -->
        <div class="stick" :class="{playing: isPlaying == true}" v-show="onShow === 1"></div>
        <!-- 音乐封面 -->
        <div class="nav-to-lyric-wrapper" v-show="onShow === 1" @click.stop="showLyrics">
            <div class="wrapper"> 
                <img ref="picture" v-if="playingSong.al" :src="playingSong.al.picUrl" alt="专辑封面" :style="{transform: 'rotate(' + angle + 'deg)'}">
            </div>
        </div>
        <!-- 歌词 -->
        <div class="lyric-container" v-show="onShow === 2" @click.stop="onShow = 1">
            <div class="volumn-bar">
                <i class="iconfont icon-yinyue"></i>
                <span class="volumn-line">
                    <span class="dot"></span>
                </span>
            </div>
            <div class="line-through" id="line-through" :style="{opacity: autoSlide == true? 0: 1}"></div>
            <div class="lyric-wrapper" ref="lyricWrapper">
                <ul class="lyric-content" :style="{'transform': 'translateY(' + topNow + 'px)'}" id="lyrics">
                    <!-- <br><br><br><br> -->
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li v-for="(item, index) in lyrics" :id="item.time" :key="index" 
                        :class="{'active': (prevTime == item.time)? true: false, 'select': select == index, 'lyric-line': true}">
                        <span class="lyric">{{ item.content }}</span>
                        <div class="tlyric" v-if="item.tcontent">{{ item.tcontent }}</div>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <!-- 操作栏 --> 
        <div class="actions">
            <div class="actions-up">
                <i class="iconfont" :class="{'icon-icon-test': true, 'icon-aixin': false}"></i>
                <i class="iconfont icon-xiazai"></i>
                <i class="iconfont icon-luyin"></i>
                <i class="iconfont icon-jianyi" @click.stop="$router.push('/songComment')"></i>
                <i class="iconfont icon-gengduo1"></i>
            </div>
            <!-- 播放进度 -->
            <div class="playing-progress">
                <span class="now">{{ secondsToStr(Math.floor(currentTime)) }}</span>
                <span class="line" ref="line" @click="jumpToprogress">
                    <span class="dot" ref="dot" id="dot" :style="{left: dotLeft + 'px'}"></span>
                    <span class="line-left"  :style="{width: dotLeft + 'px'}"></span>
                </span>
                <span class="total">{{ secondsToStr(Math.floor(duration)) }}</span>
            </div>
            <div class="actions-down">
                <i class="iconfont" @click="setPlayingType" :class="{'icon-xunhuan': playingType === 0, 'icon-icon--': playingType === 1, 'icon-danquxunhuan': playingType === 2}"></i>
                <i class="iconfont icon-047caozuo_shangyishou" @click="prevSong"></i>
                <i class="iconfont" @click="changePlay" :class="{'icon-zanting_huaban': isPlaying == true, 'icon-bofang2': isPlaying === false}"></i>
                <i class="iconfont icon-048caozuo_xiayishou" @click="nextSong"></i>
                <i class="iconfont icon-bofangliebiao" @click.stop="showList"></i>
            </div>
        </div>
        <!-- 播放列表 -->
        <div class="playinglist-wrapper" ref="playinglist" v-show="playingListShow" :key="listKey">
            <div class="playinglist-container">
                <div class="title">当前播放<span>（{{ songs? songs.length: 0 }}）</span></div>
                <div class="playinglist-actions">
                    <i class="iconfont" @click.stop="setPlayingType" :class="{'icon-xunhuan': playingType == 0, 'icon-icon--': playingType == 1, 'icon-danquxunhuan': playingType == 2}"></i>
                    <span @click.stop="setPlayingType">{{ typeName }}</span>
                    <span class="blank"></span>
                    <span class="collect"><i class="iconfont icon-xing"></i>收藏全部</span>
                    <i class="iconfont icon-zuo"></i>
                </div>
                <div class="slider-wrapper" ref="wrapper">
                    <ul class="songs" id="songs" :style="{transform: 'translateY(' + originY + 'px)'}">
                        <li v-for="(item, index) in songs" :key="index" @click.stop="changeSong(index)"
                            :class="{active: (item.id) == (playingSong.id)? true: false}">
                            <i class="iconfont icon-icon-test1 active-icon" v-if="item.name == playingSong.name"></i>
                            <span class="name">
                                {{ item.name }}
                                <span class="artist">- {{ item.ar? getArtists(item.ar): (item.artists? getArtists(item.artists): '') }}</span>
                            </span>
                            <span class="blank"></span>
                            <i class="iconfont icon-cuo" @click.stop="deleteFromPlayingList(item.id)"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import playHeader from '../header/play-header';
import { secondsToStr, strToSeconds } from '../../common/js/processData';
import { mapGetters, mapMutations } from 'vuex';
import ColorThief from 'colorthief';
import BScroll from '@better-scroll/core';

export default {
    components: {
        playHeader,
    },
    data() {
        return {
            bgColor: '',
            onShow: 1, //1显示封面，2显示歌词
            angle: 0,
            slidingLyrics :false,
            topNow: -90,
            dotLeft: 0,
            autoSlide: true, //歌词自动滚动（未滑动）
            prevTime: '00:00', //要高亮的歌词的时间XX:XX
            select: -1, //手动滑歌词选中的歌词
            timer: null,
            rotateTimer: null,
            slider: null,
            playingListShow: false, //是否显示播放列表
            songs: [], //播放列表
            originY: 0, //初始播放列表滑块位置
            listSlider: null,
            listKey: 0
        }
    },
    mounted() {
        let that = this;
        this.songs = this.playingList.tracks;
        console.log(this.isPlaying)
        if(this.isPlaying) {
            clearInterval(this.rotateTimer);
            this.initRotateTimer();
        }
        else {
            clearInterval(this.rotateTimer);
        }
        setTimeout(() => {
            that.getBgColor();
        }, 20);
        that.startTimer();
        that.initListSlider(); //播放列表
        // that.initRotateTimer();
        this.$nextTick(() => {
            that.initSlider(); //歌词
        })
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow === true && className !== 'playinglist-container') {
                this.playingListShow = false;
            }
        })
    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.rotateTimer);
    },
    computed: {
        ...mapGetters([
            'isPlaying',
            'playingSong',
            'currentTime',
            'playingType',
            'duration',
            'playingList',
            'player',
            'lyricNow',
            'lyrics',
            // 'playingTimer'
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
    methods: {
        //删除播放列表中的歌
        deleteFromPlayingList(id) {
            // let newList = this.playingList.tracks, index = 0;
            // for(let i = 0; i < newList.length; i++) {
            //     if(newList[i].id === id) {
            //         index = i;
            //         break;
            //     }
            // }
            // // newList[index] = null;
            // newList.pop(index);
            // console.log(index)
            // this.setPlayingList({
            //     name: '临时歌单',
            //     tracks: newList
            // });
            // this.songs = newList;
            // this.listKey++;
            // this.$nextTick(() => {
            //     this.listSlider.refresh();
            // })
        },
        //播放列表自由切歌
        changeSong(index) {
            this.$emit('changeSong', index);
            this.calcOriginY();
        },
        //初始化播放列表滑块
        initListSlider() {
            if(!this.listSlider) {
                this.listSlider = new BScroll(this.$refs.wrapper, {
                    click: true,
                    bounce: false
                });
            }
        },
        //拼接歌手字符串
        getArtists(arArr) {
            let res = '';
            if(arArr.length === 0) {
                return '未知';
            }
            arArr.forEach(item => {
                res += item.name + '/';
            })
            return res.substring(0, res.length - 1);
        },
        //显示播放列表
        showList() {
            this.playingListShow = true;
            this.calcOriginY();
        },
        //计算播放歌曲在歌单中的位置，设置滑块初始位移
        calcOriginY() {
            if(this.songs.length < 8) {
                this.originY = 0;
                return;
            }
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
            let height = 40 * this.songs.length;
            if(index >= maxIndex - 4) {
                this.originY = 40 * 8 - height;
            }
            else {
                this.originY = -(index - 3) * 40;
            }
        },
        //显示歌词页
        showLyrics() {
            this.onShow = 2;
            this.findPrevTime();
        },
        //专辑图片转动，刷新滑块
        initRotateTimer() {
            let that = this;
            this.rotateTimer = setInterval(() => {
                that.slider.refresh();
                that.listSlider.refresh();
                that.angle += 0.2;
                if(that.angle > 360) {
                    that.angle %= 360;
                }
            }, 15)
        },
        //歌词和进度小圆点自动滚动
        startTimer() {
            this.timer = setInterval(() => {
                let node = document.getElementById(secondsToStr(Math.floor(this.currentTime)));
                if(this.autoSlide && node) {
                    this.topNow = 180 - node.offsetTop;
                }
                let width = this.$refs.line.offsetWidth;
                this.dotLeft = width * (this.player.currentTime / this.player.duration);
                //找到应该高亮歌词的XX:XX时间，高亮歌词
                this.findPrevTime();
            }, 100);
            
        },
        //点击进度条跳转歌曲进度
        jumpToprogress() {  
            let e = event || window.event;
            let width = this.$refs.line.offsetWidth;
            this.dotLeft = e.offsetX;
            this.player.currentTime = this.player.duration * this.dotLeft / width;
            this.setCurrentTime(this.player.currentTime);
        },
        //找到应该高亮歌词的XX:XX时间并定位歌词到屏幕中间
        findPrevTime() { 
            //纯音乐
            if(this.lyrics.length == 1 && this.lyrics[0].content === '纯音乐，请欣赏') {
                this.topNow = 0;
            }
            let time = '00:00';
            //在歌词最前面
            if(secondsToStr(Math.floor(this.player.currentTime)) < this.lyrics[0].time) {
                this.prevTime = '00:00';
                let node = document.getElementById(this.lyrics[0].time);
                if( this.autoSlide && node) {
                    this.topNow = 180 - node.offsetTop;
                    return;
                }
            }
            for(let item of this.lyrics) {
                if(secondsToStr(Math.floor(this.player.currentTime)) > item.time) {
                    time = item.time;
                }
                else {
                    this.prevTime = time;
                    let that = this;
                    if(this.currentTimeInLyrics()) {
                        this.prevTime = secondsToStr(Math.floor(this.player.currentTime));
                    }
                    let node = document.getElementById(this.prevTime);
                    if( that.autoSlide && node) {
                        that.topNow = 180 - node.offsetTop;
                        return;
                    }
                }
            }
            //到歌词的最后了
            this.prevTime = this.lyrics[this.lyrics.length - 1].time;
            let node = document.getElementById(this.prevTime);
            if( this.autoSlide && node) {
                this.topNow = 180 - node.offsetTop;
                return;
            }
        },
        //当前时间是否对应歌词
        currentTimeInLyrics() {
            for(let item of this.lyrics) {
                if(secondsToStr(Math.floor(this.player.currentTime)) === item.time) {
                    return true;
                }
            }
            return false;
        },
        //秒数->XX:XX
        secondsToStr: secondsToStr,
        //初始化歌词手动滑动滑块
        initSlider() {
            let that = this;
            if(!this.slider) {
                this.slider = new BScroll(that.$refs.lyricWrapper, {
                    click:true,
                    bounce: false,
                    probeType: 3 // 默认不会调用scroll回调，3不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
                });
            }
            this.slider.on('scroll', () => {
                that.autoSlide = false;
                let y = that.slider.y;
                that.topNow = y;
                // console.log(y)
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
            this.slider.on('scrollEnd', () => {
                that.select = -1;
                let y = that.slider.y;
                // console.log(y)
                //获取ul
                let lyricNode = document.getElementById('lyrics');
                let totalY = lyricNode.offsetHeight;
                let lyricsNum = that.lyrics.length;
                //进度(应该active的li的索引)
                let process = that.findSelectLi(y);
                let node = document.getElementById(that.lyrics[process].time);
                that.prevTime = (that.lyrics[process]).time;
                that.setCurrentTime(strToSeconds(that.prevTime));
                that.setLyricNow((that.lyrics[process]).content);
                // console.log(that.lyricNow)
                that.player.currentTime = strToSeconds(that.prevTime);
                that.autoSlide = true;
            });
        },
        //寻找手滑动选中的那个歌词
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
        //播放/暂停
        changePlay() {
            if(this.isPlaying) {
                clearInterval(this.rotateTimer);
                this.$emit('stop');
            }
            else {
                this.initRotateTimer();
                this.$emit('play');
            }
        },
        //切到上一首歌
        prevSong() {
            this.$emit('prevSong');
        },
        //切到下一首歌
        nextSong() {
            this.$emit('nextSong');
        },
        //背景取色
        getBgColor() {
            let domImg = this.$refs.picture;
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
                this.bgColor += color + ',1), ' + color + ',0.7))'
            })
        },
        ...mapMutations({
            setPlayingType: 'SET_PLAYING_TYPE',
            setLyricNow: 'SET_LYRIC_NOW',
            setCurrentTime: 'SET_CURRENT_TIME',
            setPlayingList: 'SET_PLAYING_LIST',
        }),
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/styles/playing-list';
</style>

<style lang="scss" scoped>
    .container {
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8),  rgba(0, 0, 0, 0.3));
        color: gainsboro;
        padding: 0 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .stick {
            background: url('../../assets/stick.png');
            // background-size: 100% 100%;
            height: 100px;
            width: 135px;
            position: absolute;
            left: calc(50% - 10px);
            z-index: 1000;
            transform-origin: 11px 11px;
            transform: rotate(0);
            transition: .5s;
            &.playing {
                transform: rotate(25deg);
                transition: .5s;
            }
        }
        .nav-to-lyric-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            top: 70px;
            bottom: 165px;
            .wrapper {
                background: url('../../assets/record.png');
                background-size: 100% 100%;
                height: 250px;
                width: 250px;
                position: relative;
                margin: 70px auto 0;
                border: 5px solid rgb(135, 142, 156);
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 170px;
                    height: 170px;
                    border-radius: 50%;
                    position: absolute;
                    top: 40px;
                    left: 40px;
                    transition: 0;
                    display: block;
                }
            }
        }
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
                left: 0;
                right: 0;
                top: 30px;
                bottom: 0;
                overflow: hidden;
                .lyric-content {
                    position: absolute;
                    width: 100%;
                    color: rgba(220, 220, 220, 0.719);
                    transition: .5s;
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
        .actions {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .actions-up {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 70px;
                padding: 0 15px;
                i {
                    font-size: 26px;
                }
            }
            .playing-progress {
                font-size: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                -webkit-transform: scale(0.9);
                .line {
                    flex-grow: 1;
                    background: gainsboro;
                    margin: 0 10px;
                    height: 1px;
                    // padding: 5px 0;
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
                    .line-left {
                        position: absolute;
                        left: 0;
                        height: 1px;
                        background: white;
                    }
                }
            }
            .actions-down {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 70px;
                padding: 0 15px;
                margin-bottom: 10px;
                i {
                    font-size: 26px;
                    &.icon-ziyuan1, &.icon-bofang2 {
                        font-size: 44px;
                    }
                    &.icon-zanting_huaban {
                        font-size: 44px;
                    }
                }
            }
        }
    }
</style>