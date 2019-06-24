import Vue from 'vue'
import VueApollo from 'vue-apollo'
import apolloUploadClient from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
Vue.use(VueApollo)

const baseUrl = 'http://127.0.0.1:80/graphql'
// const baseUrl = process.env.GRAPHQL_URL || 'http://127.0.0.1:8081/graphql'
const uploadClientLink = apolloUploadClient.createUploadLink({
  uri: baseUrl
})

const interceptor = setContext(() => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      headers: {
        authorization: token
      }
    }
  }
})

const apolloClient = new ApolloClient({
  link: interceptor.concat(uploadClientLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export default new VueApollo({
  defaultClient: apolloClient
})
