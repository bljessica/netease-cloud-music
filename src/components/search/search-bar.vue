<template>
    <div class="search-container" @keyup.enter="getSearchResult">
        <!-- 搜索框 -->
        <div class="search-box">
            <i class="iconfont icon-zuo" @click.stop="$router.go(-1)"></i>
            <input type="text" :placeholder="suggestWord" v-model="searchWord" @input="showResults">
            <!-- <input type="text" v-else :placeholder="suggestWord" v-model="searchWord" @input="showResults"> -->
            <i class="iconfont reset icon-jia" @click.stop="searchWord = ''"></i>
        </div>
        <!-- 搜索结果 -->
        <ul class="results" v-if="listShow">
            <div class="title">搜索“{{ searchWord }}”</div>
            <li v-for="(item, index) in resSongs" :key="index" @click.stop="chooseSearchWord">
                <i class="iconfont icon-sousuo"></i>
                <span class="name">{{ item }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getDefault, search, searchMultimatch } from '../../common/js/api/search';

export default {
    props: { 
        word: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            suggestWord: '',
            searchWord: '',
            listShow: false,
            resSongs: [],
        }
    },
    mounted() {
        if(this.word.length == 0) {
            this.getDefault();
        }
        else {
            this.searchWord = this.word;
        }
    },
    methods: {
        //跳转到搜索结果页面
        getSearchResult() {
            if(this.searchWord.length === 0) {
                this.searchWord = this.suggestWord;
            }
            this.$store.commit('SET_SEARCHING_WORD', this.searchWord);
            this.$router.push('/searchResult');
        },
        //选择搜索关联词进行搜索
        chooseSearchWord(e) {
            let target = e.target;
            this.searchWord = target.innerText;
            this.$store.commit('SET_SEARCHING_WORD', this.searchWord);
            this.listShow = false;
            if(this.$route.name === 'search') {
                this.$router.push('/searchResult');
            }
            else if(this.$route.name === 'searchResult') {
                this.$emit('wordChange');
            }
        },
        //获取搜索建议
        getDefault() {
            this.$emit('beforeLoad');
            let that = this;
            getDefault().then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.suggestWord = res.data.data.showKeyword;
            }).catch(err => {
                console.log(err);;
            })
        },
        //显示搜索关联结果
        showResults() {
            console.log('result')
            if(this.searchWord.length == 0) {
                this.listShow = false;
                return;
            }
            this.listShow = true;
            this.$emit('beforeLoad');
            let that = this;
            search({
                keywords: that.searchWord,
            }).then(res => {
                that.$emit('onLoad');
                console.log(res.data, res.data.result === {});
                if(!res.data.result.songs) {
                    that.listShow = false;
                    return;
                }
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
            }).catch(err => {
                console.log(err);;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.search-container {
    padding: 0;
    background: white;
    padding: 10px 0;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .search-box {
        background: white;
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
            height: 40px;
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
        background: white;
        width: 87%;
        position: relative;
        left: 20px;
        top: 10px;
        box-shadow: 5px 0 10px gainsboro, -5px 0 10px gainsboro;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2000;
        li {
            height: 40px;
            width: 100%;
            line-height: 40px;
            border-top: 1px solid gainsboro;
            display: flex;
            align-items: center;
            z-index: 2000;
            background: white;
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