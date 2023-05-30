export default {


  methods: {

    async add() {
      this.loading = true
      this.$refs.form.submit()
      .then(entity=>{
          this[this.idsName].push(entity.area_id)
          this.$refs.datatable.reload()
          this.$refs.form.reset()
        })
        .catch(error => console.error('error when save contract area', error))
        .finaly(()=> this.loading = false)
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
