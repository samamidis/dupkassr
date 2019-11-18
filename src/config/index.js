import en from '../lang/en-US.js'
import el from '../lang/el-GR.js'
import ro from '../lang/ro-RO.js'
import bg from '../lang/bg-BG.js'

export const API_ROOT = 'https://jsonplaceholder.typicode.com/'

export const I18N = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'ro',
      iso: 'ro-Ro',
      name: 'Românesc'
    },
    {
      code: 'bg',
      iso: 'bg-Bg',
      name: 'български'
    },
    {
      code: 'el',
      iso: 'el-GR',
      name: 'Ελληνικά'
    }
  ],

  strategy: 'prefix_and_default',
  defaultLocale: 'en',

  detectBrowserLanguage: {
    useCookie: true,
    alwaysRedirect: true
  },

  // routes: {
  //   about: {
  //     ro: '/despre noi',
  //     en: '/about-us',
  //     el: '/Σχετικά με εμάς',
  //     bg: 'за нас'
  //   },
  //   posts: {
  //     ro: '/articole',
  //     en: '/articles',
  //     bg: 'статии',
  //     el: 'αρθρα'
  //   },
  //   'post/_id': {
  //     ro: '/articol/:id?',
  //     el: '/άρθρo/:id?',
  //     bg: '/статия/:id?',
  //     en: 'article/:id'
  //   },
  //   'dynamicNested/_category': {
  //     fr: 'imbrication-dynamique/:category',
  //     el: 'Δυναμική-εσωτερική/:category',
  //     bg: 'динамично-вложен/:category',
  //     ro: 'dinamic-Cuibărit/:category'
  //   }
  // },

  vuex: {
    // Module namespace AIzaSyACh8QwUO8MKvL8W6y4GL2JXSfN9Z2g1_Y
    moduleName: 'i18n',

    // If enabled, current app's locale is synced with nuxt-i18n store module 
    syncLocale: true,

    // If enabled, current translation messages are synced with nuxt-i18n store module
    syncMessages: false,

    // Mutation to commit to set route parameters translations
    syncRouteParams: false
  },
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, el, bg, ro }
  }
}
