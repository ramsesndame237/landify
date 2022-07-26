export default {
  methods: {
    fillRelations(entity) {
      return Promise.all(this.formFields.filter(field => field.type === 'list').map(field => this.$api({
        entity: field.relationEntity ?? (`${this.table}_${field.list}_rel`),
        action: 'read-rich',
        filter: {
          [this.primaryKey]: `${this.entity[this.primaryKey]}`,
        },
      })
        .then(({ data }) => {
          this.$set(entity, field.key, data.data.data[0][field.key])
          if (field.with) {
            (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
              this.$set(entity, val, data.data.data[0][val])
            })
          }
        })))
    },
    saveRelations(entityId) {
      return Promise.all(this.formFields.filter(field => field.type === 'list').map(field => {
        const extras = {}
        if (field.with) {
          (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
            extras[val] = this.entity[val]
          })
        }
        return this.$api({
          entity: field.relationEntity ?? (`${this.table}_${field.list}_rel`),
          action: this.create ? 'create' : 'update',
          data: [{
            [field.key]: this.entity[field.key],
            [this.primaryKey]: entityId ?? this.entity[this.primaryKey],
            ...extras,
          }],
        })
      }))
    },
    createNewEntities() {
      return Promise.all(this.formFields.filter(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        console.log(formField, formField.hasNew)
        return field.type === 'list' && formField.hasNew
      }).map(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        return this.$api({
          entity: field.list,
          action: 'create',
          data: [formField.subEntity],
        }).then(({ data }) => {
          formField.list.push(data.data.data[0][0])
          const id = data.data.data[0][0][field.key]
          this.$set(this.entity, field.key, id)
          return id
        })
      }))
    },
    submit() {
      return this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.loading = true
        return this.createNewEntities()
          .then(() => {
            return this.$api({
              entity: this.table,
              action: this.create ? 'create' : 'update',
              data: [
                this.entity,
              ],
            })
              .then(async ({ data }) => {
                try {
                  if (!this.isRelation) {
                    await this.saveRelations(data.data.data[0][0][this.primaryKey])
                  }
                } finally {
                  this.$successToast(data.data.message)
                  this.$emit('reload-table')
                  // navigate to view page or reload table
                }
              })
              .catch(e => {
                console.log(e)
                const title = e.response?.data.detail
                this.$errorToast(title)
              })
          })
          .finally(() => this.loading = false)
      })
    },
  },
}
