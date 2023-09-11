import Vue from 'vue'

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const setUserDataConfigsByKey = data => {
  const userData = getUserData()
  const { configs } = userData
  // Vérifie si la config existe déjà dans le tableau
  const index = configs.findIndex(config => config.config_key === data.config_key)
  if (index < 0) {
    // J'ajoute la config envoyée
    configs.push(data)
  } else {
    const configIndex = configs.findIndex(config => config.config_key === data.config_key)
    configs.splice(configIndex, 1, data)
  }

  userData.configs = configs
  localStorage.setItem('userData', JSON.stringify(userData))
}

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 */
export const getHomeRouteForLoggedInUser = () => '/app'

const useUserAccess = () => {
  const userData = getUserData()

  if (!userData) {
    return {
      noData: true,
    }
  }
  const userType = userData?.usertype

  /**
   * Test if user has specified param role
   * @param roleName The name of the role
   */
  const userHasRole = roleName => {
    const roles = userData.roles

    if (roles.length > 0) {
      return roles.some(r => r.role_name === roleName)
    }

    return false
  }

  /**
   * Test if Logged user is Admin by testing value Administratoren
   * @return boolean
   */
  const isUserAdmin = () => userHasRole('Administratoren')
  /**
   * Test if Logged user is Extern
   * @return boolean
   */
  const isUserExtern = () => userType.usertype_external === 1
  /**
   * Test if Logged user is Intern
   * @return boolean
   */
  const isUserIntern = () => !isUserExtern()
  /**
   * Test if Logged user is Admin or Intern
   * @return boolean
   */
  const isUserAdminOrIntern = () => isUserAdmin() || isUserIntern()

  // console.log(`
  //   isAdmin: ${isUserAdmin()}\n
  //   isUserInternal: ${isUserIntern()} \n
  //   isUserExternal: ${isUserExtern()} \n
  //   isUserAdminOrInternal: ${isUserAdminOrIntern()} \n
  // `)

  return {
    isUserIntern,
    isUserAdmin,
    isUserExtern,
    isUserAdminOrIntern,
    userHasRole,
    noData: false,
  }
}

const {
  userHasRole, isUserAdminOrIntern, isUserExtern, isUserAdmin, isUserIntern, noData,
} = useUserAccess()
if (!noData) {
  Vue.prototype.$userHasRole = userHasRole
  Vue.prototype.$isUserAdmin = isUserAdmin()
  Vue.prototype.$isUserIntern = isUserIntern()
  Vue.prototype.$isUserAdminOrIntern = isUserAdminOrIntern()
  Vue.prototype.$isUserExtern = isUserExtern()
}
