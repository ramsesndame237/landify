import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [
      {
        id: 1,
        // eslint-disable-next-line global-require
        full_name: 'NYA',
        first_name: 'Josue',
        email: 'josue.nya@gohze.org',
        last_login: '2022/04/20',
        user_type: 'developer',
        company: 'Gohze',
      },
      {
        id: 2,
        // eslint-disable-next-line global-require
        full_name: 'NYA',
        first_name: 'Josue',
        email: 'josue.nya@gohze.org',
        last_login: '2022/04/20',
        user_type: 'developer',
        company: 'Gohze',
      },
      {
        id: 3,
        // eslint-disable-next-line global-require
        full_name: 'NYA',
        first_name: 'Josue',
        email: 'josue.nya@gohze.org',
        last_login: '2022/04/20',
        user_type: 'developer',
        company: 'Gohze',
      },
    ],
  },
  getters: {},
  mutations: {
    setUsers(state, users) {
      state.items = users
    },
  },
  actions: {
    async getUsers({ commit }) {
      await axios.get('https://627536d05dc4f5764ba0abcb.mockapi.io/api/users')
        .then(response => {
          commit('setUsers', response.data)
        })
    },
  },
}
