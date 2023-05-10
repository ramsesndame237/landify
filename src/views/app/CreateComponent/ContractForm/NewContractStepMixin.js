export default {


  methods: {

    async emitSubmit() {
      this.loading = true
      const data = {}
      this.fields.forEach(elt => {
        if (Object.hasOwnProperty.call(this.entity, elt.key)) {
          data[elt.key] = this.entity[elt.key]
        }
      })
      this[this.entityName].push(data)
      console.log('this[this.entityName]: ', this[this.entityName]);
      this.$refs.datatable.reload()
      this.$refs.form.reset()
      this.loading = false
    },

    DeleleItemsInDataTable(newItems) {
      this.specialrights = newItems
    },

  },
  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    }
  }
}
