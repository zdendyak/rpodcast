<template>
  <v-card>
    <a :href="'/rpods/' + rpod.id">
      <v-img
        :src="`${storageBaseUrl}/${rpod.imageUrl || this.defaultImage}`"
        height="200px"
      >
      </v-img>
    </a>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{rpod.title}}</div>
          <span class="grey--text" v-if="rpod.user">{{rpod.user.name}}</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <!-- <v-btn flat>Share</v-btn> -->
        <v-btn flat color="blue-grey darken-1" :to="'/rpods/' + rpod.id" class="view-btn">View</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="rpod.description" icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          {{ rpod.description }}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
</template>

<script>
export default {
  name: 'rpod-card',
  data () {
    return {
      show: false,
      storageBaseUrl: 'https://rpods-dev-062019.s3.eu-central-1.amazonaws.com',
      defaultImage: 'image/listen4.jpg', 
    }
  },
  props: {
    rpod: {
      type: Object,
      default () {
        return {
          id: 123,
          title: 'Top western road trips',
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
          imageUrl: 'image/listen4.jpg',
          audio: '',
          user: {
            id: 'u111w434',
            name: 'John Doe',
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.view-btn, .view-btn:hover {
  text-decoration: none !important;
}
</style>

