export default {
  data() {
    return {}
  },
  computed: {
    teams() {
      return this.$store.getters['table/listCache']('team')
    },
    userTeams() {
      return this.teams.filter(team => this.user?.team_id?.includes(team.team_id))
    },
  },
  async mounted() {
    await this.getTeams()
  },
  methods: {
    async getTeams() {
      try {
        await this.$store.dispatch('table/fetchList', { entity: 'team' })
      } catch (error) {
        console.log({ error })
      }
    },
  },
}
