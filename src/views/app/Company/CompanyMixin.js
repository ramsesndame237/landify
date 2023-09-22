export default {
  data() {
    return {}
  },
  computed: {
    companies() {
      return this.$store.getters['table/listCache']('companies')
    },
    filteredCompanies() {
      const data = this.companies.map(company => ({ label: company.company_name, value: company.company_id }))

      return [{ label: 'All', value: null }, ...data]
    },
  },
  async mounted() {
    if (this.companies.length <= 0) {
      await this.getCompanies()
    }
  },
  methods: {
    async getCompanies() {
      try {
        const response = await this.$http.get('/companies')
        await this.$store.dispatch('table/setListData', { entity: 'companies', data: response.data.data })
      } catch (error) {
        console.log({ error })
      }
    },
  },
}
