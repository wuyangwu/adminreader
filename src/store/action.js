const action = {
  setToken: ({ commit }, newToken) => {
    return commit('SET_TOKEN', newToken)
  },
  setUsername: ({ commit }, newUsername) => {
    return commit('SET_USERNAME', newUsername)
  },
  setId: ({ commit }, newId) => {
    return commit('SET_ID', newId)
  }
}

export default action
