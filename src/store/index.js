import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'
// import { fireAuth } from '@/plugins/firebase.js'

// export const strict = false

// export const state = () => ({
//   user: null
// })

// export const mutations = {
//   SET_USER(state, payload) {
//     state.user = payload
//   }
// }

export const actions = {
  // signOut({ commit }) {
  //   fireAuth
  //     .signOut()
  //     .then(() => {
  //       commit('setUser', null)
  //     })
  //     .catch(err => alert(err))
  // },
  // setUser({ commit }, user) {
  //   commit('SET_USER', user)
  // },
  // addProfile({ commit }, payload) {},
  // async nuxtServerInit({ commit, dispatch, state }, context) {
  //   if (!state.auth.checked) {
  //     cookieModule = context.app.$cookies;
  //     return await dispatch('INIT_CHECK_TOKENS').then(() => {
  //       commit('updateCheckStatus');
  //     });
  // Use cookies
  nuxtServerInit({ commit }, { req }) {
    console.log(
      'Nunt Server Init process.server && process.static, !req.headers.cookie: ',
      process.server,
      process.static,
      req.headers
    )
    if (process.server && process.static) return
    if (!req.headers.cookie) return
    const parsed = cookieparser.parse(req.headers.cookie)
    // console.log(' Parsed' + parsed)
    const accessTokenCookie = parsed.access_token
    // console.log(' Token accessTokenCookie' + accessTokenCookie)
    if (!accessTokenCookie) return

    const decoded = JWTDecode(accessTokenCookie)
    // console.log(' Decoded' + decoded)
    if (decoded) {
      console.log('Decoded cookie : ', decoded)
      commit('users/SET_USER', {
        uid: decoded.user_id,
        email: decoded.email
      })
    }
  }
}
