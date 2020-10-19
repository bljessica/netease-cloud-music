<template>
  <div id="app">
    <div v-show="$route.meta.play">
      <player ref="player" v-show="$route.name !== 'playing'"></player>
    </div>
    <router-view @play="play" @stop="stop" @nextSong="nextSong" @prevSong="prevSong" @selectSong="selectSong"></router-view>
  </div>
</template>

<script>
import player from './components/player/player';

export default {
  name: 'App',
  data() {
    return {
      playerShow: true
    }
  },
  components: {
    player,
  },
  methods: {
    play() {
      this.$refs.player.startMusic();
    },
    stop() {
      this.$refs.player.stopMusic();
    },
    nextSong() {
      this.$refs.player.nextSong();
    },
    prevSong() {
      this.$refs.player.prevSong();
    },
    selectSong(index) {
      this.$refs.player.selectSong(index);
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
