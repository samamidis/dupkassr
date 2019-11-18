export default function() {
  if (!process.server) {
    console.log('middleware from client side')
  } else {
    console.log('middleware from server side')
  }
  console.log('Midlware')
}

// export default function({ isHMR, app, store, route, params, error, redirect })

//   console.log('Hit', store.state.i18n.locales)
//   // const defaultLocale = app.i18n.fallbackLocale
//   // If middleware is called from hot module replacement, ignore it
//   if (isHMR) {
//     return
//   }

//   const urlLocale = route.fullPath.split('/')[1]
//   console.log(urlLocale)
// if (!store.state.i18n.locales.includes(urlLocale)) {
//   const target = defaultLocale + route.fullPath
//   console.log('Pass 1 target ', target)
//   redirect('/' + target)
// } else {
//   console.log('pass2 ', urlLocale)
//   store.dispatch('i18n/setLocale', urlLocale)
//   app.i18n.locale = store.state.i18n.locale
//   // console.log('After 2', store.state.i18n.locale)
//   redirect(route.fullPath)
// }

// if (!params.lang) {
//   return redirect('/' + app.i18n.fallbackLocale + '/' + route.fullPath)
// }
// Get locale from params

// const locale = params.lang || defaultLocale
// console.log('Param.lang = ' + params.lang, 'locale :' + locale)
// if (!store.state.i18n.locales.includes(locale)) {
//   return error({ message: 'This page could not be found.', statusCode: 404 })
// }
// Set locale
// store.commit('SET_LANG', locale)
// store.commit('i18n/SET_LANG', locale)
// app.i18n.locale = store.state.i18n.locale
// If route is /<defaultLocale>/... -> redirect to /...
// console.log(
//   'route.fullPath = ' + route.fullPath,
//   'defaultLocal :' + defaultLocale,
//   'route.fullPath.indexOf(+ defaultLocale) :' +
//     route.fullPath.indexOf('/' + defaultLocale)
// )

// if (
//   locale === defaultLocale &&
//   route.fullPath.indexOf('/' + defaultLocale) === 0
// ) {
//   const toReplace =
//     '^/' +
//     defaultLocale +
//     (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
//   const re = new RegExp(toReplace)
//   console.log(
//     'Full path = ' + route.fullPath,
//     'replace = ' + re,
//     'default :' + defaultLocale
//   )
//   return redirect(route.fullPath.replace(re, '/'))
// }
// }
