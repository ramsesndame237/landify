<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_contract~title~deadline') }}
    </b-col>

    <!-- form -->
    <b-col cols="12" md="6" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(emitSubmit)" autocomplete="off">
          <b-col v-for="(field,index) in definition.filter(f=> f.hide!==true && !f.auto && f.hideOnCreate !==true && f.hideOnForm !==true)" :key="index" cols="12">
            <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate"
                   :inline="false" :entity="entity" :table-definition="tableDefinition" :field="field"/>
          </b-col>
          <div class="text-center">
            <b-button type="submit" size="md" class="mt-2" :disabled="loading" variant="info">
              <b-spinner v-if="loading" small/>
              Save
            </b-button>
          </div>
        </b-form>
      </validation-observer>

    </b-col>

    <!-- data table -->
    <b-col cols="12" md="6">
      <data-tables
        ref="datatable"
        :current-page="1" :per-page="100" :with-edit="false" :with-view="false"
        entity="contract_specialright_rel" :entity-list="definition.entity" :fields="fields" :selectable="false"
        :items="specialrights" :canMakeDeleteCall='false'
        @delete-items='DeleleItemsInDataTable'
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
import NewContractStepMixin from "./NewContractStepMixin"

export default {
  name: 'Step1',
  components: {
    BForm, BRow, BCol, BButton,
    ValidationObserver, EntityForm, Field,
    DataTables,
  },
  props: ['disabled', 'context'],
  data() {
    const contractTable = {...Table.contract}
    const definition = contractTable.relations.find(f => f.primaryKey === "specialright_id").fields
    const fields = []
    definition.forEach(elt => {
      if(!elt.hideOnIndex) fields.push({key: elt.key})
    });
    return {
      entity: {},
      definition,
      fields,
      specialrights: this.context.specialrights || [],
      initialData: {},
      loading: false,
      entityName: 'specialrights'
    }
  },

  mixins: [NewContractStepMixin]
}
</script>

<style scoped>

</style>
