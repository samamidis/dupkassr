import Vue from 'vue'
// import cookieparser from 'cookieparser'

import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'
// let locale

// async function locale({ app: { i18n } }) {
//   var locale = i18n.locale
//   console.log('In locale ..', locale)
//   return locale
// }
// // Do whatever with the store or router here
// // console.log('state', i18n.locale)

// // import JWTDecode from 'jwt-decode'

// // if (process.server && process.static) return
// // S
// // if (!i18nRedirected) return

// // const decoded = JWTDecode(accessTokenCookie)
// // console.log(store)
// locale = await locale()
// console.log('Out locale ..', locale)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    // language: 'el' // i18n.locale
  }
})
// }
