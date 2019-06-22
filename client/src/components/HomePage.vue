<template>
  <span>
    <home-display></home-display>
    <home-details></home-details>
    <ApolloQuery :query="query">
      <template v-slot="{ result: { loading, error, data }}">
        <rpod-list v-if="data" :rpods="data.rpodList"></rpod-list>
        <v-card v-if="error" to="/new-rpod">
          <v-card-title primary-title>
            <div>
              <div class="headline grey--text">Oops...</div>
              <span class="grey--text">Error occured when retriving podcasts</span>
            </div>
          </v-card-title>
        </v-card>
      </template>
    </ApolloQuery>
  </span>
</template>

<script>
import HomeDisplay from './HomeDisplay'
import HomeDetails from './HomeDetails'
import RpodList from './RpodList'
import * as queries from "../graphql"

export default {
  name: 'HomePage',
  components: {
    HomeDisplay,
    HomeDetails,
    RpodList
  },
  data () {
    return {
      query: queries.ALL_RPODS
    }
  }
}
</script>

<style scoped>

</style>
