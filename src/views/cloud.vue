<template>
    <div class="container">
        <!-- 头部导航栏 -->
        <my-header :selected="'cloud'" class="header" @menuShow="menuShow = true"></my-header>
        <!-- tabs -->
        <cloud-tabs></cloud-tabs>
        <!-- <my-menu :class="{'menuShowing': menuShow == true}" class="my-menu"></my-menu> -->
        <play-bar ref="bar" v-if="$store.getters.playingSong.id" @playingListShow="playingListShow = true" ></play-bar>
        <playing-list class="playing-list" v-show="playingListShow" @changeSong="changeSong"></playing-list>
    </div>
</template>

<script>
import myHeader from '../components/common/my-header';
import playBar from '../components/common/play-bar';
import myMenu from '../components/common/my-menu';
import playingList from '../components/common/playing-list';
import cloudTabs from '../components/cloud/cloud-tabs';

export default {
    components: {
        myHeader,
        cloudTabs,
        myMenu,
        playBar,
        playingList
    },
    data() {
        return {
            menuShow: false,
            playingListShow: false,
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/my-menu';
</style>

<style scoped>
</style>