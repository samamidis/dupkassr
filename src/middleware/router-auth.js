// export default function({ store, redirect, route }) {
//   // console.log(store.state)
//   // if (store.state.user != null && route.name === 'login') {
//   //   redirect('/app')
//   // }
//   // if (store.state.user == null && isSecureRoute(route)) {
//   //   redirect('/login')
//   // }
// }

// function isSecureRoute(route) {
//   if (route.matched.some(record => record.path === '/app')) {
//     return true
//   }
// }
// import cookieparser from 'cookieparser'

export default function({ store, route, redirect }) {
  const user = store.state.users.user
  const blockedRoute = /\/user\/*/g
  const homeRoute = '/' + store.state.i18n.locale + '/'

  // console.log('store locale ===> ', store.state.i18n.locale)

  if (!user && route.path.match(blockedRoute)) {
    redirect(homeRoute)
  }

  // if (user && route.path === homeRoute) {
  //   redirect('/' + store.state.i18n.locale + '/admin')
  // }
}
