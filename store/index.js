import { API_URL, INVALID_USER} from '~/constants/index'
export const state = () => ({
  user: null,
  users: [],
  pageLoading: false,
  pagination: null,
})


export const mutations = {
  SET_USER(state, user) {
    state.user = { ...user }
  },
  SET_USERS(state, users) {
    state.users.push(...users)
  },
  SET_PAGE_LOADING(state, value) {
    state.pageLoading = value
  },
  SET_INVALID_DATA_TOAST(state) {
    state.user = INVALID_USER
  },
  SET_PAGINATION(state, value) {
    state.pagination = { ...value }
  },
  ADD_USER(state, user) {
    state.users.unshift(user)
  }
}

export const actions = {
  setUserSession({ commit }, payload) {
    this.$cookies.set('token', payload, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    commit('SET_USER', payload)
  },

  async login({ commit, dispatch }, payload) {
    try {
      const response = await this.$axios.$post(`${API_URL}/login`, {
        ...payload,
      })
      commit('SET_PAGE_LOADING', true)
      if (response.token) {
        dispatch('setUserSession', response.token)
        this.$router.push({ name: 'users' })
      }
    } catch (e) {
      if(e.response.status === 400) {
        commit('SET_INVALID_DATA_TOAST')
      }
      console.error(e)
    }
  },

  async fetchUsers({commit}, page) {
    try {
      const response = await this.$axios.get(`${API_URL}/users?page=${page}`)
      const usersData = response.data
      const paginationSettings = {
        page: usersData.page,
        perPage: usersData.per_page,
        totalUsers: usersData.total,
        totalPages: usersData.total_pages,
      }
      const usersList = usersData.data
      commit('SET_PAGE_LOADING', true)
      commit('SET_PAGINATION', paginationSettings)
      if (response) {
        commit('SET_USERS', usersList)
      }
    } catch (e) {
      console.error(e)
    }
  },

  async getUsers({ dispatch, state }) {
    if(state.users.length) {
      return
    } else {
     await dispatch('fetchUsers', 1)
    }
  },

  async getUser({commit},id) {
    try {
      const response = await this.$axios.get(`${API_URL}/users/${id}`)
      const userData = response.data
      if (userData) {
        commit('SET_USER', userData.data)
      }
    } catch(e) {
      console.error(e)
    }
  },

  async updateUser({commit}, payload) {
    try{
      const response = await this.$axios.put(`${API_URL}/users/${payload.id}`)
      if(response.status === 200) {
        commit('SET_USER', response.data)
      }
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  },

  async deleteUser(id) {
    try {
      await this.$axios.delete(`${API_URL}/users/${id}`)
    } catch (e) {
      console.error(e)
    }
  },

  async createUser({commit}, payload) {
    try {
      const response = await this.$axios.post(`${API_URL}/users`, {...payload})
      commit('ADD_USER', response.data)
    } catch(e) {
      console.error(e)
    }
  },

  async handlePagination({state,commit, dispatch}) {
    const newPaginationSettings = {
      page: state.pagination.page + 1
    }
    commit('SET_PAGINATION', newPaginationSettings)
    const page = state.pagination.page
    await dispatch('fetchUsers', page)
  }
}