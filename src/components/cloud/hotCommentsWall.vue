<template>
    <div class="container" :style="{background: bgColor}">
        <div class="header">
            <i class="back iconfont icon-zuo" @click="$router.push('/cloud')"></i>
            <span class="title">热评墙</span>
            <span class="progress">{{ curIndex + 1 }}/{{ total }}</span>
        </div>
        <!-- v-touch监听滑动事件 -->
        <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
            <div class="content-box">
                <span class="follow">
                    <img :src="hotWall[curIndex]? hotWall[curIndex].simpleUserInfo.avatar: ''" alt="" class="avatar">
                    <span>+ 关注</span>
                </span>
                <div class="before-content">
                    <i class="iconfont icon-shangyinhao"></i>
                </div>
                <p class="content">{{ hotWall[curIndex]? hotWall[curIndex].content: '' }}</p>
                <div class="song">
                    <span class="song-name">{{ hotWall[curIndex]? hotWall[curIndex].simpleResourceInfo.name: '' }}</span>
                    &nbsp;-&nbsp; 
                    <span class="song-singer">{{ getArtists }}</span>
                    <i class="iconfont icon-jindu"></i>
                    <i class="iconfont like" :key="likeKey" @click="likeThis" :class="{'icon-icon-test': likes[curIndex] == false? true: false, 'icon-aixin animate__animated animate__bounceIn': likes[curIndex] == true? true: false}"></i>
                </div>
            </div>
            <!-- 下方滚动的评论 -->
            <div class="comment-box">
                <div>
                    <img src="" alt="" class="avatar">
                    <span></span>
                </div>
            </div>
        </v-touch>
        <div class="say-something">
            <input type="text" placeholder="说点什么吧~">
            <div class="comment-num">
                <i class="iconfont icon-jianyi"></i>
                <span class="num">{{ hotWall[curIndex]? hotWall[curIndex].replyCount: 0 }}</span>
            </div>
            <div class="like-num">
                <i class="iconfont icon-zan1"></i>
                <span class="num">{{ getLikedCount }}</span>
            </div>
            <i class="iconfont icon-fenxiang"></i>
        </div>
        <!-- <play-bar v-if="$store.getters.playingSong.id" style="visibility: hidden"></play-bar> -->
    </div>
</template>

<script>
// import playBar from '../common/play-bar';
import { getHotWall, likeComment } from '../../api/cloud';

export default {
    components: {
        // playBar
    },
    data() {
        return {
            hotWall: [], //热评墙数据
            total: 0,
            curIndex: 0, 
            likes: [], //记录评论喜爱情况
            likeKey: 0, //控制组件刷新，
            bgColor: '' //背景色
        }
    },
    created() {
        this.getHotWall();
        this.bgColor = 'linear-gradient(to bottom, ' + this.getRandomColor() + ', rgba(0, 0, 0, 0.875))'
    },
    computed: {
        //获取作者名字符串
        getArtists() {
            if(!this.hotWall[this.curIndex]) {
                return '';
            }
            let artists = this.hotWall[this.curIndex].simpleResourceInfo.artists;
            let res = '';
            artists.forEach(item => {
                res += item.name + '，';
            });
            return res.substring(0, res.length - 1);
        },
        //获取评论喜爱数
        getLikedCount() {
            if(!this.hotWall[this.curIndex]) {
                return '';
            }
            if(this.hotWall[this.curIndex].likedCount > 999) {
                return '999+';
            }
            else {
                return this.hotWall[this.curIndex].likedCount;
            }
        }
    },
    methods: {
        //获取随机颜色
        getRandomColor() {
            let color = 'rgba(' + Math.floor(Math.random() * 106) + ', ' + Math.floor(Math.random() * 80) + ", " + Math.floor(Math.random() * 80) + ', 0.8)';
            return color;
        },
        //点赞或取消点赞
        likeThis() {
            let that = this;
            let t = 0;
            if(this.likes[this.curIndex]) {
                t = 0;//取消点赞
            }
            else {
                t = 1;//点赞
            }
            console.log(t)
            likeComment({
                id: that.hotWall[that.curIndex].simpleResourceInfo.songId,
                cid: that.hotWall[that.curIndex].id,
                t: t,
                type: 0 //歌曲
            }).then(res => {
                console.log(res.data);
                if(res.data.code === 200) {
                    that.likes[that.curIndex] = !that.likes[that.curIndex];
                    // console.log(that.likes)
                    that.likeKey++;
                }
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        //左滑
        swiperleft() {
            if(this.curIndex == this.total - 1) {
                return;
            }
            this.curIndex++;
        },
        //右滑
        swiperright() {
            if(this.curIndex == 0) {
                return;
            }
            this.curIndex--;
        },
        //获取热评墙数据
        getHotWall() {
            let that = this;
            getHotWall().then(res => {
                console.log(res.data);
                that.hotWall = res.data.data;
                that.total = that.hotWall.length;
                that.likes = [];
                that.hotWall.forEach(item => {
                    that.likes.push(item.liked);
                })
                console.log(that.likes)
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
.container {
    color: white;
    padding: 0 20px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .header {
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
            font-size: 18px;
            display: inline-block;
            padding: 10px 15px 10px 0;
        }
        .title {
            font-size: 18px;
            flex-grow: 1;
            text-align: left;
        }
        .progress {
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
        }
    }
    .content-box {
        .follow {
            margin-top: 60px;
            height: 36px;
            width: 85px;
            background: rgba(95, 94, 94, 0.911);
            border-radius: 18px;
            display: flex;
            justify-content: flex-start;
            img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: inline-block;
            }
            span {
                line-height: 36px;
                padding-left: 5px;
                font-size: 12px;
            }
        }
        .before-content {
            font-size: 50px;
            color: rgb(206, 201, 201);
            text-align: left;
        }
        .content {
            font-size: 22px;
            text-align: left;
        }
        .song {
            margin-top: 20px;
            font-size: 14px;
            color: rgba(220, 220, 220, 0.63);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .like.icon-aixin {
                color: rgba(255, 0, 0, 0.884);
            }
            i {
                padding-left: 10px;
                &.like {
                    font-size: 20px;
                }
            }
        }
    }
    .comment-box {

    }
    .say-something {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: rgb(77, 76, 76);
        input {
            background: transparent;
            border: none;
            outline: none;
            color: white;
        }
        i {
            font-size: 22px;
        }
        .comment-num {
            i {
                font-size: 26px;
            }
        }
        .comment-num, .like-num {
            position: relative;
            span {
                position: absolute;
                right: -18px;
                top: -5px;
                font-size: 8px;
            }
        }
    }
}
</style>