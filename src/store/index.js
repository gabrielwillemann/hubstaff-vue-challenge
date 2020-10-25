import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  membersCount: 0,
  members: [],
  filters: {
    name: null,
    role: null,
    timeTracking: null
  }
})

export const getters = () => ({
  membersFiltered: state => {
    const filterRole = role => {
      if (!state.filters.role) return true
      return role === state.filters.role
    }

    const filterName = name => {
      if (!state.filters.name) return true
      return !!name.match(new RegExp(state.filters.name, 'i'))
    }

    const filterTimeTracking = timeTracking => {
      if (!state.filters.timeTracking) return true
      return timeTracking === state.filters.timeTracking
    }

    return state.members.filter(member => {
      return (
        filterName(member.name) &&
        filterRole(member.role) &&
        filterTimeTracking(member.time_tracking)
      )
    })
  },
  membersOwner: state => {
    return state.members.filter(member => member.role === 'Owner')
  }
})

export const mutations = () => ({
  setMembers(state, payload) {
    for (const member of payload.members) {
      member.selected = false
      member.hovered = false
    }
    state.membersCount = payload.count
    state.members = payload.members
  },
  setFilterName(state, name) {
    state.filters.name = name
  },
  setFilterRole(state, role) {
    state.filters.role = role
  },
  setFilterTimeTracking(state, timeTracking) {
    state.filters.timeTracking = timeTracking
  },
  setMemberSelected(state, payload) {
    state.members[payload.index].selected = payload.selected
  },
  setMemberHovered(state, payload) {
    state.members[payload.index].hovered = payload.hovered
  }
})

export const actions = () => ({
  async loadMembers({ commit }) {
    const res = await fetch(
      'https://run.mocky.io/v3/34234632-e36c-450d-a0a5-63249d1fa3ad'
    )
    const data = await res.json()
    commit('setMembers', data)
  }
})

export default new Vuex.Store({
  state: state(),
  getters: getters(),
  mutations: mutations(),
  actions: actions(),
  modules: {}
})
