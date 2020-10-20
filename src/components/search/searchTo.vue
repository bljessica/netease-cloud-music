<template>
    <div class="container">
        <search-bar :word="$route.params.word"></search-bar>
        <!-- 搜索结果分类 -->
        <div class="search-bar-container" ref="wrapper">
            <ul class="kinds">
                <li v-for="(item, index) in searchKinds" :key="index" @click="activeIndex = index" :class="{active: index == activeIndex}">
                    {{ item }}
                </li>
            </ul>
            <div class="result-box">

            </div>
        </div>
    </div>
</template>

<script> 
import searchBar from '../search/search-bar';
import { SEARCH_KINDS } from '../../consts/const';
import BScroll from '@better-scroll/core';
import { search } from '../../api/search';

export default {
    data() {
        return {
            searchKinds: SEARCH_KINDS,
            activeIndex: 0
        }
    },
    components: {
        searchBar,
    },
    mounted() {
        this.initSlider();
    },
    methods: {
        //切歌
        changeSong() {
            this.$refs.bar.refresh();
        },
        //初始化搜索结果类型滑块
        initSlider() {
            const slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                click: true
            });
        },
        //搜索
        search(type=1018) {
            let that = this;
            search({
                keywords: that.searchWord,
                type: type
            }).then(res => {
                // console.log(res.data);
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
        .search-bar-container {
            overflow: hidden;
            padding: 0;
            .kinds {
                height: 40px;
                width: 700px;
                border-bottom: 1px solid gainsboro;
                li {
                    height: 38px;
                    width: 70px;
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
</style>