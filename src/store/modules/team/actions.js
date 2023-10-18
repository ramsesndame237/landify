import TeamService from '@/services/teamServices/teamService'
import mutations from './mutations'

const actions = {
  async fetchCompanyByTeam({ commit }, company_id) {
    await TeamService.get_team_by_company({ company_id }).then(response => {
      commit('SET_TEAM_COMPANY', response.data.data)
    }).catch(error => {
      // Handle the error
      console.error(error)
    })
  },
}

export default actions
