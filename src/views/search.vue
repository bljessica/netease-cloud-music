<template>
    <div class="container">
        <!-- 搜索框 -->
        <search-bar class="search-bar"></search-bar>
        <!-- 广告 -->

        <!-- 搜索历史 -->

        <!-- 热搜榜 -->
        <div class="rank">
            <div class="title">
                <span>热搜榜</span>
                <span>
                    <i class="iconfont icon-bofang1"></i>
                    播放全部
                </span>
            </div>
            <ul class="wrapper">
                <li v-for="(item, index) in hotRankShow" :key="index" :class="{top: index < 3? true: false}"  @click="$router.push({name: 'searchTo', params: {word: item.searchWord}})">
                    <span class="num">{{ index + 1 }}</span>
                    <span class="name">{{ item.searchWord }}</span>
                    <span class="hot">HOT</span>
                </li>
                <div class="more" v-if="hotRankShow.length <= 10" @click="detailHotRank">展开更多热搜<i class="iconfont icon-xia"></i></div>
            </ul>
        </div>
        <!-- 分类 -->
        <!-- <ul class="sections">
            <li v-for="(item, index) in sections" :key="index">

            </li>
        </ul> -->
    </div>
</template>

<script>
import searchBar from '../components/search/search-bar';
import { detailHotRank } from '../api/search';
export default {
    data() {
        return {
            hotRank: [],
            hotRankShow: [],
        }
    },
    components: {
        searchBar
    },
    mounted() {
        this.hotSearchRank();
    },
    methods: {
        detailHotRank() {
            this.hotRankShow = this.hotRank;
        },
        hotSearchRank() {
            let that = this;
            detailHotRank().then(res => {
                console.log(res.data);
                that.hotRank = res.data.data;
                that.hotRankShow = that.hotRank.slice(0, 10);
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
        background: white;
        padding: 0 20px;
        .search-bar {
            z-index: 1000;
            position: relative;
        }
        .rank {
            position: absolute;
            top: 50px;
            // z-index: -1;
            .title {
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid gainsboro;
                span:first-of-type {
                    font-weight: bold;
                }
                span:last-of-type {
                    border-radius: 15px;
                    border: 1px solid gainsboro;
                    font-size: 14px;
                    padding: 3px 10px;
                    i {
                        font-size: 12px;
                    }
                }
            }
            .wrapper {
                margin-top: 10px;
                list-style-type: none;
                li {
                    height: 40px;
                    width: 50%;
                    float: left;
                    text-align: left;
                    font-size: 14px;
                    display: flex;
                    // justify-content: space-around;
                    align-items: center;
                    &.top {
                        font-weight: bold;
                        .num {
                            color: red;
                        }
                    }
                    .num {
                        font-size: 16px;
                        padding-right: 10px;
                    }
                    .name {
                        // flex-grow: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .hot {
                        font-weight: bold;
                        color: red;
                        font-style: italic;
                        padding-right: 10px;
                        padding-left: 10px;
                    }
                }
                .more {
                    font-size: 14px;
                    color: rgb(148, 146, 146);
                }
            }
        }
    }
</style>