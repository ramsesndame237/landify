import {
  BForm,
  BRow,
  BCol,
  BFormInput,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'
import merge from 'lodash/merge'

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
      default: false,
    },
    fetchData: {
      type: Boolean,
      default: true,
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
  watch: {
    entity: {
      handler() {
        // console.log('entity', val)
      },
      deep: true,
    },
  },
  methods: {
    fillRelations(entity, originalEntity, formFields, table, primaryKey) {
      return Promise.all(formFields.filter(field => field.type === 'list' && field.relationEntity !== false)
        .map(async field => {
          console.log('Fill relations', field, table, primaryKey, entity)
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
            const component = this.getFieldComponents().find(f => f.field === field)
            if (!component) return
            const { subDefinition } = component
            this.getFormFields(subDefinition)
              .forEach(f => {
                if (this.initialData[f.key] !== null) {
                  this.$set(component.subEntity, f.key, this.initialData[f.key])
                  this.$set(component.subOriginalEntity, f.key, this.initialData[f.key])
                }
              })
            await this.fillRelations(component.subEntity, component.subOriginalEntity, this.getFormFields(subDefinition), field.list, this.getPrimaryKey(subDefinition))
          }
        }))
    },
    saveRelations(table, definition, primaryKey, entityId, entity, originalEntity) {
      const keys = [definition.primaryKey, ...(definition.fields.filter(f => f.composite)
        .map(f => f.key))]
      return Promise.all(definition.fields.filter(field => field.type === 'list' && field.relationEntity !== false && keys.indexOf(field.key) === -1 && (entity[field.key] !== originalEntity[field.key] || !!field.with))
        .map(field => {
          const extras = { ...field.default }
          const column = field.tableKey || field.key
          console.log('save relation on column', column, originalEntity, entity)
          if (field.with) {
            (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
              const withField = definition.fields.find(f => f.key === val)
              const withColumn = withField ? (withField.tableKey || withField.key) : val
              extras[withColumn] = entity[withField ? withField.key : val]
            })
          }
          const isNew = originalEntity[field.key] == null && entity[field.key] != null
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
                  return null
                })
            })
            .then(resp => {
              this.handleRelationErrors(resp, field)
            })
        }))
    },
    handleRelationErrors(resp, field) {
      if (!resp || !resp.data) return
      const { errors } = resp.data.data
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
          const formField = fieldComponents.find(f => f.field === field)
          const create = formField.hasNew || (field.alwaysNew && originalEntity[field.key] == null)
          const { subDefinition } = formField
          const entityData = create ? { ...subDefinition.default, ...formField.subEntity } : {
            ...formField.subEntity,
            [field.key]: originalEntity[field.key],
          }
          const original = formField.subOriginalEntity
          return this.saveEntity(entityData, original,
            this.getFormFields(subDefinition), formField.getSubFields(), field.list, subDefinition, this.getPrimaryKey(subDefinition), create)
            .then(async data => {
              if (data?.noupdate) return data.entity
              let id
              if (data.data.data) {
                // if the response is from alexander api
                id = data.data.data[0][0][field.key]
              } else {
                // if it was document from jordy
                id = data.data[0].document_id
              }
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
      console.log({ s: this.definition })
      if (this.definition?.beforeSubmit) {
        const success = this.definition.beforeSubmit(this, entity)
        if (!success) {
          throw new Error()
        }
      }
      const action = create ? 'create' : 'update'
      return this.createNewEntities(fieldComponents, formFields, entity, originalEntity)
        .then(async () => {
          if (!create && formFields.filter(f => f.type !== 'list' || f.relationEntity === false)
            .every(f => entity[f.key] === originalEntity[f.key])) {
            await this.saveRelations(table, definition, primaryKey, entity[primaryKey], entity, originalEntity)
            return {
              noupdate: true,
              entity,
            }
          }
          if (table === 'document') {
            if (definition.customRequest && definition.customRequest.isUpdate) {
              const payload = definition.customRequest.formatBody ? definition.customRequest.formatBody(entity) : entity
              const body = !definition.customRequest.passBodyToQuery ? payload : {}
              const params = definition.customRequest.passBodyToQuery ? payload : {}
              const method = definition.customRequest.method || 'put'
              return this.$http({
                url: definition.customRequest.endpoint,
                params,
                data: body,
                method,
              }).then(({ data }) => data)
            }

            const formData = new FormData()
            const files = fieldComponents.find(f => f.field.key === 'files')?.getFiles() || []

            for (let i = 0; i < files.length; i++) {
              formData.append('files', files[i])
            }
            // formData.append('files', files)

            return this.$http({
              url: '/documents/uploadfiles/ticket',
              params: {
                ticket_id: this.$route.params.id,
                ...entity,
              },
              data: formData,
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            }).then(({ data }) => data)
          }
          // format entity
          const formatedEntity = this.formatEntity(entity, formFields)
          console.log('push entity', entity, formatedEntity)
          let payloadData = [formatedEntity]
          // if create and primary key is multiple
          console.log(formFields, primaryKey, entity)
          if (create && formFields.find(f => f.key === primaryKey)?.multiple) {
            if (Array.isArray(entity[primaryKey])) {
              payloadData = entity[primaryKey].map(val => ({ ...entity, [primaryKey]: val }))
            }
          }
          if (definition.customRequest) {
            return this.$http.put(definition.customRequest.endpoint, {
              [definition.customRequest.relationKey]: [entity[primaryKey]],
              action: 'create',
              [definition.customRequest.entityKey]: entity[definition.customRequest.entityKey],
            }).then(({ data }) => {
              this.$root.$emit('update-occured')
              return { data, message: 'Update Done.' }
            })
          }
          return this.$api({
            entity: table,
            action,
            data: payloadData,
          })
            .then(async ({ data }) => {
              if (data.data.errors[0]) {
                this.$errorToast(data.data.errors[0]['Failed executing sql']?.err)
                throw new Error(data.data.errors[0]['Failed executing sql']?.err)
              } else {
                try {
                  await this.saveRelations(table, definition, primaryKey, data.data.data[0][0][primaryKey], entity, originalEntity)
                } finally {
                  // this.$successToast(data.data.message)
                  // navigate to view page or reload table
                }
              }
              console.log('data', data)
              return data
            })
        })
    },
    /**
     * Formats an entity based on the form fields: replace ',' with '.' for decimal field
     *
     */
    formatEntity(entity, formfields) {
      const formatedEntity = { ...entity }
      formfields.forEach(field => {
        if (field.isDecimal) {
          formatedEntity[field.key] = parseFloat(entity[field.key].replace(',', '.'))
        }
        if (field.send === false) {
          delete formatedEntity[field.key]
        }

        if (field.unit && field.transformBeforeSend && typeof field.transformBeforeSend === 'function') {
          formatedEntity[field.key] = field.transformBeforeSend(entity, this)
        }
      })

      return formatedEntity
    },
    async afterSaveHook() {
      this.$emit('after-save')
    },
    getFieldComponents() {
      if (this.definition.fieldComponent) {
        return this.$refs.fieldComponent.$children.filter(c => c.$options.name === 'Field')
      }
      return this.$refs.fields || this.$children.filter(c => c.$options.name === 'Field')
    },
    submit() {
      return this.$refs.form.validate()
        .then(success => {
          if (!success) {
            return Promise.reject(new Error('Invalid Form'))
          }
          if (this.definition.beforeSubmit && this.definition.beforeSubmit(this, this.entity, this.create) === false) throw new Error()
          this.loading = true
          if (this.definition.newEndpointCreate || this.definition.newEndpointUpdate) {
            const method = this.definition.isUpdate ? 'put' : 'post'
            const endpoint = this.definition.isUpdate ? this.definition.newEndpointUpdate : this.definition.newEndpointCreate
            const formattedEntity = this.formatEntity(this.entity, this.formFields)
            return this.$http[method](endpoint, formattedEntity).then(async result => {
              this.$successToast('Ok')
              // navigate to view page or reload table
              this.originalEntity = merge(this.originalEntity, result)
              return result
            })
              .catch(err => {
                let message = err.message
                if (err.response && err.response.data) {
                  message = err.response.data.detail
                }
                this.$errorToast(message)
                return Promise.reject(err)
              })
              .finally(async () => {
                await this.afterSaveHook()
                this.loading = false
              })
          }

          if (this.definition.submit) {
            return this.definition.submit(this, this.entity, this.create)
              .then(async resp => {
                if (resp) {
                  this.originalEntity = merge(this.originalEntity, resp.data)
                  this.$successToast(this.create ? 'Entity Created' : 'Entity Updated')
                }
              })
              .catch(err => {
                let message = err.message
                if (err.response && err.response.data) {
                  message = err.response.data.detail
                }
                this.$errorToast(message)
                return Promise.reject(err)
              })
              .finally(async () => {
                await this.afterSaveHook()
                this.loading = false
              })
          }
          return this.saveEntity(this.entity, this.originalEntity, this.formFields, this.getFieldComponents(), this.table, this.definition, this.primaryKey, this.create)
            .then(async data => {
              let result
              // if no update on the model, just send initial entity
              if (data?.noupdate) result = data.entity
              else if (data.data.data) {
                // if the response is from alexander api
                result = data.data.data[0][0]
              } else {
                // if it was document from jordy
                result = data.data
              }
              await this.afterSaveHook(result)
              this.$successToast(data.noupdate ? 'OK' : this.$t(data.message || data.data.message))
              // navigate to view page or reload table
              this.originalEntity = merge(this.originalEntity, result)
              return result
            })
            .catch(e => {
              console.log(e)
              const title = e.response?.data.detail || e.data?.errors[0].err
              this.$errorToast(this.$t(title))
              return Promise.reject(e)
            })
            .finally(() => {
              this.loading = false
            })
        })
    },
    emitSubmit() {
      this.$emit('submit')
    },
    setData(entity) {
      this.entity = {
        ...this.entity,
        ...this.definition.default,
        ...this.definition.fields
          .filter(field => field.type !== 'password')
          .filter(field => entity[field.key] != null)
          .reduce((a, field) => ({
            ...a,
            [field.key]: entity[field.key],
          }), {}),
      }
    },
    reset() {
      if (this.$refs.fields) {
        if (Array.isArray(this.$refs.fields)) this.$refs.fields.forEach(f => f.reset())
        else this.$refs.fields.reset()
      }
      this.entity = { ...this.initialData, ...this.originalEntity }
      this.$refs.form.reset()
      this.$refs.form.reset()
    },
    async loadDefinition() {
      const { data } = await this.$api({
        action: 'read-rich',
        entity: this.table,
      })
      this.$store.commit('table/setDefinition', {
        data,
        table: this.table,
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
      return definition.fields.filter(f => !f.hideOnForm && (this.create || !f.hideOnUpdate) && (!this.create || !f.hideOnCreate))
        .map(field => {
          if (typeof field === 'string') return { key: field }
          return field
        })
    },
    getPrimaryKey(definition) {
      return definition.primaryKey ?? definition.fields.find(f => f.auto)?.key
    },
    hasChanges() {
      return this.formFields
        // .filter(f => f.type !== 'list')
        .findIndex(f => this.entity[f.key] !== this.originalEntity[f.key]) >= 0
    },
    async loadEntity() {
      if (!this.tableDefinition) {
        await this.loadDefinition()
      }
      if (this.create) return
      if (!this.isRelation && this.fetchData) {
        this.loading = true
        let entity = null
        try {
          if (this.definition.fetch) {
            entity = await this.definition.fetch(this)
          } else {
            entity = await this.$store.dispatch('table/fetchSingleItem', {
              entity: this.definition.fetchWithEntity ? this.definition.entity : this.table,
              primaryKey: this.primaryKey,
              id: this.entityId || this.initialData[this.primaryKey],
            })
          }
        } catch (e) {
          console.error(e)
        }
        if (!entity && this.entityId !== 0) {
          this.$errorToast(`The entity with the id "${this.entityId}" doesnt exists`)
        } else {
          this.setData(entity)
        }
        this.loading = false
      }
      this.originalEntity = { ...this.entity }
      this.entityLoaded = true
      this.$emit('loaded')
      if (!this.definition.fetch && this.fetchData) await this.fillRelations(this.entity, this.originalEntity, this.formFields, this.table, this.primaryKey)
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
    await this.loadEntity()
  },
}
