<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_deadline~title~maininfos') }}
    </b-col>

    <!-- form -->
    <b-col cols="12" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form autocomplete="off" @submit.prevent="passes(save)">
          <b-col v-for="(field,index) in definition" :key="index" cols="12">
            <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate"
                   :inline="true" :entity="entity" :table-definition="tableDefinition" :field="field"/>
          </b-col>
          <div class="text-right">
            <b-button type="submit" size="md" class="mt-2" :disabled="loading" variant="info">
              <b-spinner v-if="loading" small/>
              Save
            </b-button>
          </div>
        </b-form>
      </validation-observer>

    </b-col>

    <!-- data table -->
    <b-col cols="12" class="mt-3">
      <data-tables
        ref="datatable"
        :current-page="1" :per-page="100" :with-edit="false" :with-view="false"
        entity="contract_specialright_rel" :entity-list="definition.entity" :fields="fields" :selectable="false"
        :items="specialRights" :can-make-delete-call="false"
        @delete-items="DeleleItemsInDataTable"
      />
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import {
  BRow, BCol, BForm, BButton,
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Field from '@/views/app/Generic/Field'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step2',
  components: {
    BForm,
    BRow,
    BCol,
    BButton,
    ValidationObserver,
    EntityForm,
    Field,
    DataTables,
  },
  props: ['disabled', 'context'],
  data() {
    const relation = { ...Table.contract.relations.find(f => f.primaryKey === 'specialright_id') }
    const definition = relation.fields.filter(f => f.hide !== true && !f.auto && f.hideOnCreate !== true && f.hideOnForm !== true)
    const fields = []
    definition.forEach(elt => {
      fields.push({ key: elt.key })
    })
    console.log('relation.default: ', relation.default)

    return {
      definition,
      entity: { ...relation.default },
      fields,
      specialRights: [],
      loading: false,
      totalNumberOptions: 0,
    }
  },

  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },
    actualOptions() {
      if (this.specialRights && this.specialRights.length > 0) {
        return this.specialRights.length + 1
      }
      return 1
    },
    availableOptions() {
      if (this.specialRights && this.specialRights.length > 0) {
        return this.totalNumberOptions - this.specialRights.length
      }
      return this.totalNumberOptions
    },

    activatedOptions() {
      if (this.specialRights && this.specialRights.length > 0) {
        return this.specialRights.length
      }
      return 0
    },

  },

  async mounted() {
    console.log('mounted')
    this.loading = true
    await this.$http.get(`/contracts/deadlines/${this.$route.params.id}`)
      .then(response => {
        if (response.data && response.data.ContractActivatedOption) this.totalNumberOptions = response.data.ContractActivatedOption.contract_specialright_total_number_options
        const contractActivatedOption = response.data.ContractActivatedOption
        this.entity.contract_specialright_automatic_renewal_in_months = contractActivatedOption.contract_specialright_automatic_renewal_in_months
        this.entity.contract_specialright_total_number_options = contractActivatedOption.contract_specialright_total_number_options
        this.entity.contract_activated_option_id = contractActivatedOption.contract_activated_option_id
        this.entity.contract_specialright_is_passive = 0
        this.entity.contract_specialright_is_availed = 0
      })
      .catch(error => {
        console.error('error', error)
      })
      .finally(() => {
        this.loading = false
      })
    console.log('this.entity: ', this.entity)
  },
  methods: {
    async submit() {
      if (this.specialRights && this.specialRights.length > 0) {
        console.log('start submitting', this.specialRights)
        this.loading = true
        const payload = {
          contract_id: this.$route.params.id,
          Specialrights: [...this.specialRights],
        }
        let result
        await this.$http.post('/contracts/deadline/step2', payload)
          .then(response => {
            result = response.data
          })
          .catch(error => {
            throw new Error(error)
          })
          .finally(() => {
            this.loading = false
          })

        console.log('result: ', result)
        return result
      }
    },

    async save() {
      this.loading = true
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.entity.contract_specialright_actual_options = this.actualOptions
      this.entity.contract_specialright_available_options = this.availableOptions
      this.entity.contract_specialright_activated_options = this.activatedOptions

      try {
        this.specialRights.push({ ...this.entity, user_id: userData.user_id })
        console.log('this.specialRights: ', this.specialRights)
        this.$refs.datatable.reload()
        this.$refs.fields.forEach(f => {
          if (f.visible) f.reset()
        })
        this.$refs.form.reset()
      } catch (error) {
        if (typeof error === 'string') {
          this.$errorToast(error)
        } else {
          console.error(error)
        }
      }
      this.loading = false
    },

    deleleItemsInDataTable(newItems) {
      this.specialRights = newItems
    },
  },

}
</script>

<style scoped>

</style>
