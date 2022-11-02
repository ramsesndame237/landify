import {
  BForm,
  BRow,
  BCol,
  BFormInput,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'
import Table from '@/table'

export default {
  components: {
    Field,
    BFormInput,
    BForm,
    BRow,
    BCol,
  },
  props: {
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    create: Boolean,
    initialData: Object,
    isRelation: Boolean,
    disabled: Boolean,
    cols: { default: 6 },
    inline: {
      type: Boolean,
      default: false
    },
    fetchData: {
      type: Boolean,
      default: true
    },
    entityId: { default: 0 },
  },
  data() {
    return {
      entity: { ...this.initialData, ...this.definition.default },
      entityLoaded: false,
      originalEntity: {},
      loading: false,
    }
  },
  methods: {
    fillRelations(entity, originalEntity, formFields, table, primaryKey) {
      return Promise.all(formFields.filter(field => field.type === 'list')
        .map(async field => {
          if (entity[field.key] == null) {
            await this.$api({
              entity: field.relationEntity ?? (`${table}_${field.list}_rel`),
              action: 'read-rich',
              data: [{
                [primaryKey]: `${entity[primaryKey]}`,
              }],
            })
              .then(({ data }) => {
                const result = data.data.data[0]
                if (field.multiple) {
                  this.$set(entity, field.key, data.data.data.map(r => r[field.key]))
                  this.$set(originalEntity, field.key, data.data.data.map(r => r[field.key]))
                  return
                }
                if (!result) return
                this.$set(entity, field.key, result[field.key])
                this.$set(originalEntity, field.key, result[field.key])
                if (field.with) {
                  (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
                    this.$set(entity, val, result[val])
                  })
                }
              })
          }
          if (field.alwaysNew) {
            const component = this.$refs.fields.find(f => f.field === field)
            if (!component) return
            const subDefinition = component.subDefinition
            this.getFormFields(subDefinition)
              .forEach(field => {
                if (this.initialData[field.key]) component.subEntity[field.key] = this.initialData[field.key]
              })
            const subOriginalEntity = originalEntity[field.key] == null ? {} : component.list.find(i => i[field.key] === originalEntity[field.key])
            return this.fillRelations(component.subEntity, subOriginalEntity || {}, this.getFormFields(subDefinition), field.list, this.getPrimaryKey(subDefinition))
          }
        }))
    },
    saveRelations(table, definition, primaryKey, entityId, entity, originalEntity) {
      const keys = [definition.primaryKey, ...(definition.fields.filter(f => f.composite)
        .map(f => f.key))]
      return Promise.all(definition.fields.filter(field => field.type === 'list' && keys.indexOf(field.key) === -1 && (entity[field.key] !== originalEntity[field.key] || !!field.with))
        .map(field => {
          const extras = { ...field.default }
          const column = field.tableKey || field.key
          console.log('save relation on column', column)
          if (field.with) {
            (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
              const withField = definition.fields.find(f => f.key === val)
              const withColumn = withField ? (withField.tableKey || withField.key) : val
              extras[withColumn] = entity[withField ? withField.key : val]
            })
          }
          const isNew = originalEntity[field.key] == null
          if (!isNew && field.alwaysNew) return Promise.resolve()
          const entityName = field.relationEntity ?? (`${table}_${field.list}_rel`)
          const data = (Array.isArray(entity[field.key]) ? entity[field.key] : [entity[field.key]])
            .filter(val => val != null)
            .map(val => ({
              [column]: val,
              [primaryKey]: entityId ?? entity[primaryKey],
              ...extras,
            }))
          const oldData = (Array.isArray(originalEntity[field.key]) ? originalEntity[field.key] : [originalEntity[field.key]])
            .filter(val => val != null)
            .map(val => ({
              [column]: val,
              [primaryKey]: entityId ?? entity[primaryKey],
              ...extras,
            }))
          console.log('data', data)
          return Promise.resolve()
            .then(() => {
              if (isNew) {
                // if id is non null
                if (data.length > 0) {
                  return this.$api({
                    entity: entityName,
                    action: 'create',
                    data,
                  })
                    .then(resp => {
                      this.saveTrackRecord(table, entity, originalEntity)
                      this.handleRelationErrors(resp, field)
                    })
                }
                return Promise.resolve()
              }
              return this.$api({
                entity: entityName,
                action: 'delete',
                data: oldData,
              })
                .then(() => {
                  if (data.length > 0) {
                    return this.$api({
                      entity: entityName,
                      action: 'create',
                      data,
                    })
                  }
                })
            })
            .then(resp => {
              this.handleRelationErrors(resp, field)
            })
        }))
    },
    handleRelationErrors(resp, field) {
      if (!resp || !resp.data) return
      const errors = resp.data.data.errors
      console.log('errors', errors)
      if (typeof errors === 'string') {
        this.$refs.form.setErrors({
          [field.key]: [errors],
        })
      }
      if (Array.isArray(errors) && errors.length > 0) {
        this.$refs.form.setErrors({
          [field.key]: errors.map(error => {
            if (typeof error === 'string') return error
            return error['Failed executing sql'].err
          }),
        })
      }
    },
    createNewEntities(fieldComponents, formFields, entity, originalEntity) {
      if (!Array.isArray(fieldComponents)) return Promise.resolve()
      return Promise.all(formFields.filter(field => {
        const component = fieldComponents.find(f => f.field === field)
        return !field.hide && component && (field.type === 'list') && (component.hasNew || field.alwaysNew)
      })
        .map(field => {
          const component = fieldComponents.find(f => f.field === field)
          const create = component.hasNew || (field.alwaysNew && originalEntity[field.key] == null)
          const formField = fieldComponents.find(f => f.field === field)
          const subDefinition = component.subDefinition
          const data = create ? formField.subEntity : {
            ...formField.subEntity,
            [field.key]: originalEntity[field.key]
          }
          const original = originalEntity[field.key] == null ? {} : formField.list.find(i => i[field.key] === originalEntity[field.key])
          console.log(create, data, original, originalEntity)
          return this.saveEntity(data, original,
            this.getFormFields(subDefinition), formField.getSubFields(), field.list, subDefinition, this.getPrimaryKey(subDefinition), create)
            .then(async data => {
              if (data.noupdate) return data.entity
              const id = data.data.data[0][0][field.key]
              // if (field.key === 'address_id') {
              //   await this.saveAddressData(formField, create ? { address_id: id } : formField.list.find(e => e[field.key] === originalEntity[field.key]))
              // }
              if (!field.onlyForm) await formField.fetchList()
              if (create) this.$set(entity, field.key, id)
              return data
            })
        }))
    },
    saveEntity(entity, originalEntity, formFields, fieldComponents, table, definition, primaryKey, create) {
      const action = create ? 'create' : 'update'
      return this.createNewEntities(fieldComponents, formFields, entity, originalEntity)
        .then(async () => {
          /// if we updating and we have no changes
          if (!create && formFields.filter(f => f.type !== 'list')
            .every(f => entity[f.key] === originalEntity[f.key])) {
            await this.saveRelations(table, definition, primaryKey, entity[primaryKey], entity, originalEntity)
            return {
              noupdate: true,
              entity
            }
          }
          return this.$api({
            entity: table,
            action,
            data: [
              entity,
            ],
          })
            .then(async ({ data }) => {
              if (data.data.errors[0]) {
                this.$errorToast(data.data.errors[0]['Failed executing sql'].err)
                throw new Error(data.data.errors[0]['Failed executing sql'].err)
              } else {
                try {
                  await this.saveRelations(table, definition, primaryKey, data.data.data[0][0][primaryKey], entity, originalEntity)
                } finally {
                  // this.$successToast(data.data.message)
                  // navigate to view page or reload table
                }
              }
              console.log('data', data)
              this.saveTrackRecord(table, data.data.data[0][0], originalEntity, action)
              return data
            })
        })
    },
    async afterSaveHook(data) {
    },
    saveTrackRecord(table, entity, originalEntity, usecase = 'create') {
      const TRACKABLES = ['company']

      if (!TRACKABLES.includes(table)) {
        return
      }

      console.log('====', {
        table,
        entity,
        originalEntity,
        usecase,
        primaryKey: this.primaryKey
      })


      // return this.$api({
      //   action: 'create',
      //   entity: 'trackrecord',
      //   data: [{
      //     trackrecord_type: 0,
      //     trackrecord_comment: `${table} - ${entity[this.primaryKey]}`,
      //     trackrecord_usecase: usecase,
      //   }],
      // })
      //   .then(result => {
      //     console.log('tr', result)
      //   })
      //   .catch(error => {
      //     throw error
      //   })
    },
    submit() {
      return this.$refs.form.validate()
        .then(success => {
          if (!success) {
            return Promise.reject(new Error('Invalid Form'))
          }
          this.loading = true
          return this.saveEntity(this.entity, this.originalEntity, this.formFields, this.$refs.fields, this.table, this.definition, this.primaryKey, this.create)
            .then(async data => {
              const result = data.noupdate ? data.entity : data.data.data[0][0]
              await this.afterSaveHook(result)
              this.$successToast(data.noupdate ? 'OK' : data.data.message)
              // navigate to view page or reload table
              return result
            })
            .catch(e => {
              console.log(e)
              const title = e.response?.data.detail || e.data?.errors[0].err
              this.$errorToast(title)
              return Promise.reject(e)
            })
            .finally(() => this.loading = false)
        })
    },
    setData(entity) {
      this.entity = { ...this.definition.default, ...entity }
    },
    reset() {
      if (this.$refs.fields) this.$refs.fields.forEach(f => f.subEntity = {})
      this.entity = { ...this.initialData, ...this.originalEntity }
      this.$refs.form.reset()
      this.$refs.form.reset()
    },
    async loadDefinition() {
      const { data } = await this.$api({
        action: 'read-rich',
        entity: this.table
      })
      this.$store.commit('table/setDefinition', {
        data,
        table: this.table
      })
    },
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
    isDisabled(field) {
      return this.disabled || field.disabled || (!this.create && field.disableOnUpdate)
    },
    isDisabledFromName(key) {
      return this.isDisabled(this.getField(key))
    },
    getFormFields(definition) {
      return definition.fields.filter(f => !f.hideOnForm && (this.create || !f.hideOnUpdate))
    },
    getPrimaryKey(definition) {
      return definition.primaryKey ?? definition.fields.find(f => f.auto).key
    },
  },
  computed: {
    formFields() {
      return this.getFormFields(this.definition)
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.tableDefinitionKey)
    },
    primaryKey() {
      return this.getPrimaryKey(this.definition)
    },
  },
  async mounted() {
    if (!this.tableDefinition) {
      await this.loadDefinition()
    }
    if (this.create) return
    if (!this.isRelation && this.fetchData) {
      const entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: this.table,
        primaryKey: this.primaryKey,
        id: this.entityId,
      })
      if (!entity) {
        this.$errorToast(`The entity with the id "${this.entityId}" doesnt exists`)
      } else {
        this.setData(entity)
      }
    }
    this.entityLoaded = true
    this.originalEntity = { ...this.entity }
    await this.fillRelations(this.entity, this.originalEntity, this.formFields, this.table, this.primaryKey)
  },
}
