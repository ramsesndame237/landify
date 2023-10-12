import TeamService from '@/services/teamServices/teamService'

const actions = {
  async fetchCompanyByTeam({ commit }, company_id) {
    console.log('this is the company id', company_id)
    await TeamService.get_team_by_company({ company_id }).then(response => {
      console.log('this is the response', response)
    }).catch(error => {
      // Handle the error
      console.error(error)
    })
  },
}

export default actions
