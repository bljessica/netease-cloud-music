<template>
    <div class="header-container">
        <div class="nav">
            <i class="iconfont icon-zuo" @click="goBack"></i>
            <div class="name">
                <span>{{ playingSong.name }}</span>
                <div>{{ getArtists }}<i class="iconfont icon-you"></i></div>
            </div>
            <span class="blank"></span>
            <!-- <i class="iconfont icon-shouyinji-xian"></i> -->
            <i class="iconfont icon-fenxiang"></i>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'playingSong',
            'playingList',
            'playingTimer',
            'player'
        ]),
        getArtists() {
            let res = '';
            if(this.playingSong.ar) {
                this.playingSong.ar.forEach(item => {
                    res += item.name + '/';
                })
                return res.substring(0, res.length - 1);
            }
        }
    },
    methods: {
        goBack() {
            console.log(this.playingList, this.playingSong)
            clearInterval(this.playingTimer);
            console.log('leave')
            this.setPlayingTimer(null);
            this.$router.push({name: 'playlist', params: {id: this.playingList.id}})
        },
        ...mapMutations({
            setPlayingTimer: 'SET_PLAYING_TIMER',
            setPlayer: 'SET_PLAYER',
        }),
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    .nav {
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        .name {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding-left: 20px;
            text-align: left;
            span {
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 20px;
                font-weight: bold;
            }
            div {
                font-size: 14px;
                color: rgb(180, 178, 178);
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
                i {
                    font-size: 12px;
                }
            }
        }
        i {
            font-size: 24px;
            &.icon-shouyinji-xian {
                font-size: 30px;
                padding-right: 15px;
            }
        }
        .blank {
            flex-grow: 1;
        }
    }
}
</style>