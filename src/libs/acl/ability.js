import { Ability } from '@casl/ability'
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
  return ''
}

export const defineRules = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const rules = [{ subject: 'Auth', action: 'read' }]
  if (!userData) return rules
  const tablegroups = userData.tablegroups
  const users_tablegroups = userData.users_tablegroups
  rules.push({ action: 'read', subject: 'dashboard' })
  //
  try {
    if (userData.roles.find(r => r.role_name === 'Administratoren')) {
      rules.push({ action: 'manage', subject: 'all' })
    }
    userData.roles.forEach(role => {
      const { tablegroups: roleTableGroups } = role
      const temptRules = []

      if (roleTableGroups.length > 0) {
        roleTableGroups.forEach(tg => {
          const userTableGroup = users_tablegroups.find(userTg => userTg.tablegroup_id === tg.tablegroup_id)
          const { tablename } = tablegroups.find(tablegroup => tablegroup.tablegroup_id === tg.tablegroup_id)
          if (userTableGroup && userTableGroup[tg.crud] === true) {
            if (tablename && tablename.length > 0) {
              temptRules.push(...tablename.map(tn => ({ action: getAction(tg.crud), subject: tn.table_name })))
            }
          }
          // J'ajoute les permissions propres à un User
          for (const [key, value] of Object.entries(userTableGroup)) {
            if (value === true && key !== tg.crud) {
              temptRules.push(...tablename.map(tn => ({ action: getAction(key), subject: tn.table_name })))
            }
          }
        })
      }
      rules.push(...temptRules)

      // Récupération des configs de menu dans les data de l'utilisateur
      const tempsRules = []
      const { configs } = userData
      if (configs.length > 0) {
        const menuConfig = configs.find(config => config.config_key === 'menu')
        if (menuConfig) {
          const configValues = JSON.parse(menuConfig.config_val)

          // Je boucle sur les données reçues pour faire le traitement
          configValues.forEach(access => {
            const isThereRoleMenu = access.menus.some(menu => (menu.name === role.role_menu && menu.value === true))
            if (isThereRoleMenu) {
              tempsRules.push({ action: access.access_name, subject: 'menu' })
            }
          })
        }
      }

      rules.push(...tempsRules)
      // rules.push(...role.access.map(access => ({ action: access.access_name, subject: 'menu' })))
    })
  } catch (e) {
    console.error(e)
  }

  return rules
}

export default new Ability(defineRules())
