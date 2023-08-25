<template>
  <b-card-actions title="Statistics" action-collapse>
    <table class="table table-responsive">
      <thead>
        <tr>
          <th/>
          <th>Invoice</th>
          <th>SFM</th>
          <th>Difference</th>
          <th>
            <b-form-checkbox v-if="hasError" :checked="true" disabled/>
            <b-button v-else size="sm" variant="primary" @click="setErrorCriteria">
              <b-spinner v-if="loading" small/>
              Set Error Criteria
            </b-button>
          </th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td>Total amount invoice</td>
          <td>{{ a1 }}</td>
          <td>{{ b1 }}</td>
          <td :class="a1===b1?'text-success':'text-danger'">
            {{ b1 - a1 }}
          </td>
        </tr>
        <tr>
          <td>Prepayment</td>
          <td>{{ a2 }}</td>
          <td>{{ b2 }}</td>
          <td :class="a2===b2?'text-success':'text-danger'">
            {{ b2 - a2 }}
          </td>
        </tr>
        <tr>
          <td>Contradiction total</td>
          <td>0</td>
          <td>0</td>
          <td/>
        </tr>
        <tr>
          <td>Settlement result</td>
          <td>{{ a4 }}</td>
          <td>{{ b4 }}</td>
          <td/>
        <!--        <td :class="a4===b4?'text-success':'text-danger'">{{ b4 - a4 }}</td>-->
        </tr>
        <tr>
          <td>Advance payment/credit note</td>
          <td>0</td>
          <td>{{ b5 }}</td>
          <td/>
        </tr>
        <tr>
          <td>Payment balance</td>
          <td>{{ a4 - 0 }}</td>
          <td>{{ b4 - b5 }}</td>
          <td/>
        </tr>
      </tbody>
    </table>
    <div class="d-flex gap-3 align-items-center"/>
  </b-card-actions>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'InvoiceStats',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    a1() {
      return this.ivts.find(ivt => ivt.invoicevaluetype_id === 3)?.invoice_invoicevaluetype_value || 0
    },
    a2() {
      return this.ivts.find(ivt => ivt.invoicevaluetype_id === 2)?.invoice_invoicevaluetype_value || 0
    },
    a4() {
      return this.ivts.find(ivt => ivt.invoicevaluetype_id === 4)?.invoice_invoicevaluetype_value || 0
    },
    b1() {
      return _.sumBy(this.ips, 'invoiceposition_amount_customer') || 0
    },
    b2() {
      return this.ivts.find(ivt => ivt.invoicevaluetype_id === 1)?.invoice_invoicevaluetype_value || 0
    },
    b4() {
      return this.b1 - this.b2
    },
    b5() {
      return this.ivts.find(ivt => ivt.invoicevaluetype_id === 99725)?.invoice_invoicevaluetype_value || 0
    },
    ivts() {
      return this.$parent.$refs.tabs.registeredTabs[2].$children[0].currentItems
    },
    ips() {
      return this.$parent.$refs.tabs.registeredTabs[5].$children[0].currentItems
    },
    criterias() {
      return this.$parent.$refs.tabs.registeredTabs[3].$children[0].currentItems
    },
    hasError() {
      return this.criterias.find(c => c.invoicecriteria_name === 'Differenz wg. Abrechnungsfehler')?.invoice_invoicecriteria_is_set
    },
  },
  watch: {
    criterias() {
      console.log('ivts', this.crit)
    },
  },
  methods: {
    async setErrorCriteria() {
      this.loading = true
      try {
        const criteria = this.criterias.find(c => c.invoicecriteria_name === 'Differenz wg. Abrechnungsfehler')
        if (criteria) {
          await this.$api({
            action: 'update',
            entity: 'invoice_invoicecriteria_rel',
            data: [{ ...criteria, invoice_invoicecriteria_is_set: 1 }],
          })
        } else {
          await this.$api({
            action: 'create',
            entity: 'invoice_invoicecriteria_rel',
            data: [{ invoice_id: this.$route.params.id, invoicecriteria_id: 3, invoice_invoicecriteria_is_set: 1 }],
          })
        }
        const entity = this.$parent.$refs.tabs.registeredTabs[3].$children[0].entity
        this.$store.commit('table/deleteTableCacheKeyFromPrefix', `${entity}-`)
        this.$parent.$refs.tabs.registeredTabs[3].$children[0].reload()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>
