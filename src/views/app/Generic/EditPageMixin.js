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
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', `${this.table}-`)
        })
        .catch(e => {
          console.error('error', e)
        })
        .finally(() => {
          this.loading = false
        })
    },
    deleteEntity() {
      const entities = [this.entity]
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(async result => {
        if (!result.value) return
        const entityToDelete = this.definition.fields.find(f => f.alwaysNew)
        const data = {
          action: 'delete',
          entity: this.table,
          data: entities.map(entity => this.definition.fields.filter(field => field.composite).reduce(((acc, currentValue) => {
            acc[currentValue.key] = entity[currentValue.key]
            return acc
          }), {
            [this.primaryKey]: Number(this.entityId),
          })),
        }
        this.$api(data).then(async resp => {
          if (entityToDelete) {
            try {
              await this.$api({ ...data, entity: entityToDelete.list })
            } catch (e) {
              console.error(e)
            }
          }
          const count = resp.data.data.rowcount
          if (count > 0) this.$successToast(`${count} Element${count > 1 ? 's' : ''} were deleted`)
          else this.$errorToast(`${count} Element${count > 1 ? 's' : ''} were deleted`)
          await this.$router.push({ name: 'table' })
          this.$store.commit('table/deleteListCacheKeyFromPrefix', this.table)
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', `${this.table}-`)
        })
          .catch(e => {
            console.error(e)
            this.$errorToast()
          })
      })
    },
  },
}
