export default {

  methods: {

    async save() {
      this.loading = true
      this[this.entityName].push({ ...this.entity })
      this.$refs.datatable.reload()
      this.$refs.fields.forEach(f => {
        if (f.visible) f.reset()
      })
      this.$refs.form.reset()
      this.loading = false
    },

    DeleleItemsInDataTable(newItems) {
      this[this.entityName] = newItems
    },

  },
  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },
  },
}
