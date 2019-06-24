<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="blue-grey lignten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" v-if="item.link" :to="item.link">
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile :key="index" v-if="item.fn" @click="item.fn">
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="blue-grey darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title to="/">{{title}}</v-toolbar-title>
      </router-link>
      <v-btn to="/listen" flat class="hidden-sm-and-down">Listen</v-btn>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn to="/login" flat class="hidden-sm-and-down">SIGN IN</v-btn>
        <v-btn to="/register" color="blue-grey lighten-3" class="hidden-sm-and-down">JOIN US</v-btn>
      </div>
      <div v-else>
        <v-btn flat class="hidden-sm-and-down" to="/profile">Profile</v-btn>
        <v-btn outline class="hidden-sm-and-down" color="white" @click="logout">Logout</v-btn>
      </div>
    </v-toolbar>
 </span>
</template>
<script>
export default {
  name: 'app-navigation',
  data () {
    return {
      title: 'R pods',
      drawer: false,
      allItems: [
        { title: 'Listen', link: '/listen' },
        { title: 'Profile', link: '/profile' },
        { title: 'Sign In', link: '/login' },
        { title: 'Join', link: '/register' },
        { title: 'Logout', 
          fn: () => {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            this.$root.$data.userId = null
            this.$router.push({ name: 'home' })
          } 
        }
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$root.$data.userId
    },
    items () {
      if (this.isAuthenticated) {
        this.allItems.slice(0,-1);
      }
      return [...this.allItems.slice(0,2), ...this.allItems.slice(-1)]
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$root.$data.userId = null
      this.$router.push({ name: 'home' })
    }
  }

}
</script>

<style scoped>
a, a:hover {
  color: white !important;
  text-decoration: none !important;
}

</style>
