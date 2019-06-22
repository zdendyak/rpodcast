<template>
  <v-container fluid fill-height style="position:relative;" >
    <v-layout justify-center align-center column pa-5>
      <rpod-list v-if="rpods.length" :rpods="rpods" title="My Podcasts"></rpod-list>
      
      <v-card v-else to="/new-rpod">
        <v-card-title primary-title>
          <div>
            <div class="headline grey--text">No podcast</div>
            <span class="grey--text">Create your first one</span>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>
    <v-btn
      to="/new-rpod"
      color="blue-grey"
      dark
      bottom
      fixed
      right
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        bottom
      >
        {{ error }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import RpodList from '../RpodList'
import * as queries from "../../graphql"
import { getGraphQLError } from '../../graphql/utils'

export default {
    name: 'profile',
    components: {
      RpodList
    },
    apollo: {
      user: {
        query: queries.GET_USER_QUERY,
        error (error) {
          this.snackbar = true
          this.error = getGraphQLError(error) || 'Something went wrong. Please, try again...'
        }
      }
    },
    data () {
      return {
        snackbar: false,
        error: ''
      }
    },
    computed: {
      rpods () {
        return this.user && this.user.rpods || [];
      }
    },
    created () {
      this.$apollo.queries.user.refetch()
    }
};
</script>

<style scoped>
.bg-image {
  background: url('../../assets/listen3.jpg') no-repeat;
  background-size: contain;
}
a, a:hover {
  color: white !important;
  text-decoration: none !important;
}
</style>