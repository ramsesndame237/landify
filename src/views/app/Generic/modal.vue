<template>
  <!--modal-->
  <b-modal id="generic-modal" ref="modal" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
           :title="$t(forceTitle || title)" size="lg" :busy="loading" @ok="handleOk">
    <component
      :is="(create ? definition.createComponent :definition.updateComponent) || definition.formComponent || 'entity-form'"
      ref="form" :fetch-data="fetchData" :table="table" :definition="definition"
      :table-definition-key="tableDefinitionKey" :initial-data="initialData" :create="create" :is-relation="isRelation"
      inline :cols="12"/>
    <p v-if="['headline~document~new','headline~document_contract_documentcontracttype_rel~new'].indexOf(forceTitle)>=0"
       class="text-danger text-center">No ticket will be created for this document</p>
    <template v-slot:modal-footer>
      <b-button variant="warning" :disabled="loading" @click="$refs.modal.hide()">{{ $t('button~cancel') }}</b-button>
      <b-button v-if="!create || !withContinue" variant="primary" :disabled="loading" @click="handleOk">
        <b-spinner v-if="loading" small/>
        {{ $t('button~save') }}
      </b-button>
      <b-dropdown v-else split text="Save" variant="primary" :disabled="loading" @click="handleOk" right>
        <template #button-content>
          <b-spinner v-if="loading" class="mr-1" small/>
          <span>{{ $t('button~save') }}</span>
        </template>
        <b-dropdown-item @click="handleOk($event, 1)" v-if="!isRelation">
          {{ $t('button~save_continue') }}
        </b-dropdown-item>
        <b-dropdown-item v-if="create" @click="handleOk($event, 2)">
          {{ $t('button~save_create') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-modal>
</template>

<script>

import EntityForm from "@/views/app/Generic/EntityForm";
import {
  BButton, BSpinner, BDropdown, BDropdownItem,
} from 'bootstrap-vue'

export default {
  name: 'GenericModal',
  components: { EntityForm, BButton, BSpinner, BDropdown, BDropdownItem },
  props: {
    table: String,
    cacheKey: String,
    definition: Object,
    tableDefinitionKey: String,
    title: String,
    isRelation: Boolean,
    withContinue: { type: Boolean, default: false },
    fetchData: { type: Boolean, default: true },
  },
  data() {
    return {
      forceTitle: '',
      create: true,
      loading: false,
      initialData: null,
    }
  },
  computed: {},
  methods: {
    openModal(create, data, title) {
      this.initialData = data
      this.forceTitle = title
      this.create = create
      this.$refs.modal.show()
    },
    handleOk(bvModalEvt, redirect) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.loading = true
      this.$refs.form.submit()
        .then(entity => {
          // delete cache for entity
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', this.cacheKey)
          if (redirect === 1) {
            this.$refs.modal.hide()
            this.$router.push({
              name: 'table-view',
              params: { table: this.table, id: entity[this.$refs.form.primaryKey] },
            })
          } else if (redirect === 2) {
            this.$refs.form.reset()
            this.$emit('reload-table')
          } else {
            this.$refs.modal.hide()
            this.$emit('reload-table', entity)
          }
        })
        .finally(() => this.loading = false)
    },
  },
}
</script>

<style scoped>

</style>
