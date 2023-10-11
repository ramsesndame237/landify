import state from './state'

const mutations = {
  setTeamByCompany: team_company => {
    state.team_by_company = team_company
  },
}

export default mutations
