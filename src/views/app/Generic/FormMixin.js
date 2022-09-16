import {
  BForm,
  BRow,
  BCol,
  BFormInput,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'

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
    inline: { type: Boolean, default: false },
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
    fillRelations() {
      const entity = this.entity
      return Promise.all(this.formFields.filter(field => field.type === 'list' && entity[field.key] == null).map(field => this.$api({
        entity: field.relationEntity ?? (`${this.table}_${field.list}_rel`),
        action: 'read-rich',
        data: [{
          [this.primaryKey]: `${this.entity[this.primaryKey]}`,
        }],
      })
        .then(({ data }) => {
          const result = data.data.data[0]
          if (!result) return
          this.$set(entity, field.key, result[field.key])
          this.$set(this.originalEntity, field.key, result[field.key])
          if (field.with) {
            (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
              this.$set(entity, val, result[val])
            })
          }
        })))
    },
    saveRelations(entityId) {
      const keys = [this.definition.primaryKey, ...(this.definition.fields.filter(f => f.composite).map(f => f.key))]
      return Promise.all(this.definition.fields.filter(field => field.type === 'list' && keys.indexOf(field.key) === -1 && (this.entity[field.key] !== this.originalEntity[field.key] || !!field.with)).map(field => {
        const extras = {}
        if (field.with) {
          (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
            extras[val] = this.entity[val]
          })
        }
        const isNew = this.originalEntity[field.key] == null
        if (!isNew && field.alwaysNew) return Promise.resolve()
        const entityName = field.relationEntity ?? (`${this.table}_${field.list}_rel`)
        const data = {
          [field.key]: this.entity[field.key],
          [this.primaryKey]: entityId ?? this.entity[this.primaryKey],
          ...extras,
        }
        return Promise.resolve().then(() => {
          if (isNew) {
            return this.$api({
              entity: entityName,
              action: 'create',
              data: [data],
            })
          }
          return this.$api({
            entity: entityName,
            action: 'delete',
            data: [{ ...data, [field.key]: this.originalEntity[field.key] }],
          })
            .then(() => this.$api({
              entity: entityName,
              action: 'create',
              data: [data],
            }))
        })
          .then(resp => {
            const errors = resp.data.data.errors
            if (typeof errors === 'string') {
              this.$refs.form.setErrors({
                [field.key]: [errors],
              })
            }
            if (Array.isArray(errors) && errors.length > 0) {
              this.$refs.form.setErrors({
                [field.key]: resp.data.data.errors.map(error => {
                  if (typeof error === 'string') return error
                  return error['Failed executing sql'].err
                }),
              })
            }
          })
      }))
    },
    async saveAddressData(formField, initialAddress) {
      const cityExists = !!initialAddress.city_id
      await this.$api({
        entity: 'city',
        action: cityExists ? 'update' : 'create',
        data: [
          {
            city_name: formField.subEntity.city_name,
            city_zip: formField.subEntity.city_zip,
            ...(cityExists ? { city_id: initialAddress.city_id } : {}),
          },
        ],
      })
        .then(async ({ data }) => {
          const city_id = cityExists ? initialAddress.city_id : data.data.data[0][0].city_id
          if (cityExists) {
            // if country changed
            if (formField.subEntity.country_id !== initialAddress.country_id) {
              // update city_country_rel
              await this.$api({
                entity: 'city_country_rel',
                action: 'delete',
                data: [{ city_id, country_id: initialAddress.country_id }],
              })
              await this.$api({
                entity: 'city_country_rel',
                action: 'create',
                data: [{ city_id, country_id: formField.subEntity.country_id }],
              })
            }
          } else {
            return Promise.all([
              this.$api({
                entity: 'address_city_rel',
                action: 'create',
                data: [{
                  city_id, address_id: initialAddress.address_id,
                }],
              }),
              this.$api({
                entity: 'city_country_rel',
                action: 'create',
                data: [
                  { city_id, country_id: formField.subEntity.country_id },
                ],
              }),
            ])
          }
        })
    },
    createNewEntities() {
      if (!Array.isArray(this.$refs.fields)) return Promise.resolve()
      const fieldsToCreate = this.formFields.filter(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        return !field.hide && (field.type === 'list') && (formField.hasNew || (field.alwaysNew && this.originalEntity[field.key] == null))
      })
      const fieldsToUpdate = this.formFields.filter(field => (!field.hide && field.alwaysNew && this.originalEntity[field.key] != null))
      console.log(fieldsToUpdate, fieldsToCreate, 'fields')
      return Promise.all([...fieldsToCreate.map(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        return this.$api({
          entity: field.list,
          action: 'create',
          data: [formField.subEntity],
        }).then(async ({ data }) => {
          const id = data.data.data[0][0][field.key]
          if (field.key === 'address_id') {
            await this.saveAddressData(formField, { address_id: id })
          }
          await formField.fetchList()
          this.$set(this.entity, field.key, id)
          return id
        })
      }), ...fieldsToUpdate.map(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        return this.$api({
          entity: field.list,
          action: 'update',
          data: [{ ...formField.subEntity, [field.key]: this.originalEntity[field.key] }],
        }).then(async ({ data }) => {
          // formField.list.push(data.data.data[0][0])
          if (field.key === 'address_id') {
            await this.saveAddressData(formField, formField.list.find(e => e[field.key] === this.originalEntity[field.key]))
          }
        })
      })])
    },
    submit() {
      return this.$refs.form.validate().then(success => {
        if (!success) {
          return Promise.reject(new Error('Invalid Form'))
        }
        this.loading = true
        return this.createNewEntities()
          .then(() => this.$api({
            entity: this.table,
            action: this.create ? 'create' : 'update',
            data: [
              this.entity,
            ],
          })
            .then(async ({ data }) => {
              console.log('is relation', this.isRelation)
              if (data.data.errors[0]) {
                this.$errorToast(data.data.errors[0]['Failed executing sql'].err)
                throw new Error(data.data.errors[0]['Failed executing sql'].err)
              } else {
                try {
                  await this.saveRelations(data.data.data[0][0][this.primaryKey])
                } finally {
                  this.$successToast(data.data.message)
                  // navigate to view page or reload table
                }
              }
              return data.data.data[0][0]
            })
            .catch(e => {
              console.log(e)
              const title = e.response?.data.detail || e.data?.errors[0].err
              this.$errorToast(title)
              return Promise.reject(e)
            }))
          .finally(() => this.loading = false)
      })
    },
    setData(entity) {
      this.entity = { ...this.definition.default, ...entity }
    },
    reset() {
      this.entity = { ...this.originalEntity }
    },
    async loadDefinition() {
      const { data } = await this.$api({ action: 'read-rich', entity: this.table })
      this.$store.commit('table/setDefinition', { data, table: this.table })
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
  },
  computed: {
    formFields() {
      return this.definition.fields.filter(f => !f.hideOnForm && (true || !f.auto || this.create))
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.tableDefinitionKey)
    },
    primaryKey() {
      return this.definition.primaryKey ?? this.definition.fields.find(f => f.auto).key
    },
  },
  async created() {
    if (!this.tableDefinition) {
      await this.loadDefinition()
    }
    if (this.create) return
    if (!this.isRelation && !this.initialData[this.primaryKey]) {
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
    await this.fillRelations()
  },
}
