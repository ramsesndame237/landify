<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_deadline~title~maininfos')}}
    </b-col>

    <!-- form -->
    <b-col cols="12" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(save)" autocomplete="off">
          <b-col v-for="(field,index) in definition.filter(f=> f.hide!==true && !f.auto && f.hideOnCreate !==true && f.hideOnForm !==true)" :key="index" cols="12">
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
        :items="specialRight" :canMakeDeleteCall='false'
        @delete-items='deleleItemsInDataTable'
      />
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from "vee-validate";

import {
  BRow, BCol, BForm, BButton
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Field from "@/views/app/Generic/Field";
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step2',
  components: {
    BForm, BRow, BCol, BButton,
    ValidationObserver, EntityForm, Field,
    DataTables,
  },
  props: ['disabled', 'context'],
  data() {
    const definition = {...Table.contract.relations.find(f=> f.primaryKey === "specialright_id")}.fields.filter(f=> f.hide!==true && !f.auto && f.hideOnCreate !==true && f.hideOnForm !==true)
    // delete some fields
    let index = definition.findIndex(f => f.key === "contract_specialright_total_number_options")
    definition.splice(index, 1)

    index = definition.findIndex(f => f.key === "contract_specialright_extensions")
    definition.splice(index, 1)



    const fields = []
    definition.forEach(elt => {
      fields.push({key: elt.key})
    });
    return {
      definition,
      entity: {},
      fields,
      // recurringPayment: this.context.recurringPayment || [],
      specialRight: [],
      loading: false,
    }
  },
  methods: {
    async submit(){
      console.log("step2 form submitted");
    },

    async save() {
      this.loading = true
      this.specialRight.push({...this.entity})
      this.$refs.datatable.reload()
      this.$refs.fields.forEach(f => {
        if (f.visible) f.reset()
      })
      this.$refs.form.reset()
      this.loading = false
    },

    deleleItemsInDataTable(newItems) {
      this.specialRight = newItems
    },
  },

  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    }
  }

}
</script>

<style scoped>

</style>
