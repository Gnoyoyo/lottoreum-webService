<template>
  <div id="app">
    <video-bg :sources="['http://www.markhillard.com/sandbox/media/polina.webm']">
      <img src="./assets/logo.png">
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/add_user">AddUser</router-link>
      </div> -->
      <router-view/>
    </video-bg>
  </div>
</template>

<script>
import VideoBg from 'vue-videobg'

export default {
  name: 'App',
  components: {
    VideoBg
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: black;
}
</style>
