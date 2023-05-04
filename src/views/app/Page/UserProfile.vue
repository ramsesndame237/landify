<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t("headline~user~detail") }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex align-items-center">
            <template v-if="$can('update', 'user')">
              <b-button v-if="view" size="sm" variant="info" class="mr-1" @click="edit">
                <feather-icon icon="EditIcon" class="mr-50"/>
                {{ $t('button~edit') }}
              </b-button>
              <b-button v-else size="sm" variant="info" class="mr-1" @click="update" :disabled="loading">
                <b-spinner v-if="loading" small class="mr-50"/>
                <feather-icon v-else icon="SaveIcon" class="mr-50"/>
                {{ $t('button~save') }}
              </b-button>
            </template>
            <b-button v-if="!view" size="sm" variant="primary" @click="cancel">
              {{ $t('button~cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <!-- user infos -->
    <b-overlay :show="loading">
      <b-card>
        <validation-observer ref="form" v-slot="{passes}">
          <b-form @submit.prevent="passes(emitSubmit)" autocomplete="off">
            <b-row>
              <b-col
                v-for="(field, index) in formFields"
                :key="index" cols="12"
                md="6"
              >
                <field
                  ref="fields"
                  :disabled="view || field.disabled || field.disableOnUpdate"
                  :field="field"
                  :entity="entity"
                  :inline="false"
                  table="user"
                  :table-definition="tableDefinition"
                />
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import {
  BForm, BButton, BSpinner,BRow
} from "bootstrap-vue"
import Field from '@/views/app/Generic/Field.vue'
import Tables from '@/table'


export default {
  components: {
    BForm,
    BButton,
    BSpinner,
    BRow,
    Field
  },
  data(){
    return {
      view: this.$route.query.edit !== 'true',
      loading: false,
      entityLoaded: false,
      originalEntity: {},
      entity: { ...this.initialData, ...Tables.user.default },
      definition: Tables.user,
      entityId: this.getEntityId(),
      create: false,
      table: "user",
    }
  },

  computed: {
    formFields(){
      return Tables.user.fields
        .filter(f => !f.hideOnForm && !f.hideOnUpdate && !f.hideOnCreate && f.key.includes("address") || f.key.includes('email') || f.key.includes("name"))
        .map(field => {
          if (typeof field === 'string') return { key: field }
          return field
        })
    },
    initialData(){
      return {}
    },

    tableDefinition() {
      return this.$store.getters['table/tableDefinition']("user")
    },


  },

  async mounted() {
    if (!this.tableDefinition) {
      this.loadDefinition()
    }
    // fetch data
    this.loading = true
    const entity = await (this.definition.fetch ? this.definition.fetch(this) :
      this.$store.dispatch('table/fetchSingleItem', {
        entity: "user",
        primaryKey: this.getPrimaryKey(this.definition),
        id: this.entityId || this.initialData[this.primaryKey],
      }))
    if (!entity) {
      this.$errorToast(`The entity with the id "${this.entityId}" doesnt exists`)
    } else {
      this.setData(entity)
    }
    this.loading = false
    // end fetch data
    this.entityLoaded = true
    this.originalEntity = { ...this.entity }
    console.log('mounted', this.entity)
    // if (!this.definition.fetch) await this.fillRelations(this.entity, this.originalEntity, this.formFields, "user", this.getPrimaryKey(this.definition))
  },

  methods: {
    cancel() {
      this.view = true
      this.$refs.form.reset()
    },
    edit() {
      this.view = false
    },
    update() {
      this.loading = true
      this.$refs.form.submit()
        // .then(data => {
        //   this.view = true
        //   if (this.create) {
        //     console.log('data', data)
        //     this.$router.push({ name: 'table-view', params: { id: data[this.primaryKey] }, query: { edit: true } })
        //   }
        //   this.$store.commit('table/deleteTableCacheKeyFromPrefix', this.table + '-')
        // })
        // .finally(() => {
        //   this.loading = false
        // })
    },
    getEntityId(){
      return JSON.parse(localStorage.getItem('userData')).user_id
    },
    async loadDefinition() {
      const { data } = await this.$api({
        action: 'read-rich',
        entity: this.table,
      })
      this.$store.commit('table/setDefinition', {
        data,
        table: "user"
      })
    },
    getPrimaryKey(definition) {
      return definition.primaryKey ?? definition.fields.find(f => f.auto)?.key
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

    fillRelations(entity, originalEntity, formFields, table, primaryKey) {
      return Promise.all(formFields.filter(field => field.type === 'list' && field.relationEntity !== false)
        .map(async field => {
          console.log("Fill relations", field, table, primaryKey, entity)
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
                if (this.initialData[f.key]) {
                  this.$set(component.subEntity, f.key, this.initialData[f.key])
                  this.$set(component.subOriginalEntity, f.key, this.initialData[f.key])
                }
              })
            return this.fillRelations(component.subEntity, component.subOriginalEntity, this.getFormFields(subDefinition), field.list, this.getPrimaryKey(subDefinition))
          }
        }))
    },
    getFormFields(definition) {
      return definition.fields.filter(f => !f.hideOnForm && (this.create || !f.hideOnUpdate) && (!this.create || !f.hideOnCreate))
        .map(field => {
          if (typeof field === 'string') return { key: field }
          return field
        })
    },
  }


}
</script>
