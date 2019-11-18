import colors from 'vuetify/es5/util/colors'
import { API_ROOT, I18N } from './config'

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    dev: false,
    title: 'DupKa App',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.muicss.com/mui-0.9.35/css/mui.min.css'
      }
    ]
  },

  // <script src="https://cdn.muicss.com/mui-0.9.35/js/mui.min.js"></script>
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  plugins: [{ src: '@/plugins/google-maps', ssr: true }],
  router: {
    middleware: 'router-auth'
  },
  css: [],
  env: {
    VUE_APP_GOOGLE_MAPS_API_KEY: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
  },
  modules: [
    ['@nuxtjs/dotenv'],
    ['nuxt-i18n', I18N],
    ['vue-geolocation-api/nuxt'],
    [
      '@nuxtjs/axios',
      {
        baseURL: API_ROOT
      }
    ]
  ],
  geolocation: {
    watch: true
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  // buildDir: '../prod/server/nuxt',
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
    extractCSS: true,
    // transpile: [/^vue2-google-maps($|\/)/],
    // babel: {
    //   presets: [
    //     'es2015',
    //     'stage-0'
    //   ],
    //   plugins: [
    //     ["transform-runtime", {
    //       "polyfill": true,
    //       "regenerator": true
    //     }],
    //   ]
    // },
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
