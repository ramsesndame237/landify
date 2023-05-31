import { Ability, AbilityBuilder } from '@casl/ability'
import _ from 'lodash'
//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
function getAction(crud) {
  // eslint-disable-next-line default-case
  switch (crud) {
    case 'c':
      return 'create'
    case 'd':
      return 'delete'
    case 'r':
      return 'read'
    case 'u':
      return 'update'
  }
}

export const defineRules = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const userEmail = localStorage.getItem('userEmail')
  const rules = [{ subject: 'Auth', action: 'read' }]

  if (!userData) return rules
  rules.push({ action: 'read', subject: 'dashboard' })
  //
  try {
    if (userData.roles.find(r => r.role_name === 'Administrator')) {
      rules.push({ action: 'manage', subject: 'all' })
    }
    userData.roles.forEach(role => {
      rules.push(..._.flatten(role.tablegroups.map(tg => tg.tablename.map(tn => ({
        action: getAction(tg.crud),
        subject: tn.table_name,
      })))))
      rules.push(...role.tablenames.map(table => ({ action: getAction(table.crud), subject: table.table_name })))
      rules.push(...role.access.map(access => ({ action: access.access_name, subject: 'menu' })))
    })
  } catch (e) {
    console.error(e)
  }

  return rules
}

export default new Ability(defineRules())
