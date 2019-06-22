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
                              <md-file v-model="imageUrl" @md-change="onImageChange" accept="image/*" placeholder="A nice image for the preview" :disabled="!!rpod.imageUrl"/>
                            </md-field>
                            <md-field>
                              <label>Audio</label>
                              <md-file v-model="audioUrl"  @md-change="onImageChange" accept="audio/*" placeholder="Your audio to impress your listeners" :disabled="!!rpod.audio" />
                            </md-field>
                            <md-field>
                              <md-icon>text_fields</md-icon>
                              <label>Content text</label>
                              <md-textarea v-model="text" md-autogrow></md-textarea>
                            </md-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat md-transparent color="error" outline @click="deleteRpod">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="warning" md-transparent :disabled="!valid" @click="submit" :loading="loading">Update</v-btn>
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
          rpod: {},
          loading: false,
          valid: false,
          error: '',
          snackbar: false,
          title: '',
          description: '',
          text: '',
          image: null,
          audio: null,
          imageUrl: null,
          audioUrl: null
      }
    },
    methods: {
      onImageChange (e) {
        this.image = e[0]
      },
      onAudioChange (e) {
        this.audio = e[0]
      },
      async fetchRpod (id) {
        try {
          const { data: { rpod }} = await this.$apollo
            .query({
              query: queries.GET_RPOD_BY_ID,
              variables: {
                id
              }
            })
          this.rpod = rpod
          this.title = rpod.title
          this.description = rpod.description
          this.text = rpod.text || ''
          this.imageUrl = rpod.imageUrl
          this.audioUrl = rpod.audio
        } catch (error) {
          this.error = getGraphQLError(error) || 'Something went wrong. Please, try again...' 
          this.snackbar = true;
          this.rpod = {}
        }
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
            const promises = [this.uploadFileToS3Bucket(this.image), this.uploadFileToS3Bucket(this.audio)]
            const uploadResponse = await Promise.all(promises)
            const urls = {};
            uploadResponse.forEach(res => {
              if (res && typeof res === 'string') {
                const key = res.split('/')[0]
                urls[key] = res
              }
            })


            const input = {
              id: this.rpod.id,
              title: this.title,
              description: this.description,
              text: this.text,
            }
            
            input.imageUrl = this.rpod.imageUrl || urls.image || ''
            input.audio = this.rpod.audio || urls.audio || ''
            /* eslint-disable */
            console.log({uploadResponse, input})
            await this.$apollo
              .mutate({
                mutation: queries.UPDATE_RPOD_QUERY,
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
      },
      async deleteRpod () {
        try {
          const response = await this.$apollo
                .mutate({
                  mutation: queries.DELETE_RPOD_QUERY,
                  variables: { id: this.$route.params.id }
                })
          const { data } = response;
          if (data.rpod) this.$router.push('/profile')
          else throw new Error('Something went wrong. Please, try again...')
        } catch (error) {
          this.error = getGraphQLError(error) || 'Something went wrong. Please, try again...' 
          this.snackbar = true;
        }
      }
    },
    created () {
      this.fetchRpod(this.$route.params.id)
    }
};
</script>

<style scoped>
</style>