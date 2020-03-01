const app = {
  state: {
    token: 1, // 令牌
    username: '', // 用户名
    id: '' // 用户id
  },
  mutations: {
    SET_TOKEN: (state, newToken) => {
      state.token = newToken
    },
    SET_USERNAME: (state, newUsername) => {
      state.username = newUsername
    },
    SET_ID: (state, newId) => {
      state.id = newId
    }
  }
}

export default app
