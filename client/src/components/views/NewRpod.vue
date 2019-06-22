<template>
    <v-container fluid class="bg-image">
        <v-layout align-center justify-center>
            <v-flex xs12 md8>
              <v-card class="elevation-12">
                    <v-toolbar dark color="blue-grey darken-1">
                        <v-toolbar-title>New Podcast</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <md-field>
                              <md-icon>title</md-icon>
                              <label>Title</label>
                              <md-input v-model="title" required></md-input>
                            </md-field>
                            <md-field>
                              <md-icon>description</md-icon>
                              <label>Description</label>
                              <md-input v-model="description"></md-input>
                            </md-field>
                            <md-field>
                              <label>Image</label>
                              <md-file v-model="imageUrl" @md-change="onImageChange" accept="image/*" placeholder="A nice image for the preview" />
                            </md-field>
                            <md-field>
                              <label>Audio</label>
                              <md-file v-model="audioUrl"  @md-change="onImageChange" accept="audio/*" placeholder="Your audio to impress your listeners" />
                            </md-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" md-transparent :disabled="!valid" @click="submit" :loading="loading">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
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
import * as queries from "../../graphql"
import { getGraphQLError } from '../../graphql/utils'
import axios from 'axios'

export default {
    name: 'new-rpod',
    data() {
      return {
          loading: false,
          valid: false,
          error: '',
          snackbar: false,
          title: '',
          description: '',
          image: null,
          audio: null,
          imageUrl: null,
          audioUrl: null,
          titleRules: [
              v => !!v || 'Title is required',
              v =>
                  v.length >= 2 ||
                  'Title must be greater than 2 characters'
          ]
      }
    },
    methods: {
      onImageChange (e) {
        this.image = e[0]
      },
      onAudioChange (e) {
        this.audio = e[0]
      },
      async uploadFileToS3Bucket (file) {
        if (!file || !file.name || !file.type) return null
        const { name, type } = file
        try {
          const { data: { aws_url }} = await this.$apollo
          .query({
            query: queries.GET_SIGNED_URL_QUERY,
            variables: {
              input: { name, type }
            }
          })
          if (!aws_url || !aws_url.url) return null
          const { url, key } = aws_url
          await axios.put(url, file, {
            headers: {
              'Content-Type': file.type
            }
          })
          return key
        } catch (error) {
          return null
        }
      },
      async submit () {
        if (this.$refs.form.validate()) {
          try {
            this.loading = true;
            const promises = []
            promises.push(this.uploadFileToS3Bucket(this.image))
            promises.push(this.uploadFileToS3Bucket(this.audio))
            const uploadResponse = await Promise.all(promises)
            const urls = {};
            uploadResponse.forEach(res => {
              if (res && typeof res === 'string') {
                const key = res.split('/')[0]
                urls[key] = res
              }
            })

            const input = {
              title: this.title,
              description: this.description,
              imageUrl: urls.image || '',
              audio: urls.audio || ''
            }
            await this.$apollo
              .mutate({
                mutation: queries.CREATE_NEW_RPOD_QUERY,
                variables: { input }
              })
            this.$router.push('/profile')
          } catch (error) {
            this.error = getGraphQLError(error) || 'Something went wrong. Please, try again...' 
            this.snackbar = true;
          } finally {
            this.loading = false
          }
        }
      }
    }
};
</script>

<style scoped>
.bg-image {
  background: url('../../assets/listen1.jpg') no-repeat;
  background-size: cover;
}

</style>