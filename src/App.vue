<template>
  <div id="app">
    <div v-show="$route.meta.play">
      <player ref="player" v-show="$route.name !== 'playing'"></player>
    </div>
    <router-view @play="play" @stop="stop" @nextSong="nextSong" 
      @prevSong="prevSong" @selectSong="selectSong" @changeSong="changeSong"></router-view>
  </div>
</template>

<script>
import player from './components/player/player';

export default {
  name: 'App',
  components: {
    player,
  },
  methods: {
    //播放音乐
    play() {
      this.$refs.player.startMusic();
    },
    //暂停音乐
    stop() {
      this.$refs.player.stopMusic();
    },
    //下一首
    nextSong() {
      this.$refs.player.nextSong();
    },
    //上一首
    prevSong() {
      this.$refs.player.prevSong();
    },
    //歌单中选择歌曲
    selectSong(index) {
      this.$refs.player.selectSong(index);
    },
    //播放列表中切换歌曲
    changeSong(index) {
      this.$refs.player.changeSong(index);
    }
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
