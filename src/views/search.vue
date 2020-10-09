<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="search-box">
            <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
            <input type="text" :placeholder="suggestWord" v-model="searchWord" @change="showResults">
            <i class="iconfont reset icon-jia" @click="searchWord = ''"></i>
        </div>
        <!-- 搜索结果 -->
        <ul class="results" v-if="searchWord.length > 0">
            <div class="title">搜索“{{ searchWord }}”</div>
            <li v-for="(item, index) in resSongs" :key="index">
                <i class="iconfont icon-sousuo"></i>
                <span class="name">{{ item }}</span>
            </li>
        </ul>
        <!-- 广告 -->
        <!-- 搜索历史 -->

        <!-- 热搜榜 -->

        <!-- 分类 -->

    </div>
</template>

<script>
import { getDefault, search } from '../api/search';
export default {
    data() {
        return {
            suggestWord: '',
            searchWord: '',
            resSongs: []
        }
    },
    mounted() {
        this.getDefault();
    },
    methods: {
        showResults() {
            if(this.searchWord.length == 0) {
                return;
            }
            let that = this;
            search({
                keywords: that.searchWord
            }).then(res => {
                console.log(res.data);
                that.resSongs = new Set();
                res.data.result.songs.forEach(item => {
                    that.resSongs.add(item.name);
                })
                if(that.resSongs.size > 10) {
                    that.resSongs = Array.from(that.resSongs).slice(0, 10);
                }
                else {
                    that.resSongs = Array.from(that.resSongs);
                }
                // that.resSongs = res.data.result.songs;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                });
            })
        },
        getDefault() {
            let that = this;
            getDefault().then(res => {
                console.log(res.data);
                that.suggestWord = res.data.data.showKeyword;
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
        // background: white;
        padding: 0 15px;
        .search-box {
            height: 50px;
            line-height: 50px;
            display: flex;
            align-items: center;
            position: relative;
            i {
                display: inline-block;
                padding-right: 15px;
                font-size: 24px;
            }
            input {
                flex-grow: 1;
                height: 46px;
                font-size: 16px;
                border: none;
                border-bottom: 1px solid black;
                outline: none;
                text-indent: 5px;
            }
            .reset {
                position: absolute;
                right: 0;
                padding-right: 5px;
            }
        }
        .results {
            width: 87%;
            position: relative;
            left: 20px;
            top: 10px;
            background: white;
            box-shadow: 5px 0 10px gainsboro, -5px 0 10px gainsboro;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            // justify-content: flex-start;
            align-items: center;
            li {
                height: 40px;
                width: 100%;
                line-height: 40px;
                border-top: 1px solid gainsboro;
                display: flex;
                // justify-content: flex-start;
                align-items: center;
                i {
                    padding: 0 10px 0 15px;
                }
                span {
                    display: inline-block;
                    flex-grow: 1;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .title {
                border: none;
                height: 40px;
                width: 100%;
                line-height: 40px;
                text-align: left;
                text-indent: 15px;
                color: rgba(16, 16, 212, 0.76);
            }  
        }
    }
</style>