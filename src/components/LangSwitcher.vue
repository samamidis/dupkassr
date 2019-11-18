<template>
  <div class="text-start">
    <v-menu bottom offset-y >
      <template v-slot:activator="{ on }">
        <v-btn
            outlined
            rounded
            v-on="on"
        >
         <country-flag :country="flag(locale)" />
         <span class="pl-4">{{flag(locale)}}</span>
        <v-icon right>mdi-menu-down-outline</v-icon>

        </v-btn>
      </template>
      <v-list dense>
        <v-list-item         
          v-for="(locale, i) in showLocales"
          :key="i"
          @click="changeLocale(locale.code)"
        >
          <v-list-item-content >
            <div class="d-flex align-center">
            <country-flag :country='flag(locale.code)' size='normal'/>
            <span class="ml-5">{{ locale.name }}</span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import CountryFlag from 'vue-country-flag'

export default {
  name: 'LangSwitcher',
  components: {
    CountryFlag
  },
  data: () => ({
    choise: ''
  }),
  computed: {
    showLocales() {
      return this.$i18n.locales.filter(
        locale => locale.code !== this.$i18n.locale
      )
    },
    locale() {
      return this.$i18n.locale
    }
  },

  methods: {
    changeLocale(locale) {
      const urlLocale = this.$route.fullPath.split('/')[1]
      let result = this.$route.fullPath
      const patharray = this.$route.fullPath.split('/')
      if (urlLocale) {
        if (this.$i18n.availableLocales.includes(urlLocale)) {
          patharray[1] = locale
          let temp = ''
          patharray.forEach(element => {
            if (element) {
              temp = temp + '/' + element
            }
            result = temp
          })
        } else {
          result = '/' + locale + result
        }
      } else if (locale !== 'en') {
        result = locale + '/'
      }
      console.log(
        'Fullpath : ',
        this.$route.fullPath,
        'PathArray : ',
        patharray,
        'Result :',
        result
      )
      this.$i18n.locale = locale
      Cookie.set('i18n_redirected', locale)
      this.$router.push({
        path: result
      })
    },

    flag(locale) {
      if (locale === 'el') {
        return 'gr'
      }
      if (locale === 'en') {
        return 'us'
      }
      // eslint-disable-next-line no-else-return
      else {
        return locale
      }
    }
  }
}
</script>
