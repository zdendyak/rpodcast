<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                    <v-toolbar dark color="blue-grey darken-1">
                        <v-toolbar-title>Login Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model="email" :rules="emailRules" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password"
                                          type="password" required v-model="password" :rules="passwordRules">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="blue-grey darken-1" :disabled="!valid" @click="submit">Login</v-btn>
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

export default {
    name: 'login',
    data() {
      return {
          valid: false,
          error: '',
          snackbar: false,
          email: '',
          password: '',
          emailRules: [
              v => !!v || 'E-mail is required',
              // eslint-disable-next-line
              v => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v) || 'E-mail must be valid'
          ],
          passwordRules: [
              v => !!v || 'Password is required',
              v =>
                  v.length >= 6 ||
                  'Password must be greater than 6 characters'
          ]
      }
    },
    methods: {
      setUserData ({ id, token }) {
        if (id && token) {
          localStorage.setItem('token', token)
          localStorage.setItem('userId', id)
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
        }
        this.$root.$data.userId = id
      },
      async submit () {
        if (this.$refs.form.validate()) {
          const input = {
            email: this.email,
            password: this.password
          }
          try {
            const response = await this.$apollo
              .mutate({
                mutation: queries.LOGIN_QUERY,
                variables: { input }
              })
            const { data } = response
            const { id, token } = data.user
            this.setUserData({ id, token })
            this.$router.push('/')
          } catch (error) {
            this.error = getGraphQLError(error) || 'Something went wrong. Please, try again...' 
            this.snackbar = true;
          }
        }
      }
    }
};
</script>

<style scoped>
</style>