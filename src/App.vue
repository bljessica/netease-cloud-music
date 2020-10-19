<template>
  <div id="app">
    <!-- <audio autoplay="" loop src="'http://m7.music.126.net/20201019002103/ff3cac231eaf0de6934a1db8008dcb5b/ymusic/f19d/1924/eafa/a7bd1c57f094cb98791f2e1feca61945.mp3'"></audio> -->
    <player ref="player"></player>
    <!-- <router-view/> -->
    <router-view @play="play" @stop="stop"></router-view>
  </div>
</template>

<script>
import player from './components/player/player';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    player
  },
  computed: {
    ...mapGetters([
    //     'playingSong',
    //     // 'playingList',
        // 'player',
    //     // 'lyricNow'
    //     'lyrics',
    //     'playingTimer'
    ])
  },
  mounted() {
    // this.setPlayer(this.$refs.player);
    // console.log('set:'+this.player)
  },
  methods: {
    play() {
      this.$refs.player.startMusic();
    },
    stop() {
      this.$refs.player.stopMusic();
    },
    ...mapMutations({
      // setPlayingSong: 'SET_PLAYING_SONG',
      // setPlayingList: 'SET_PLAYING_LIST',
      // setLyricNow: 'SET_LYRIC_NOW',
      // setLyrics: 'SET_LYRICS',
      // setCurrentTime: 'SET_CURRENT_TIME',
      // setPlayingTimer: 'SET_PLAYING_TIMER',
      // setPlayer: 'SET_PLAYER'
  }),
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  background: #faf6f6;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
