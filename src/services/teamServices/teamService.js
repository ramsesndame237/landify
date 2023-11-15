import { http } from '@/libs/axios'
import { TeamUrl } from '@/services/api/url'

class TeamService {
  static get_team_by_company = data => http.get(TeamUrl.GET_TEAM_COMPANY({ page: 1, per_page: 30, ...(data.company_id ? { company_id: data?.company_id } : {}) }))
}

export default TeamService
