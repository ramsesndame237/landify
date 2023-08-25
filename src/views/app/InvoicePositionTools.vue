<template>
  <div class="d-flex align-items-center">
    <b-button class="mr-1" size="sm" variant="success" @click="openSplitModal">
      <span>Split Position</span>
    </b-button>
    <b-modal ref="modal" title="Split Position" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary"
             size="lg" centered @ok="submit">
      <data-tables :fields="definition.fields" entity="invoiceposition" :items="[selectedPosition]"
                   :with-actions="false" :selectable="false"/>
      <!--      Form-->
      <validation-observer ref="form" v-slot="{ passes }" tag="div" class="my-2">
        <h3>Spit Area <span class="text-sm">(Amount to Split: <span>{{ amountToSplit }}</span>)</span></h3>
        <b-form @submit.prevent="passes(splitPosition)">
          <b-row>
            <b-col cols="6">
              <field :disabled="amountToSplit<=0" :entity="entity" :table-definition="tableDefinition"
                     :field="{key: 'invoiceposition_amount_customer',type: 'decimal', rules: {max_value: amountToSplit}}"/>
            </b-col>
            <b-col cols="6">
              <field ref="costtype" :disabled="amountToSplit<=0" :entity="entity" :table-definition="tableDefinition"
                     :field="{key: 'costtype_id',type: 'list', list: 'costtype', listLabel: 'costtype_name'}"/>
            </b-col>
            <b-col cols="6">
              <field :disabled="amountToSplit<=0" :entity="entity" :table-definition="tableDefinition"
                     :field="{key: 'invoiceposition_name'}"/>
            </b-col>
          </b-row>

          <div class="mt-1 d-flex justify-content-between">
            <b-button type="submit" :disabled="loading||amountToSplit<=0" variant="success">
              Split
            </b-button>
            <b-button v-if="splitedPositions.length>0" type="button" :disabled="loading" variant="primary"
                      @click="deleteSelectedPositions">Delete
            </b-button>
          </div>
        </b-form>
      </validation-observer>
      <data-tables :fields="fields" entity="invoiceposition" :items="splitedPositions" :with-actions="false"/>
      <template v-slot:modal-footer>
        <b-button variant="warning" :disabled="loading" @click="$refs.modal.hide()">
          Cancel
        </b-button>
        <b-button variant="primary" :disabled="loading" @click="submit">
          <b-spinner v-if="loading" small/>
          Save
        </b-button>
      </template>
    </b-modal>
    <b-button class="mr-1" size="sm" variant="info"
              @click="$router.push({name:'table-positions-import', params: {invoice: $route.params.id, table: 'invoice'}})">
      <feather-icon icon="DownloadIcon" class="mr-50"/>
      <span>Import</span>
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BModal, BForm, BSpinner, BRow, BCol,
} from 'bootstrap-vue'
import DataTables from '@/layouts/components/DataTables'
import Table from '@/table'
import Field from '@/views/app/Generic/Field'
import _ from 'lodash'

export default {
  name: 'InvoicePositionTools',
  components: {
    Field, DataTables, BButton, BForm, BModal, BSpinner, BRow, BCol,
  },
  data() {
    const definition = Table.invoiceposition
    return {
      selectedPosition: {},
      definition,
      splitedPositions: [],
      fields: [
        { key: 'invoiceposition_name' },
        { key: 'costtype_name' },
        { key: 'invoiceposition_amount_customer' },
        { key: 'invoiceposition_apportionable' },
      ],
      entity: {},
      loading: false,
    }
  },
  computed: {
    amountToSplit() {
      console.log(_.sumBy(this.splitedPositions, 'invoiceposition_amount_customer'), 'total', this.selectedPosition.invoiceposition_amount_customer)
      return parseFloat((this.selectedPosition.invoiceposition_amount_customer - _.sumBy(this.splitedPositions, 'invoiceposition_amount_customer')).toFixed(2))
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition']('invoiceposition')
    },
  },
  methods: {
    async submit() {
      if (this.amountToSplit !== 0) {
        this.$errorToast('You have to split all the customer amount')
        return
      }
      this.loading = true
      try {
        const reversed = this.cloneSelected()
        reversed.invoiceposition_amount_customer = -reversed.invoiceposition_amount_customer
        const allPositions = [reversed, ...this.splitedPositions]
        const result = (await this.$api({
          entity: 'invoiceposition',
          action: 'create',
          data: allPositions,
        })).data.data.data

        // Create relation with invoice
        await this.$api({
          entity: 'invoice_invoiceposition_rel',
          action: 'create',
          data: result.map(ip => ({ invoiceposition_id: ip[0].invoiceposition_id, invoice_id: this.$route.params.id })),
        })

        // Create split relation
        await this.$api({
          entity: 'invoiceposition_invoiceposition_rel',
          action: 'create',
          data: result.map((ip, idx) => ({
            invoiceposition_id: this.selectedPosition.invoiceposition_id,
            invoiceposition_id_split: ip[0].invoiceposition_id,
            invoiceposition_split_storno: idx === 0 ? 1 : 0,
          })),
        })

        // Create relation with costypes
        await this.$api({
          entity: 'invoiceposition_costtype_rel',
          action: 'create',
          data: result.map((ip, idx) => ({
            invoiceposition_id: ip[0].invoiceposition_id,
            costtype_id: allPositions[idx].costtype_id,
          })),
        })
        // Create relation with units
        await this.$api({
          entity: 'invoiceposition_unit_rel',
          action: 'create',
          data: result.map(ip => ({
            invoiceposition_id: ip[0].invoiceposition_id,
            unit_id: this.selectedPosition.unit_id,
          })),
        })
        this.$parent.$parent.getCurrentTable().reload()
        this.$refs.modal.hide()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    deleteSelectedPositions() {
      this.splitedPositions = this.splitedPositions.filter(p => !p.__selected)
    },
    cloneSelected() {
      return this.definition.fields.filter(f => f.key !== 'invoiceposition_id').reduce((acc, field) => {
        acc[field.key] = this.selectedPosition[field.key]
        return acc
      }, {})
    },
    splitPosition() {
      this.$refs.form.validate()
        .then(success => {
          if (!success) {
            console.error('form invalid')
            return
          }
          if (this.amountToSplit <= 0) return
          const newPosition = this.cloneSelected()
          newPosition.invoiceposition_amount_customer = parseFloat(this.entity.invoiceposition_amount_customer)
          newPosition.costtype_id = this.entity.costtype_id
          newPosition.costtype_name = this.$refs.costtype.selectedValue.costtype_name
          newPosition.invoiceposition_name = this.entity.invoiceposition_name
          this.splitedPositions.push(newPosition)

          this.setEntity()
          this.$nextTick(() => this.$refs.form.reset())
        })
    },
    openSplitModal() {
      const table = this.$parent.$parent.getCurrentTable()
      const selected = table.getSelected()
      if (!selected[0]) {
        this.$errorToast('Please Select an invoice position')
        return
      }
      // this.$api({
      //   entity: 'frontend_4_2_5',
      //   action: 'read-rich',
      //   data: [{ invoiceposition_id: selected[0].invoiceposition_id }],
      // })
      //   .then(({ data }) => {
      //     this.selectedPosition = data.data.data[0]
      this.selectedPosition = selected[0]
      this.setEntity()
      this.$refs.modal.show()
      // })
      // this.selectedPosition = selected[0]
      // this.$refs.modal.show()
    },
    setEntity() {
      this.entity = {
        costtype_id: this.selectedPosition.costtype_id,
        invoiceposition_name: this.selectedPosition.invoiceposition_name,
      }
    },
  },
}
</script>

<style scoped>

</style>
