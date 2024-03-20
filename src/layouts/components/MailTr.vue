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
        <feather-icon v-if="item.documents && item.documents.length" icon="PaperclipIcon" class="mr-50"/>
        <span class="d-inline-block text-truncate" style="max-width: 150px" :title="child ? '' : item.email_subject">
          {{ child ? '' : item.email_subject }}
        </span>
        <feather-icon v-if="!child" class="text-success eye-icon" icon="EyeIcon" size="24"
                      @click="$emit('show-content')"/>
      </div>
    </b-td>
    <b-td class="td-form">
      <field v-if="visible" :field="posIdField" :entity="item" :disabled="!!item.ticket_id || is_dismissed || is_done"/>
      <router-link v-if="is_done && item.pos_id" target="_blank"
                   :to="{ name: 'table-view', params: { table: 'pos', id: item.pos_id } }">
        {{ getPosName() }}
      </router-link>
    </b-td>
    <b-td class="td-form">
      <!--      <div v-if="visible" class="d-flex align-items-center" style="gap: 8px; transform: translateY(-6px);">-->
      <!--        <div style="width: 300px;">-->
      <!--          <auto-complete :get-option-value="opt => opt.ticket_id || ''" :on-change="opt => {-->
      <!--              currentTicket = opt-->
      <!--            }" :get-option-label="opt => opt.ticket_name || ''" :value.sync="item.ticket_id"-->
      <!--                         :url="(keyword) => `/tickets/autocomplete?pos_id=${item.pos_id || ''}&keyword=${keyword || ''}`"-->
      <!--                         :disabled="is_dismissed || is_done || !item.pos_id" :initial-option="currentTicket"-->
      <!--                         :elements-to-listen-on="tableEl ? [tableEl] : undefined" always-reset-on-focus/>-->
      <!--        </div>-->
      <!--      </div>-->
      <field v-if="visible" ref="ticket" :field="ticketIdField" :entity="item" :disabled="is_dismissed || is_done"/>
      <router-link v-if="is_done" target="_blank"
                   :to="{name: 'table-view', params: {table: 'ticket',id: item.ticket_id_created}}">
        {{ item.ticket_id_created + ' - ' + getTicketName() }}
      </router-link>
    </b-td>
    <b-td>
      <b-form-checkbox v-if="visible" :key="`checkbox-new-ticket-for-item-${item.email_id || item.document_id}`"
                       v-model="shouldCreateSubTicket" style="transform: translateY(-6px)"
                       :disabled="(showTicket === null? false : true ) || (!item.ticket_id || is_dismissed || is_done) "/>
      <b-form-checkbox v-else :checked="!!item.create_subticket" style="transform: translateY(-6px)" disabled/>
    </b-td>
    <b-td class="td-form">
      <field v-if="visible" ref="contract" :field="contractIdField" :entity="item"
             :disabled="!!item.ticket_id || is_dismissed|| is_done"/>
      <router-link v-if="is_done" target="_blank"
                   :to="{name: 'table-view', params: {table: 'contract',id: item.contract_id}}">
        {{ getContractName() }}
      </router-link>
    </b-td>
    <!-- <b-td>
      <feather-icon v-if="item.documents && item.documents.length" icon="PaperclipIcon" />
      <b-form-checkbox v-if="item.documents && item.documents.length" :checked="1" disabled :value="1"
                       :unchecked-value="0"/>
    </b-td> -->
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
             :disabled="!item.pos_id || (item.ticket_id && !shouldCreateSubTicket) || is_dismissed || is_done"/>
      <router-link v-if="is_done" target="_blank"
                   :to="{name: 'table-kanban', params: {table: 'board',id: item.board_id}}">
        {{ getBoardName() }}
      </router-link>
    </b-td>
    <b-td class="td-form text-center">
      <b-badge v-if="item.status && !item.document_id" :variant="statusClass">
        {{ $t('classification~status~' + (item.email_id ? getMailStatus(item.status) : item.status)) }}
      </b-badge>
    </b-td>
    <b-td class="text-center">
      <div v-if="!is_done && !is_dismissed && (item.document_id ? item.classification_id : true)"
           class="d-flex align-items-center">
        <b-button class="btn-icon" variant="flat-success" pill @click="onClassifyClick">
          <feather-icon icon="CheckIcon" size="24"/>
        </b-button>
        <b-button class="btn-icon" variant="flat-danger" style="margin-bottom: 3px" pill @click="onRejectMail">
          <feather-icon icon="XIcon" size="24"/>
        </b-button>
      </div>
      <b-badge v-if="(is_done||is_dismissed) && !!item.document_id" :variant="statusClass">
        {{ $t('classification~status~' + (item.document_id ? item.status : getMailStatus(item.status))) }}
      </b-badge>
    </b-td>
  </b-tr>
</template>

<script>
import Field from '@/views/app/Generic/Field'
import { getDocumentLink, getDateFormat } from '@/libs/utils'
import { VBToggle } from 'bootstrap-vue'
import moment from 'moment'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  name: 'MailTr',
  components: {
    Field,
    FeatherIcon,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    item: {},
    child: Boolean,
    tableEl: {
      validator: () => true,
      default: null,
    },
  },
  data() {
    return {
      currentTicket: null,
      shouldCreateSubTicket: false,
      showTicket: '',
      ticketIdField: {
        key: 'ticket_id',
        type: 'list',
        list: 'frontend_6_1_6_overview',
        entityCustomEndPoint: '/tickets/slims?show_with_subtickets=true&',
        listLabel: item => `${item.ticket_id} - ${item.ticket_name}`,
        noLabel: true,
        required: false,
        filter_key: 'pos_id',
        noCache: true,
        customPagination: {
          data: [{ size: 15 }],
        },
        customFilter: {
          ticket_closed: 0,
        },
        handleFieldChange: (newValue, oldValue, entity, vm) => {
          const { ticket_contract_id, board_id } = vm.selectedValue
          vm.$set(entity, 'contract_id', ticket_contract_id)
          vm.$set(entity, 'board_id', board_id)
        },
        // optionWithTooltipDetail: true,
      },
      posIdField: {
        key: 'pos_id',
        required: false,
        type: 'list',
        list: 'frontend_2_1_3_8',
        listLabel: 'pos_name',
        entityCustomEndPoint: '/pos',
        noLabel: true,
        noCache: true,
        placeholder: 'pos~name~custom_placeholder',
        noFetchOnInit: true,
        customPagination: {
          per_page: 15,
        },
        // noFetch: true,
        /**
         * Cette clé permet de spécifier si lorsque les options dans le champ sont trop long, au
         * Hover du champ, on doit afficher les détails sous un tooltip
         */
        // optionWithTooltipDetail: true,
      },
      contractIdField: {
        key: 'contract_id',
        required: false,
        type: 'list',
        list: 'frontend_4_2_1_contract_selector',
        listLabel: 'contract_name',
        filter_key: 'pos_id',
        noLabel: true,
        noCache: true,
        // optionWithTooltipDetail: true,
      },
      boardIdField: {
        key: 'board_id',
        type: 'list',
        list: 'board',
        listLabel: 'board_name',
        noLabel: true,
        noFetch: true,
        // optionWithTooltipDetail: true,
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
    statusClass() {
      switch (this.item.status) {
        case 'inprogress':
          return 'warning'
        case 'done':
          return 'success'
        case 'dismiss':
          return 'danger'
        default:
          return ''
      }
    },
    is_dismissed() {
      return this.item.document_id ? !!this.item.classification_dismissed : !!this.item.email_dismissed
    },
    is_done() {
      return this.item.document_id ? !!this.item.ticket_created : (this.item?.email_processed && !this.item?.email_dismissed)
      // return this.item.document_id ? !!this.item.ticket_created : !!this.item?.ticket_id_created
    },
    visible() {
      return this.item.document_id
        ? (!this.item.classification_dismissed && !this.item.ticket_created)
        : (this.item.documents.every(d => d.classification_dismissed) && (!this.item.email_dismissed && !this.item.ticket_id_created))
    },
  },
  watch: {
    'item.ticket_id': function (val) {
      this.onTicketIdChange(val)
    },
    'item.documenttype_id': function (val) {
      this.onDocumentTypeChange()
    },
    'item.pos_id': function (val) {
      // if (this.item.contract_id) this.$set(this.item, 'contract_id', null)
      if (this.item.ticket_id) this.$set(this.item, 'ticket_id', null)
    },
  },
  mounted() {
    this.onDocumentTypeChange()
    this.onTicketIdChange()
  },
  methods: {
    getMailStatus(status) {
      console.log((status === 'dismiss' || status === 'done') ? 'processed' : status)
      return (status === 'dismiss' || status === 'done') ? 'processed' : status
    },
    onRejectMail() {
      if (!this.visible) {
        this.$errorToast(this.$t('mail~classify~parent~first~alert'))
        return
      }
      this.$emit('reject')
    },
    onClassifyClick() {
      if (!this.visible) {
        this.$errorToast(this.$t('mail~classify~parent~first~alert'))
        return
      }
      this.$emit('classify', { $vm: this, shouldCreateSubTicket: this.shouldCreateSubTicket })
    },
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
    onTicketIdChange(val) {
      if (!this.is_done) {
        const ticketList = this.$store.state.table.listCache.frontend_6_1_6_overview
        const selectedTicket = ticketList?.find(ticket => ticket.ticket_id === val)
        this.showTicket = selectedTicket.ticket_id_group
        this.$set(this.item, 'contract_id', selectedTicket?.contract_id || null)
        this.$set(this.item, 'board_id', selectedTicket?.board_id || null)
        // if (!val) {
        this.shouldCreateSubTicket = false
        // }
      }
    },
    getTicketName() {
      return this.item.ticket_name_created || ''
    },
    getPosName() {
      const list = this.$store.state.table.listCache.frontend_2_1_3_8
      const el = list?.find(e => e.pos_id === this.item.pos_id)
      return el?.pos_name || this.item?.pos_name
    },
    getContractName() {
      return this.item?.contract_name || ''
    },
    getBoardName() {
      // const list = this.$store.state.table.listCache.board
      // const el = list.find(e => e.board_id === this.item.board_id)
      // return el?.board_name
      return this.item.board_name || ''
    },
    getDocumentTypeName() {
      const list = this.$store.state.table.listCache.documenttype
      const el = list?.find(e => e.documenttype_id === this.item.documenttype_id)
      return el?.documenttype_name || this.item?.documenttype_name || ''
    },
    onDocumentTypeChange() {
      if (!this.is_done) {
        const val = this.item.documenttype_id
        if (val) {
          const list = this.$store.state.table.listCache.board
          if (!list) return
          const el = list?.find(e => e.documenttype_id === val)
          if (el && this.item.board_id === null) {
            this.$set(this.item, 'board_id', el.board_id)
          }
        }
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
