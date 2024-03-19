export class UserRole {
  constructor(role_code, teams, options) {
    this.role_code = role_code
    this.teams = teams ?? []
    this.options = options ?? []
  }

  withTeams(...teams) {
    return {
      ...this,
      teams,
    }
  }

  withOptions(...options) {
    return {
      ...this,
      options,
    }
  }
}

export const USER_ROLES = {
  admin: new UserRole('admin'),
  team_lead: new UserRole('team_lead'),
  team_member: new UserRole('team_member'),
  ext_team_member: new UserRole('ext_team_member'),
  lead: new UserRole('lead'),
  expansion_manager: new UserRole('expansion_manager'),
  area_manager: new UserRole('area_manager'),
  store_manager: new UserRole('store_manager'),
  lawyer: new UserRole('lawyer'),
}
