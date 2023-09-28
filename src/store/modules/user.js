import { getUserData } from '@/auth/utils'

export default {
  namespaced: true,
  state: {
    user: getUserData(),
  },
  getters: {
    usertype: state => state.user?.usertype,
    userRoles: state => state.user?.roles,
    /**
     * Test if Logged user is Extern
     * @return boolean
     */
    isUserExtern: (state, getters) => getters.usertype?.usertype_external === 1,
    /**
     * Test if Logged user is Intern
     * @return boolean
     */
    isUserIntern: (state, getters) => !getters.isUserExtern,
    /**
     * Test if Logged user is Admin by testing value Administratoren
     * @return boolean
     */
    isUserAdmin: (state, getters) => getters.userRoles.some(role => role.role_name === 'Administratoren'),
    /**
     * Test if Logged user is Admin or Intern
     * @return boolean
     */
    isUserAdminOrIntern: (state, getters) => getters.isUserAdmin || getters.isUserIntern,
    /**
     * Test if Logged user is Admin and Intern
     * @return boolean
     */
    isUserInternAndAdmin: (state, getters) => getters.isUserAdmin && getters.isUserIntern,
    /**
     * Test if Logged user is Intern et non admin
     * @return boolean
     */
    isUserInternAndNotAdmin: (state, getters) => !getters.isUserAdmin && getters.isUserIntern,
    /**
     * Test if User Belong to partner
     * @return boolean
     */
    isUserBelongToPartner: state => {
      const { partnercompany } = state.user

      return !!(partnercompany && partnercompany.length > 0)
    },
    /**
     * Test if User Belong to company
     * @return boolean
     */
    isUserBelongToCompany: state => {
      const { company } = state.user

      return !!(company && Object.keys(company).length > 0)
    },
    /**
     * Test if Extern user is Partner or Client
     * @return boolean
     */
    isUserExternPartner: (state, getters) => getters.isUserExtern && getters.isUserBelongToPartner,
    /**
     * Test if Extern user is Client
     * @return boolean
     */
    isUserExternClient: (state, getters) => getters.isUserExtern && getters.isUserBelongToCompany,
    /**
     * Test if user is Director
     * @return boolean
     */
    isUserDirector: state => state.user?.user_is_director === 1,
    /**
     * Test if Extern user is director
     * @return boolean
     */
    isUserExternDirector: (state, getters) => getters.isUserExtern && getters.isUserDirector,
    /**
     * Test if Extern client user is director
     * @return boolean
     */
    isUserExternClientDirector: (state, getters) => getters.isUserExternClient && getters.isUserDirector,
    /**
     * Test if Extern client user is director
     * @return boolean
     */
    isUserExternClientNotDirector: (state, getters) => getters.isUserExternClient && !getters.isUserDirector,
    /**
     * Test if Extern Partner user is director
     * @return boolean
     */
    isUserExternPartnerDirector: (state, getters) => getters.isUserExternPartner && getters.isUserDirector,

  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.user = payload
    },
  },
  actions: {
    /**
     * Test if user has specified param role
     * @param state
     * @param roleName The name of the role
     */
    userHasRole({ state }, roleName) {
      const roles = state.user.roles

      if (roles.length > 0) {
        return roles.some(r => r.role_name === roleName)
      }
      return false
    },
    refreshUserData({ commit }, data) {
      commit('SET_USER_DATA', data)
    },
  },

}
