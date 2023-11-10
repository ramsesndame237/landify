import state from './state'

const mutations = {
  SET_TEAM_COMPANY: (stateTeam = state, team_company) => {
    stateTeam.team_by_company = team_company
  },
}

export default mutations
