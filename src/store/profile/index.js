export const strict = false
export const state = () => ({
  profile: {}
})

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  RESET_PROFILE(state) {
    state.profile = null
  }
}

export const actions = {
  setProfile({ commit }, profile) {
    commit('SET_PROFILE', profile)
  },
  resetProfile({ commit }) {
    commit('SET_PROFILE')
  }
}
