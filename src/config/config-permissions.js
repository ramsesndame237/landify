import { getUserData } from '@/auth/utils'
import { USER_ROLES } from './config-roles'

/**
 * @typedef { (userData) => Object } SinglePermissionObject
 * @property {number} role_code
 * @property {number} team_id
 */

/**
 * Object used to check if user have the right permissions
 * @typedef  {Object} PermissionObject
 * @property {SinglePermissionObject[]} create
 * @property {SinglePermissionObject[]} read
 * @property {SinglePermissionObject[]} update
 * @property {SinglePermissionObject[]} remove
 * @property {SinglePermissionObject[]} list
 * @property {SinglePermissionObject[]} note
 */

/**
 * Build permission object
 * @param {object} PermissionObject - Object with create, update, remove, read, list
 * @returns {PermissionObject}
 */
export const buildPermissions = ({
  create,
  update,
  remove,
  list,
  read,
  note,
}) => {
  const userData = getUserData()

  return {
    create: create instanceof Function ? create?.(userData) : create,
    update: update instanceof Function ? update?.(userData) : update,
    remove: remove instanceof Function ? remove?.(userData) : remove,
    list: list instanceof Function ? list?.(userData) : list,
    read: read instanceof Function ? read?.(userData) : read,
    note: note instanceof Function ? note?.(userData) : note,
  }
}

/**
 * Build the permission object easily
 * @param {number} role_code - code of the role of the user
 * @param {number} team_id - id of the team the user belongs to
 * @returns {SinglePermissionObject}
 */
export const buildPermission = (role_code, team_id) => ({ role_code, team_id: Number(team_id) })

/**
 * Return true if user have a specific a `role_code` and return false otherwhise
 * @param {string} roleCode
 */
export const isUserA = roleCode => {
  const userData = getUserData()
  const userRoleCode = userData?.roles?.[0]?.role_code

  return userRoleCode === roleCode
}

/**
 * Check permission and return true if user have access and false otherwhise
 * @param {PermissionObject} permissions
 * @returns {boolean}
 */
export const isAbleTo = (action, permissions) => {
  const userData = getUserData()

  const userRoleCode = userData?.roles?.[0]?.role_code
  const userTeams = userData?.team_id

  // eslint-disable-next-line no-nested-ternary
  const permissionList = permissions
    ? (Array.isArray(permissions) ? permissions : permissions?.[action])
    : permissions

  if (!permissionList) {
    return false
  }

  return permissionList.some(permission => permission.role_code === userRoleCode)
    || permissionList.some(permission => userTeams?.includes(permission.team_id))
}

export const USER_PERMISSIONS = {
  admin: buildPermission(USER_ROLES.admin, -2),
  team_lead: buildPermission(USER_ROLES.team_lead, -2),
  team_member: buildPermission(USER_ROLES.team_member, -2),
  ext_team_member: buildPermission(USER_ROLES.ext_team_member, -2),
  lead: buildPermission(USER_ROLES.lead, -2),
  expansion_manager: buildPermission(USER_ROLES.expansion_manager, -2),
  area_manager: buildPermission(USER_ROLES.area_manager, -2),
  store_manager: buildPermission(USER_ROLES.store_manager, -2),
  lawyer: buildPermission(USER_ROLES.lawyer, -2),
}
