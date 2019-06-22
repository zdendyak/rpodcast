<template>
  <v-container fluid fill-height class="home-display" style="max-height: 100vh;">
    <v-layout justify-center align-center column pa-5>
      <div class="display-3 font-weight-black white--text text-xs-center">LISTEN OR READ</div>
      <div class="display-3 font-weight-black white--text text-xs-center mb-3">IMPROVE YOUR SKILLS</div>
      <div class="display-1 font-weight-bold white--text text-xs-center">Listen to the interesting stories or tell yours</div>
      <v-btn fab class="mt-5 blue-grey darken-4" v-scroll-to="'#details'">
        <v-icon large color="white">expand_more</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home-display'  
}
</script>

<style scoped>
  .home-display {
    background: url('../assets/listen2.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
  }
</style>

