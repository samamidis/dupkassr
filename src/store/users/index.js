import Cookie from 'js-cookie'
import { fireAuth } from '@/plugins/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: (state, account) => {
    console.log('Setting user ...', account)
    state.user = account
  },
  RESET_USER: state => {
    state.user = null
  }
}

export const actions = {
  resetUser({ commit }) {
    try {
      commit('RESET_USER')
      Cookie.remove('access_token')
    } catch (error) {
      throw error
    }
  },

  setUser({ commit }, payload) {
    try {
      // Login the user
      // await auth.signInWithEmailAndPassword(account.email, account.password)
      //   console.log('payload =====>   ', payload)
      // Get JWT from Firebase
      if (payload) {
        const token = payload.token
        const temp = { email: payload.user.email, uid: payload.user.uid }
        commit('SET_USER', temp)
        // Set JWT to the cookie
        Cookie.set('access_token', token)
      } else {
        console.log('what the fuck')
        // commit('SET_USER', null)
        // Cookie.remove('access_token')
      }
    } catch (error) {
      throw error
    }
  }
}

if (!process.server) {
  fireAuth.onAuthStateChanged(async user => {
    if (user) {
      console.log('User In', user)
      const token = await fireAuth.currentUser.getIdToken()
      const newuser = {
        email: user.email,
        uid: user.uid
      }

      Cookie.set('access_token', token)
      mutations.SET_USER(state, newuser)
    } else {
      console.log('Nice place No User In')
      mutations.RESET_USER(state)
      Cookie.remove('access_token')
    }
  })
}
