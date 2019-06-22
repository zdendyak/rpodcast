<template>
<div>
  <ApolloQuery :query="query" :variables="{id: rpodId}">
    <template v-slot="{ result: { loading, error, data } }">
      <v-container>
          <v-layout 
              v-if="data" 
              column >
              <v-flex>
                <v-img :src="`${storageBaseUrl}/${data.rpod.imageUrl || defaultImage}`" style="max-height: 300px; width: auto;"></v-img>
              </v-flex>
              <v-flex color="blue-grey darken-4">
                <audio class="md-image ma-auto" v-if="data.rpod.audio" :src="`${storageBaseUrl}/${data.rpod.audio}`" controls></audio>
              </v-flex>
              <v-flex  class="display-2 text-xs-center mt-5 grey--text">{{data.rpod.title}}</v-flex>
              <v-flex>
                  <div class="headline text-xs-center mt-3 grey--text" v-if="data.rpod.user">{{ data.rpod.user.name }}</div>
                  <p class="subheading text-xs-center mt-3">{{data.rpod.description}}</p>
              </v-flex>
              <v-flex v-if="data.rpod.text">
                  <p v-for="(p, i) in (data.rpod.text || '').split('\n')" :key="`paragraph_${i}`">{{ p }}</p>
              </v-flex>
              <v-btn
                  v-if="data.rpod.user.id === $root.$data.userId"
                  :to="`/edit-rpod/${rpodId}`"
                  color="blue-grey"
                  dark
                  bottom
                  fixed
                  right
                  fab
                >
                  <v-icon>edit</v-icon>
              </v-btn>
          </v-layout>
          <v-layout 
            v-if="error">
            <v-flex>
                <div class="headline text-xs-center mt-3" v-if="data.rpod.user">{{ data.rpod.user.name }}</div>
                <p class="subheading mt-3">{{data.rpod.description}}</p>
            </v-flex>
          </v-layout>
      </v-container>
    </template>
  </ApolloQuery>
</div>
</template>

<script>
import * as queries from "../../graphql"

export default {
    name: 'rpod-details',
    watch: {
      rpodId (to, from) {
        /* eslint-disable */
        console.log('route changed', {to, from})
      }
    },
    data () {
      return {
        storageBaseUrl: 'https://rpods-dev-062019.s3.eu-central-1.amazonaws.com',
        defaultImage: 'image/listen4.jpg', 
        query: queries.GET_RPOD_BY_ID
      }
    },
    computed: {
      rpodId () {
        return this.$route.params.id
      }
    }
};
</script>

<style scoped>
a, a:hover {
  color: white !important;
  text-decoration: none !important;
}
</style>