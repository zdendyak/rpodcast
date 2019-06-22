<template>
  <div>
      <rpod-list v-if="rpodList" :rpods="rpodList"></rpod-list>
      <v-card v-if="error">
        <v-card-title primary-title>
          <div>
            <div class="headline grey--text">Oops...</div>
            <span class="grey--text">Error occured when retriving podcasts</span>
          </div>
        </v-card-title>
      </v-card>
  </div>
</template>

<script>
import RpodList from '../RpodList'
import * as queries from "../../graphql"

export default {
    name: 'listen',
    components: {
      RpodList
    },
    data () {
      return {
        query: queries.ALL_RPODS,
        error: false
      }
    },
    apollo: {
      rpodList: {
        query: queries.ALL_RPODS,
        result ({data}) {
          if (data) this.error = false
        },
        error() {
          this.error = true
        }
      }
    },
    created () {
      this.$apollo.queries.rpodList.refetch()
    }
};
</script>

<style scoped>
</style>