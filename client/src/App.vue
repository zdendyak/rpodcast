<template>
  <div id="app">
    <v-app>
      <app-navigation></app-navigation>
      <v-content transition="slide-x-transition">
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation'

export default {
  name: 'app',
  components: {
    AppNavigation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
