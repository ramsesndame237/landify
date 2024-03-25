import { USER_ROLES } from '@/config/config-access/config-roles'
import intersectionBy from 'lodash/intersectionBy'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    teams() {
      return this.$store.getters['table/listCache']('teams')
    },
    userTeams() {
      return this.teams.filter(team => this.user?.team_id?.includes(team.team_id))
    },
    customerTeams() {
      return this.teams.filter(team => team.team_is_customer)
    },
    seyboldTeams() {
      return this.teams.filter(team => !team.team_is_customer)
    },
    filteredTeams() {
      const dataTeams = this.team_is_customer ? this.customerTeams : this.seyboldTeams
      let filteredTeam = dataTeams
      if (this.$isAdminOr(USER_ROLES.ext_team_member) && this.team_is_customer) {
        filteredTeam = intersectionBy(dataTeams, this.userTeams, 'team_id')
      }

      const formatedData = filteredTeam.map(team => ({ label: team.team_name, value: team.team_id, ...team }))

      return [{ label: 'All', value: -1 }, ...formatedData]
    },
    ...mapGetters('user', ['isUserExternClientNotDirector', 'isUserInternAndNotAdmin']),
  },
  async mounted() {
    if (this.teams.length <= 0) {
      await this.getTeams()
    }
  },
  methods: {
    async getTeams() {
      try {
        const response = await this.$http.get('/teams')
        await this.$store.dispatch('table/setListData', { entity: 'teams', data: response.data.data })
      } catch (error) {
        console.log({ error })
      }
    },
    isTeamExistInList(teamId) {
      return ![null, undefined, -1].includes(teamId) ? this.filteredTeams?.some(team => team.team_id === teamId) : false
    },
  },
}
