const prefixer = 'https://api.dev-zelos.de'

export const TeamUrl = {
  GET_TEAM_COMPANY: pagination => `${prefixer}/teams?page =${pagination.page || 1}&per_page=${pagination.per_page || 30}&${pagination.company_id ? `&company_id=${pagination.company_id}` : ''}`,
}
export const CompanyUrl = {}
