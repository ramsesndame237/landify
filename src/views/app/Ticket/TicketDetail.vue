<template>
  <div class="global-container">
    <TabComponent :tab-title="tabTitle" @selected-item="getActiveItemData"/>
    <b-overlay :show="loading">
      <div v-if="entity && entity.columns">

        <b-row>
          <b-col v-if="activeTabItem && activeTabItem.id ==='1'" lg="12">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div>
                <h4 class="mb-0 font-weight-bolder">
                  {{ entity.ticket_id }}
                </h4>
                <p class="mb-0">
                  {{ entity.ticket_name }}
                </p>
              </div>

              <div class="d-flex align-items-center">
                <notes v-if="definition.note" :id="entityId" :note-to-everyone="noteToEveryOne"
                       :note-to-internal="noteToInternal" class="mr-2" :primary-key="primaryKey" :note="definition.note"
                       :note-rel="'note_user_'+table+'_rel'"/>
                <b-button v-if="showButton.all" variant="primary" @click="createInvoice">
                  {{ $t('button~newinvoice') }}
                </b-button>
                <b-button v-if="!entity.ticket_closed && (showButton.all || showButton.assign)" variant="primary"
                          class="ml-2"
                          @click="$refs.assign.openModal(entity, userIdsOfTeam(entity.columns[0].team_id))">
                  {{ $t('button~assignto') }}
                </b-button>
                <b-button v-if="canMoveBack()" class="ml-2" variant="primary" @click="moveBack">
                  {{ $t('button~moveback') }}
                </b-button>
                <b-button v-if="canMoveToNext() && (showButton.all || showButton.confirm)" class="ml-2"
                          variant="primary" @click="moveToNext">
                  {{ $t('button~movetonextcolumn') }}
                </b-button>
                <b-button v-if="!entity.ticket_closed & showButton.all" variant="primary" class="ml-2"
                          @click="updateTicket">
                  {{ $t('button~edit') }}
                </b-button>
                <b-button v-if="showButton.all" variant="primary" class="ml-2" @click="toggleTicket(entity)">
                  {{ $t('button~ticket~' + (entity.ticket_closed ? 'reopen' : 'close')) }}
                </b-button>
                <assign-user-modal ref="assign" @reload="loadSingleTicket"/>
              </div>
            </div>
            <b-card-actions :title="$t('headline~ticket~information')" action-collapse>
              <table class="mt-2 mt-xl-0 w-100">
                <tr v-if="!isTicket">
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.ticket_name_group') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.ticket_id_group"
                                 :to="{name:'table-view',params: {table:'ticket',id: entity.ticket_id_group, entity: {}, columns:[], teams: []}}">
                      {{ entity.ticket_name_group }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.board_name') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.board_id"
                                 :to="{name:'table-kanban',params: {table:'board',id: entity.board_id}}">
                      {{ entity.board_name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.ticket_id') }}
                  </th>
                  <td class="pb-50">
                    {{ entity.ticket_id }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.customergroup_name') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.customergroup_id"
                                 :to="{name:'table-view',params: {table: 'customergroup', id: entity.customergroup_id}}">
                      {{ entity.customergroup_name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.company_name') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.company_id"
                                 :to="{name:'table-view',params: {table: 'company', id: entity.company_id}}">
                      {{ entity.company_name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.pos_name') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.pos_id"
                                 :to="{name:'table-view',params: {table: 'pos', id: entity.pos_id}}">
                      {{ entity.pos_name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.contract_name') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.contract_id"
                                 :to="{name:'table-view',params: {table: 'contract', id: entity.contract_id}}">
                      {{ entity.contract_name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.invoice_number') }}
                  </th>
                  <td class="pb-50">
                    <router-link v-if="entity.invoice_id"
                                 :to="{name:'table-view',params: {table: 'invoice', id: entity.invoice_id}}">
                      {{ entity.invoice_number }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.ticket_name') }}
                  </th>
                  <td class="pb-50">
                    {{ entity.ticket_name }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.ticket_description') }}
                  </th>
                  <td class="pb-50">
                    {{ entity.ticket_description }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.priority_name') }}
                  </th>
                  <td class="pb-50">
                    {{ entity.priority_name }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.column_name') }}
                  </th>
                  <td class="pb-50">
                    {{ entity.columns[0].column_name }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.user_email') }}
                  </th>
                  <td class="pb-50">
                    {{ entity.columns[0].user_email_assigned }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.ticket_deadline_yellow') }}
                  </th>
                  <td class="pb-50">
                    {{ formatDate(entity.ticket_deadline_yellow, true) }}
                  </td>
                </tr>
                <tr>
                  <th class="pb-50 font-weight-bold">
                    {{ $t('attribute.ticket_deadline_red') }}
                  </th>
                  <td class="pb-50">
                    {{ formatDate(entity.ticket_deadline_red, true) }}
                  </td>
                </tr>
              </table>
            </b-card-actions>
            <div v-if="false" class="">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h2>{{ $t('headline~ticket~subtasks') }}</h2>
                <b-button v-if="!entity.ticket_closed && showButton.all" variant="primary" @click="createSubTicket">
                  {{ $t('button~newsubtask') }}
                </b-button>
              </div>
              <generic-modal ref="modal" table="ticket" :definition="subTicketDef" table-definition-key="ticket"
                             :title="$t('headline~ticket~newsubtask')" @reload-table="onNewTicket"/>
              <sub-ticket-card v-for="(ticket,idx) in subTickets" :key="idx" :ticket="ticket"/>
              <p v-if="subTickets.length===0" class="text-center">
                {{ $t('headline~ticket~nosubticket') }}
              </p>
            </div>
            <email-modal ref="emailModal" @reload="fetchEmail"/>
          </b-col>
          <b-col v-if="entity.columns &&activeTabItem && activeTabItem.id ==='2'">
            <b-card-actions class="mt-3" :title="$t('headline~ticket~timeline')" action-collapse
                            collapsed>
              <app-timeline>
                <app-timeline-item v-for="(column,idx) in entity.columns" :key="idx" :title="column.column_name"
                                   :time="(column.user_email?(column.user_email+' - '):'')+column.ticket_move_time_in"
                                   :variant="getColumnColor(column,idx)"/>
              </app-timeline>
            </b-card-actions>
          </b-col>
          <b-col v-if="activeTabItem && activeTabItem.id ==='3'" lg="12">
            <b-card-actions no-body="dd" :title="$t('headline~ticket~emails')" class="mt-2" action-collapse>
              <b-overlay :show="loadingEmail">
                <b-table-simple class="mail-table">
                  <b-thead>
                    <b-tr>
                      <b-th/>
                      <b-th>{{ $t('attribute.email_received_datetime') }}</b-th>
                      <b-th>{{ $t('attribute.email_from') }}</b-th>
                      <b-th>{{ $t('attribute.email_subject') }}</b-th>
                      <b-th>{{ $t('attribute.documentModule') }}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(email,i) in emails" :key="i">
                      <b-td>
                        <b-button class=" btn-icon" variant="flat-success" pill
                                  @click="$refs.emailModal.show(true,email)">
                          <feather-icon icon="EyeIcon"/>
                        </b-button>
                      </b-td>
                      <b-td>{{ email.email_received_datetime }}</b-td>
                      <b-td>{{ email.email_from }}</b-td>
                      <b-td>{{ email.email_subject }}</b-td>
                      <b-td>
                        <b-form-checkbox v-if="email.documents.length" :checked="1" disabled
                                         :value="email.documents.length>0?1:0" :unchecked-value="0"/>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-overlay>
              <div class="text-right p-1">
                <b-button v-if="!entity.ticket_closed && showButton.all" variant="primary"
                          @click="$refs.emailModal.show(false)">New Email
                </b-button>
              </div>
            </b-card-actions>
          </b-col>
          <b-col lg="12">
            <div v-if="showButton.all">
              <b-button variant="primary" @click="createDocument">
                {{ $t('button~newdocument') }}
              </b-button>
            </div>
            <DocumentsWidgetView v-if="activeTabItem && activeTabItem.id==='4'" :documents="documents"
                                 :ticket_id="entity.ticket_id"/>

            <!--            <b-row>-->
            <!--              <b-col v-for="(document,i) in document" :key="i" cols="6">-->
            <!--                <b-overlay :show="document.loading">-->
            <!--                  <b-card>-->
            <!--                    <template #header>-->
            <!--                      <div class=" w-100 d-flex justify-content-between">-->
            <!--                        <h5-->
            <!--                          class="document-header"-->
            <!--                          :title="document.document_name + (document.document_already_stamp ? '(Stamped)' : '') + ' - ' + (document.document_type_name || '')"-->
            <!--                        >-->
            <!--                          {{-->
            <!--                            document.document_name + (document.document_already_stamp ? '(Stamped)' : '') + ' - ' + (document.document_type_name || '')-->
            <!--                          }}-->
            <!--                        </h5>-->
            <!--                        &lt;!&ndash;                    <b-link variant="danger" target="_blank" :href="getLink(document)">&ndash;&gt;-->
            <!--                        &lt;!&ndash;                      <feather-icon icon="EyeIcon"/>&ndash;&gt;-->
            <!--                        &lt;!&ndash;                    </b-link>&ndash;&gt;-->
            <!--                        <b-dropdown variant="link-" toggle-class="p-0" right no-caret class="ml-auto document-header-dropdown">-->
            <!--                          <template v-slot:button-content>-->
            <!--                            <feather-icon icon="MoreHorizontalIcon"/>-->
            <!--                          </template>-->
            <!--                          <b-dropdown-item target="_blank" :href="getLink(document)">-->
            <!--                            {{ $t('button~view') }}-->
            <!--                          </b-dropdown-item>-->
            <!--                          <b-dropdown-item @click="$refs.documentModal.openModal(false, document)">-->
            <!--                            {{ $t('button~edit') }}-->
            <!--                          </b-dropdown-item>-->
            <!--                          <b-dropdown-item v-if="!document.pos_id && !document.contract_id" @click="addToPos(document)">-->
            <!--                            {{ $t('button~document~addtopos') }}-->
            <!--                          </b-dropdown-item>-->
            <!--                          <b-dropdown-item v-if="!document.pos_id && !document.contract_id"-->
            <!--                                           @click="addToContract(document)">-->
            <!--                            {{ $t('button~document~addtocontract') }}-->
            <!--                          </b-dropdown-item>-->
            <!--                        </b-dropdown>-->
            <!--                      </div>-->
            <!--                    </template>-->
            <!--                    <b-card-text>-->
            <!--                      <h5 class="font-weight-bolder" style="color: black">-->
            <!--                        {{-->
            <!--                          document.document_mime_type + (document.pos_id ? ' (POS)' : (document.contract_id ? ' (Contract)' : ''))-->
            <!--                        }}-->
            <!--                      </h5>-->
            <!--                    </b-card-text>-->
            <!--                    <b-card-text>-->
            <!--                      <div class="w-100 d-flex flex-column justify-content-between">-->
            <!--                        <h6>{{ formatDate(document.document_entry_time, true) }}</h6>-->
            <!--                        <b-link v-if="canStamp(document)"-->
            <!--                                :to="{name:'sign-document', params: {id: document.document_id,ticket_id: entity.ticket_id, entity: document}}"-->
            <!--                                class="ml-2">Stamp-->
            <!--                        </b-link>-->
            <!--                      </div>-->
            <!--                    </b-card-text>-->
            <!--                  </b-card>-->
            <!--                </b-overlay>-->
            <!--              </b-col>-->
            <!--            </b-row>-->


            <generic-modal ref="documentModal" table="document" :definition="documentDef"
                           table-definition-key="document"
                           :title="$t('headline~document~new')" @reload-table="onNewDocuments"/>
            <generic-modal ref="ticketModal" :fetch-data="false" table="ticket" :definition="ticketDef"
                           table-definition-key="ticket" title="Update the ticket" @reload-table="onTicketUpdate"/>

            <add-document-to-contract ref="documentContractModal"/>
            <add-document-to-pos ref="documentPosModal"/>
          </b-col>
          <b-col v-if="activeTabItem && activeTabItem.id ==='5' && isTicket" lg="12">
            <b-card :title="$t('headline~ticket~subtasks')">
              <b-card-text class="text-right">
                <b-button v-if="$can('create', table)" variant="primary" @click="createSubTicket">
                  {{ $t('headline~ticket~newsubtask') }}
                </b-button>
              </b-card-text>
              <SubticketTable :subtickets="subTickets" :team-users="[]" :loading="loading" />
            </b-card>
            <generic-modal ref="modal" table="ticket" :definition="subTicketDef" table-definition-key="ticket"
                           :title="$t('headline~ticket~newsubtask')" />
          </b-col>
        </b-row>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import {
  BButton,
  BCol,
  BRow,
} from 'bootstrap-vue'
import EditPageMixin from '@/views/app/Generic/EditPageMixin'
import Table from '@/table'
import GenericModal from '@/views/app/Generic/modal.vue'
import SubTicketCard from '@/views/app/CustomComponents/WP6/SubTicketCard.vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import { formatDate, getDocumentLink, getStampedDocumentLink } from '@/libs/utils'
import moment from 'moment'
import AssignUserModal from '@/views/app/Kanban/AssignUserModal.vue'
import Notes from '@/views/app/Generic/Notes.vue'
import _, { uniqBy } from 'lodash'
import EmailModal from '@/views/app/Ticket/EmailModal.vue'
import AddDocumentToContract from '@/views/app/Ticket/AddDocumentToContract.vue'
import AddDocumentToPos from '@/views/app/Ticket/AddDocumentToPos.vue'
import { mapGetters } from 'vuex'
import TabComponent from '@/components/TabComponent.vue'
import DocumentsWidgetView from '@/views/app/Ticket/widgets/DocumentsWidgetView.vue'
import SubTicketMixin from '@/views/app/Ticket/Subticket/SubTicketMixin.js'
import SubticketTable from '@/views/app/CustomComponents/WP6/SubticketTable.vue'

export default {
  name: 'TicketDetail',
  components: {
    SubticketTable,
    DocumentsWidgetView,
    TabComponent,
    AddDocumentToContract,
    AddDocumentToPos,
    EmailModal,
    Notes,
    AssignUserModal,
    BCardActions,
    AppTimelineItem,
    AppTimeline,
    SubTicketCard,
    GenericModal,
    BButton,
    BCol,
    BRow,
  },
  mixins: [EditPageMixin, TicketMixin, SubTicketMixin],
  data() {
    return {
      ticketDef: Table.ticket,
      documentDef: Table.document,
      subTickets: [],
      documents: [],
      loading: false,
      activeTabItem: null,
      emails: [],
      loadingEmail: false,
      contractDocument: {},
      noteToInternal: true,
      noteToEveryOne: true,
    }
  },
  computed: {
    tabTitle() {
      return [
        {
          id: '2',
          title: 'Timeline',
          show: true,
        },
        {
          id: '5',
          title: this.$t('headline~ticket~subtasks'),
          show: this.isTicket,
        },
        {
          id: '4',
          title: 'Documents',
          show: true,
        },
        {
          id: '3',
          title: 'Messages and Emails',
          show: true,
        },
        {
          id: '1',
          title: 'Information',
          show: true,
        },

      ]
    },
    invoiceTicket() {
      return true
    },
    isTicket() {
      return this.entity?.ticket_id_group === null
    },
    firstColumn() {
      return this.entity?.columns[0]
    },
    showButton() {
      const { team_type } = this.firstColumn
      const typeOfButton = {
        all: true,
        assign: true,
        confirm: true,
      }

      if (!this.isUserExtern) return { ...typeOfButton }

      if (team_type === 'intern') {
        this.noteToInternal = false
        typeOfButton.all = false
        typeOfButton.assign = false
        typeOfButton.confirm = false
      } else {
        this.noteToEveryOne = false
        typeOfButton.all = false
        typeOfButton.assign = true
        typeOfButton.confirm = true
      }

      return { ...typeOfButton }
    },
    ...mapGetters('user', ['isUserExtern']),
  },
  async mounted() {
    this.loading = true
    try {
      if (!this.entity || !this.entity?.columns) {
        await this.loadSingleTicket(false)
        this.entity = this.tickets[0]
        await this.loadStages(this.entity?.board_id)
      } else {
        this.columns = this.$route.params.columns
        this.teams = this.$route.params.teams
      }
      if (this.isTicket) {
        await this.fetchSubTickets()
      }
      await this.fetchDocuments()
      await this.fetchEmail()
    } finally {
      this.loading = false
    }
  },
  methods: {
    async submitSubticket(vm) {
      const data = { ...vm.entity }

      try {
        const response = await this.$http.post('/tickets/subticket', data)
        await this.fetchSubTickets()
        return response
      } catch (error) {
        console.log(error)
      }
    },
    getActiveItemData(item) {
      this.activeTabItem = item
    },
    formatDate,
    async addToPos(document) {
      if (document.loading) return
      this.$refs.documentPosModal.openModal(document, this.entity?.pos_id)
    },
    addToContract(document) {
      this.contractDocument.document_id = document.document_id
      this.$refs.documentContractModal.openModal(document, this.entity?.contract_id)
    },
    canStamp(document) {
      if (!this.entity || !this.entity?.columns) return false
      if (document.document_mime_type !== 'application/pdf') return false
      return this.columns.find(c => c.column_id === this.entity?.columns[0].column_id).column_has_stamp
    },
    canMoveBack() {
      if (!this.entity) return false
      if (this.entity?.ticket_closed) return false
      if (!this.entity?.columns[1]) return false
      if (this.entity?.columns[1].rank_order > this.entity?.columns[0].rank_order) return false
      const column_name = this.entity?.columns[1].column_name
      return this.config.accepts(null, { dataset: { status: column_name } }, { dataset: { status: this.entity?.column_name } }, true)
    },
    canMoveToNext() {
      if (!this.entity) return false
      if (this.entity?.ticket_closed) return false
      const colIdx = this.columns.findIndex(c => c.column_name === this.entity?.column_name)
      if (colIdx === this.columns.length - 1) return false
      return this.config.accepts(null, { dataset: { status: this.columns[colIdx + 1].column_name } }, { dataset: { status: this.entity?.column_name } })
    },
    async moveToNext() {
      const result = await this.moveToNextColumn(this.entity)
      if (result) await this.loadSingleTicket()
    },
    async moveBack() {
      const result = await this.moveToPreviousColumn(this.entity)
      if (result) await this.loadSingleTicket()
    },
    getColumnColor(column, idx) {
      const date = idx === 0 ? moment() : moment(column.ticket_move_time_out)
      if (date.isAfter(column.ticket_deadline_offset_red)) return 'danger'
      if (date.isAfter(column.ticket_deadline_offset_yellow)) return 'warning'
      return 'success'
    },
    getDocumentLink,
    getLink(document) {
      if (document.document_already_stamp) return getStampedDocumentLink(document)
      return getDocumentLink(document)
    },
    createDocument() {
      this.$refs.documentModal.openModal(true, { ticket_id: this.entity?.ticket_id })
    },
    createInvoice() {
      this.$router.push({
        name: 'table-form',
        params: {
          table: 'invoice',
          entity: { ticket_id: this.entity?.ticket_id },
        },
      })
    },
    updateTicket() {
      const model = _.pick(this.entity, ['ticket_id', 'company_id', 'pos_id', 'contract_id', 'ticket_name', 'ticket_description', 'priority_id', 'ticket_deadline_red', 'ticket_deadline_yellow', 'ticket_deadline'])
      this.$refs.ticketModal.openModal(false, model)
    },
    async onNewTicket(ticket) {
      // Save subticket relation
      await this.$api({
        entity: 'ticket_ticket_rel',
        action: 'create',
        data: [{
          ticket_id: ticket.ticket_id,
          ticket_id_group: parseInt(this.entityId),
          ticket_type: 'test',
        }],
      })
      await this.fetchSubTickets()
    },
    async onNewDocuments(documents) {
      // Save document relation
      await this.$api({
        entity: 'document_ticket_rel',
        action: 'create',
        data: documents.map(document => ({
          document_id: document.document_id,
          ticket_id: parseInt(this.entityId),
        })),
      })
      await this.fetchDocuments()
    },
    async onTicketUpdate() {
      await this.loadSingleTicket()
    },
    onDocumentUpdate(data) {
      console.log(data)
      this.$api({
        action: 'create',
        entity: 'document_ticket_rel',
        data: data.map(doc => ({
          document_id: doc.document_id,
          ticket_id: this.entity?.ticket_id,
        })),
      })
        .finally(() => {
          this.fetchDocuments()
        })
    },
    async fetchDocuments() {
      const documents = (await this.$http.get('/tickets/documents', {
        params: {
          ticket_id: this.entity?.ticket_id,
          size: 100_000,
        },
      })).data.data
      documents.forEach(document => {
        document.loading = false
      })
      this.documents = documents
    },
    async fetchEmail() {
      this.loadingEmail = true
      try {
        const results = (await this.$http.get('/tickets/emails', {
          params: {
            ticket_id: this.entity?.ticket_id,
            size: 100_000,
          },
        })).data.data
        if (!results.length) return
        this.emails = Object.values(_.groupBy(results, 'email_id'))
          .map(r => _.pick(r[0], ['email_id', 'email_from', 'email_received_datetime', 'email_to', 'email_cc', 'email_subject', 'email_body', 'documents']))
      } finally {
        this.loadingEmail = false
      }
    },
    async loadSingleTicket(loader = true) {
      if (loader) this.loading = true
      try {
        await this.loadTickets({ ticket_id: this.$route.params.id })
        this.entity = this.tickets[0]
      } finally {
        if (loader) this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.mail-table {
  word-break: break-word;
}

.document-header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-header-dropdown {
  align-self: flex-start;
}
</style>
