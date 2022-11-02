import { Ability, AbilityBuilder } from '@casl/ability'

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
  if (userEmail === 'johndoe@example.com') {
    rules.push({ action: 'manage', subject: 'all' })
  }
  const validTables = userData.tables
  const validTableGroups = userData.tablegroups
  rules.push(...validTables.map(table => ({ action: getAction(table.crud), subject: table.table_name })))
  validTableGroups.forEach(group => {
    rules.push(...userData.tablegroup_tables.filter(tgt => tgt.tablegroup_id === group.tablegroup_id).map(tgt => ({
      action: getAction(group.crud),
      subject: tgt.table_name,
    })))
  })
  return rules
}

export default new Ability(defineRules())
