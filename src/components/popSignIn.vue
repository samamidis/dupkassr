<template>
  <div>
    <v-btn
      v-if="!login"
      rounded
      outlined
      @click.stop="dialog = true">
      <v-icon left>mdi-home-import-outline</v-icon>
      <span class="text-capitalize mx-1">Log In</span>
      <v-icon right>mdi-menu-down-outline</v-icon>
    </v-btn>
    <v-btn
      v-else
      rounded
      outlined
      @click.stop="dialog = true">
      <v-icon left>mdi-account-circle-outline</v-icon>
      <span class="text-capitalize mx-1">{{ login.email }}</span>
      <v-icon right>mdi-menu-down-outline</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="600px">
      <v-card v-if="!!login">
        <v-container>
          <v-row>
            <v-card-title>
              <h1 class="display-1">Account</h1>
            </v-card-title>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn        
                rounded
                outlined
                @click="SignOut"
                class="text-capitalize mx-1 mb-5"
                x-large   
                block>
                <v-icon left>mdi-home-export-outline</v-icon>
                <span> Log out</span> 
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                @click="dialog=!dialog"
                rounded
                outlined
                router
                to="/user"
                class="text-capitalize mx-1 mb-5"
                x-large   
                block>
                <v-icon left>mdi-account-circle-outline</v-icon>
                {{ login.email }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card v-if="!(!!login) && !emailsignin">
        <v-container >
          <v-row>
            <v-card-title>
              <h1 class="display-1">Sign In</h1>
            </v-card-title>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn 
                @click="googleAuth"
                rounded
                class="pa-2 text-capitalize" 
                color="error"
                x-large   
                block>
                <v-icon left >mdi-google</v-icon> Sign In With Google Account
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn 
                rounded
                class="pa-2 text-capitalize" 
                color="primary" 
                x-large  
                block
                @click="emailsignin=!emailsignin">
                <v-icon left>mdi-email-check-outline</v-icon>
                Sign In With Email Account
              </v-btn> 
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card v-if="emailsignin &&! (!!login)">
        <v-container >
          <v-row>
            <v-col cols="12" >
              <v-alert v-if="isError" type="error">
                {{ errMsg }}
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-card-title>
              <h1 class="display-1">Sign In with Email</h1>
            </v-card-title>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-form ref="signInForm" @submit.prevent="signIn" class="pa-5">
                <v-card-text>
                  <v-text-field
                    @blur="checkUser"
                    prepend-icon="mdi-email-check-outline"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="E-mail*"
                    required
                    clearable 
                  />
                  <v-text-field 
                  v-if="emailexists || newuser"
                    :type="showpass ? 'text' : 'password'" 
                    prepend-icon="mdi-lock-open-outline"
                    @keyup="match=comparePassword"
                    :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="password"
                    :rules="[rules.required, rules.password]"
                    label="Password*"                         
                    @click:append="showpass = !showpass"
                  />
                  <p  v-if="!password && (emailexists || newuser)" class="caption info--text"  >Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.</p>
                  <v-text-field
                    v-if="newuser"
                    @keyup="match=comparePassword"
                    type="password" 
                    prepend-icon="mdi-lock-outline"
                    v-model="password_confirmation"
                    label="Confirm Password*"
                    clearable                         
                    required
                  ></v-text-field>
                  <p class="caption error--text" v-if="!match && newuser" >Passwords do not match</p>
                  <v-text-field
                    v-if="newuser"
                    prepend-icon="mdi-account-circle"
                    v-model="given_name"
                    :rules="[rules.required, rules.counter]"
                
                    label="Name*"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-if="newuser"
                    prepend-icon="mdi-account-circle"
                    v-model="family_name"
                    
                
                    label="Surname"
                    required
                  ></v-text-field>                    
                <v-divider></v-divider>
                <v-row align="center" justify="center" v-if="newuser" >
                    <v-col cols="4">
                    
                        <v-avatar v-if="!imageData.length > 0" size="90">
                            <v-img id="ProfileImage" src="the-pc-avatar-250.jpg"></v-img>
                        </v-avatar>
                        <v-avatar class="image-preview" v-if="imageData.length > 0"  size="120">
                        <v-img class="preview" :src="imageData"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col cols="7" offset="1">
                        <input
                          type="file"
                          style="display:none"
                          ref="imageinput"
                          accept="image/*"                                
                          @change="previewImage">  
                      
                        <v-btn-toggle rounded    v-model="toggle_exclusive" >
                          <v-btn @click="onPickImg" >
                            <v-icon  class="mx-2" >mdi-camera</v-icon>Upload Image
                          </v-btn>
                          <v-btn @click="resetImage">
                            <v-icon>mdi-close-circle</v-icon>
                          </v-btn>
                        </v-btn-toggle>
                      
                    </v-col>
                </v-row>
                <v-row v-if="newuser">
                  <v-col cols="12">
                    <v-select
                      :prepend-icon="genterIcon"
                      :items="genters"
                      v-model="genter"
                      label="Genter"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                </v-card-text>
                  <v-btn
                      class="ma-4"
                      v-if="emailexists && !newuser "
                      x-small
                      rounded 
                      outlined 
                      @click="resetPassword"
                      text >Reset my password ?</v-btn>            
                <v-card-actions>   
                    <v-btn 
                      rounded 
                      outlined 
                      text 
                      @click="resetForm"
                      color="error"
                      >Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn 
                      v-if="!emailexists && !newuser"
                      type="submit"
                      rounded
                      outlined
                      color="warning"
                      @click.prevent="checkUser"
                      >
                      Next
                    </v-btn>            
                    <v-btn 
                      v-if="emailexists && !newuser "
                      type="submit"
                      rounded
                      outlined
                      color="success"
                      @click.prevent="SignIn"
                      >
                      Sign In
                    </v-btn>
                    <v-btn 
                      v-if="!emailexists && newuser"
                      type="submit"
                      rounded
                      outlined
                      color="success"
                      @click.prevent="SignUp"
                      >
                      Sign Up
                    </v-btn>     
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import fireservice from '../services/fireservice'

export default {
  name: 'popSignIn',
  data: () => ({
    //    login: false,
    toggle_exclusive: undefined,
    showpass: false,
    emailsignin: false,
    emailexists: false,
    newuser: false,
    dialog: false,
    showconf: false,
    genters: ['Male', 'Female'],
    valid: true,
    given_name: '',
    family_name: '',
    email: '',
    password: '',
    filename: '',
    file: '',
    genter: '',
    select: '',
    checkbox: '',
    password_confirmation: '',
    match: true,
    isError: false,
    errMsg: '',

    imageData: '', // we will store base64 format of image in this string
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      password: value => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        return pattern.test(value) || 'Invalid password.'
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  methods: {
    resetForm() {
      this.showpass = false
      this.emailsignin = false
      this.newuser = false
      this.emailexists = false
      this.dialog = false
      this.showconf = false
      this.given_name = ''
      this.family_name = ''
      this.email = ''
      this.password = ''
      this.filename = ''
      this.file = ''
      this.genter = ''
      this.select = ''
      this.checkbox = ''
      this.password_confirmation = ''
      this.match = true
      this.$refs.signInForm.reset()
    },
    emmitMsg(message) {
      this.$emit('infoMsg', message)
    },
    async checkUser() {
      await fireservice
        .CheckUser(this.email)
        .then(res => {
          if (!res[0]) {
            this.emailexists = false
            this.newuser = true
          } else if (res[0] === 'password') {
            this.emailexists = true
            this.newuser = false
          } else if (res[0] === 'google.com') {
            this.googleAuth()
            // go to the idicated auth provider
          } else {
            // go to the idicated auth provider
            // console.log(res)
          }
        })
        .catch(error => {
          this.isError = true
          this.errMsg = error.code
          this.newuser = false
          this.emailexists = false
          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    },
    async SignIn() {
      await fireservice
        .SignIn(this.email, this.password)
        .then(async payload => {
          this.$store.dispatch('users/setUser', payload)
          const profile = await fireservice.readProfile(payload.user.uid)
          this.$store.dispatch('profile/setProfile', profile)
          this.$router.push('/' + this.$i18n.locale + '/')
          this.emmitMsg('Welcome in ' + payload.user.email)
          this.resetForm()
        })
        .catch(error => {
          this.newuser = false
          this.emailexists = true
          this.isError = true
          this.errMsg = error.code
          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    },
    async SignUp() {
      let profile = {}
      await fireservice
        .SignUp(this.email, this.password)
        .then(async payload => {
          this.$store.dispatch('users/setUser', payload)
          profile = {
            uid: payload.user.uid,
            email: payload.user.email
          }
          if (this.given_name !== '') {
            profile.given_name = this.given_name
          }
          if (this.family_name !== '') {
            profile.family_name = this.family_name
          }
          profile.name =
            this.given_name.toUpperCase() + ' ' + this.family_name.toUpperCase()
          if (this.filename !== '') {
            profile.filename =
              'profile_img/' + profile.uid + '/' + this.filename
            profile.file = this.file
            profile.picture = await fireservice.UploadImg(
              profile.filename,
              profile.file
            )
            delete profile.file
          }
          if (this.genter !== '') {
            profile.genter = this.genter
          }
          const responce = await fireservice.AddProfile(profile)
          this.$store.dispatch('profile/setProfile', profile)
          this.$router.push('/' + this.$i18n.locale + '/')
          this.emmitMsg('Welcome in ' + payload.user.email)
          this.resetForm()
          return responce
        })
        .catch(error => {
          this.isError = true
          this.errMsg = error.code
          this.newuser = false
          this.emailexists = true
          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    },
    async resetPassword() {
      const reset = await fireservice.resetPassword(
        this.email,
        this.$i18n.locale
      )
      console.log(reset)
    },
    async googleAuth() {
      let profile = {}
      await fireservice
        .googleAuth(this.$i18n.locale)
        .then(async payload => {
          this.$store.dispatch('users/setUser', payload)
          profile = payload.profile
          profile.uid = payload.user.uid
          delete profile.granted_scopes
          delete profile.id
          delete profile.locale
          delete profile.granted_scopes
          profile.genter = ''
          const responce = await fireservice.AddProfile(profile)
          this.$store.dispatch('profile/setProfile', profile)
          this.dialog = false
          this.$router.push('/' + this.$i18n.locale + '/')
          this.emmitMsg('Welcome in ' + payload.user.email)
          this.resetForm()
          return responce
        })
        .catch(error => {
          this.newuser = false
          this.emailexists = true
          this.isError = true
          this.errMsg = error.code
          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    },
    async SignOut() {
      await fireservice
        .SignOut()
        .then(() => {
          this.$store.dispatch('users/resetUser')
          this.$store.dispatch('profile/resetProfile')
          this.$router.push('/' + this.$i18n.locale)
          this.emmitMsg('Gooodbye we hope to see you soon')
          this.resetForm()
        })

        .catch(error => {
          this.isError = true
          this.errMsg = error.code
          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    },

    onPickImg() {
      this.$refs.imageinput.click()
    },
    previewImage(event) {
      const input = event.target
      if (input.files.length) {
        this.imageData = ''
      }
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        this.file = input.files[0]
        this.filename = input.files[0].name
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          this.imageData = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },
    resetImage() {
      this.imageData = ''
      this.file = ''
      this.filename = ''
    }
  },
  // computed: mapState({
  //   events: state => state.events.events
  // }),
  mounted() {
    // const user = this.$store.state.users.user
    // this.login = user
    // setTimeout(function() {
    //   console.log('Mounded ....', user)
    //   if (user) {
    //     console.log('Login ....', user)
    //     this.login = user
    //   } else {
    //     console.log('Login ....No User', this)
    //     this.login = false
    //   }
    //   alert('Hello')
    // }, 3000)
  },
  computed: {
    login() {
      if (this.$store.state.users.user) {
        console.log('Login ....', this.$store.state.users.user)
        return this.$store.state.users.user
      } else {
        console.log('Login ....No User', this.$store.state)
        return false
      }
    },
    comparePassword() {
      if (this.password === this.password_confirmation) {
        return true
      } else {
        return false
      }
    },
    validate() {
      return (
        this.match &&
        this.valid &&
        this.username &&
        this.email &&
        this.password_confirmation &&
        this.password
      )
    },
    genterIcon() {
      let icon = ''
      switch (this.genter) {
        case '':
          icon = 'mdi-gender-male-female'
          break
        case 'Male':
          icon = 'mdi-gender-male'
          break
        case 'Female':
          icon = 'mdi-gender-female'
          break
      }
      return icon
    }
  }
}
</script>
