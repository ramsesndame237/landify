<template>
  <b-tr @click="display">
    <b-td @click="toggle">
      <feather-icon v-if="item.documents && item.documents.length>0" v-b-toggle="'collapse-'+item.email_id"
                    :icon="item.open?'ChevronDownIcon':'ChevronRightIcon'" size="24"/>
    </b-td>
    <b-td @click="toggle">
      {{ child ? '' : item.email_id }}
    </b-td>
    <b-td @click="toggle">
      <span class="text-truncate">
      {{ child ? '' : customFormatDate(item.email_received_datetime) }}
      </span>
    </b-td>
    <b-td @click="toggle">
      <span class="d-inline-block text-truncate" style="max-width: 130px" :title="child ? '' : item.email_from">
      {{ child ? '' : item.email_from }}
      </span>
    </b-td>
    <b-td>
      <div class="d-flex align-items-center subject-content">
        <span class="d-inline-block text-truncate" style="max-width: 150px" :title="child ? '' : item.email_subject">
        {{ child ? '' : item.email_subject }}
      </span>
        <feather-icon v-if="!child" class="text-success eye-icon" icon="EyeIcon" size="24"
                      @click="$emit('show-content')"/>
      </div>
    </b-td>
    <template v-if="toggle_row">
      <b-td class="td-form">
        <field v-if="visible" :field="ticketIdField" :entity="item" :disabled="is_dismissed || is_done"/>
        <router-link v-if="is_done" target="_blank"
                     :to="{name: 'table-view', params: {table: 'ticket',id: item.ticket_id_created}}">
          {{ item.ticket_id_created + ' - ' + getTicketName() }}
        </router-link>
      </b-td>
      <b-td class="td-form">
        <field v-if="visible" :field="posIdField" :entity="item"
               :disabled="is_dismissed || is_done || item.ticket_id!=null"/>
        <router-link v-if="is_done && item.pos_id" target="_blank"
                     :to="{name: 'table-view', params: {table: 'pos',id: item.pos_id}}">
          {{ getPosName() }}
        </router-link>
      </b-td>
      <b-td class="td-form">
        <field v-if="visible" :field="contractIdField" :entity="item"
               :disabled="is_dismissed|| is_done ||item.ticket_id!=null"/>
        <router-link v-if="is_done && item.contract_id" target="_blank"
                     :to="{name: 'table-view', params: {table: 'contract',id: item.contract_id}}">
          {{ getContractName() }}
        </router-link>
      </b-td>
      <b-td>
        <b-form-checkbox v-if="item.documents && item.documents.length" :checked="1" disabled :value="1"
                         :unchecked-value="0"/>
      </b-td>
      <b-td>
        <b-link v-if="item.document_id" class="m-auto" variant="danger" target="_blank" :href="getDocumentLink(item)">
          {{ item.document_name }}
        </b-link>
      </b-td>
      <b-td class="td-form">
        <field v-if="visible && item.document_id" :field="documenttypeIdField" :entity="item"
               :disabled="is_dismissed || is_done"/>
        <span v-if="is_done && item.document_id" target="_blank">
        {{ getDocumentTypeName() }}
      </span>
      </b-td>
      <b-td class="td-form">
        <field v-if="visible" :field="boardIdField" :entity="item"
               :disabled="is_dismissed || is_done || item.ticket_id!=null"/>
        <router-link v-if="is_done" target="_blank"
                     :to="{name: 'table-kanban', params: {table: 'board',id: item.board_id}}">
          {{ getBoardName() }}
        </router-link>
      </b-td>
    <b-td class="text-center">
      <div v-if="visible && !is_done && !is_dismissed && (item.document_id ? item.classification_id : true)"
           class="d-flex align-items-center">
        <b-button class="btn-icon" variant="flat-success" pill @click="$emit('classify')">
          <feather-icon icon="CheckIcon" size="24"/>
        </b-button>
        <b-button class="btn-icon" variant="flat-danger" style="margin-bottom: 3px" pill @click="$emit('reject')">
          <feather-icon icon="XIcon" size="24"/>
        </b-button>
      </div>
      <span v-if="is_done" class="text-success">Done</span>
      <span v-if="is_dismissed" class="text-warning">Dismissed</span>
    </b-td>
    </template>
  </b-tr>
</template>

<script>
import Field from '@/views/app/Generic/Field'
import { getDocumentLink, formatDate, getDateFormat } from '@/libs/utils'
import { VBToggle } from 'bootstrap-vue'
import moment from 'moment'
import store from '@/store/index'

export default {
  name: 'MailTr',
  components: { Field },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    item: {},
    child: Boolean,
  },
  data() {
    return {
      toggle_row:false,
      ticketIdField: {
        key: 'ticket_id',
        type: 'list',
        list: 'frontend_6_1_6_overview',
        listLabel: item => `${item.ticket_id} - ${item.ticket_name}`,
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
    }
  },
  computed: {
    is_dismissed() {
      return this.item.document_id ? !!this.item.classification_dismissed : !!this.item.email_dismissed
    },
    is_done() {
      return this.item.document_id ? !!this.item.ticket_created : !!this.item.ticket_id_created
    },
    visible() {
      return this.item.document_id
        ? (!this.item.classification_dismissed && !this.item.ticket_created)
        : (this.item.documents.every(d => d.classification_dismissed) && (!this.item.email_dismissed && !this.item.ticket_id_created))
    },
  },
  watch: {
    'item.ticket_id': function (val) {
      this.onTicketIdChange()
    },
    'item.documenttype_id': function (val) {
      this.onDocumentTypeChange()
    },
  },
  mounted() {
    this.onDocumentTypeChange()
    this.onTicketIdChange()
    this.$watch(this.$store.getters['mails/toggle_table_row_visibility'], () => {
      this.toggle_row = this.toggle_table_row_visibility;
    });
  },
  methods: {
    customFormatDate(date) {
      if (!date) return ''
      const mDate = moment(date)
      const now = moment()
      let format = getDateFormat(true)
      if (mDate.isSame(now, 'day')) {
        format = 'HH:mm'
      } else if (!mDate.isSame(now, 'isoWeek')) {
        format = getDateFormat(false)
      }
      return mDate.format(format)
    },
    display() {
      console.log(this.item)
    },
    getDocumentLink,
    toggle() {
      if (!this.item.documents || !this.item.documents.length) return
      const el = document.getElementById(`collapse${this.item.email_id}`)
      // if (this.open) el.style.height = 0
      // else el.style.height = 'auto'
      this.item.open = !this.item.open
      // el.hidden = !el.hidden
    },
    onTicketIdChange() {
      const val = this.item.ticket_id
      if (val) {
        const list = this.$store.state.table.listCache.frontend_6_1_6_overview
        const el = list.find(e => e.ticket_id === val)
        console.log('el', el.pos_name)
        if (el) {
          this.$set(this.item, 'pos_id', el.pos_id)
          this.$set(this.item, 'contract_id', el.contract_id)
          this.$set(this.item, 'board_id', el.board_id)
        }
      }
    },
    getTicketName() {
      const list = this.$store.state.table.listCache.frontend_6_1_6_overview
      const el = list.find(e => e.ticket_id === this.item.ticket_id_created)
      return el?.ticket_name
    },
    getPosName() {
      const list = this.$store.state.table.listCache.frontend_2_1_3_8
      const el = list.find(e => e.pos_id === this.item.pos_id)
      return el?.pos_name
    },
    getContractName() {
      const list = this.$store.state.table.listCache.frontend_4_2_1_contract_selector
      const el = list.find(e => e.contract_id === this.item.contract_id)
      return el?.contract_name
    },
    getBoardName() {
      const list = this.$store.state.table.listCache.board
      const el = list.find(e => e.board_id === this.item.board_id)
      return el?.board_name
    },
    getDocumentTypeName() {
      const list = this.$store.state.table.listCache.documenttype
      const el = list.find(e => e.documenttype_id === this.item.documenttype_id)
      return el?.documenttype_name
    },
    onDocumentTypeChange() {
      console.log('documenttype change')
      if (this.item.ticket_id) return
      const val = this.item.documenttype_id
      if (val) {
        const list = this.$store.state.table.listCache.board
        if (!list) return
        const el = list.find(e => e.documenttype_id === val)
        if (el) {
          this.$set(this.item, 'board_id', el.board_id)
        }
      } else {
        this.$set(this.item, 'board_id', null)
      }
    },
  },
}
</script>

<style scoped>
.td-form {
  padding-left: 4px !important;
  padding-right: 4px !important;
  min-width: 250px;
}

.eye-icon {
  opacity: 0;
}

.subject-content:hover .eye-icon {
  opacity: 1;
}
</style>
