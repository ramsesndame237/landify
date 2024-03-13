/**
 * @typedef {
 *  role_code: number,
 *  team: number
 * } SinglePermissionObject
 */

/**
 * Object used to check if user have the right permissions
 * @typedef {
 * create: SinglePermissionObject[],
 *  update: SinglePermissionObject[],
 *  remove: SinglePermissionObject[],
 *  list: SinglePermissionObject[],
 *  read: SinglePermissionObject[],
 * } PermissionObject
 */

/**
 * Build permission object
 * @param {object} permissionObject - Object with create, update, remove, read, list
 * @returns {PermissionObject}
 */
export const buildPermissions = ({
  create,
  update,
  remove,
  list,
  read,
  ...rest
}) => ({
  create,
  update,
  remove,
  list,
  read,
  ...rest,
})

/**
 * Build the permission object easily
 * @param {number} role_code - code of the role of the user
 * @param {*} team_id - id of the team the user belongs to
 * @returns {
 *  role_code: nunber,
 *  team_id: number,
 * }
 */
export const buildPermission = (role_code, team_id) => ({ role_code: Number(role_code), team_id: Number(team_id) })
