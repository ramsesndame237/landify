<template>
  <b-tr>
    <b-td>
      <feather-icon v-if="item.documents && item.documents.length>0" v-b-toggle="'collapse-'+item.email_id"
                    :icon="open?'ChevronUpIcon':'ChevronDownIcon'" size="24" @click="toggle"/>
    </b-td>
    <b-td>{{ child ? '' : item.email_id }}</b-td>
    <b-td>{{ child ? '' : item.email_received_datetime }}</b-td>
    <b-td>{{ child ? '' : item.email_from }}</b-td>
    <b-td>{{ child ? '' : item.email_to }}</b-td>
    <b-td>
      {{ child ? '' : item.email_subject }}
      <feather-icon v-if="!child" class="text-success" icon="EyeIcon" size="24" @click="$emit('show-content')"/>
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
      <b-form-checkbox :checked="item.document_id?1:0" disabled="" :value="1" :unchecked-value="0"/>
    </b-td>
    <b-td>
      <b-link v-if="item.document_id" class="m-auto" variant="danger" target="_blank" :href="getDocumentLink(item)">
        {{ item.document_name }}
      </b-link>
    </b-td>
    <b-td class="td-form">
      <field v-if="item.document_id" :field="documenttypeIdField" :entity="item"/>
    </b-td>
    <b-td class="td-form">
      <field :field="boardIdField" :entity="item" :disabled="item.ticket_id!=null"/>
    </b-td>
    <b-td>
      <div class="d-flex align-items-center" v-if="item.classification_id && !item.ticket_created">
        <b-button class="btn-icon" variant="flat-success" pill @click="$emit('classify')">
          <feather-icon icon="CheckIcon" size="24"/>
        </b-button>
        <b-button class="btn-icon" variant="flat-danger" style="margin-bottom: 3px" pill @click="$emit('reject')">
          <feather-icon icon="XIcon" size="24"/>
        </b-button>
      </div>
    </b-td>
  </b-tr>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import { getDocumentLink } from "@/libs/utils";
import { VBToggle } from 'bootstrap-vue'

export default {
  name: 'MailTr',
  components: { Field },
  props: {
    item: {},
    child: Boolean,
  },
  directives: {
    'b-toggle': VBToggle,
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
      boardIdField: {
        key: 'board_id',
        type: 'list',
        list: 'board',
        listLabel: 'board_name',
        noLabel: true,
        noFetch: true,
      },
      documenttypeIdField: {
        key: 'documenttype_id',
        type: 'list',
        list: 'documenttype',
        listLabel: 'documenttype_name',
        noLabel: true,
        noFetch: true,
      },
      open: true,
    }
  },
  watch: {
    'item.ticket_id': function (val) {
      if (val) {
        const list = this.$store.state.table.listCache['frontend_6_1_6_overview']
        const el = list.find(e => e.ticket_id === val)
        console.log('el', el.pos_name);
        if (el) {
          this.$set(this.item, 'pos_id', el.pos_id)
          this.$set(this.item, 'contract_id', el.contract_id)
          this.$set(this.item, 'board_id', el.board_id)
        }
      }
    },
    'item.documenttype_id': function (val) {
      if (val) {
        const list = this.$store.state.table.listCache['documenttype']
        const el = list.find(e => e.documenttype_id === val)
        if (el) {
          this.item.board_id = el.board_id
        }
      }
    },
  },
  methods: {
    getDocumentLink,
    toggle() {
      const el = document.getElementById('collapse' + this.item.email_id)
      // if (this.open) el.style.height = 0
      // else el.style.height = 'auto'
      this.open = !this.open
      el.hidden = !el.hidden
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
