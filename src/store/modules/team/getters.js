import state from './state'

const getters = {
  teamCompany: () => state.team_by_company,
  allTeam: () => state.teams_all,
}

export default getters
