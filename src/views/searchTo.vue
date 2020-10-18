<template>
    <div class="container">
        <search-bar :word="$route.params.word"></search-bar>
        <!-- 搜索结果分类 -->
        <kind-bar></kind-bar>
        <play-bar ref="bar" v-if="$store.getters.playingSong.id" @playingListShow="playingListShow = true" ></play-bar>
        <playing-list class="playing-list" v-show="playingListShow" @changeSong="changeSong"></playing-list>
    </div>
</template>

<script>
import searchBar from '../components/search/search-bar';
import playBar from '../components/common/play-bar';
import kindBar from '../components/search/kind-bar';
import playingList from '../components/common/playing-list';

export default {
    data() {
        return {
            playingListShow: false,

        }
    },
    components: {
        searchBar,
        kindBar,
        playBar,
        playingList
    },
    mounted() {
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    methods: {
        changeSong() {
            this.$refs.bar.refresh();
        },
    }
}
</script>

<style lang="scss" scoped>
    .container {
        background: white;
        padding: 0 20px;
    }
</style>