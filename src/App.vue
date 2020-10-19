<template>
  <div id="app">
    <div v-show="$route.meta.play">
      <player ref="player"></player>
    </div>
    <router-view @play="play" @stop="stop"></router-view>
    <!-- <router-view @play="play" @stop="stop" @unShowPlayer="playerShow = false" @showPlayer="playerShow = true"></router-view> -->
  </div>
</template>

<script>
import player from './components/player/player';
// import playBar from './components/play/play-bar';
// import { mapGetters, mapMutations } from 'vuex';

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
