import { getUserData } from '@/auth/utils'
import { USER_ROLES } from './config-roles'

/**
 * @typedef { (userData) => Object } SinglePermissionObject
 * @property {number} role_code
 * @property {number} teams
 */

/**
 * Build permission object
 * @param {PermissionObject} PermissionObject - Object with create, update, remove, read, list, seeHeader
 * @returns {PermissionObject}
 */
export const buildPermissions = ({
  create,
  update,
  remove,
  list,
  read,
  note,
  seeHeader,
}) => {
  const userData = getUserData()

  return {
    create: create instanceof Function ? create?.(userData) : create,
    update: update instanceof Function ? update?.(userData) : update,
    remove: remove instanceof Function ? remove?.(userData) : remove,
    list: list instanceof Function ? list?.(userData) : list,
    read: read instanceof Function ? read?.(userData) : read,
    note: note instanceof Function ? note?.(userData) : note,
    seeHeader: seeHeader instanceof Function ? seeHeader?.(userData) : seeHeader,
  }
}

/**
 * Create Permission object that will be use for access guard
 * @constructor
 * @property {UserRole} role - the code of the role allowed
 * @property {array} teams - teams allowed with this role code
 * @property {array} options - options allowed with this role code
 * @method withOptions - Replace initial permission options. Can be chained. @returns {Permission}
 * @method withTeams - Replace initial teams options. Can be chained. @returns {Permission}
 */
export class Permission {
  constructor(role, _teams, _options) {
    this.role = role
    const teams = _teams || role.teams
    const options = _options || role.options

    if (Array.isArray(teams)) {
      this.teams = teams.map(teamId => Number(teamId))
    } else {
      this.teams = teams ? [teams] : []
    }
    if (Array.isArray(options)) {
      this.options = options.map(optionId => Number(optionId))
    } else {
      this.options = options ? [options] : []
    }
  }

  /**
   * Returns the same permission with the passed options
   * @args list of options ids
   * @returns {Permission}
   */
  withOptions(...options) {
    return {
      ...this,
      options,
    }
  }

  /**
   * Returns the same permission with the passed team
   * @args - List of team ids
   * @returns {Permission}
   */
  withTeams(...teams) {
    return {
      ...this,
      teams,
    }
  }
}

/**
 * Return true if user have a specific a `role_code` and return false otherwhise
 * @args roles list
 */
export const isAdminOr = (...roles) => {
  const userData = getUserData()
  const userRoleCode = userData?.roles?.[0]?.role_code
  if (userRoleCode === 'admin') {
    return true
  }
  const userTeams = userData?.team_id ?? []

  return (roles.some(role => role.role_code === userRoleCode && (role.teams.length > 0 ? role.teams.some(teamId => userTeams.includes(teamId)) : true)))
}

/**
 * Return true if user is admin or have a specific a `role_code` and return false otherwhise
 * @args roles list
 */
export const isA = (...roles) => {
  const userData = getUserData()
  const userRoleCode = userData?.roles?.[0]?.role_code
  const userTeams = userData?.team_id ?? []

  return (roles.some(role => role.role_code === userRoleCode && (role.teams.length > 0 ? role.teams.some(teamId => userTeams.includes(teamId)) : true)))
}

/**
 * Check permission and return true if user is admin or have access and false otherwhise
 * @param {Permission} permissions
 * @returns {boolean}
 */
export const isAbleTo = (action, permissions) => {
  const userData = getUserData()

  const userRoleCode = userData?.roles?.[0]?.role_code
  if (userRoleCode === 'admin') {
    return true
  }

  const userTeams = userData?.team_id ?? []
  const userOptions = userData?.options ?? []

  // eslint-disable-next-line no-nested-ternary
  const permissionList = permissions
    ? (Array.isArray(permissions) ? permissions : permissions?.[action])
    : permissions

  if (!permissionList) {
    return false
  }

  return permissionList.some(
    permission => ((permission.role.role_code === userRoleCode)
    && (permission.teams.length > 0 ? permission.teams.some(teamId => userTeams.includes(teamId)) : true)
    && (permission.options.length > 0 ? permission.options.some(optionId => userOptions.includes(optionId)) : true)),
  )
}

/**
 * List of user permissions
 */
export const USER_PERMISSIONS = {
  admin: new Permission(USER_ROLES.admin),
  team_lead: new Permission(USER_ROLES.team_lead),
  team_member: new Permission(USER_ROLES.team_member),
  ext_team_member: new Permission(USER_ROLES.ext_team_member),
  lead: new Permission(USER_ROLES.lead),
  expansion_manager: new Permission(USER_ROLES.expansion_manager),
  area_manager: new Permission(USER_ROLES.area_manager),
  store_manager: new Permission(USER_ROLES.store_manager),
  lawyer: new Permission(USER_ROLES.lawyer),
}

export const PERMISSIONS_GROUPS = {
  externs: [
    USER_PERMISSIONS.lead,
    USER_PERMISSIONS.expansion_manager,
    USER_PERMISSIONS.area_manager,
    USER_PERMISSIONS.store_manager,
    USER_PERMISSIONS.ext_team_member,
  ],
  interns: [
    USER_PERMISSIONS.admin,
    USER_PERMISSIONS.team_lead,
    USER_PERMISSIONS.team_member,
  ],
}
