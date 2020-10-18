<template>
  <div id="app">
    <!-- <audio autoplay="" loop src="'http://m7.music.126.net/20201019002103/ff3cac231eaf0de6934a1db8008dcb5b/ymusic/f19d/1924/eafa/a7bd1c57f094cb98791f2e1feca61945.mp3'"></audio> -->
    <router-view/>
  </div>
</template>

<script>
// import plaer
export default {
  name: 'App'
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
