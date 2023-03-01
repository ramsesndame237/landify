import ability from './ability'

export const canNavigate = to => {
  if (to.params.table) {
    return ability.can('read', to.params.table)
  }
  return to.matched.some(route => ability.can(route.meta.action || 'read', route.params?.table || route.meta.resource))
}

export const _ = undefined
