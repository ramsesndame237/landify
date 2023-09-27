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
  const isUserExtern = () => userType?.usertype_external === 1
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
  /**
   * Test if Logged user is Admin and Intern
   * @return boolean
   */
  const isUserInternAndAdmin = () => isUserAdmin() && isUserIntern()

  /**
   * Test if Logged user is Intern et non admin
   * @return boolean
   */
  const isUserInternAndNotAdmin = () => !isUserAdmin() && isUserIntern()

  /**
   * Test if User Belong to partner
   * @return boolean
   */
  const isUserBelongToPartner = () => {
    const { partnercompany } = userData

    return !!(partnercompany && partnercompany.length > 0)
  }

  /**
   * Test if User Belong to company
   * @return boolean
   */
  const isUserBelongToCompany = () => {
    const { company } = userData

    return !!(company && Object.keys(company).length > 0)
  }

  /**
   * Test if Extern user is Partner or Client
   * @return boolean
   */
  const isUserExternPartner = () => isUserExtern() && isUserBelongToPartner()

  /**
   * Test if Extern user is Client
   * @return boolean
   */
  const isUserExternClient = () => isUserExtern() && isUserBelongToCompany()

  /**
   * Test if user is Director
   * @return boolean
   */
  const isUserDirector = () => userData?.user_is_director === 1

  /**
   * Test if Extern user is director
   * @return boolean
   */
  const isUserExternDirector = () => isUserExtern() && isUserDirector()

  /**
   * Test if Extern client user is director
   * @return boolean
   */
  const isUserExternClientDirector = () => isUserExternClient() && isUserDirector()

  /**
   * Test if Extern Partner user is director
   * @return boolean
   */
  const isUserExternPartnerDirector = () => isUserExternPartner() && isUserDirector()

  // console.log(`
  //   isAdmin: ${isUserAdmin()}\n
  //   isUserInternal: ${isUserIntern()} \n
  //   isUserExtern: ${isUserExtern()} \n
  //   isUserAdminOrInternal: ${isUserAdminOrIntern()} \n
  //   isUserExternPartner: ${isUserExternPartner()} \n
  //   isUserBelongToPartner: ${isUserBelongToPartner()} \n
  //   isUserExternDirector: ${isUserExternDirector()} \n
  //   isUserInternAndNotAdmin: ${isUserInternAndNotAdmin()} \n
  //   isUserExternClient: ${isUserExternClient()} \n
  //   isUserExternClientDirector: ${isUserExternClientDirector()} \n
  //   isUserExternPartnerDirector: ${isUserExternPartnerDirector()} \n
  //   isUserAdminAndIntern: ${isUserInternAndAdmin()} \n
  // `)

  return {
    isUserIntern,
    isUserAdmin,
    isUserExtern,
    isUserAdminOrIntern,
    userHasRole,
    isUserExternPartner,
    isUserExternDirector,
    isUserInternAndNotAdmin,
    isUserExternClient,
    isUserExternClientDirector,
    isUserExternPartnerDirector,
    isUserInternAndAdmin,
    noData: false,
  }
}

const {
  userHasRole, isUserAdminOrIntern, isUserExtern, isUserAdmin, isUserIntern, noData, isUserExternPartner, isUserExternDirector,
  isUserInternAndNotAdmin, isUserExternClient, isUserExternClientDirector, isUserExternPartnerDirector, isUserInternAndAdmin,
} = useUserAccess()
if (!noData) {
  Vue.prototype.$userHasRole = userHasRole
  Vue.prototype.$isUserAdmin = isUserAdmin()
  Vue.prototype.$isUserIntern = isUserIntern()
  Vue.prototype.$isUserAdminOrIntern = isUserAdminOrIntern()
  Vue.prototype.$isUserExtern = isUserExtern()
  Vue.prototype.$isUserExternPartner = isUserExternPartner()
  Vue.prototype.$isUserExternDirector = isUserExternDirector()
  Vue.prototype.$isUserInternAndNotAdmin = isUserInternAndNotAdmin()
  Vue.prototype.$isUserExternClient = isUserExternClient()
  Vue.prototype.$isUserExternClientDirector = isUserExternClientDirector()
  Vue.prototype.$isUserExternPartnerDirector = isUserExternPartnerDirector()
  Vue.prototype.$isUserInternAndAdmin = isUserInternAndAdmin()
}
