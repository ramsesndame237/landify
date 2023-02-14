<template>
  <b-tr>
    <b-td>{{ item.email_id }}</b-td>
    <b-td>{{ item.email_date_received }}</b-td>
    <b-td>{{ item.email_from }}</b-td>
    <b-td>{{ item.email_to }}</b-td>
    <b-td>
      {{ item.email_subject }}
      <feather-icon class="text-success" icon="EyeIcon" size="24" @click="$emit('show-content')"/>
    </b-td>
    <b-td class="td-form">
      <field :field="ticketIdField" :entity="item"/>
    </b-td>
    <b-td class="td-form">
      <field :field="posIdField" :entity="item" :disabled="item.ticket_id!=null"/>
    </b-td>
    <b-td class="td-form">
      <field :field="contractIdField" :entity="item" :disabled="item.ticket_id!=null"/>
    </b-td>
    <b-td>
      <b-form-checkbox v-model="item.attachment" disabled="" :value="1" :unchecked-value="0"/>
    </b-td>
    <b-td>
      {{ item.file_name }}
    </b-td>
    <b-td class="td-form">
      <field :field="classificationIdField" :entity="item"/>
    </b-td>
    <b-td>
      <div class="d-flex align-items-center">
        <b-button class="btn-icon" variant="flat-success" pill>
          <feather-icon icon="CheckIcon" size="24"/>
        </b-button>
        <b-button class="btn-icon" variant="flat-danger" style="margin-bottom: 3px" pill>
          <feather-icon icon="XIcon" size="24"/>
        </b-button>
      </div>
    </b-td>
  </b-tr>
</template>

<script>
import Field from "@/views/app/Generic/Field";

export default {
  name: "MailTr",
  components: { Field },
  props: {
    item: {},
  },
  data() {
    return {
      ticketIdField: {
        key: 'ticket_id',
        type: 'list',
        list: 'frontend_6_1_6_overview',
        listLabel: 'ticket_name',
        noLabel: true,
        noFetch: true,
        required: false,
      },
      posIdField: {
        key: 'pos_id',
        required: false,
        type: 'list',
        list: 'frontend_2_1_3_8',
        listLabel: 'pos_name',
        noLabel: true,
        noFetch: true,
      },
      contractIdField: {
        key: 'contract_id',
        required: false,
        type: 'list',
        list: 'frontend_4_2_1_contract_selector',
        listLabel: 'contract_name',
        filter_key: 'pos_id',
        noLabel: true,
        noFetch: true,
      },
      classificationIdField: {
        key: 'classification_id',
        type: 'list',
        list: 'classification',
        listLabel: 'classification_name',
        noLabel: true,
        noFetch: true,
      },
    }
  },
  watch: {
    'item.ticket_id': function (val) {
      if (val) {
        const list = this.$store.state.table.listCache['frontend_6_1_6_overview']
        const el = list.find(e => e.ticket_id === this.item.ticket_id)
        if (el) {
          this.item.pos_id = el.pos_id
          this.item.contract_id = el.contract_id
        }
      } else {
      }
    },
  },
}
</script>

<style scoped>
.td-form {
  padding-left: 4px !important;
  padding-right: 4px !important;
  min-width: 150px;
}
</style>
