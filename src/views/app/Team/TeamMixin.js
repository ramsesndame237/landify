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
      const data = this.team_is_customer ? this.customerTeams : this.seyboldTeams
      const formatedData = data.map(team => ({ label: team.team_name, value: team.team_id, ...team }))

      return [{ label: 'All', value: -1 }, ...formatedData]
    },
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
