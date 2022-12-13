import Tables from '@/table'

export default {
  data() {
    return {
      view: this.$route.name === 'table-view' && this.$route.query.edit !== 'true',
      entity: this.$route.params.entity,
      create: this.$route.name === 'table-form',
      loading: false,
      tabIndex: parseInt(this.$route.query.tab || 0),
    }
  },
  computed: {
    title() {
      if (this.create) return `headline~${this.table}~new`
      return `headline~${this.table}~detail`
    },
    table() {
      return this.$route.params.table
    },
    definition() {
      return Tables[this.table]
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },
    entityId() {
      // convert to string to fix bug on relation tables
      return this.$route.params.id
    },
    primaryKey() {
      return this.definition.primaryKey ?? this.definition.fields.find(f => f.auto).key
    },
  },
  methods: {
    cancel() {
      if (this.create) this.$router.push({ name: 'table', params: { table: this.table } })
      else {
        this.view = true
        this.$refs.form.reset()
      }
    },
    edit() {
      this.view = false
    },
    update() {
      this.loading = true
      this.$refs.form.submit()
        .then(data => {
          this.view = true
          if (this.create) {
            console.log('data', data)
            this.$router.push({ name: 'table-view', params: { id: data[this.primaryKey] }, query: { edit: true } })
          }
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', this.table + '-')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
