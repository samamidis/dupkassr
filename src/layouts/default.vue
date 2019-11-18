<template>
  <v-app>

    <v-app-bar
      dense
      app
      clipped
      fixed
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" />
    <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>  -->
       
        <v-toolbar-title class="headline text-capitalize">
            <nuxt-link  :to="localePath('/')" tag="span" style="cursor: pointer">
            <span>Dup</span>
            <span class="font-weight-light">Ka</span>
            </nuxt-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

        <!-- <v-btn
          v-if="user"
          rounded
          outlined
          router
          to="/profile"
          class="text-capitalize mx-1 hidden-sm-and-down"
          >
          <v-icon left>mdi-account-circle-outline</v-icon>
          {{ user.email }}
        </v-btn>
        <v-btn
          v-if="user"
          rounded
          outlined
          @click="SignOut"
          class="text-capitalize mx-1 hidden-sm-and-down"
          >
           <v-icon left>mdi-home-export-outline</v-icon>
            Log out
        </v-btn> -->
      <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <div>
                  <v-btn
                  outlined
                  rounded
                  class="text-capitalize mx-1 hidden-sm-and-down"
                  v-on="on"
                  >
                    Actions
                    <v-icon right>mdi-menu-down-outline</v-icon>
                  </v-btn>
                </div>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  router
                  :to="localePath(item.to)"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
      <popSignIn v-on:infoMsg="showMsg"/>            
      <LangSwitcher/> 

    </v-app-bar>
        <v-navigation-drawer
        v-model="drawer"

        app
    >
        <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="localePath(item.to)"
                router
                link
                exact
            >
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title" />
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer> 
      <v-content>
        <nuxt />
      </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
          <v-snackbar
      v-model="isMsg"
      color="info"
      right
      bottom
    >
      {{ infoMsg }}
      <!-- <v-btn
        color="error"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn> -->
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import fireservice from '../services/fireservice'
import LangSwitcher from '~/components/LangSwitcher'
import popSignIn from '~/components/popSignIn'

export default {
  components: {
    LangSwitcher,
    popSignIn
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      isMsg: false,
      infoMsg: '',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: 'index'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'About',
          to: 'about'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'User',
          to: 'user'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Profile',
          to: 'user-profile'
        }
      ]
    }
  },
  computed: mapState({
    user: state => state.users.user
  }),
  methods: {
    showMsg(infoMsg) {
      this.isMsg = true
      this.infoMsg = infoMsg
      // setTimeout(() => {
      //   this.isError = false
      //   this
      // }, 5000)
    },

    async SignOut() {
      await fireservice
        .SignOut()
        .then(() => {
          this.$store.dispatch('users/resetUser')
          this.$store.dispatch('profile/resetProfile')
          this.$router.push('/' + this.$i18n.locale)
        })

        .catch(error => {
          this.isError = true
          this.errMsg = error.code
          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    }
  }
}
</script>
