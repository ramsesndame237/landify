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
    fillRelations(entity) {
      console.log('fill relations', entity)
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
          if (field.with) {
            (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
              this.$set(entity, val, result[val])
            })
          }
        })))
    },
    saveRelations(entityId) {
      const keys = [this.definition.primaryKey, ...(this.definition.composite || [])]
      return Promise.all(this.definition.fields.filter(field => field.type === 'list' && keys.indexOf(field.key) === -1).map(field => {
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
      if (!Array.isArray(this.$refs.fields)) return Promise.resolve()
      return Promise.all(this.formFields.filter(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        // console.log(formField, formField.hasNew)
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
          return Promise.reject(new Error('Invalid Form'))
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
                console.log('is relation', this.isRelation)
                try {
                  await this.saveRelations(data.data.data[0][0][this.primaryKey])
                } finally {
                  this.$successToast(data.data.message)
                  // navigate to view page or reload table
                }
                return data.data.data[0][0]
              })
              .catch(e => {
                console.log(e)
                const title = e.response?.data.detail
                this.$errorToast(title)
                return Promise.reject(e)
              })
          })
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
      this.$store.commit('table/setDefinition', data)
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
      return this.definition.fields.filter(f => !f.hideOnForm && (!f.auto || this.create))
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
    if (!this.initialData) {
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
    try {
      this.entityLoaded = true
      await this.fillRelations(this.entity)
    } finally {
      console.log('entity', this.entity)
      this.originalEntity = { ...this.entity }
    }
  },
}
